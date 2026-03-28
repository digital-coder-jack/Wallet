module.exports = {
  apps: [
    // ── Python OTP Microservice (port 8000) ───────────────────────────────
    {
      name: 'nexwallet-otp',
      script: 'python3',
      args: '-m uvicorn main:app --host 0.0.0.0 --port 8000 --log-level info',
      cwd: './otp_service',
      interpreter: 'none',
      env: { PYTHONUNBUFFERED: '1' },
      watch: false,
      instances: 1,
      exec_mode: 'fork',
      restart_delay: 3000,
      max_restarts: 10,
    },
    // ── Hono / Cloudflare Pages frontend (port 3000) ──────────────────────
    {
      name: 'nexwallet',
      script: 'npx',
      args: 'wrangler pages dev dist --ip 0.0.0.0 --port 3000',
      env: { NODE_ENV: 'development', PORT: 3000 },
      watch: false,
      instances: 1,
      exec_mode: 'fork',
      restart_delay: 2000,
      max_restarts: 10,
    },
  ],
}
