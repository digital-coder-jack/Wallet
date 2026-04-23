# 💎 NexWallet — Hybrid Crypto & Fiat Wallet

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Poppins&size=26&pause=1000&color=00F7FF&center=true&vCenter=true&width=800&lines=NexWallet;Smart+Digital+Wallet+System;Add+Send+Receive+Transactions;Track+Balance+Instantly;Simulation+Like+Real+Banking+System" />
</p>


<div align="center">

![NexWallet Banner](https://img.shields.io/badge/NexWallet-v2.0-6366f1?style=for-the-badge&logo=bitcoin&logoColor=white)
![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-F6821F?style=for-the-badge&logo=cloudflare&logoColor=white)
![Hono](https://img.shields.io/badge/Hono-Framework-E36002?style=for-the-badge&logo=hono&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

**India's most powerful Hybrid Crypto & Fiat Wallet**  
UPI · Cards · Net Banking · Crypto Trading · DeFi · NFT · Staking · Cross-chain Bridge

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔐 **Registration & KYC** | Full onboarding with PAN, Aadhaar, PIN setup |
| 💸 **UPI Payments** | Send/receive via UPI with daily limit tracking |
| 💳 **Card Payments** | Debit & Credit card transactions with OTP simulation |
| 🏦 **Net Banking** | NEFT / RTGS / IMPS transfers |
| 📥 **Deposit** | UPI, Bank Transfer, Card top-up |
| 📤 **Withdraw** | UPI, Bank Transfer, Crypto withdrawal |
| 🪙 **Crypto Trading** | Buy/sell 100+ tokens with live price simulation |
| 🌾 **DeFi** | Lending, LP, Farming (Aave, Uniswap, Curve, Compound) |
| 🥩 **Staking** | ETH, SOL, ATOM, DOT staking with rewards |
| 🖼️ **NFT Gallery** | View, list, transfer, buy NFTs |
| 🌉 **Cross-chain Bridge** | LayerZero + Wormhole bridging across 8 chains |
| 🌍 **8 Indian Languages** | English, Hindi, Bengali, Telugu, Tamil, Marathi, Gujarati, Kannada |
| 📊 **Portfolio Charts** | Line chart + Donut chart with period filters |
| 🔔 **Notifications** | Price alerts, DeFi yield, security alerts |
| 🛡️ **Security Center** | Biometric, PIN, multi-sig, anti-phishing |
| 🌙 **Dark Theme** | Full dark UI with glassmorphism design |

---

## 🚀 Quick Start (3 Steps)

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### 1. Clone the Repository
```bash
git clone https://github.com/digital-coder-jack/Wallet.git
cd Wallet
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Locally
```bash
npm run dev
```

---

## 📦 All Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local development server (Vite + HMR) |
| `npm run build` | Build for production (outputs to `dist/`) |
| `npm run preview` | Preview production build locally via Wrangler |
| `npm run deploy` | Build + deploy to Cloudflare Pages |

---

## ☁️ Deploy to Cloudflare Pages (Free)

### Step 1 — Install Wrangler CLI
```bash
npm install -g wrangler
```

### Step 2 — Login to Cloudflare
```bash
wrangler login
```

### Step 3 — Deploy
```bash
npm run deploy
```

---

## 🗂️ Project Structure

```
Wallet/
├── src/
│   └── index.tsx          # 🔵 Hono backend + full HTML/CSS UI
├── public/
│   └── static/
│       ├── app.js         # 🟡 Full client-side engine (2700+ lines)
│       └── styles.css     # 🎨 Additional styles
├── dist/                  # 📦 Build output (auto-generated)
├── wrangler.jsonc         # ☁️  Cloudflare Pages config
├── vite.config.ts         # ⚡  Vite build config
├── tsconfig.json          # 🔷  TypeScript config
├── ecosystem.config.cjs   # 🟢  PM2 process config
├── package.json           # 📋  Dependencies & scripts
└── README.md              # 📖  This file
```

---

## 🖥️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Backend** | [Hono](https://hono.dev/) on Cloudflare Workers |
| **Frontend** | Vanilla JS + [Tailwind CSS](https://tailwindcss.com/) (CDN) |
| **Charts** | [Chart.js](https://www.chartjs.org/) |
| **Icons** | [Font Awesome 6](https://fontawesome.com/) |
| **Build** | [Vite](https://vitejs.dev/) |
| **Deploy** | [Cloudflare Pages](https://pages.cloudflare.com/) |
| **Storage** | Browser `localStorage` (no backend DB needed) |

---

## 📱 App Screens

### 🔐 Onboarding Flow
1. **Welcome Screen** — App intro with feature badges
2. **Personal Details** — Name, Email, Phone, DOB, Avatar
3. **KYC Documents** — PAN Card, Aadhaar, UPI ID
4. **Set PIN** — 6-digit PIN with confirmation
5. **All Set!** — Summary + ₹100 welcome bonus

### 📲 Main App Pages
- **Dashboard** — Portfolio overview, quick actions, recent transactions
- **Portfolio** — Asset breakdown, charts, filter by type
- **Pay** — UPI, Cards, Net Banking, Bill payments
- **Markets** — Live prices, search, buy/sell tokens
- **DeFi** — Positions, Lending, Liquidity, Farming, Staking
- **More** — NFTs, Bridge, Activity, Notifications, Settings, Security

---

## 🔒 Demo / Test Data

When you first open the app, you'll go through the registration flow. Use these test values:

| Field | Example Value |
|-------|--------------|
| Name | `Arjun Kumar` |
| Email | `arjun@example.com` |
| Phone | `9876543210` |
| DOB | `1995-03-14` |
| PAN | `ABCDE1234F` |
| Aadhaar | `1234 5678 9012` |
| PIN | Any 6 digits (e.g. `123456`) |

> **Note:** All data is stored locally in your browser's `localStorage`. No data is sent to any server.

---

## 🌐 API Endpoints

The Hono backend exposes these REST endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/portfolio` | Get portfolio totals |
| `POST` | `/api/send` | Send crypto transaction |
| `POST` | `/api/upi/pay` | Process UPI payment |
| `POST` | `/api/bridge` | Cross-chain bridge |

---

## ⚙️ Configuration

### wrangler.jsonc
```jsonc
{
  "name": "nexwallet",
  "compatibility_date": "2024-09-23",
  "compatibility_flags": ["nodejs_compat"],
  "pages_build_output_dir": "./dist"
}
```

### Environment Variables (optional)
Copy `.env.example` to `.dev.vars` for local secrets:
```bash
cp .env.example .dev.vars
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'feat: Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- [Hono](https://hono.dev/) — Ultra-fast web framework
- [Cloudflare Pages](https://pages.cloudflare.com/) — Free global edge hosting
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [Chart.js](https://www.chartjs.org/) — Beautiful charts
- [Font Awesome](https://fontawesome.com/) — Icon library

---

<div align="center">
  <strong>Built with ❤️ for India's crypto community</strong><br/>
  <sub>⭐ Star this repo if you find it useful!</sub>
</div>

## Wallet Interface (Before & After Opening)

<img width="513" height="1037" alt="Screenshot_2026_0423_210425" src="https://github.com/user-attachments/assets/caf101e8-73cb-41dc-b1ed-8bbc626715bb" />
<img width="513" height="1031" alt="Screenshot_2026_0423_210503" src="https://github.com/user-attachments/assets/e23c4b2f-9b2d-4e25-bb0c-fdbff90875c9" />
