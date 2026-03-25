#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────
#  NexWallet — One-Command Setup Script
#  Usage: bash setup.sh
# ─────────────────────────────────────────────────────────────────────

set -e

CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BOLD='\033[1m'
RESET='\033[0m'

echo ""
echo -e "${CYAN}${BOLD}💎 NexWallet — Setup${RESET}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo ""

# ── Check Node.js ──────────────────────────────────────────────────
if ! command -v node &> /dev/null; then
  echo -e "${RED}✗ Node.js not found.${RESET}"
  echo -e "  Please install Node.js v18+ from: ${YELLOW}https://nodejs.org${RESET}"
  exit 1
fi

NODE_VER=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VER" -lt 18 ]; then
  echo -e "${RED}✗ Node.js v18+ required. You have: $(node -v)${RESET}"
  exit 1
fi
echo -e "${GREEN}✓ Node.js $(node -v) detected${RESET}"

# ── Check npm ──────────────────────────────────────────────────────
if ! command -v npm &> /dev/null; then
  echo -e "${RED}✗ npm not found. Please reinstall Node.js.${RESET}"
  exit 1
fi
echo -e "${GREEN}✓ npm $(npm -v) detected${RESET}"

# ── Install dependencies ───────────────────────────────────────────
echo ""
echo -e "${CYAN}📦 Installing dependencies...${RESET}"
npm install

# ── Success ────────────────────────────────────────────────────────
echo ""
echo -e "${GREEN}${BOLD}✅ Setup complete!${RESET}"
echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo -e "${BOLD}🚀 Start the app:${RESET}"
echo ""
echo -e "   ${YELLOW}npm run dev${RESET}       → Development server"
echo -e "   ${YELLOW}npm run build${RESET}     → Build for production"
echo -e "   ${YELLOW}npm run deploy${RESET}    → Deploy to Cloudflare Pages"
echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo -e "  Then open: ${YELLOW}http://localhost:5173${RESET}"
echo ""
