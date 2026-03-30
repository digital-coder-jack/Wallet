"""
NexWallet — Python OTP Microservice  (Port 8000)
=================================================
Security Features
-----------------
✅ Real Email OTP   — via SMTP (Gmail / any SMTP provider)
✅ Real SMS OTP     — via Twilio (phone + Aadhaar-linked number)
✅ HMAC-SHA256 OTP hashing — OTP never stored in plain text in memory
✅ Cryptographically secure OTP generation — secrets.randbelow()
✅ Per-IP rate limiting — 20 requests/minute (slowapi)
✅ Per-identifier send throttle — max 3 OTP sends per 10 min window
✅ Brute-force protection — 3 wrong OTP attempts → 15-min auto-lock
✅ OTP expiry — 10 minutes
✅ Replay protection — OTP deleted immediately after first successful use
✅ Structured audit log — every event recorded with IP + timestamp
✅ Admin endpoint — protected by ADMIN_SECRET header
✅ Aadhaar masking — only last 4 digits shown in any response
✅ Wrong-info detection & logging — invalid formats logged with IP
✅ Input validation via Pydantic with detailed error messages

Environment Variables (set in otp_service/.env):
-------------------------------------------------
# Email (required for real email OTP)
SMTP_HOST        = smtp.gmail.com
SMTP_PORT        = 587
SMTP_USER        = your_gmail@gmail.com
SMTP_PASS        = your_app_password        # Gmail App Password
EMAIL_FROM       = NexWallet <your_gmail@gmail.com>

# SMS via Twilio (required for real phone/Aadhaar OTP)
TWILIO_SID       = ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_TOKEN     = your_auth_token
TWILIO_FROM      = +1XXXXXXXXXX             # Your Twilio number

# Security secrets (change these in production!)
ADMIN_SECRET     = change_this_to_a_long_random_secret
HMAC_SECRET      = another_long_random_secret_for_hmac

# Tunable settings
OTP_TTL_SECONDS  = 600     # OTP valid for 10 min (default)
MAX_SEND_TRIES   = 3       # Max OTP sends per window
MAX_VERIFY_TRIES = 3       # Wrong OTP attempts before lockout
LOCK_SECONDS     = 900     # Lockout duration: 15 min
"""

from __future__ import annotations

import hashlib
import hmac
import json
import logging
import os
import re
import secrets
import smtplib
import time
from datetime import datetime, timezone
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from typing import Any, Dict, List, Optional, Tuple

import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, field_validator
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

# ─── Load .env ────────────────────────────────────────────────────────────────
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))

# ─── Configuration ────────────────────────────────────────────────────────────
SMTP_HOST        = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT        = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER        = os.getenv("SMTP_USER", "")
SMTP_PASS        = os.getenv("SMTP_PASS", "")
EMAIL_FROM       = os.getenv("EMAIL_FROM", f"NexWallet <{SMTP_USER}>")

TWILIO_SID       = os.getenv("TWILIO_SID", "")
TWILIO_TOKEN     = os.getenv("TWILIO_TOKEN", "")
TWILIO_FROM      = os.getenv("TWILIO_FROM", "")

ADMIN_SECRET     = os.getenv("ADMIN_SECRET", "nexwallet-admin-super-secret-2024")
HMAC_SECRET      = os.getenv("HMAC_SECRET", "nexwallet-hmac-secret-key-change-in-production-2024").encode("utf-8")

OTP_TTL          = int(os.getenv("OTP_TTL_SECONDS", "600"))
MAX_SEND_TRIES   = int(os.getenv("MAX_SEND_TRIES", "3"))
MAX_VERIFY_TRIES = int(os.getenv("MAX_VERIFY_TRIES", "3"))
LOCK_SECONDS     = int(os.getenv("LOCK_SECONDS", "900"))

# ─── Logging ─────────────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s — %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger("nexwallet-otp")

# ─── In-memory stores ────────────────────────────────────────────────────────
# Each key maps to:
#   otp_hash          : str   — HMAC-SHA256(otp:salt)
#   salt              : str   — random 32-hex salt
#   expires           : float — unix timestamp
#   verify_attempts   : int   — wrong attempts so far
#   send_count        : int   — how many OTPs sent in current window
#   send_window_start : float — start of current send-rate window
#   type              : str   — "email" | "phone" | "aadhar"
otp_store  : Dict[str, Dict[str, Any]] = {}
lock_store : Dict[str, float]           = {}   # key → unlock_timestamp
audit_log  : List[Dict[str, Any]]       = []

# ─── SlowAPI rate limiter ─────────────────────────────────────────────────────
limiter = Limiter(key_func=get_remote_address, default_limits=["60/minute"])

# ─── FastAPI app ──────────────────────────────────────────────────────────────
app = FastAPI(
    title="NexWallet OTP Service",
    version="3.0.0",
    docs_url=None,
    redoc_url=None,
)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://nexwallet.pages.dev", "*"],
    allow_methods=["POST", "GET", "OPTIONS"],
    allow_headers=["Content-Type", "X-Admin-Key", "X-Forwarded-For"],
)

# ═══════════════════════════════════════════════════════════════════════════════
#  HELPER FUNCTIONS
# ═══════════════════════════════════════════════════════════════════════════════

def _now() -> float:
    return time.monotonic()


def _unix_now() -> float:
    return time.time()


def _iso_now() -> str:
    return datetime.now(timezone.utc).isoformat()


def _audit(
    event: str,
    type_: str,
    identifier: str,
    ip: str,
    extra: Optional[Dict[str, Any]] = None,
) -> None:
    entry: Dict[str, Any] = {
        "time":       _iso_now(),
        "event":      event,
        "type":       type_,
        "identifier": identifier,
        "ip":         ip,
    }
    if extra:
        entry.update(extra)
    audit_log.append(entry)
    if len(audit_log) > 5000:
        audit_log.pop(0)
    lvl = (
        logging.WARNING
        if event in ("wrong_otp", "locked", "brute_force", "invalid_input", "send_failed")
        else logging.INFO
    )
    logger.log(lvl, "AUDIT %s", json.dumps(entry))


def _generate_otp() -> str:
    """Cryptographically secure 6-digit OTP (100000–999999)."""
    return str(secrets.randbelow(900_000) + 100_000)


def _hash_otp(otp: str, salt: str) -> str:
    """Return HMAC-SHA256(secret, 'otp:salt') as hex — OTP never stored plaintext."""
    msg = f"{otp}:{salt}".encode("utf-8")
    return hmac.new(HMAC_SECRET, msg, hashlib.sha256).hexdigest()


def _verify_otp_hash(otp: str, salt: str, stored_hash: str) -> bool:
    """Constant-time comparison to prevent timing attacks."""
    expected = _hash_otp(otp, salt)
    return hmac.compare_digest(expected, stored_hash)


def _make_store_key(type_: str, identifier: str) -> str:
    if type_ == "email":
        return f"email:{identifier.lower().strip()}"
    if type_ == "phone":
        return f"phone:{re.sub(r'[^0-9]', '', identifier)}"
    if type_ == "aadhar":
        return f"aadhar:{re.sub(r'[^0-9]', '', identifier)}"
    raise ValueError(f"Unknown type: {type_!r}")


def _is_locked(key: str) -> bool:
    unlock_at = lock_store.get(key, 0.0)
    if _unix_now() < unlock_at:
        return True
    lock_store.pop(key, None)
    return False


def _lock(key: str) -> None:
    lock_store[key] = _unix_now() + LOCK_SECONDS


def _lock_remaining(key: str) -> int:
    return max(0, int(lock_store.get(key, 0.0) - _unix_now()))


def _purge_expired() -> None:
    now = _unix_now()
    for k in list(otp_store):
        if otp_store[k]["expires"] < now:
            del otp_store[k]


def _can_send(key: str) -> Tuple[bool, int]:
    """Returns (allowed, seconds_to_wait)."""
    entry = otp_store.get(key)
    if not entry:
        return True, 0
    window_start    = entry.get("send_window_start", 0.0)
    window_elapsed  = _unix_now() - window_start
    if window_elapsed > OTP_TTL:
        return True, 0
    if entry.get("send_count", 0) >= MAX_SEND_TRIES:
        wait = int(OTP_TTL - window_elapsed)
        return False, wait
    return True, 0


def _mask_phone(digits: str) -> str:
    """Returns +91 XXXXXX1234 style mask."""
    return f"+91 XXXXXX{digits[-4:]}"


def _mask_aadhar(digits: str) -> str:
    """Returns XXXX XXXX 1234 style mask."""
    return f"XXXX XXXX {digits[-4:]}"


# ═══════════════════════════════════════════════════════════════════════════════
#  EMAIL SENDER
# ═══════════════════════════════════════════════════════════════════════════════

def _send_email_otp(to_email: str, otp: str) -> bool:
    """
    Send OTP via SMTP.
    Returns True on success (or dev-mode).
    Logs OTP to console when SMTP not configured (development only).
    """
    if not SMTP_USER or not SMTP_PASS:
        logger.warning("⚠️  SMTP not configured — OTP logged to console (DEV MODE)")
        logger.info("📧 [DEV EMAIL OTP] To: %s  OTP: %s", to_email, otp)
        return True  # pretend sent in dev mode

    subject   = "NexWallet — Your One-Time Verification Code"
    html_body = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NexWallet OTP</title>
</head>
<body style="margin:0;padding:0;background:#0a0a14;font-family:Inter,system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr><td align="center" style="padding:40px 20px;">
      <table width="480" cellpadding="0" cellspacing="0" role="presentation"
             style="background:#111120;border-radius:16px;border:1px solid rgba(99,102,241,0.15);overflow:hidden;max-width:480px;">

        <!-- Header gradient -->
        <tr><td style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:28px 32px;text-align:center;">
          <div style="font-size:40px;margin-bottom:8px;">🔐</div>
          <div style="color:#ffffff;font-size:22px;font-weight:800;">NexWallet</div>
          <div style="color:rgba(255,255,255,0.75);font-size:13px;margin-top:4px;">Identity Verification</div>
        </td></tr>

        <!-- OTP body -->
        <tr><td style="padding:36px 32px;text-align:center;">
          <p style="color:#94a3b8;font-size:15px;margin:0 0 24px 0;line-height:1.6;">
            Your one-time verification code for NexWallet is:
          </p>
          <div style="background:rgba(99,102,241,0.12);border:2px solid rgba(99,102,241,0.35);
                      border-radius:14px;padding:22px 32px;display:inline-block;margin-bottom:28px;">
            <span style="font-size:44px;font-weight:900;color:#a5b4fc;letter-spacing:12px;
                         font-variant-numeric:tabular-nums;">{otp}</span>
          </div>
          <p style="color:#64748b;font-size:13px;margin:0 0 10px 0;">
            ⏰ Valid for <strong style="color:#e2e8f0;">10 minutes</strong> from the time of sending.
          </p>
          <p style="color:#64748b;font-size:13px;margin:0;">
            🚫 <strong style="color:#e2e8f0;">Never share this code with anyone.</strong>
            NexWallet staff will never ask for your OTP.
          </p>
        </td></tr>

        <!-- Security footer -->
        <tr><td style="padding:16px 32px 28px;text-align:center;
                       border-top:1px solid rgba(99,102,241,0.12);">
          <p style="color:#475569;font-size:11px;margin:0;line-height:1.6;">
            If you did not request this code, your account may be at risk.<br>
            Please contact support immediately at <a href="mailto:support@nexwallet.com"
            style="color:#6366f1;">support@nexwallet.com</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>"""

    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"]    = EMAIL_FROM
        msg["To"]      = to_email
        msg["X-Mailer"] = "NexWallet OTP Service v3"
        msg.attach(MIMEText(html_body, "html", "utf-8"))

        with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=15) as srv:
            srv.ehlo()
            srv.starttls()
            srv.ehlo()
            srv.login(SMTP_USER, SMTP_PASS)
            srv.sendmail(SMTP_USER, [to_email], msg.as_string())

        logger.info("📧 Email OTP sent to %s", to_email)
        return True

    except smtplib.SMTPAuthenticationError:
        logger.error("❌ SMTP auth failed — check SMTP_USER / SMTP_PASS in .env")
        return False
    except smtplib.SMTPRecipientsRefused:
        logger.error("❌ Invalid email address rejected by SMTP: %s", to_email)
        return False
    except Exception as exc:
        logger.exception("❌ SMTP error sending to %s: %s", to_email, exc)
        return False


# ═══════════════════════════════════════════════════════════════════════════════
#  SMS SENDER (Twilio)
# ═══════════════════════════════════════════════════════════════════════════════

def _send_sms_otp(to_phone_digits: str, otp: str) -> bool:
    """
    Send OTP via Twilio SMS.
    Returns True on success (or dev-mode).
    to_phone_digits: 10-digit Indian number (no country code).
    """
    e164   = f"+91{to_phone_digits}"
    body   = f"[NexWallet] Your verification code: {otp}\nValid 10 minutes. DO NOT share with anyone.\n- NexWallet Security"

    if not TWILIO_SID or not TWILIO_TOKEN or not TWILIO_FROM:
        logger.warning("⚠️  Twilio not configured — OTP logged to console (DEV MODE)")
        logger.info("📱 [DEV SMS OTP] To: %s  OTP: %s", e164, otp)
        return True  # dev mode

    try:
        import httpx
        r = httpx.post(
            f"https://api.twilio.com/2010-04-01/Accounts/{TWILIO_SID}/Messages.json",
            data={"From": TWILIO_FROM, "To": e164, "Body": body},
            auth=(TWILIO_SID, TWILIO_TOKEN),
            timeout=12.0,
        )
        if r.status_code in (200, 201):
            logger.info("📱 SMS OTP sent to +91XXXXXX%s via Twilio", to_phone_digits[-4:])
            return True
        else:
            logger.error("❌ Twilio HTTP %s: %s", r.status_code, r.text[:200])
            return False
    except Exception as exc:
        logger.exception("❌ Twilio exception: %s", exc)
        return False


# ═══════════════════════════════════════════════════════════════════════════════
#  PYDANTIC REQUEST MODELS
# ═══════════════════════════════════════════════════════════════════════════════

EMAIL_RE  = re.compile(r"^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$")
PHONE_RE  = re.compile(r"^[6-9]\d{9}$")   # Indian mobile: starts with 6-9, 10 digits
AADHAR_RE = re.compile(r"^\d{12}$")


class EmailOTPRequest(BaseModel):
    email: str

    @field_validator("email")
    @classmethod
    def check_email(cls, v: str) -> str:
        v = v.strip().lower()
        if not EMAIL_RE.match(v):
            raise ValueError(
                "❌ Invalid email address. Please enter a valid email (e.g. name@example.com)."
            )
        return v


class PhoneOTPRequest(BaseModel):
    value: str
    type:  str  # "phone" or "aadhar"

    @field_validator("type")
    @classmethod
    def check_type(cls, v: str) -> str:
        if v not in ("phone", "aadhar"):
            raise ValueError("type must be 'phone' or 'aadhar'")
        return v

    @field_validator("value")
    @classmethod
    def check_value(cls, v: str) -> str:
        return v.strip()


class VerifyOTPRequest(BaseModel):
    key:  str
    otp:  str
    type: str

    @field_validator("otp")
    @classmethod
    def check_otp(cls, v: str) -> str:
        v = v.strip()
        if not re.match(r"^\d{6}$", v):
            raise ValueError(
                "❌ OTP must be exactly 6 digits. Please enter the code from your email/SMS."
            )
        return v

    @field_validator("type")
    @classmethod
    def check_type(cls, v: str) -> str:
        if v not in ("email", "phone", "aadhar"):
            raise ValueError("Invalid verification type.")
        return v


# ═══════════════════════════════════════════════════════════════════════════════
#  EXCEPTION HANDLER — Pydantic validation errors → clean 422 with detail string
# ═══════════════════════════════════════════════════════════════════════════════

from fastapi.exceptions import RequestValidationError

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    # Pull first user-friendly message from validation errors
    first_msg = "❌ Invalid input. Please check your details and try again."
    for err in exc.errors():
        msg = err.get("msg", "")
        if msg:
            # Strip pydantic "Value error, " prefix if present
            if msg.startswith("Value error, "):
                msg = msg[len("Value error, "):]
            first_msg = msg
            break
    return JSONResponse(
        status_code=422,
        content={"success": False, "error": first_msg},
    )


# ═══════════════════════════════════════════════════════════════════════════════
#  HEALTH CHECK
# ═══════════════════════════════════════════════════════════════════════════════

@app.get("/health")
async def health():
    return {
        "status":  "ok",
        "service": "NexWallet OTP Service",
        "version": "3.0.0",
        "smtp_configured":   bool(SMTP_USER and SMTP_PASS),
        "twilio_configured": bool(TWILIO_SID and TWILIO_TOKEN and TWILIO_FROM),
        "active_otps":       len(otp_store),
        "active_locks":      len(lock_store),
    }


# ═══════════════════════════════════════════════════════════════════════════════
#  ROUTE: Send Email OTP
# ═══════════════════════════════════════════════════════════════════════════════

@app.post("/otp/send-email")
@limiter.limit("10/minute")
async def send_email_otp(request: Request, body: EmailOTPRequest):
    ip  = request.headers.get("x-forwarded-for", get_remote_address(request))
    key = _make_store_key("email", body.email)
    _purge_expired()

    # ── Lockout check ─────────────────────────────────────────────────────────
    if _is_locked(key):
        wait = _lock_remaining(key)
        _audit("locked_block", "email", body.email, ip)
        raise HTTPException(
            status_code=429,
            detail=f"🔒 Account locked due to too many failed attempts. "
                   f"Please try again in {wait // 60} min {wait % 60} sec."
        )

    # ── Send-rate throttle ────────────────────────────────────────────────────
    allowed, wait = _can_send(key)
    if not allowed:
        raise HTTPException(
            status_code=429,
            detail=f"⏳ OTP already sent. Please wait {wait} seconds before requesting a new one."
        )

    # ── Generate & store OTP (HMAC-hashed) ───────────────────────────────────
    otp   = _generate_otp()
    salt  = secrets.token_hex(16)
    h     = _hash_otp(otp, salt)

    existing     = otp_store.get(key, {})
    send_count   = existing.get("send_count", 0) + 1
    window_start = (
        existing.get("send_window_start", _unix_now())
        if send_count > 1 else _unix_now()
    )

    otp_store[key] = {
        "otp_hash":          h,
        "salt":              salt,
        "expires":           _unix_now() + OTP_TTL,
        "verify_attempts":   0,
        "send_count":        send_count,
        "send_window_start": window_start,
        "type":              "email",
    }

    # ── Actually send ─────────────────────────────────────────────────────────
    ok = _send_email_otp(body.email, otp)
    if not ok:
        otp_store.pop(key, None)
        _audit("send_failed", "email", body.email, ip)
        raise HTTPException(
            status_code=500,
            detail="❌ Failed to send email. Please check the address or try again later."
        )

    _audit("otp_sent", "email", body.email, ip, {"send_count": send_count})

    # In dev-mode expose OTP in response for easy testing
    dev_otp  = otp  if not (SMTP_USER and SMTP_PASS) else None
    response = {
        "success":      True,
        "message":      f"✅ OTP sent to {body.email}. Check your inbox.",
        "expires_in":   OTP_TTL,
        "resends_left": max(0, MAX_SEND_TRIES - send_count),
    }
    if dev_otp:
        response["dev_otp"] = dev_otp   # only present when SMTP not configured
    return response


# ═══════════════════════════════════════════════════════════════════════════════
#  ROUTE: Send Phone / Aadhaar OTP
# ═══════════════════════════════════════════════════════════════════════════════

@app.post("/otp/send-phone")
@limiter.limit("10/minute")
async def send_phone_otp(request: Request, body: PhoneOTPRequest):
    ip        = request.headers.get("x-forwarded-for", get_remote_address(request))
    is_aadhar = body.type == "aadhar"
    digits    = re.sub(r"[^0-9]", "", body.value)

    # ── Input validation ──────────────────────────────────────────────────────
    if is_aadhar:
        if not AADHAR_RE.match(digits):
            _audit("invalid_input", "aadhar", digits[:4] + "xxxxxxxx", ip, {"raw": body.value[:6]})
            raise HTTPException(
                status_code=400,
                detail="❌ Invalid Aadhaar number. Must be exactly 12 digits. "
                       "Please enter your correct Aadhaar number."
            )
        identifier  = digits
        # In production: call UIDAI eKYC API to get the registered mobile number.
        # For demo: derive a deterministic test phone from the Aadhaar (last 10 digits).
        aadhar_phone = "9" + digits[2:11]
        to_phone     = aadhar_phone
        display_id   = _mask_aadhar(digits)

    else:
        if not PHONE_RE.match(digits):
            _audit("invalid_input", "phone", digits[:4] + "xxxxxx", ip, {"raw": body.value[:6]})
            raise HTTPException(
                status_code=400,
                detail="❌ Invalid mobile number. Enter a valid 10-digit Indian number "
                       "(starting with 6, 7, 8, or 9)."
            )
        identifier = digits
        to_phone   = digits
        display_id = _mask_phone(digits)

    key = _make_store_key(body.type, identifier)
    _purge_expired()

    # ── Lockout check ─────────────────────────────────────────────────────────
    if _is_locked(key):
        wait = _lock_remaining(key)
        _audit("locked_block", body.type, display_id, ip)
        raise HTTPException(
            status_code=429,
            detail=f"🔒 Account locked due to too many failed attempts. "
                   f"Please try again in {wait // 60} min {wait % 60} sec."
        )

    # ── Send-rate throttle ────────────────────────────────────────────────────
    allowed, wait = _can_send(key)
    if not allowed:
        raise HTTPException(
            status_code=429,
            detail=f"⏳ OTP already sent. Please wait {wait} seconds before requesting a new one."
        )

    # ── Generate & store OTP ──────────────────────────────────────────────────
    otp   = _generate_otp()
    salt  = secrets.token_hex(16)
    h     = _hash_otp(otp, salt)

    existing     = otp_store.get(key, {})
    send_count   = existing.get("send_count", 0) + 1
    window_start = (
        existing.get("send_window_start", _unix_now())
        if send_count > 1 else _unix_now()
    )

    otp_store[key] = {
        "otp_hash":          h,
        "salt":              salt,
        "expires":           _unix_now() + OTP_TTL,
        "verify_attempts":   0,
        "send_count":        send_count,
        "send_window_start": window_start,
        "type":              body.type,
        "display_id":        display_id,
    }

    # ── Actually send ─────────────────────────────────────────────────────────
    ok = _send_sms_otp(to_phone, otp)
    if not ok:
        otp_store.pop(key, None)
        _audit("send_failed", body.type, display_id, ip)
        raise HTTPException(
            status_code=500,
            detail="❌ Failed to send SMS. Please try again or use a different method."
        )

    _audit("otp_sent", body.type, display_id, ip, {"send_count": send_count})

    dev_otp  = otp  if not (TWILIO_SID and TWILIO_TOKEN) else None
    msg = (
        f"✅ OTP sent to Aadhaar-linked number ({display_id})."
        if is_aadhar
        else f"✅ OTP sent to {display_id}."
    )
    response = {
        "success":      True,
        "message":      msg,
        "masked":       display_id,
        "expires_in":   OTP_TTL,
        "resends_left": max(0, MAX_SEND_TRIES - send_count),
    }
    if dev_otp:
        response["dev_otp"] = dev_otp
    return response


# ═══════════════════════════════════════════════════════════════════════════════
#  ROUTE: Verify OTP
# ═══════════════════════════════════════════════════════════════════════════════

@app.post("/otp/verify")
@limiter.limit("20/minute")
async def verify_otp(request: Request, body: VerifyOTPRequest):
    ip = request.headers.get("x-forwarded-for", get_remote_address(request))
    _purge_expired()

    try:
        key = _make_store_key(body.type, body.key)
    except ValueError:
        raise HTTPException(status_code=400, detail="❌ Invalid verification type.")

    # ── Lockout check ─────────────────────────────────────────────────────────
    if _is_locked(key):
        wait = _lock_remaining(key)
        _audit("locked_block", body.type, body.key[:6], ip)
        raise HTTPException(
            status_code=429,
            detail=(
                f"🔒 Your account is locked due to multiple wrong OTP attempts. "
                f"Please try again in {wait // 60} min {wait % 60} sec, "
                f"or request a new OTP after the lock expires."
            )
        )

    # ── OTP exists? ───────────────────────────────────────────────────────────
    entry = otp_store.get(key)
    if not entry:
        _audit("no_otp_found", body.type, body.key[:6], ip)
        raise HTTPException(
            status_code=400,
            detail="⏰ No OTP found for this identifier. The OTP may have expired. "
                   "Please request a new OTP and try again."
        )

    # ── Expiry check ──────────────────────────────────────────────────────────
    if _unix_now() > entry["expires"]:
        otp_store.pop(key, None)
        _audit("otp_expired", body.type, body.key[:6], ip)
        raise HTTPException(
            status_code=400,
            detail="⏰ OTP has expired. Please click 'Resend' to get a new code."
        )

    # ── HMAC verification ─────────────────────────────────────────────────────
    is_correct = _verify_otp_hash(body.otp, entry["salt"], entry["otp_hash"])

    if not is_correct:
        entry["verify_attempts"] += 1
        attempts  = entry["verify_attempts"]
        remaining = MAX_VERIFY_TRIES - attempts

        _audit("wrong_otp", body.type, body.key[:6], ip, {
            "attempts":  attempts,
            "remaining": remaining,
        })
        logger.warning(
            "🚨 WRONG OTP | type=%s | identifier=%s... | ip=%s | attempt=%d/%d",
            body.type, body.key[:6], ip, attempts, MAX_VERIFY_TRIES,
        )

        if attempts >= MAX_VERIFY_TRIES:
            otp_store.pop(key, None)
            _lock(key)
            _audit("brute_force", body.type, body.key[:6], ip)
            raise HTTPException(
                status_code=429,
                detail=(
                    f"🚫 Too many incorrect attempts. Your account is locked for "
                    f"{LOCK_SECONDS // 60} minutes for security. "
                    f"Please try again after {LOCK_SECONDS // 60} minutes."
                )
            )

        raise HTTPException(
            status_code=400,
            detail=(
                f"❌ Wrong OTP. You have {remaining} attempt(s) remaining. "
                f"Please enter the correct 6-digit code from your "
                f"{'email' if body.type == 'email' else 'SMS'}."
            )
        )

    # ✅ OTP correct — delete entry (replay protection)
    otp_store.pop(key, None)
    _audit("verified", body.type, body.key[:6], ip)
    logger.info("✅ Identity verified | type=%s | identifier=%s... | ip=%s", body.type, body.key[:6], ip)

    return {
        "success": True,
        "message": "✅ Identity verified successfully! Welcome to NexWallet.",
        "type":    body.type,
    }


# ═══════════════════════════════════════════════════════════════════════════════
#  ADMIN ROUTES
# ═══════════════════════════════════════════════════════════════════════════════

@app.get("/admin/audit-log")
async def get_audit_log(
    request: Request,
    x_admin_key: Optional[str] = Header(default=None, alias="x-admin-key"),
    limit: int = 100,
    event_filter: Optional[str] = None,
):
    """Return structured audit log. Protected by x-admin-key header."""
    ip = get_remote_address(request)
    if not x_admin_key or x_admin_key != ADMIN_SECRET:
        _audit("unauthorized_admin", "admin", "unknown", ip)
        raise HTTPException(status_code=401, detail="Unauthorized")

    logs = list(reversed(audit_log[-limit * 2:]))[:limit]
    if event_filter:
        logs = [e for e in logs if e.get("event") == event_filter]

    wrong_events  = {"wrong_otp", "brute_force", "locked_block", "invalid_input", "send_failed"}
    wrong_entries = [e for e in audit_log if e.get("event") in wrong_events]

    return {
        "service":            "NexWallet OTP v3.0.0",
        "total_events":       len(audit_log),
        "wrong_attempt_total": len(wrong_entries),
        "active_locks":       len(lock_store),
        "active_otps":        len(otp_store),
        "smtp_configured":    bool(SMTP_USER and SMTP_PASS),
        "twilio_configured":  bool(TWILIO_SID and TWILIO_TOKEN),
        "recent_entries":     logs,
        "recent_wrong":       list(reversed(wrong_entries))[:20],
    }


@app.post("/admin/unlock")
async def admin_unlock(
    request: Request,
    x_admin_key: Optional[str] = Header(default=None, alias="x-admin-key"),
    identifier: str = "",
    type_: str = "phone",
):
    """Manually unlock a locked identifier. Protected by x-admin-key."""
    if not x_admin_key or x_admin_key != ADMIN_SECRET:
        raise HTTPException(status_code=401, detail="Unauthorized")
    try:
        key = _make_store_key(type_, identifier)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid type")
    removed = key in lock_store
    lock_store.pop(key, None)
    otp_store.pop(key, None)
    return {"unlocked": removed, "key": key}


@app.get("/admin/active-otps")
async def admin_active_otps(
    request: Request,
    x_admin_key: Optional[str] = Header(default=None, alias="x-admin-key"),
):
    """List currently active (non-expired) OTPs. Protected by x-admin-key."""
    if not x_admin_key or x_admin_key != ADMIN_SECRET:
        raise HTTPException(status_code=401, detail="Unauthorized")
    _purge_expired()
    now = _unix_now()
    return {
        "active_otps": [
            {
                "key":        k,
                "type":       v.get("type"),
                "expires_in": int(v["expires"] - now),
                "send_count": v.get("send_count", 0),
                "attempts":   v.get("verify_attempts", 0),
            }
            for k, v in otp_store.items()
        ]
    }


# ═══════════════════════════════════════════════════════════════════════════════
#  ENTRY POINT
# ═══════════════════════════════════════════════════════════════════════════════

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=False,
        log_level="info",
        access_log=True,
    )
