import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()
app.use('*', cors())

// ─── Serve static files ───────────────────────────────────────────────────
app.use('/static/*', serveStatic({ root: './public' }))

// ─── API Routes ─────────────────────────────────────────────────────────────
app.get('/api/portfolio', (c) => {
  return c.json({
    totalValue: 48246500,
    cryptoValue: 38200000,
    fiatValue: 2641500,
    defiValue: 1685000,
    nftValue: 3864000,
    dayChange: 2.34,
    weekChange: 8.12,
    monthChange: 18.45
  })
})

app.post('/api/send', async (c) => {
  const body = await c.req.json()
  return c.json({ success: true, txHash: '0x' + Math.random().toString(16).slice(2, 34), ...body })
})

app.post('/api/upi/pay', async (c) => {
  const body = await c.req.json()
  return c.json({ success: true, upiRefId: 'UPI' + Date.now(), ...body })
})

app.post('/api/bridge', async (c) => {
  const body = await c.req.json()
  return c.json({ success: true, bridgeTxId: 'BR' + Date.now(), estimatedTime: '5-10 min', ...body })
})

// ─── Main HTML ───────────────────────────────────────────────────────────────
app.get('*', (c) => {
  return c.html(HTML)
})

const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"/>
<title>NexWallet — Hybrid Crypto &amp; Fiat Wallet</title>
<meta name="theme-color" content="#6366f1"/>
<meta name="description" content="India's most powerful hybrid crypto and fiat wallet. UPI, Cards, Crypto Trading, DeFi, NFT, Staking, Cross-chain bridge."/>
<script src="https://cdn.tailwindcss.com"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css"/>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
<style>
:root{--bg-primary:#0a0a14;--bg-card:#111120;--bg-card2:#161628;--accent:#6366f1;--accent2:#8b5cf6;--accent3:#06b6d4;--green:#10b981;--red:#ef4444;--text:#e2e8f0;--text-muted:#64748b;--border:rgba(99,102,241,0.15);--glow:rgba(99,102,241,0.3);}
*{box-sizing:border-box;margin:0;padding:0;}
body{background:var(--bg-primary);color:var(--text);font-family:'Inter',system-ui,sans-serif;overflow-x:hidden;min-height:100vh;}
::-webkit-scrollbar{width:4px;height:4px;}
::-webkit-scrollbar-track{background:var(--bg-primary);}
::-webkit-scrollbar-thumb{background:var(--accent);border-radius:2px;}

@keyframes fadeIn{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
@keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.5;}}
@keyframes glow{0%,100%{box-shadow:0 0 20px var(--glow);}50%{box-shadow:0 0 40px var(--glow),0 0 80px rgba(99,102,241,0.1);}}
@keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}}
@keyframes slideIn{from{transform:translateX(100%);opacity:0;}to{transform:translateX(0);opacity:1;}}
@keyframes shimmer{0%{background-position:-200% 0;}100%{background-position:200% 0;}}
@keyframes ticker{from{opacity:0;transform:translateY(100%);}to{opacity:1;transform:translateY(0);}}
@keyframes countUp{from{transform:scale(0.9);opacity:0;}to{transform:scale(1);opacity:1;}}

.fade-in{animation:fadeIn 0.4s ease forwards;}
.animate-pulse{animation:pulse 2s infinite;}
.animate-glow{animation:glow 3s ease-in-out infinite;}
.animate-float{animation:float 4s ease-in-out infinite;}
.animate-count{animation:countUp 0.5s ease forwards;}

.card{background:var(--bg-card);border:1px solid var(--border);border-radius:16px;backdrop-filter:blur(20px);transition:all 0.3s ease;}
.card:hover{border-color:rgba(99,102,241,0.4);transform:translateY(-2px);}
.card-glass{background:rgba(17,17,32,0.8);border:1px solid rgba(255,255,255,0.05);border-radius:20px;backdrop-filter:blur(40px);}
.grad-text{background:linear-gradient(135deg,#6366f1,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.grad-green{background:linear-gradient(135deg,#10b981,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}

.btn-primary{background:linear-gradient(135deg,#6366f1,#8b5cf6);color:white;border:none;border-radius:12px;padding:10px 20px;cursor:pointer;font-weight:600;transition:all 0.3s ease;font-size:14px;}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 25px rgba(99,102,241,0.4);}
.btn-secondary{background:rgba(99,102,241,0.1);color:#8b5cf6;border:1px solid rgba(99,102,241,0.3);border-radius:12px;padding:10px 20px;cursor:pointer;font-weight:600;transition:all 0.3s ease;font-size:14px;}
.btn-secondary:hover{background:rgba(99,102,241,0.2);}
.btn-danger{background:linear-gradient(135deg,#ef4444,#dc2626);color:white;border:none;border-radius:12px;padding:10px 20px;cursor:pointer;font-weight:600;transition:all 0.3s ease;font-size:14px;}
.btn-green{background:linear-gradient(135deg,#10b981,#059669);color:white;border:none;border-radius:12px;padding:10px 20px;cursor:pointer;font-weight:600;transition:all 0.3s ease;font-size:14px;}
.btn-green:hover{transform:translateY(-2px);box-shadow:0 8px 25px rgba(16,185,129,0.4);}

.tab-bar{display:flex;background:var(--bg-card2);border-radius:12px;padding:4px;gap:2px;}
.tab-item{flex:1;text-align:center;padding:8px 12px;border-radius:10px;cursor:pointer;transition:all 0.3s ease;font-size:13px;font-weight:500;color:var(--text-muted);white-space:nowrap;border:none;background:none;}
.tab-item.active{background:linear-gradient(135deg,#6366f1,#8b5cf6);color:white;box-shadow:0 4px 12px rgba(99,102,241,0.3);}
.tab-item:hover:not(.active){color:var(--text);background:rgba(255,255,255,0.05);}

.bottom-nav{position:fixed;bottom:0;left:0;right:0;background:rgba(10,10,20,0.97);border-top:1px solid var(--border);backdrop-filter:blur(20px);z-index:100;padding:8px 0 max(8px,env(safe-area-inset-bottom));display:flex;max-width:480px;margin:0 auto;}
.nav-item{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 4px;cursor:pointer;transition:all 0.3s ease;color:var(--text-muted);border:none;background:none;}
.nav-item.active{color:#6366f1;}
.nav-item.active i{transform:scale(1.2);}
.nav-item:hover{color:var(--text);}
.nav-item i{font-size:18px;transition:all 0.3s;}
.nav-item span{font-size:9px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;}
.nav-center-btn{width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#8b5cf6);display:flex;align-items:center;justify-content:center;box-shadow:0 0 25px rgba(99,102,241,0.5);margin-top:-14px;cursor:pointer;border:none;color:white;transition:all 0.3s ease;}
.nav-center-btn:hover{transform:scale(1.1);box-shadow:0 0 35px rgba(99,102,241,0.7);}

.input-field{background:var(--bg-card2);border:1px solid var(--border);border-radius:12px;padding:12px 16px;color:var(--text);font-size:14px;width:100%;outline:none;transition:all 0.3s;}
.input-field:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(99,102,241,0.15);}
.input-field::placeholder{color:var(--text-muted);}

.badge{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;}
.badge-green{background:rgba(16,185,129,0.15);color:#10b981;}
.badge-red{background:rgba(239,68,68,0.15);color:#ef4444;}
.badge-blue{background:rgba(99,102,241,0.15);color:#6366f1;}
.badge-yellow{background:rgba(245,158,11,0.15);color:#f59e0b;}
.badge-purple{background:rgba(139,92,246,0.15);color:#8b5cf6;}

.shimmer{background:linear-gradient(90deg,var(--bg-card) 25%,var(--bg-card2) 50%,var(--bg-card) 75%);background-size:200% 100%;animation:shimmer 1.5s infinite;border-radius:8px;}

.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.85);backdrop-filter:blur(10px);z-index:200;display:flex;align-items:flex-end;justify-content:center;opacity:0;transition:opacity 0.3s;pointer-events:none;}
.modal-overlay.visible{opacity:1;pointer-events:all;}
.modal-sheet{background:var(--bg-card);border-radius:24px 24px 0 0;width:100%;max-width:480px;max-height:90vh;overflow-y:auto;padding:24px;transform:translateY(100%);transition:transform 0.4s cubic-bezier(0.34,1.56,0.64,1);}
.modal-overlay.visible .modal-sheet{transform:translateY(0);}
.modal-handle{width:40px;height:4px;background:var(--text-muted);border-radius:2px;margin:0 auto 20px;}

.progress-bar{height:4px;background:var(--bg-card2);border-radius:2px;overflow:hidden;}
.progress-fill{height:100%;border-radius:2px;transition:width 1s ease;}

.token-row{display:flex;align-items:center;gap:12px;padding:12px 16px;border-radius:14px;cursor:pointer;transition:all 0.2s;}
.token-row:hover{background:var(--bg-card2);}
.token-icon{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:bold;flex-shrink:0;}

.page{display:none;min-height:100vh;padding-bottom:80px;}
.page.active{display:block;animation:fadeIn 0.3s ease;}
.header{padding:16px 20px 8px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;background:rgba(10,10,20,0.9);backdrop-filter:blur(20px);z-index:50;border-bottom:1px solid var(--border);}

.chip{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:20px;font-size:12px;font-weight:600;background:var(--bg-card2);border:1px solid var(--border);cursor:pointer;transition:all 0.2s;}
.chip.active{background:rgba(99,102,241,0.2);border-color:#6366f1;color:#818cf8;}

.bio-btn{width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,rgba(99,102,241,0.2),rgba(139,92,246,0.2));border:2px solid rgba(99,102,241,0.4);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.3s;}
.bio-btn:hover{background:linear-gradient(135deg,rgba(99,102,241,0.4),rgba(139,92,246,0.4));box-shadow:0 0 30px rgba(99,102,241,0.5);transform:scale(1.05);}

.toast{position:fixed;top:20px;right:20px;z-index:999;background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:12px 20px;box-shadow:0 10px 40px rgba(0,0,0,0.5);animation:slideIn 0.3s ease;max-width:300px;display:flex;align-items:center;gap:10px;}
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;}
.grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;}
.scroll-row{display:flex;gap:12px;overflow-x:auto;padding-bottom:8px;scrollbar-width:none;}
.scroll-row::-webkit-scrollbar{display:none;}
.chain-badge{font-size:9px;padding:2px 6px;border-radius:4px;background:rgba(99,102,241,0.15);color:#818cf8;font-weight:600;}

#lockScreen{position:fixed;inset:0;z-index:500;background:var(--bg-primary);display:flex;flex-direction:column;align-items:center;justify-content:center;}

@media(max-width:380px){.grid-4{grid-template-columns:repeat(3,1fr);}.nav-item span{display:none;}}
</style>
</head>
<body>

<!-- ═══════════ LOCK SCREEN ═══════════ -->
<div id="lockScreen">
  <div style="text-align:center;padding:40px 20px;max-width:360px;width:100%;">
    <div class="animate-float" style="font-size:64px;margin-bottom:24px;">🔐</div>
    <h1 class="grad-text" style="font-size:32px;font-weight:800;margin-bottom:8px;">NexWallet</h1>
    <p style="color:var(--text-muted);font-size:14px;margin-bottom:12px;">Hybrid Crypto &amp; Fiat Wallet</p>
    <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:6px;margin-bottom:32px;">
      <span class="badge badge-green"><i class="fas fa-shield-alt"></i> RBI Compliant</span>
      <span class="badge badge-blue"><i class="fas fa-bolt"></i> Sub-2s Tx</span>
      <span class="badge badge-purple"><i class="fas fa-coins"></i> 100+ Tokens</span>
    </div>

    <div style="display:flex;justify-content:center;margin-bottom:28px;">
      <button class="bio-btn" onclick="unlockBiometric()">
        <i class="fas fa-fingerprint" style="font-size:28px;color:#6366f1;"></i>
      </button>
    </div>
    <p style="color:var(--text-muted);font-size:11px;margin-bottom:14px;letter-spacing:1px;">OR ENTER 6-DIGIT PIN</p>

    <div id="pinDots" style="display:flex;justify-content:center;gap:12px;margin-bottom:24px;">
      <div class="pin-dot" style="width:12px;height:12px;border-radius:50%;border:2px solid #6366f1;transition:background 0.2s;"></div>
      <div class="pin-dot" style="width:12px;height:12px;border-radius:50%;border:2px solid #6366f1;transition:background 0.2s;"></div>
      <div class="pin-dot" style="width:12px;height:12px;border-radius:50%;border:2px solid #6366f1;transition:background 0.2s;"></div>
      <div class="pin-dot" style="width:12px;height:12px;border-radius:50%;border:2px solid #6366f1;transition:background 0.2s;"></div>
      <div class="pin-dot" style="width:12px;height:12px;border-radius:50%;border:2px solid #6366f1;transition:background 0.2s;"></div>
      <div class="pin-dot" style="width:12px;height:12px;border-radius:50%;border:2px solid #6366f1;transition:background 0.2s;"></div>
    </div>

    <div class="grid-3" style="gap:14px;max-width:240px;margin:0 auto;">
      <button onclick="pinInput('1')" class="pin-key">1</button>
      <button onclick="pinInput('2')" class="pin-key">2</button>
      <button onclick="pinInput('3')" class="pin-key">3</button>
      <button onclick="pinInput('4')" class="pin-key">4</button>
      <button onclick="pinInput('5')" class="pin-key">5</button>
      <button onclick="pinInput('6')" class="pin-key">6</button>
      <button onclick="pinInput('7')" class="pin-key">7</button>
      <button onclick="pinInput('8')" class="pin-key">8</button>
      <button onclick="pinInput('9')" class="pin-key">9</button>
      <button onclick="pinInput('*')" class="pin-key" style="opacity:0.3;">✱</button>
      <button onclick="pinInput('0')" class="pin-key">0</button>
      <button onclick="pinInput('<')" class="pin-key">⌫</button>
    </div>

    <p style="color:var(--text-muted);font-size:11px;margin-top:20px;">Demo PIN: any 6 digits</p>

    <div style="margin-top:24px;display:flex;flex-direction:column;gap:6px;align-items:center;">
      <div style="display:flex;align-items:center;gap:6px;font-size:11px;color:var(--text-muted);">
        <i class="fas fa-lock" style="color:#6366f1;"></i> AES-256 End-to-End Encrypted
      </div>
      <div style="display:flex;align-items:center;gap:6px;font-size:11px;color:var(--text-muted);">
        <i class="fas fa-university" style="color:#10b981;"></i> PMLA / KYC / RBI Compliant
      </div>
    </div>
  </div>
</div>

<!-- ═══════════ MAIN APP ═══════════ -->
<div id="app" style="display:none;max-width:480px;margin:0 auto;position:relative;">

  <!-- ── DASHBOARD ── -->
  <div id="page-dashboard" class="page active">
    <div class="header">
      <div style="display:flex;align-items:center;gap:10px;">
        <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#8b5cf6);display:flex;align-items:center;justify-content:center;font-size:16px;">🔐</div>
        <div>
          <div style="font-size:12px;color:var(--text-muted);">Good morning</div>
          <div style="font-size:15px;font-weight:700;">Arjun Kumar</div>
        </div>
      </div>
      <div style="display:flex;gap:10px;align-items:center;">
        <div id="networkStatus" class="badge badge-green"><i class="fas fa-circle" style="font-size:6px;"></i> Online</div>
        <button onclick="showPage('notifications')" style="background:var(--bg-card2);border:1px solid var(--border);border-radius:10px;padding:8px 10px;color:var(--text);cursor:pointer;position:relative;">
          <i class="fas fa-bell"></i>
          <span style="position:absolute;top:4px;right:4px;width:8px;height:8px;background:#ef4444;border-radius:50%;border:1px solid var(--bg-primary);"></span>
        </button>
      </div>
    </div>

    <div style="padding:16px 20px;display:flex;flex-direction:column;gap:16px;">

      <!-- Portfolio Card -->
      <div class="card-glass animate-glow" style="padding:24px;background:linear-gradient(135deg,rgba(99,102,241,0.15),rgba(139,92,246,0.1),rgba(6,182,212,0.05));border:1px solid rgba(99,102,241,0.2);">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:4px;">
          <span style="font-size:12px;color:var(--text-muted);font-weight:500;letter-spacing:1px;">TOTAL PORTFOLIO</span>
          <button onclick="toggleBalanceVisible()" style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:14px;">
            <i id="eyeIcon" class="fas fa-eye"></i>
          </button>
        </div>
        <div id="totalBalance" class="animate-count" style="font-size:36px;font-weight:800;letter-spacing:-1px;margin-bottom:6px;">&#8377;48,24,650</div>
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:16px;">
          <span class="badge badge-green"><i class="fas fa-arrow-up" style="font-size:8px;"></i> +2.34% today</span>
          <span class="badge badge-blue">+8.12% week</span>
          <span class="badge badge-purple">+18.45% month</span>
        </div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;">
          <div style="text-align:center;padding:8px;background:rgba(99,102,241,0.1);border-radius:10px;">
            <div style="font-size:10px;color:var(--text-muted);margin-bottom:2px;">Crypto</div>
            <div style="font-size:13px;font-weight:700;color:#818cf8;">&#8377;38.2L</div>
          </div>
          <div style="text-align:center;padding:8px;background:rgba(16,185,129,0.1);border-radius:10px;">
            <div style="font-size:10px;color:var(--text-muted);margin-bottom:2px;">Fiat</div>
            <div style="font-size:13px;font-weight:700;color:#10b981;">&#8377;2.6L</div>
          </div>
          <div style="text-align:center;padding:8px;background:rgba(245,158,11,0.1);border-radius:10px;">
            <div style="font-size:10px;color:var(--text-muted);margin-bottom:2px;">DeFi</div>
            <div style="font-size:13px;font-weight:700;color:#f59e0b;">&#8377;1.7L</div>
          </div>
          <div style="text-align:center;padding:8px;background:rgba(236,72,153,0.1);border-radius:10px;">
            <div style="font-size:10px;color:var(--text-muted);margin-bottom:2px;">NFTs</div>
            <div style="font-size:13px;font-weight:700;color:#ec4899;">&#8377;38.6L</div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="scroll-row">
        <button class="btn-primary" onclick="openModal('sendModal')" style="flex-shrink:0;white-space:nowrap;" id="qaBtnSend"><i class="fas fa-paper-plane"></i> Send</button>
        <button class="btn-green" onclick="openModal('receiveModal')" style="flex-shrink:0;white-space:nowrap;" id="qaBtnReceive"><i class="fas fa-qrcode"></i> Receive</button>
        <button class="btn-secondary" onclick="openDeposit()" style="flex-shrink:0;white-space:nowrap;background:linear-gradient(135deg,rgba(16,185,129,0.2),rgba(6,182,212,0.1));border-color:rgba(16,185,129,0.4);"><i class="fas fa-arrow-circle-down" style="color:#10b981;"></i> Deposit</button>
        <button class="btn-secondary" onclick="openWithdraw()" style="flex-shrink:0;white-space:nowrap;background:linear-gradient(135deg,rgba(245,158,11,0.2),rgba(249,115,22,0.1));border-color:rgba(245,158,11,0.4);"><i class="fas fa-arrow-circle-up" style="color:#f59e0b;"></i> Withdraw</button>
        <button class="btn-secondary" onclick="showPage('swap')" style="flex-shrink:0;white-space:nowrap;" id="qaBtnSwap"><i class="fas fa-exchange-alt"></i> Swap</button>
        <button class="btn-secondary" onclick="showPage('payments')" style="flex-shrink:0;white-space:nowrap;" id="qaBtnPayments"><i class="fas fa-university"></i> Payments</button>
        <button class="btn-secondary" onclick="showPage('bridge')" style="flex-shrink:0;white-space:nowrap;" id="qaBtnBridge"><i class="fas fa-link"></i> Bridge</button>
        <button class="btn-secondary" onclick="showPage('nft')" style="flex-shrink:0;white-space:nowrap;" id="qaBtnNFTs"><i class="fas fa-image"></i> NFTs</button>
      </div>

      <!-- Chart -->
      <div class="card" style="padding:16px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <span style="font-weight:600;font-size:15px;">Portfolio Performance</span>
          <div style="display:flex;gap:6px;">
            <button onclick="updateChart('1D',this)" class="chip" style="padding:4px 10px;font-size:11px;">1D</button>
            <button onclick="updateChart('1W',this)" class="chip active" style="padding:4px 10px;font-size:11px;">1W</button>
            <button onclick="updateChart('1M',this)" class="chip" style="padding:4px 10px;font-size:11px;">1M</button>
            <button onclick="updateChart('3M',this)" class="chip" style="padding:4px 10px;font-size:11px;">3M</button>
            <button onclick="updateChart('1Y',this)" class="chip" style="padding:4px 10px;font-size:11px;">1Y</button>
          </div>
        </div>
        <div style="position:relative;height:160px;">
          <canvas id="portfolioChart"></canvas>
        </div>
      </div>

      <!-- Top Assets -->
      <div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <span style="font-weight:700;font-size:16px;">Top Assets</span>
          <button onclick="showPage('portfolio')" style="background:none;border:none;color:#6366f1;font-size:13px;cursor:pointer;font-weight:600;">See All</button>
        </div>
        <div id="topAssets" class="card" style="padding:8px;"></div>
      </div>

      <!-- Recent Activity -->
      <div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <span style="font-weight:700;font-size:16px;">Recent Activity</span>
          <button onclick="showPage('activity')" style="background:none;border:none;color:#6366f1;font-size:13px;cursor:pointer;font-weight:600;">See All</button>
        </div>
        <div id="recentTxns" class="card" style="padding:8px;"></div>
      </div>

      <!-- Security -->
      <div class="card" style="padding:16px;background:linear-gradient(135deg,rgba(16,185,129,0.08),rgba(6,182,212,0.04));">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <span style="font-weight:700;font-size:15px;">Security Status</span>
          <span class="badge badge-green"><i class="fas fa-shield-alt"></i> Secure</span>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;justify-content:space-between;align-items:center;font-size:13px;">
            <span><i class="fas fa-fingerprint" style="color:#10b981;margin-right:8px;"></i>Biometric Auth</span>
            <i class="fas fa-check-circle" style="color:#10b981;"></i>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;font-size:13px;">
            <span><i class="fas fa-key" style="color:#10b981;margin-right:8px;"></i>Multi-sig (2/3)</span>
            <i class="fas fa-check-circle" style="color:#10b981;"></i>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;font-size:13px;">
            <span><i class="fas fa-users" style="color:#10b981;margin-right:8px;"></i>Social Recovery</span>
            <i class="fas fa-check-circle" style="color:#10b981;"></i>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;font-size:13px;">
            <span><i class="fas fa-university" style="color:#10b981;margin-right:8px;"></i>RBI Compliant</span>
            <i class="fas fa-check-circle" style="color:#10b981;"></i>
          </div>
        </div>
      </div>

    </div>
  </div>

  <!-- ── PORTFOLIO ── -->
  <div id="page-portfolio" class="page">
    <div class="header">
      <div class="grad-text" style="font-size:20px;font-weight:800;">Portfolio</div>
      <div style="display:flex;gap:6px;">
        <button onclick="openDeposit()" class="btn-green" style="padding:6px 10px;font-size:12px;"><i class="fas fa-arrow-circle-down"></i> Deposit</button>
        <button onclick="openWithdraw()" class="btn-secondary" style="padding:6px 10px;font-size:12px;"><i class="fas fa-arrow-circle-up"></i> Withdraw</button>
        <button onclick="openModal('addTokenModal')" class="btn-primary" style="padding:6px 10px;font-size:12px;"><i class="fas fa-plus"></i></button>
      </div>
    </div>
    <div style="padding:16px 20px;display:flex;flex-direction:column;gap:16px;">
      <div class="card" style="padding:20px;">
        <div style="display:flex;align-items:center;gap:20px;">
          <div style="width:120px;height:120px;flex-shrink:0;">
            <canvas id="donutChart"></canvas>
          </div>
          <div style="flex:1;display:flex;flex-direction:column;gap:6px;">
            <div style="display:flex;align-items:center;gap:8px;font-size:12px;"><div style="width:8px;height:8px;border-radius:50%;background:#6366f1;flex-shrink:0;"></div><span style="flex:1;">Crypto</span><span style="color:var(--text-muted);">79%</span><span style="font-weight:600;">&#8377;38.2L</span></div>
            <div style="display:flex;align-items:center;gap:8px;font-size:12px;"><div style="width:8px;height:8px;border-radius:50%;background:#ec4899;flex-shrink:0;"></div><span style="flex:1;">NFTs</span><span style="color:var(--text-muted);">8%</span><span style="font-weight:600;">&#8377;38.6L</span></div>
            <div style="display:flex;align-items:center;gap:8px;font-size:12px;"><div style="width:8px;height:8px;border-radius:50%;background:#f59e0b;flex-shrink:0;"></div><span style="flex:1;">DeFi</span><span style="color:var(--text-muted);">3.5%</span><span style="font-weight:600;">&#8377;1.7L</span></div>
            <div style="display:flex;align-items:center;gap:8px;font-size:12px;"><div style="width:8px;height:8px;border-radius:50%;background:#10b981;flex-shrink:0;"></div><span style="flex:1;">Fiat</span><span style="color:var(--text-muted);">5.5%</span><span style="font-weight:600;">&#8377;2.6L</span></div>
            <div style="display:flex;align-items:center;gap:8px;font-size:12px;"><div style="width:8px;height:8px;border-radius:50%;background:#8b5cf6;flex-shrink:0;"></div><span style="flex:1;">Staking</span><span style="color:var(--text-muted);">1.7%</span><span style="font-weight:600;">&#8377;0.8L</span></div>
          </div>
        </div>
      </div>
      <div class="tab-bar" style="overflow-x:auto;">
        <button class="tab-item active" onclick="filterPortfolio('All',this)">All</button>
        <button class="tab-item" onclick="filterPortfolio('Crypto',this)">Crypto</button>
        <button class="tab-item" onclick="filterPortfolio('Fiat',this)">Stablecoins</button>
        <button class="tab-item" onclick="filterPortfolio('DeFi',this)">DeFi</button>
      </div>
      <div id="portfolioTokenList" class="card" style="padding:8px;"></div>
    </div>
  </div>

  <!-- ── PAYMENTS ── -->
  <div id="page-payments" class="page">
    <div class="header">
      <div class="grad-text" style="font-size:20px;font-weight:800;">Payments</div>
      <span class="badge badge-green"><i class="fas fa-shield-alt"></i> RBI Compliant</span>
    </div>
    <div style="padding:16px 20px;display:flex;flex-direction:column;gap:16px;">
      <div class="tab-bar">
        <button class="tab-item active" onclick="switchPayTab('UPI',this)">UPI</button>
        <button class="tab-item" onclick="switchPayTab('Cards',this)">Cards</button>
        <button class="tab-item" onclick="switchPayTab('NetBanking',this)">Net Banking</button>
        <button class="tab-item" onclick="switchPayTab('BillPay',this)">Bill Pay</button>
      </div>

      <!-- UPI Tab -->
      <div id="tab-UPI" class="pay-tab">
        <div class="card" style="padding:16px;margin-bottom:12px;">
          <div style="font-size:14px;font-weight:700;margin-bottom:12px;display:flex;align-items:center;gap:8px;">
            <span style="background:linear-gradient(135deg,#10b981,#06b6d4);padding:5px 8px;border-radius:8px;font-size:11px;font-weight:800;color:white;">UPI</span>
            Linked UPI IDs
          </div>
          <div style="display:flex;flex-direction:column;gap:8px;">
            <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border);">
              <div style="display:flex;align-items:center;gap:10px;"><i class="fas fa-at" style="color:#10b981;"></i><span style="font-size:13px;">arjun@okaxis</span></div>
              <span class="badge badge-green">Primary</span>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border);">
              <div style="display:flex;align-items:center;gap:10px;"><i class="fas fa-at" style="color:#10b981;"></i><span style="font-size:13px;">arjun@ybl</span></div>
              <span class="badge badge-green">Active</span>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;">
              <div style="display:flex;align-items:center;gap:10px;"><i class="fas fa-at" style="color:#10b981;"></i><span style="font-size:13px;">arjun@icici</span></div>
              <span class="badge badge-green">Active</span>
            </div>
          </div>
        </div>

        <div class="card" style="padding:16px;margin-bottom:12px;">
          <div style="font-size:14px;font-weight:700;margin-bottom:12px;">Recent Contacts</div>
          <div class="scroll-row">
            <div onclick="fillUPI('priya@ybl')" style="flex-shrink:0;text-align:center;cursor:pointer;"><div style="width:48px;height:48px;border-radius:50%;background:var(--bg-card2);border:2px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:22px;margin:0 auto 4px;">👩</div><div style="font-size:10px;font-weight:600;">Priya S</div><div style="font-size:9px;color:var(--text-muted);">priya@ybl</div></div>
            <div onclick="fillUPI('raj@okicici')" style="flex-shrink:0;text-align:center;cursor:pointer;"><div style="width:48px;height:48px;border-radius:50%;background:var(--bg-card2);border:2px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:22px;margin:0 auto 4px;">👨</div><div style="font-size:10px;font-weight:600;">Raj M</div><div style="font-size:9px;color:var(--text-muted);">raj@okicici</div></div>
            <div onclick="fillUPI('neha@paytm')" style="flex-shrink:0;text-align:center;cursor:pointer;"><div style="width:48px;height:48px;border-radius:50%;background:var(--bg-card2);border:2px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:22px;margin:0 auto 4px;">👩‍💼</div><div style="font-size:10px;font-weight:600;">Neha K</div><div style="font-size:9px;color:var(--text-muted);">neha@paytm</div></div>
            <div onclick="fillUPI('anil@upi')" style="flex-shrink:0;text-align:center;cursor:pointer;"><div style="width:48px;height:48px;border-radius:50%;background:var(--bg-card2);border:2px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:22px;margin:0 auto 4px;">👨‍💼</div><div style="font-size:10px;font-weight:600;">Anil D</div><div style="font-size:9px;color:var(--text-muted);">anil@upi</div></div>
            <div onclick="fillUPI('maya@ybl')" style="flex-shrink:0;text-align:center;cursor:pointer;"><div style="width:48px;height:48px;border-radius:50%;background:var(--bg-card2);border:2px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:22px;margin:0 auto 4px;">👩‍🎓</div><div style="font-size:10px;font-weight:600;">Maya T</div><div style="font-size:9px;color:var(--text-muted);">maya@ybl</div></div>
          </div>
        </div>

        <div class="card" style="padding:16px;margin-bottom:12px;">
          <div style="font-size:14px;font-weight:700;margin-bottom:12px;">New UPI Transfer</div>
          <div style="display:flex;flex-direction:column;gap:10px;">
            <input id="upiId" class="input-field" placeholder="UPI ID (name@bank)" />
            <input id="upiAmount" class="input-field" placeholder="Amount (&#8377;)" type="number" />
            <input id="upiNote" class="input-field" placeholder="Remark (optional)" />
            <div style="display:flex;gap:8px;">
              <button class="btn-green" style="flex:1;" onclick="processUPI()"><i class="fas fa-paper-plane"></i> Pay Now</button>
              <button class="btn-secondary" onclick="openModal('receiveModal')"><i class="fas fa-qrcode"></i> QR</button>
            </div>
          </div>
        </div>

        <div class="card" style="padding:12px;background:rgba(6,182,212,0.05);border-color:rgba(6,182,212,0.2);">
          <div style="font-size:12px;color:var(--text-muted);display:flex;flex-direction:column;gap:6px;">
            <div style="display:flex;justify-content:space-between;"><span><i class="fas fa-info-circle" style="color:#06b6d4;"></i> Daily UPI Limit</span><span style="color:var(--text);font-weight:600;">&#8377;1,00,000</span></div>
            <div style="display:flex;justify-content:space-between;"><span>Used Today</span><span style="color:var(--text);font-weight:600;">&#8377;6,247</span></div>
            <div class="progress-bar" style="margin-top:4px;"><div class="progress-fill" style="width:6.2%;background:linear-gradient(90deg,#10b981,#06b6d4);"></div></div>
          </div>
        </div>
      </div>

      <!-- Cards Tab -->
      <div id="tab-Cards" class="pay-tab" style="display:none;">
        <div style="display:flex;flex-direction:column;gap:12px;">
          <div style="border-radius:18px;padding:20px;background:linear-gradient(135deg,#004C8F,#0066CC);position:relative;overflow:hidden;box-shadow:0 8px 25px rgba(0,0,0,0.4);">
            <div style="position:absolute;top:-20px;right:-20px;width:120px;height:120px;border-radius:50%;background:rgba(255,255,255,0.05);"></div>
            <div style="display:flex;justify-content:space-between;margin-bottom:20px;"><div><div style="font-size:10px;opacity:0.7;">HDFC Bank</div><div style="font-size:12px;font-weight:600;">Debit Card</div></div><div style="font-size:11px;font-weight:800;opacity:0.9;">VISA</div></div>
            <div style="font-size:18px;font-weight:600;letter-spacing:3px;margin-bottom:16px;">4532 •••• •••• 7891</div>
            <div style="display:flex;justify-content:space-between;align-items:center;"><div style="font-size:10px;opacity:0.7;">VALID THRU <span style="font-weight:600;">12/27</span></div><button style="background:rgba(255,255,255,0.2);border:none;border-radius:8px;padding:4px 10px;color:white;font-size:11px;cursor:pointer;" onclick="openCardPay('4532 •••• •••• 7891','ARJUN KUMAR','12/27')">Pay</button></div>
          </div>
          <div style="border-radius:18px;padding:20px;background:linear-gradient(135deg,#22409A,#3350A3);position:relative;overflow:hidden;box-shadow:0 8px 25px rgba(0,0,0,0.4);">
            <div style="display:flex;justify-content:space-between;margin-bottom:20px;"><div><div style="font-size:10px;opacity:0.7;">SBI Card</div><div style="font-size:12px;font-weight:600;">Credit Card</div></div><div style="font-size:11px;font-weight:800;opacity:0.9;">MasterCard</div></div>
            <div style="font-size:18px;font-weight:600;letter-spacing:3px;margin-bottom:16px;">5291 •••• •••• 3421</div>
            <div style="display:flex;justify-content:space-between;align-items:center;"><div style="font-size:10px;opacity:0.7;">VALID THRU <span style="font-weight:600;">08/26</span></div><button style="background:rgba(255,255,255,0.2);border:none;border-radius:8px;padding:4px 10px;color:white;font-size:11px;cursor:pointer;" onclick="openCardPay('5291 •••• •••• 3421','ARJUN KUMAR','08/26')">Pay</button></div>
          </div>
          <div style="border-radius:18px;padding:20px;background:linear-gradient(135deg,#F06B23,#F07B43);position:relative;overflow:hidden;box-shadow:0 8px 25px rgba(0,0,0,0.4);">
            <div style="display:flex;justify-content:space-between;margin-bottom:20px;"><div><div style="font-size:10px;opacity:0.7;">ICICI Bank</div><div style="font-size:12px;font-weight:600;">Credit Card</div></div><div style="font-size:11px;font-weight:800;opacity:0.9;">VISA</div></div>
            <div style="font-size:18px;font-weight:600;letter-spacing:3px;margin-bottom:16px;">4716 •••• •••• 5632</div>
            <div style="display:flex;justify-content:space-between;align-items:center;"><div style="font-size:10px;opacity:0.7;">VALID THRU <span style="font-weight:600;">03/28</span></div><button style="background:rgba(255,255,255,0.2);border:none;border-radius:8px;padding:4px 10px;color:white;font-size:11px;cursor:pointer;" onclick="openCardPay('4716 •••• •••• 5632','ARJUN KUMAR','03/28')">Pay</button></div>
          </div>
          <button class="btn-secondary" style="width:100%;"><i class="fas fa-plus"></i> Add New Card</button>
        </div>
      </div>

      <!-- Net Banking Tab -->
      <div id="tab-NetBanking" class="pay-tab" style="display:none;">
        <div class="card" style="padding:16px;margin-bottom:12px;">
          <div style="font-size:14px;font-weight:700;margin-bottom:12px;">Linked Bank Accounts</div>
          <div id="bankList"></div>
          <button class="btn-secondary" style="width:100%;margin-top:12px;" onclick="openLinkBank()"><i class="fas fa-plus"></i> Link New Account</button>
        </div>
        <div class="card" style="padding:16px;">
          <div style="font-size:14px;font-weight:700;margin-bottom:12px;">NEFT / RTGS Transfer</div>
          <div style="display:flex;flex-direction:column;gap:10px;">
            <div style="font-size:12px;color:var(--text-muted);">Use the Net Banking modal for full NEFT/RTGS/IMPS transfers with beneficiary details.</div>
            <button class="btn-primary" style="width:100%;padding:14px;" onclick="openModal('netBankModal')"><i class="fas fa-exchange-alt"></i> Make Net Banking Transfer</button>
          </div>
        </div>
      </div>

      <!-- Bill Pay Tab -->
      <div id="tab-BillPay" class="pay-tab" style="display:none;">
        <div class="grid-3" style="gap:12px;margin-bottom:12px;">
          <div onclick="openBillModal('Electricity')" class="card" style="padding:14px;text-align:center;cursor:pointer;background:rgba(245,158,11,0.08);border-color:rgba(245,158,11,0.2);"><div style="font-size:24px;color:#f59e0b;margin-bottom:6px;"><i class="fas fa-bolt"></i></div><div style="font-size:12px;font-weight:600;">Electricity</div></div>
          <div onclick="openBillModal('Water')" class="card" style="padding:14px;text-align:center;cursor:pointer;background:rgba(6,182,212,0.08);border-color:rgba(6,182,212,0.2);"><div style="font-size:24px;color:#06b6d4;margin-bottom:6px;"><i class="fas fa-tint"></i></div><div style="font-size:12px;font-weight:600;">Water</div></div>
          <div onclick="openBillModal('Gas')" class="card" style="padding:14px;text-align:center;cursor:pointer;background:rgba(239,68,68,0.08);border-color:rgba(239,68,68,0.2);"><div style="font-size:24px;color:#ef4444;margin-bottom:6px;"><i class="fas fa-gas-pump"></i></div><div style="font-size:12px;font-weight:600;">Gas</div></div>
          <div onclick="openBillModal('Internet')" class="card" style="padding:14px;text-align:center;cursor:pointer;background:rgba(99,102,241,0.08);border-color:rgba(99,102,241,0.2);"><div style="font-size:24px;color:#6366f1;margin-bottom:6px;"><i class="fas fa-wifi"></i></div><div style="font-size:12px;font-weight:600;">Internet</div></div>
          <div onclick="openBillModal('Mobile Recharge')" class="card" style="padding:14px;text-align:center;cursor:pointer;background:rgba(16,185,129,0.08);border-color:rgba(16,185,129,0.2);"><div style="font-size:24px;color:#10b981;margin-bottom:6px;"><i class="fas fa-mobile-alt"></i></div><div style="font-size:12px;font-weight:600;">Mobile</div></div>
          <div onclick="openBillModal('DTH')" class="card" style="padding:14px;text-align:center;cursor:pointer;background:rgba(139,92,246,0.08);border-color:rgba(139,92,246,0.2);"><div style="font-size:24px;color:#8b5cf6;margin-bottom:6px;"><i class="fas fa-tv"></i></div><div style="font-size:12px;font-weight:600;">DTH</div></div>
          <div onclick="openBillModal('Insurance')" class="card" style="padding:14px;text-align:center;cursor:pointer;background:rgba(236,72,153,0.08);border-color:rgba(236,72,153,0.2);"><div style="font-size:24px;color:#ec4899;margin-bottom:6px;"><i class="fas fa-shield-alt"></i></div><div style="font-size:12px;font-weight:600;">Insurance</div></div>
          <div onclick="openBillModal('Credit Card')" class="card" style="padding:14px;text-align:center;cursor:pointer;background:rgba(249,115,22,0.08);border-color:rgba(249,115,22,0.2);"><div style="font-size:24px;color:#f97316;margin-bottom:6px;"><i class="fas fa-credit-card"></i></div><div style="font-size:12px;font-weight:600;">Credit Card</div></div>
          <div onclick="openBillModal('Rent')" class="card" style="padding:14px;text-align:center;cursor:pointer;background:rgba(132,204,22,0.08);border-color:rgba(132,204,22,0.2);"><div style="font-size:24px;color:#84cc16;margin-bottom:6px;"><i class="fas fa-home"></i></div><div style="font-size:12px;font-weight:600;">Rent</div></div>
        </div>
        <div class="card" style="padding:16px;">
          <div style="font-size:14px;font-weight:700;margin-bottom:12px;">Upcoming Bills</div>
          <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border);">
            <div style="display:flex;align-items:center;gap:10px;"><div style="width:36px;height:36px;border-radius:10px;background:rgba(245,158,11,0.15);display:flex;align-items:center;justify-content:center;"><i class="fas fa-bolt" style="color:#f59e0b;"></i></div><div><div style="font-size:13px;font-weight:600;">BSES Electricity</div><div style="font-size:11px;color:#ef4444;">Due in 3 days</div></div></div>
            <div style="text-align:right;"><div style="font-size:13px;font-weight:700;">&#8377;1,247</div><button class="btn-primary" style="padding:4px 10px;font-size:10px;margin-top:2px;" onclick="openBillModal('Electricity')">Pay Now</button></div>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border);">
            <div style="display:flex;align-items:center;gap:10px;"><div style="width:36px;height:36px;border-radius:10px;background:rgba(99,102,241,0.15);display:flex;align-items:center;justify-content:center;"><i class="fas fa-wifi" style="color:#6366f1;"></i></div><div><div style="font-size:13px;font-weight:600;">Airtel Broadband</div><div style="font-size:11px;color:var(--text-muted);">Due in 8 days</div></div></div>
            <div style="text-align:right;"><div style="font-size:13px;font-weight:700;">&#8377;899</div><button class="btn-primary" style="padding:4px 10px;font-size:10px;margin-top:2px;" onclick="openBillModal('Internet')">Pay Now</button></div>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;">
            <div style="display:flex;align-items:center;gap:10px;"><div style="width:36px;height:36px;border-radius:10px;background:rgba(0,76,143,0.15);display:flex;align-items:center;justify-content:center;"><i class="fas fa-credit-card" style="color:#004C8F;"></i></div><div><div style="font-size:13px;font-weight:600;">HDFC Credit Card</div><div style="font-size:11px;color:var(--text-muted);">Due in 15 days</div></div></div>
            <div style="text-align:right;"><div style="font-size:13px;font-weight:700;">&#8377;12,450</div><button class="btn-primary" style="padding:4px 10px;font-size:10px;margin-top:2px;" onclick="openBillModal('Credit Card')">Pay Now</button></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ── MARKETS ── -->
  <div id="page-crypto" class="page">
    <div class="header">
      <div class="grad-text" style="font-size:20px;font-weight:800;">Markets</div>
      <div style="display:flex;gap:6px;">
        <button class="chip active" onclick="filterMarket('all',this)">All</button>
        <button class="chip" onclick="filterMarket('top',this)">Top 10</button>
        <button class="chip" onclick="filterMarket('gainers',this)">🔥 Gainers</button>
      </div>
    </div>
    <div style="padding:16px 20px;display:flex;flex-direction:column;gap:16px;">
      <div class="grid-3" style="gap:10px;">
        <div class="card" style="padding:12px;text-align:center;"><div style="font-size:10px;color:var(--text-muted);margin-bottom:4px;">Market Cap</div><div style="font-size:14px;font-weight:700;color:#818cf8;">$2.1T</div></div>
        <div class="card" style="padding:12px;text-align:center;"><div style="font-size:10px;color:var(--text-muted);margin-bottom:4px;">24h Volume</div><div style="font-size:14px;font-weight:700;color:#10b981;">$84B</div></div>
        <div class="card" style="padding:12px;text-align:center;"><div style="font-size:10px;color:var(--text-muted);margin-bottom:4px;">BTC Dom.</div><div style="font-size:14px;font-weight:700;color:#f7931a;">52.4%</div></div>
      </div>
      <div style="position:relative;">
        <i class="fas fa-search" style="position:absolute;left:14px;top:50%;transform:translateY(-50%);color:var(--text-muted);font-size:14px;pointer-events:none;"></i>
        <input class="input-field" placeholder="Search 100+ tokens..." style="padding-left:40px;" oninput="searchTokens(this.value)" />
      </div>
      <div id="marketTokenList" class="card" style="padding:8px;"></div>
    </div>
  </div>

  <!-- ── SWAP ── -->
  <div id="page-swap" class="page">
    <div class="header">
      <div class="grad-text" style="font-size:20px;font-weight:800;">Swap &amp; Convert</div>
      <span class="badge badge-blue"><i class="fas fa-bolt"></i> Sub-2s</span>
    </div>
    <div style="padding:16px 20px;display:flex;flex-direction:column;gap:16px;">
      <div class="card" style="padding:20px;">
        <div style="font-size:14px;font-weight:600;margin-bottom:16px;">Instant Token Swap</div>
        <div style="display:flex;flex-direction:column;gap:12px;">
          <div style="background:var(--bg-card2);border-radius:14px;padding:16px;">
            <div style="font-size:11px;color:var(--text-muted);margin-bottom:8px;letter-spacing:0.5px;">FROM</div>
            <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;">
              <select id="fromToken" onchange="updateSwapRate()" class="input-field" style="width:auto;flex-shrink:0;">
                <option value="BTC">&#8383; BTC</option>
                <option value="ETH">&#926; ETH</option>
                <option value="USDT">&#8366; USDT</option>
                <option value="SOL">S SOL</option>
                <option value="BNB">B BNB</option>
                <option value="MATIC">P MATIC</option>
                <option value="INR">&#8377; INR</option>
              </select>
              <input id="fromAmount" type="number" class="input-field" placeholder="0.00" style="text-align:right;font-size:20px;font-weight:700;" oninput="updateSwapRate()" />
            </div>
            <div style="font-size:11px;color:var(--text-muted);margin-top:6px;">Balance: 0.0421 BTC &#8776; &#8377;28,800</div>
          </div>

          <div style="display:flex;justify-content:center;">
            <button onclick="swapTokens()" style="background:var(--bg-card2);border:1px solid var(--border);border-radius:50%;width:40px;height:40px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#6366f1;font-size:18px;transition:transform 0.3s;" onmouseenter="this.style.transform='rotate(180deg)'" onmouseleave="this.style.transform='rotate(0deg)'">&#8645;</button>
          </div>

          <div style="background:var(--bg-card2);border-radius:14px;padding:16px;">
            <div style="font-size:11px;color:var(--text-muted);margin-bottom:8px;letter-spacing:0.5px;">TO</div>
            <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;">
              <select id="toToken" onchange="updateSwapRate()" class="input-field" style="width:auto;flex-shrink:0;">
                <option value="ETH">&#926; ETH</option>
                <option value="BTC">&#8383; BTC</option>
                <option value="USDT">&#8366; USDT</option>
                <option value="SOL">S SOL</option>
                <option value="INR">&#8377; INR</option>
                <option value="USDC">$ USDC</option>
              </select>
              <div id="toAmount" style="font-size:20px;font-weight:700;color:#10b981;">&#8776; 0.00</div>
            </div>
            <div style="font-size:11px;color:var(--text-muted);margin-top:6px;" id="swapRate">Select tokens above</div>
          </div>
        </div>

        <div style="margin:12px 0;padding:12px;background:rgba(99,102,241,0.05);border-radius:10px;display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;font-size:12px;"><span style="color:var(--text-muted);">Exchange Rate</span><span id="exchangeRateText">—</span></div>
          <div style="display:flex;justify-content:space-between;font-size:12px;"><span style="color:var(--text-muted);">Network Fee</span><span>~&#8377;12 (0.003%)</span></div>
          <div style="display:flex;justify-content:space-between;font-size:12px;"><span style="color:var(--text-muted);">Slippage</span><span>0.5%</span></div>
          <div style="display:flex;justify-content:space-between;font-size:12px;"><span style="color:var(--text-muted);">Est. Time</span><span class="badge badge-green" style="font-size:10px;">&lt;2 seconds</span></div>
        </div>
        <button class="btn-primary" style="width:100%;padding:14px;" onclick="executeSwap()"><i class="fas fa-exchange-alt"></i> Swap Now</button>
      </div>

      <div class="card" style="padding:16px;">
        <div style="font-size:14px;font-weight:700;margin-bottom:12px;">Crypto &#8596; INR Instant Convert</div>
        <div style="display:flex;gap:6px;margin-bottom:12px;">
          <button class="tab-item active" onclick="switchConvertTab('Buy',this)" style="flex:1;">Buy Crypto</button>
          <button class="tab-item" onclick="switchConvertTab('Sell',this)" style="flex:1;">Sell Crypto</button>
          <button class="tab-item" onclick="switchConvertTab('Convert',this)" style="flex:1;">Convert</button>
        </div>
        <div style="display:flex;flex-direction:column;gap:10px;">
          <input class="input-field" placeholder="Amount in &#8377;" type="number" id="fiatAmount" oninput="calcFiatCrypto()" />
          <div style="text-align:center;color:var(--text-muted);">&#8595; You will get &#8595;</div>
          <div style="background:var(--bg-card2);border-radius:12px;padding:12px;text-align:center;font-size:20px;font-weight:700;color:#10b981;" id="cryptoOutput">&#8776; 0.00000000 BTC</div>
          <button class="btn-green" style="width:100%;" onclick="showToast('Instant convert initiated! ⚡','success')"><i class="fas fa-bolt"></i> Instant Convert</button>
        </div>
      </div>

      <div class="card" style="padding:16px;">
        <div style="font-size:14px;font-weight:700;margin-bottom:12px;display:flex;align-items:center;gap:8px;">
          <i class="fas fa-robot" style="color:#8b5cf6;"></i> DEX Aggregator — Best Rate
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;justify-content:space-between;align-items:center;padding:10px;background:var(--bg-card2);border-radius:10px;border:1px solid #10b981;">
            <div><div style="font-size:13px;font-weight:600;">Uniswap V3 <span class="badge badge-green" style="font-size:10px;">Best</span></div><div style="font-size:11px;color:var(--text-muted);">1 ETH = 15.23 SOL</div></div>
            <div style="font-size:12px;color:var(--text-muted);">Fee: 0.05%</div>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;padding:10px;background:var(--bg-card2);border-radius:10px;border:1px solid var(--border);">
            <div><div style="font-size:13px;font-weight:600;">1inch</div><div style="font-size:11px;color:var(--text-muted);">1 ETH = 15.18 SOL</div></div>
            <div style="font-size:12px;color:var(--text-muted);">Fee: 0.1%</div>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;padding:10px;background:var(--bg-card2);border-radius:10px;border:1px solid var(--border);">
            <div><div style="font-size:13px;font-weight:600;">Curve Finance</div><div style="font-size:11px;color:var(--text-muted);">1 ETH = 15.21 SOL</div></div>
            <div style="font-size:12px;color:var(--text-muted);">Fee: 0.04%</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ── DEFI ── -->
  <div id="page-defi" class="page">
    <div class="header">
      <div class="grad-text" style="font-size:20px;font-weight:800;">DeFi Hub</div>
      <span class="badge badge-purple"><i class="fas fa-layer-group"></i> Multi-Chain</span>
    </div>
    <div style="padding:16px 20px;display:flex;flex-direction:column;gap:16px;">
      <div class="grid-2">
        <div class="card" style="padding:14px;background:rgba(245,158,11,0.08);">
          <div style="font-size:11px;color:var(--text-muted);">Total Deposited</div>
          <div style="font-size:20px;font-weight:800;color:#f59e0b;">&#8377;1,68,500</div>
          <div style="font-size:11px;color:#10b981;margin-top:2px;"><i class="fas fa-arrow-up"></i> +&#8377;3,240 today</div>
        </div>
        <div class="card" style="padding:14px;background:rgba(16,185,129,0.08);">
          <div style="font-size:11px;color:var(--text-muted);">Yield Earned</div>
          <div style="font-size:20px;font-weight:800;color:#10b981;">&#8377;12,840</div>
          <div style="font-size:11px;color:#10b981;margin-top:2px;"><i class="fas fa-arrow-up"></i> +&#8377;428 today</div>
        </div>
      </div>

      <div class="tab-bar" style="overflow-x:auto;">
        <button class="tab-item active" onclick="switchDefiTab('Positions',this)">Positions</button>
        <button class="tab-item" onclick="switchDefiTab('Lending',this)">Lending</button>
        <button class="tab-item" onclick="switchDefiTab('Liquidity',this)">Liquidity</button>
        <button class="tab-item" onclick="switchDefiTab('Farming',this)">Farming</button>
      </div>

      <!-- DeFi Positions — dynamically rendered by JS -->
      <div id="defiPositionsList"></div>

      <!-- Staking section — dynamically rendered by JS -->
      <div id="stakingSection">
        <div style="font-size:16px;font-weight:700;margin-bottom:8px;">Staking Positions</div>
        <div id="stakingPositionsList"></div>
      </div>
    </div>
  </div>

  <!-- ── NFT ── -->
  <div id="page-nft" class="page">
    <div class="header">
      <div class="grad-text" style="font-size:20px;font-weight:800;">NFT Gallery</div>
      <button onclick="openModal('buyNFTModal')" class="btn-primary" style="padding:8px 14px;font-size:13px;"><i class="fas fa-shopping-bag"></i> Marketplace</button>
    </div>
    <div style="padding:16px 20px;display:flex;flex-direction:column;gap:16px;">
      <div class="grid-3" style="gap:10px;">
        <div class="card" style="padding:12px;text-align:center;"><div style="font-size:10px;color:var(--text-muted);">Total NFTs</div><div style="font-size:20px;font-weight:800;color:#ec4899;">4</div></div>
        <div class="card" style="padding:12px;text-align:center;"><div style="font-size:10px;color:var(--text-muted);">Est. Value</div><div style="font-size:14px;font-weight:800;color:#8b5cf6;">&#8377;38.6L</div></div>
        <div class="card" style="padding:12px;text-align:center;"><div style="font-size:10px;color:var(--text-muted);">24h Change</div><div style="font-size:14px;font-weight:800;color:#10b981;">+4.2%</div></div>
      </div>
      <div class="grid-2" style="gap:14px;">
        <div class="card" style="padding:0;overflow:hidden;cursor:pointer;" onclick="openModal('nftDetailModal')">
          <div style="height:160px;background:linear-gradient(135deg,rgba(245,158,11,0.2),rgba(245,158,11,0.05));display:flex;align-items:center;justify-content:center;font-size:70px;position:relative;">👾<span class="badge" style="position:absolute;top:8px;right:8px;background:rgba(245,158,11,0.2);color:#f59e0b;border:1px solid rgba(245,158,11,0.4);font-size:9px;">Legendary</span></div>
          <div style="padding:12px;"><div style="font-size:13px;font-weight:700;margin-bottom:2px;">CryptoPunk #3421</div><div style="font-size:10px;color:var(--text-muted);margin-bottom:8px;">CryptoPunks</div><div style="display:flex;justify-content:space-between;"><span style="font-size:12px;color:#8b5cf6;font-weight:600;">85 ETH</span><span style="font-size:11px;color:var(--text-muted);">&#8377;22.8L</span></div><div style="display:flex;gap:6px;margin-top:8px;"><button class="btn-primary" style="flex:1;padding:6px;font-size:11px;" onclick="event.stopPropagation();listNFT('CryptoPunk #3421')">List</button><button class="btn-secondary" style="flex:1;padding:6px;font-size:11px;" onclick="event.stopPropagation();transferNFT('CryptoPunk #3421')">Transfer</button></div></div>
        </div>
        <div class="card" style="padding:0;overflow:hidden;cursor:pointer;" onclick="openModal('nftDetailModal')">
          <div style="height:160px;background:linear-gradient(135deg,rgba(139,92,246,0.2),rgba(139,92,246,0.05));display:flex;align-items:center;justify-content:center;font-size:70px;position:relative;">🦍<span class="badge" style="position:absolute;top:8px;right:8px;background:rgba(139,92,246,0.2);color:#8b5cf6;border:1px solid rgba(139,92,246,0.4);font-size:9px;">Epic</span></div>
          <div style="padding:12px;"><div style="font-size:13px;font-weight:700;margin-bottom:2px;">Bored Ape #7823</div><div style="font-size:10px;color:var(--text-muted);margin-bottom:8px;">BAYC</div><div style="display:flex;justify-content:space-between;"><span style="font-size:12px;color:#8b5cf6;font-weight:600;">42 ETH</span><span style="font-size:11px;color:var(--text-muted);">&#8377;11.3L</span></div><div style="display:flex;gap:6px;margin-top:8px;"><button class="btn-primary" style="flex:1;padding:6px;font-size:11px;" onclick="event.stopPropagation();listNFT('Bored Ape #7823')">List</button><button class="btn-secondary" style="flex:1;padding:6px;font-size:11px;" onclick="event.stopPropagation();transferNFT('Bored Ape #7823')">Transfer</button></div></div>
        </div>
        <div class="card" style="padding:0;overflow:hidden;cursor:pointer;" onclick="openModal('nftDetailModal')">
          <div style="height:160px;background:linear-gradient(135deg,rgba(6,182,212,0.2),rgba(6,182,212,0.05));display:flex;align-items:center;justify-content:center;font-size:70px;position:relative;">🌸<span class="badge" style="position:absolute;top:8px;right:8px;background:rgba(6,182,212,0.2);color:#06b6d4;border:1px solid rgba(6,182,212,0.4);font-size:9px;">Rare</span></div>
          <div style="padding:12px;"><div style="font-size:13px;font-weight:700;margin-bottom:2px;">Azuki #1204</div><div style="font-size:10px;color:var(--text-muted);margin-bottom:8px;">Azuki</div><div style="display:flex;justify-content:space-between;"><span style="font-size:12px;color:#8b5cf6;font-weight:600;">12 ETH</span><span style="font-size:11px;color:var(--text-muted);">&#8377;3.2L</span></div><div style="display:flex;gap:6px;margin-top:8px;"><button class="btn-primary" style="flex:1;padding:6px;font-size:11px;" onclick="event.stopPropagation();listNFT('Azuki #1204')">List</button><button class="btn-secondary" style="flex:1;padding:6px;font-size:11px;" onclick="event.stopPropagation();transferNFT('Azuki #1204')">Transfer</button></div></div>
        </div>
        <div class="card" style="padding:0;overflow:hidden;cursor:pointer;" onclick="openModal('nftDetailModal')">
          <div style="height:160px;background:linear-gradient(135deg,rgba(100,116,139,0.2),rgba(100,116,139,0.05));display:flex;align-items:center;justify-content:center;font-size:70px;">🎨</div>
          <div style="padding:12px;"><div style="font-size:13px;font-weight:700;margin-bottom:2px;">Doodle #5621</div><div style="font-size:10px;color:var(--text-muted);margin-bottom:8px;">Doodles</div><div style="display:flex;justify-content:space-between;"><span style="font-size:12px;color:#8b5cf6;font-weight:600;">5 ETH</span><span style="font-size:11px;color:var(--text-muted);">&#8377;1.3L</span></div><div style="display:flex;gap:6px;margin-top:8px;"><button class="btn-primary" style="flex:1;padding:6px;font-size:11px;" onclick="event.stopPropagation();listNFT('Doodle #5621')">List</button><button class="btn-secondary" style="flex:1;padding:6px;font-size:11px;" onclick="event.stopPropagation();transferNFT('Doodle #5621')">Transfer</button></div></div>
        </div>
      </div>
    </div>
  </div>

  <!-- ── BRIDGE ── -->
  <div id="page-bridge" class="page">
    <div class="header">
      <div class="grad-text" style="font-size:20px;font-weight:800;">Cross-Chain Bridge</div>
      <span class="badge badge-purple"><i class="fas fa-link"></i> 8 Chains</span>
    </div>
    <div style="padding:16px 20px;display:flex;flex-direction:column;gap:16px;">
      <div>
        <div style="font-size:14px;font-weight:600;margin-bottom:10px;">Supported Networks</div>
        <div class="scroll-row">
          <div onclick="selectBridgeNetwork('Ethereum',this)" style="flex-shrink:0;text-align:center;cursor:pointer;"><div style="width:52px;height:52px;border-radius:50%;background:#627EEA22;border:2px solid #627EEA44;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#627EEA;margin:0 auto 4px;transition:all 0.2s;">&#926;</div><div style="font-size:10px;font-weight:600;color:var(--text-muted);">Ethereum</div></div>
          <div onclick="selectBridgeNetwork('BSC',this)" style="flex-shrink:0;text-align:center;cursor:pointer;"><div style="width:52px;height:52px;border-radius:50%;background:#F3BA2F22;border:2px solid #F3BA2F44;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#F3BA2F;margin:0 auto 4px;">B</div><div style="font-size:10px;font-weight:600;color:var(--text-muted);">BSC</div></div>
          <div onclick="selectBridgeNetwork('Polygon',this)" style="flex-shrink:0;text-align:center;cursor:pointer;"><div style="width:52px;height:52px;border-radius:50%;background:#8247E522;border:2px solid #8247E544;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#8247E5;margin:0 auto 4px;">P</div><div style="font-size:10px;font-weight:600;color:var(--text-muted);">Polygon</div></div>
          <div onclick="selectBridgeNetwork('Solana',this)" style="flex-shrink:0;text-align:center;cursor:pointer;"><div style="width:52px;height:52px;border-radius:50%;background:#9945FF22;border:2px solid #9945FF44;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#9945FF;margin:0 auto 4px;">S</div><div style="font-size:10px;font-weight:600;color:var(--text-muted);">Solana</div></div>
          <div onclick="selectBridgeNetwork('Avalanche',this)" style="flex-shrink:0;text-align:center;cursor:pointer;"><div style="width:52px;height:52px;border-radius:50%;background:#E8414222;border:2px solid #E8414244;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#E84142;margin:0 auto 4px;">A</div><div style="font-size:10px;font-weight:600;color:var(--text-muted);">Avalanche</div></div>
          <div onclick="selectBridgeNetwork('Arbitrum',this)" style="flex-shrink:0;text-align:center;cursor:pointer;"><div style="width:52px;height:52px;border-radius:50%;background:#28A0F022;border:2px solid #28A0F044;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#28A0F0;margin:0 auto 4px;">&#9670;</div><div style="font-size:10px;font-weight:600;color:var(--text-muted);">Arbitrum</div></div>
          <div onclick="selectBridgeNetwork('Optimism',this)" style="flex-shrink:0;text-align:center;cursor:pointer;"><div style="width:52px;height:52px;border-radius:50%;background:#FF042022;border:2px solid #FF042044;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#FF0420;margin:0 auto 4px;">&#9889;</div><div style="font-size:10px;font-weight:600;color:var(--text-muted);">Optimism</div></div>
        </div>
      </div>

      <div class="card" style="padding:20px;">
        <div style="display:flex;gap:10px;margin-bottom:16px;">
          <div style="flex:1;"><div style="font-size:11px;color:var(--text-muted);margin-bottom:6px;">FROM CHAIN</div><select id="fromChain" class="input-field" style="font-weight:600;"><option>Ethereum</option><option>BSC</option><option>Polygon</option><option>Solana</option><option>Avalanche</option></select></div>
          <button style="align-self:flex-end;background:var(--bg-card2);border:1px solid var(--border);border-radius:50%;width:40px;height:40px;color:#6366f1;cursor:pointer;font-size:16px;" onclick="swapBridgeChains()">&#8644;</button>
          <div style="flex:1;"><div style="font-size:11px;color:var(--text-muted);margin-bottom:6px;">TO CHAIN</div><select id="toChain" class="input-field" style="font-weight:600;"><option>BSC</option><option>Ethereum</option><option>Polygon</option><option>Solana</option><option>Avalanche</option></select></div>
        </div>
        <div style="display:flex;flex-direction:column;gap:10px;">
          <div><div style="font-size:11px;color:var(--text-muted);margin-bottom:6px;">TOKEN</div><select id="bridgeToken" class="input-field"><option>ETH</option><option>USDT</option><option>USDC</option><option>BNB</option><option>MATIC</option></select></div>
          <div><div style="font-size:11px;color:var(--text-muted);margin-bottom:6px;">AMOUNT</div><input class="input-field" placeholder="0.00" type="number" id="bridgeAmount" /></div>
        </div>
        <div style="margin:12px 0;padding:12px;background:rgba(99,102,241,0.05);border-radius:10px;display:flex;flex-direction:column;gap:6px;">
          <div style="display:flex;justify-content:space-between;font-size:12px;"><span style="color:var(--text-muted);">Bridge Fee</span><span>0.1%</span></div>
          <div style="display:flex;justify-content:space-between;font-size:12px;"><span style="color:var(--text-muted);">Est. Time</span><span class="badge badge-blue" style="font-size:10px;">5-10 min</span></div>
          <div style="display:flex;justify-content:space-between;font-size:12px;"><span style="color:var(--text-muted);">Protocol</span><span>LayerZero + Wormhole</span></div>
          <div style="display:flex;justify-content:space-between;font-size:12px;"><span style="color:var(--text-muted);">Security</span><span class="badge badge-green" style="font-size:10px;">Multi-sig Verified</span></div>
        </div>
        <button class="btn-primary" style="width:100%;padding:14px;" onclick="executeBridge()"><i class="fas fa-link"></i> Bridge Assets</button>
      </div>

      <div class="card" style="padding:16px;">
        <div style="font-size:14px;font-weight:700;margin-bottom:12px;">Recent Bridges</div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border);"><div><div style="font-size:13px;font-weight:600;">ETH &#8594; BSC</div><div style="font-size:11px;color:var(--text-muted);">500 USDT &#183; 2h ago</div></div><span class="badge badge-green">Completed</span></div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border);"><div><div style="font-size:13px;font-weight:600;">Polygon &#8594; ETH</div><div style="font-size:11px;color:var(--text-muted);">1000 MATIC &#183; 5h ago</div></div><span class="badge badge-yellow">Pending</span></div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;"><div><div style="font-size:13px;font-weight:600;">BSC &#8594; Solana</div><div style="font-size:11px;color:var(--text-muted);">250 USDC &#183; 1d ago</div></div><span class="badge badge-green">Completed</span></div>
      </div>
    </div>
  </div>

  <!-- ── SECURITY ── -->
  <div id="page-security" class="page">
    <div class="header">
      <div class="grad-text" style="font-size:20px;font-weight:800;">Security Center</div>
      <span class="badge badge-green"><i class="fas fa-shield-alt"></i> Protected</span>
    </div>
    <div style="padding:16px 20px;display:flex;flex-direction:column;gap:16px;">
      <div class="card" style="padding:20px;text-align:center;background:linear-gradient(135deg,rgba(16,185,129,0.1),rgba(6,182,212,0.05));">
        <div style="font-size:12px;color:var(--text-muted);margin-bottom:8px;letter-spacing:1px;">SECURITY SCORE</div>
        <div style="font-size:64px;font-weight:900;color:#10b981;">96</div>
        <div style="font-size:13px;color:var(--text-muted);margin-bottom:16px;">Excellent Protection</div>
        <div class="progress-bar" style="height:8px;max-width:200px;margin:0 auto;"><div class="progress-fill" style="width:96%;background:linear-gradient(90deg,#10b981,#06b6d4);"></div></div>
      </div>

      <div class="card" style="padding:16px;">
        <div style="font-size:15px;font-weight:700;margin-bottom:12px;display:flex;align-items:center;gap:8px;"><i class="fas fa-key" style="color:#f59e0b;"></i> Multi-Signature (2/3)</div>
        <div style="display:flex;flex-direction:column;gap:10px;">
          <div style="display:flex;justify-content:space-between;align-items:center;padding:12px;background:var(--bg-card2);border-radius:12px;"><div style="display:flex;align-items:center;gap:10px;"><div style="width:36px;height:36px;border-radius:10px;background:rgba(245,158,11,0.15);display:flex;align-items:center;justify-content:center;"><i class="fas fa-mobile-alt" style="color:#f59e0b;"></i></div><div><div style="font-size:13px;font-weight:600;">Key 1: Primary Device</div><div style="font-size:11px;color:var(--text-muted);">iPhone 15 Pro</div></div></div><span class="badge badge-green">Active</span></div>
          <div style="display:flex;justify-content:space-between;align-items:center;padding:12px;background:var(--bg-card2);border-radius:12px;"><div style="display:flex;align-items:center;gap:10px;"><div style="width:36px;height:36px;border-radius:10px;background:rgba(245,158,11,0.15);display:flex;align-items:center;justify-content:center;"><i class="fas fa-usb" style="color:#f59e0b;"></i></div><div><div style="font-size:13px;font-weight:600;">Key 2: Hardware Key</div><div style="font-size:11px;color:var(--text-muted);">Ledger Nano X</div></div></div><span class="badge badge-green">Active</span></div>
          <div style="display:flex;justify-content:space-between;align-items:center;padding:12px;background:var(--bg-card2);border-radius:12px;"><div style="display:flex;align-items:center;gap:10px;"><div style="width:36px;height:36px;border-radius:10px;background:rgba(245,158,11,0.15);display:flex;align-items:center;justify-content:center;"><i class="fas fa-cloud" style="color:#f59e0b;"></i></div><div><div style="font-size:13px;font-weight:600;">Key 3: Recovery Key</div><div style="font-size:11px;color:var(--text-muted);">Encrypted Backup</div></div></div><span class="badge badge-green">Active</span></div>
          <div style="font-size:12px;color:var(--text-muted);text-align:center;padding:8px;">Requires 2/3 signatures for tx above &#8377;50,000</div>
        </div>
      </div>

      <div class="card" style="padding:16px;">
        <div style="font-size:15px;font-weight:700;margin-bottom:12px;display:flex;align-items:center;gap:8px;"><i class="fas fa-users" style="color:#8b5cf6;"></i> Social Recovery Guardians</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;justify-content:space-between;align-items:center;padding:10px;background:var(--bg-card2);border-radius:10px;"><div style="display:flex;align-items:center;gap:10px;"><div style="width:36px;height:36px;border-radius:50%;background:rgba(139,92,246,0.2);display:flex;align-items:center;justify-content:center;font-size:18px;">👩</div><div><div style="font-size:13px;font-weight:600;">Priya Kumar</div><div style="font-size:11px;color:var(--text-muted);">Sister</div></div></div><span class="badge badge-purple">Guardian</span></div>
          <div style="display:flex;justify-content:space-between;align-items:center;padding:10px;background:var(--bg-card2);border-radius:10px;"><div style="display:flex;align-items:center;gap:10px;"><div style="width:36px;height:36px;border-radius:50%;background:rgba(139,92,246,0.2);display:flex;align-items:center;justify-content:center;font-size:18px;">👨</div><div><div style="font-size:13px;font-weight:600;">Raj Sharma</div><div style="font-size:11px;color:var(--text-muted);">Friend</div></div></div><span class="badge badge-purple">Guardian</span></div>
          <div style="display:flex;justify-content:space-between;align-items:center;padding:10px;background:var(--bg-card2);border-radius:10px;"><div style="display:flex;align-items:center;gap:10px;"><div style="width:36px;height:36px;border-radius:50%;background:rgba(139,92,246,0.2);display:flex;align-items:center;justify-content:center;font-size:18px;">👩‍💼</div><div><div style="font-size:13px;font-weight:600;">Neha Gupta</div><div style="font-size:11px;color:var(--text-muted);">Colleague</div></div></div><span class="badge badge-purple">Guardian</span></div>
          <button class="btn-secondary" style="width:100%;" onclick="showToast('Guardian invitation sent ✓','success')"><i class="fas fa-plus"></i> Add Guardian</button>
        </div>
      </div>

      <div class="card" style="padding:16px;background:rgba(99,102,241,0.05);">
        <div style="font-size:15px;font-weight:700;margin-bottom:12px;display:flex;align-items:center;gap:8px;"><i class="fas fa-university" style="color:#6366f1;"></i> RBI &amp; Regulatory Compliance</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;justify-content:space-between;font-size:13px;"><span style="color:var(--text-muted);">KYC Verified</span><span class="badge badge-green">Complete</span></div>
          <div style="display:flex;justify-content:space-between;font-size:13px;"><span style="color:var(--text-muted);">AML Compliance</span><span class="badge badge-green">Active</span></div>
          <div style="display:flex;justify-content:space-between;font-size:13px;"><span style="color:var(--text-muted);">PMLA Reporting</span><span class="badge badge-green">Enabled</span></div>
          <div style="display:flex;justify-content:space-between;font-size:13px;"><span style="color:var(--text-muted);">TDS (1% on Crypto)</span><span class="badge badge-yellow">Auto-deducted</span></div>
          <div style="display:flex;justify-content:space-between;font-size:13px;"><span style="color:var(--text-muted);">FEMA Compliance</span><span class="badge badge-green">Compliant</span></div>
          <div style="display:flex;justify-content:space-between;font-size:13px;"><span style="color:var(--text-muted);">SEBI Guidelines</span><span class="badge badge-green">Adhered</span></div>
        </div>
      </div>
    </div>
  </div>

  <!-- ── SETTINGS ── -->
  <div id="page-settings" class="page">
    <div class="header">
      <div class="grad-text" style="font-size:20px;font-weight:800;">Settings</div>
    </div>
    <div style="padding:16px 20px;display:flex;flex-direction:column;gap:12px;">
      <div class="card" style="padding:16px;display:flex;align-items:center;gap:14px;">
        <div id="profileAvatar" style="width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#8b5cf6);display:flex;align-items:center;justify-content:center;font-size:28px;">🧑</div>
        <div style="flex:1;">
          <div id="profileName" style="font-size:17px;font-weight:700;">Arjun Kumar</div>
          <div id="profileEmail" style="font-size:12px;color:var(--text-muted);">arjun.kumar@gmail.com</div>
          <div id="profileKYC" style="font-size:11px;color:#10b981;margin-top:2px;"><i class="fas fa-check-circle"></i> KYC Level 3 Verified</div>
        </div>
        <button class="btn-secondary" style="padding:8px 12px;font-size:12px;" onclick="openEditProfile()"><i class="fas fa-edit"></i> Edit</button>
      </div>

      <div class="card" style="padding:16px;">
        <div style="font-size:14px;font-weight:700;margin-bottom:12px;display:flex;align-items:center;gap:8px;"><i class="fas fa-globe" style="color:#6366f1;"></i> Language</div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          <button class="chip lang-chip active" onclick="setLanguage('en',this)">&#127482;&#127480; English</button>
          <button class="chip lang-chip" onclick="setLanguage('hi',this)">&#127470;&#127475; हिंदी</button>
          <button class="chip lang-chip" onclick="setLanguage('bn',this)">&#127470;&#127475; বাংলা</button>
          <button class="chip lang-chip" onclick="setLanguage('te',this)">&#127470;&#127475; తెలుగు</button>
          <button class="chip lang-chip" onclick="setLanguage('ta',this)">&#127470;&#127475; தமிழ்</button>
          <button class="chip lang-chip" onclick="setLanguage('mr',this)">&#127470;&#127475; मराठी</button>
          <button class="chip lang-chip" onclick="setLanguage('gu',this)">&#127470;&#127475; ગુજરાતી</button>
          <button class="chip lang-chip" onclick="setLanguage('kn',this)">&#127470;&#127475; ಕನ್ನಡ</button>
        </div>
      </div>

      <div class="card" style="padding:16px;">
        <div style="font-size:14px;font-weight:700;margin-bottom:12px;display:flex;align-items:center;gap:8px;"><i class="fas fa-coins" style="color:#f59e0b;"></i> Display Currency</div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          <button class="chip curr-chip active" onclick="setCurrency('INR',this)">&#8377; INR</button>
          <button class="chip curr-chip" onclick="setCurrency('USD',this)">$ USD</button>
          <button class="chip curr-chip" onclick="setCurrency('EUR',this)">&#8364; EUR</button>
          <button class="chip curr-chip" onclick="setCurrency('GBP',this)">&#163; GBP</button>
          <button class="chip curr-chip" onclick="setCurrency('JPY',this)">&#165; JPY</button>
        </div>
      </div>

      <div class="card" style="padding:16px;background:rgba(16,185,129,0.05);">
        <div style="font-size:14px;font-weight:700;margin-bottom:8px;display:flex;align-items:center;gap:8px;"><i class="fas fa-wifi" style="color:#10b981;"></i> Offline Mode</div>
        <div style="font-size:12px;color:var(--text-muted);margin-bottom:10px;">View balances &amp; prepare transactions without internet.</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;justify-content:space-between;align-items:center;font-size:13px;padding:6px 0;"><span>View Portfolio Offline</span><div onclick="toggleSecurity(this)" style="width:44px;height:24px;border-radius:12px;background:#10b981;border:1px solid #10b981;position:relative;cursor:pointer;"><div style="width:18px;height:18px;border-radius:50%;background:white;position:absolute;top:2px;right:2px;"></div></div></div>
          <div style="display:flex;justify-content:space-between;align-items:center;font-size:13px;padding:6px 0;"><span>Cached Price Data (30min)</span><div onclick="toggleSecurity(this)" style="width:44px;height:24px;border-radius:12px;background:#10b981;border:1px solid #10b981;position:relative;cursor:pointer;"><div style="width:18px;height:18px;border-radius:50%;background:white;position:absolute;top:2px;right:2px;"></div></div></div>
          <div style="display:flex;justify-content:space-between;align-items:center;font-size:13px;padding:6px 0;"><span>Queue Transactions</span><div onclick="toggleSecurity(this)" style="width:44px;height:24px;border-radius:12px;background:#10b981;border:1px solid #10b981;position:relative;cursor:pointer;"><div style="width:18px;height:18px;border-radius:50%;background:white;position:absolute;top:2px;right:2px;"></div></div></div>
        </div>
      </div>

      <div class="card" style="padding:16px;">
        <div style="font-size:14px;font-weight:700;margin-bottom:10px;display:flex;align-items:center;gap:8px;"><i class="fas fa-info-circle" style="color:#6366f1;"></i> App Info</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;justify-content:space-between;font-size:13px;"><span style="color:var(--text-muted);">Version</span><span style="font-weight:600;">v2.4.1</span></div>
          <div style="display:flex;justify-content:space-between;font-size:13px;"><span style="color:var(--text-muted);">Uptime SLA</span><span style="font-weight:600;">99.9%</span></div>
          <div style="display:flex;justify-content:space-between;font-size:13px;"><span style="color:var(--text-muted);">Avg Tx Time</span><span style="font-weight:600;">&lt;2 seconds</span></div>
          <div style="display:flex;justify-content:space-between;font-size:13px;"><span style="color:var(--text-muted);">Supported Tokens</span><span style="font-weight:600;">100+</span></div>
          <div style="display:flex;justify-content:space-between;font-size:13px;"><span style="color:var(--text-muted);">Supported Chains</span><span style="font-weight:600;">12</span></div>
          <div style="display:flex;justify-content:space-between;font-size:13px;"><span style="color:var(--text-muted);">Indian Banks</span><span style="font-weight:600;">500+</span></div>
        </div>
      </div>
      <button class="btn-secondary" style="width:100%;" onclick="showPage('security')"><i class="fas fa-shield-alt"></i> Security Center</button>
      <button class="btn-danger" style="width:100%;" onclick="lockApp()"><i class="fas fa-lock"></i> Lock Wallet</button>
    </div>
  </div>

  <!-- ── ACTIVITY ── -->
  <div id="page-activity" class="page">
    <div class="header">
      <div class="grad-text" style="font-size:20px;font-weight:800;">Activity</div>
      <button class="btn-secondary" style="padding:8px 14px;font-size:12px;" onclick="exportTransactions()"><i class="fas fa-download"></i> Export</button>
    </div>
    <div style="padding:16px 20px;">
      <div id="allTransactions" class="card" style="padding:8px;"></div>
    </div>
  </div>

  <!-- ── NOTIFICATIONS ── -->
  <div id="page-notifications" class="page">
    <div class="header">
      <div class="grad-text" style="font-size:20px;font-weight:800;">Notifications</div>
      <button style="background:none;border:none;color:#6366f1;font-size:13px;cursor:pointer;" onclick="showToast('All notifications marked as read','info')">Mark All Read</button>
    </div>
    <div style="padding:16px 20px;">
      <div class="card" style="padding:8px;">
        <div style="display:flex;gap:12px;padding:14px;border-radius:12px;background:rgba(99,102,241,0.05);margin-bottom:4px;"><div style="width:40px;height:40px;border-radius:50%;background:#10b98122;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-arrow-down" style="color:#10b981;"></i></div><div style="flex:1;"><div style="display:flex;justify-content:space-between;"><span style="font-size:13px;font-weight:700;">BTC Received</span><span style="font-size:10px;color:var(--text-muted);">2 min ago</span></div><div style="font-size:12px;color:var(--text-muted);margin-top:2px;">0.0025 BTC received from 3Kj9...mN2p</div></div><div style="width:8px;height:8px;border-radius:50%;background:#6366f1;flex-shrink:0;margin-top:4px;"></div></div>
        <div style="display:flex;gap:12px;padding:14px;border-radius:12px;background:rgba(99,102,241,0.05);margin-bottom:4px;"><div style="width:40px;height:40px;border-radius:50%;background:#6366f122;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-chart-line" style="color:#6366f1;"></i></div><div style="flex:1;"><div style="display:flex;justify-content:space-between;"><span style="font-size:13px;font-weight:700;">ETH Price Alert</span><span style="font-size:10px;color:var(--text-muted);">1 hr ago</span></div><div style="font-size:12px;color:var(--text-muted);margin-top:2px;">ETH crossed &#8377;2,70,000 — up 5.2%</div></div><div style="width:8px;height:8px;border-radius:50%;background:#6366f1;flex-shrink:0;margin-top:4px;"></div></div>
        <div style="display:flex;gap:12px;padding:14px;border-radius:12px;background:rgba(99,102,241,0.05);margin-bottom:4px;"><div style="width:40px;height:40px;border-radius:50%;background:#f59e0b22;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-leaf" style="color:#f59e0b;"></i></div><div style="flex:1;"><div style="display:flex;justify-content:space-between;"><span style="font-size:13px;font-weight:700;">DeFi Yield</span><span style="font-size:10px;color:var(--text-muted);">8 hr ago</span></div><div style="font-size:12px;color:var(--text-muted);margin-top:2px;">Earned &#8377;380 from Aave V3 today</div></div><div style="width:8px;height:8px;border-radius:50%;background:#6366f1;flex-shrink:0;margin-top:4px;"></div></div>
        <div style="display:flex;gap:12px;padding:14px;border-radius:12px;margin-bottom:4px;"><div style="width:40px;height:40px;border-radius:50%;background:#8b5cf622;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-shield-alt" style="color:#8b5cf6;"></i></div><div style="flex:1;"><div style="display:flex;justify-content:space-between;"><span style="font-size:13px;font-weight:600;">Security Alert</span><span style="font-size:10px;color:var(--text-muted);">2 days ago</span></div><div style="font-size:12px;color:var(--text-muted);margin-top:2px;">New login from Mumbai, India</div></div></div>
        <div style="display:flex;gap:12px;padding:14px;border-radius:12px;"><div style="width:40px;height:40px;border-radius:50%;background:#ef444422;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-file-invoice" style="color:#ef4444;"></i></div><div style="flex:1;"><div style="display:flex;justify-content:space-between;"><span style="font-size:13px;font-weight:600;">Bill Due</span><span style="font-size:10px;color:var(--text-muted);">3 days ago</span></div><div style="font-size:12px;color:var(--text-muted);margin-top:2px;">BSES Electricity &#8377;1,247 due in 3 days</div></div></div>
      </div>
    </div>
  </div>

  <!-- Bottom Navigation -->
  <nav style="position:fixed;bottom:0;left:0;right:0;background:rgba(10,10,20,0.97);border-top:1px solid var(--border);backdrop-filter:blur(20px);z-index:100;padding:8px 0 max(8px,env(safe-area-inset-bottom));display:flex;max-width:480px;margin:0 auto;">
    <button class="nav-item active" onclick="showPage('dashboard')" id="nav-dashboard"><i class="fas fa-home"></i><span>Home</span></button>
    <button class="nav-item" onclick="showPage('portfolio')" id="nav-portfolio"><i class="fas fa-chart-pie"></i><span>Portfolio</span></button>
    <button class="nav-item" onclick="showPage('payments')" id="nav-payments"><i class="fas fa-university"></i><span>Pay</span></button>
    <div style="flex:1;display:flex;justify-content:center;align-items:center;">
      <button onclick="showPage('swap')" style="width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#8b5cf6);display:flex;align-items:center;justify-content:center;box-shadow:0 0 25px rgba(99,102,241,0.5);margin-top:-14px;cursor:pointer;border:none;color:white;transition:all 0.3s;font-size:20px;" onmouseenter="this.style.transform='scale(1.1)'" onmouseleave="this.style.transform='scale(1)'">&#8644;</button>
    </div>
    <button class="nav-item" onclick="showPage('crypto')" id="nav-crypto"><i class="fas fa-coins"></i><span>Markets</span></button>
    <button class="nav-item" onclick="showPage('defi')" id="nav-defi"><i class="fas fa-layer-group"></i><span>DeFi</span></button>
    <button class="nav-item" onclick="showPage('settings')" id="nav-settings"><i class="fas fa-cog"></i><span>More</span></button>
  </nav>
</div>

<!-- ═══════════ MODALS ═══════════ -->

<!-- Send Modal -->
<div id="sendModal" class="modal-overlay" onclick="closeModalOnOverlay(event,'sendModal')">
  <div class="modal-sheet">
    <div class="modal-handle"></div>
    <h3 style="font-size:18px;font-weight:700;margin-bottom:16px;"><i class="fas fa-paper-plane" style="color:#6366f1;"></i> Send Assets</h3>
    <div style="display:flex;flex-direction:column;gap:12px;">
      <div class="tab-bar">
        <button class="tab-item active" onclick="switchSendType('crypto',this)">Crypto</button>
        <button class="tab-item" onclick="switchSendType('upi',this)">UPI</button>
        <button class="tab-item" onclick="switchSendType('bank',this)">Bank</button>
      </div>
      <input id="sendToAddr" class="input-field" placeholder="To: wallet address / UPI ID" />
      <div style="display:flex;gap:8px;">
        <select id="sendToken" class="input-field" style="flex:1;">
          <option>BTC</option><option>ETH</option><option>USDT</option><option>SOL</option><option>INR</option>
        </select>
        <input id="sendAmt" class="input-field" placeholder="Amount" type="number" style="flex:2;" />
      </div>
      <input class="input-field" placeholder="Note / Memo (optional)" />
      <div style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2);border-radius:10px;padding:12px;font-size:12px;color:#ef4444;">
        <i class="fas fa-exclamation-triangle"></i> Always verify the address. Transactions cannot be reversed.
      </div>
      <button class="btn-primary" style="width:100%;padding:14px;" onclick="submitSend()"><i class="fas fa-paper-plane"></i> Send Now</button>
    </div>
  </div>
</div>

<!-- Receive Modal -->
<div id="receiveModal" class="modal-overlay" onclick="closeModalOnOverlay(event,'receiveModal')">
  <div class="modal-sheet">
    <div class="modal-handle"></div>
    <h3 style="font-size:18px;font-weight:700;margin-bottom:16px;"><i class="fas fa-qrcode" style="color:#10b981;"></i> Receive Assets</h3>
    <div style="text-align:center;display:flex;flex-direction:column;gap:14px;align-items:center;">
      <div style="background:white;padding:16px;border-radius:16px;">
        <svg width="180" height="180" viewBox="0 0 37 37">
          <rect width="37" height="37" fill="white"/>
          <rect x="0" y="0" width="7" height="7" fill="black"/>
          <rect x="1" y="1" width="5" height="5" fill="white"/>
          <rect x="2" y="2" width="3" height="3" fill="black"/>
          <rect x="0" y="30" width="7" height="7" fill="black"/>
          <rect x="1" y="31" width="5" height="5" fill="white"/>
          <rect x="2" y="32" width="3" height="3" fill="black"/>
          <rect x="30" y="0" width="7" height="7" fill="black"/>
          <rect x="31" y="1" width="5" height="5" fill="white"/>
          <rect x="32" y="2" width="3" height="3" fill="black"/>
          <rect x="9" y="0" fill="black" width="1" height="1"/><rect x="11" y="0" fill="black" width="1" height="1"/>
          <rect x="13" y="0" fill="black" width="1" height="1"/><rect x="15" y="0" fill="black" width="1" height="1"/>
          <rect x="17" y="0" fill="black" width="1" height="1"/><rect x="10" y="1" fill="black" width="1" height="1"/>
          <rect x="12" y="1" fill="black" width="1" height="1"/><rect x="14" y="1" fill="black" width="1" height="1"/>
          <rect x="9" y="2" fill="black" width="1" height="1"/><rect x="11" y="2" fill="black" width="1" height="1"/>
          <rect x="16" y="2" fill="black" width="1" height="1"/><rect x="13" y="3" fill="black" width="1" height="1"/>
          <rect x="15" y="3" fill="black" width="1" height="1"/><rect x="9" y="4" fill="black" width="1" height="1"/>
          <rect x="12" y="4" fill="black" width="1" height="1"/><rect x="14" y="4" fill="black" width="1" height="1"/>
          <rect x="10" y="5" fill="black" width="1" height="1"/><rect x="13" y="5" fill="black" width="1" height="1"/>
          <rect x="16" y="5" fill="black" width="1" height="1"/><rect x="9" y="6" fill="black" width="1" height="1"/>
          <rect x="11" y="6" fill="black" width="1" height="1"/><rect x="15" y="6" fill="black" width="1" height="1"/>
          <rect x="0" y="9" fill="black" width="1" height="1"/><rect x="2" y="9" fill="black" width="1" height="1"/>
          <rect x="4" y="9" fill="black" width="1" height="1"/><rect x="6" y="9" fill="black" width="1" height="1"/>
          <rect x="1" y="10" fill="black" width="1" height="1"/><rect x="3" y="10" fill="black" width="1" height="1"/>
          <rect x="5" y="11" fill="black" width="1" height="1"/><rect x="0" y="12" fill="black" width="1" height="1"/>
          <rect x="2" y="12" fill="black" width="1" height="1"/><rect x="4" y="13" fill="black" width="1" height="1"/>
          <rect x="1" y="14" fill="black" width="1" height="1"/><rect x="3" y="14" fill="black" width="1" height="1"/>
          <rect x="18" y="9" fill="black" width="1" height="1"/><rect x="20" y="9" fill="black" width="1" height="1"/>
          <rect x="22" y="10" fill="black" width="1" height="1"/><rect x="19" y="11" fill="black" width="1" height="1"/>
          <rect x="21" y="12" fill="black" width="1" height="1"/><rect x="23" y="12" fill="black" width="1" height="1"/>
          <rect x="18" y="13" fill="black" width="1" height="1"/><rect x="20" y="14" fill="black" width="1" height="1"/>
        </svg>
      </div>
      <div>
        <div style="font-size:12px;color:var(--text-muted);margin-bottom:4px;">BTC Address</div>
        <div style="font-family:monospace;font-size:13px;font-weight:600;padding:10px 16px;background:var(--bg-card2);border-radius:10px;word-break:break-all;">3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5</div>
      </div>
      <div>
        <div style="font-size:12px;color:var(--text-muted);margin-bottom:4px;">ETH / EVM Address</div>
        <div style="font-family:monospace;font-size:13px;font-weight:600;padding:10px 16px;background:var(--bg-card2);border-radius:10px;word-break:break-all;">0x71C7656EC7ab88b098defB751B7401B5f6d8976F</div>
      </div>
      <div style="display:flex;gap:10px;width:100%;">
        <button class="btn-primary" style="flex:1;" onclick="showToast('Address copied to clipboard! ✓','success')"><i class="fas fa-copy"></i> Copy</button>
        <button class="btn-secondary" style="flex:1;" onclick="showToast('Sharing address... ✓','info')"><i class="fas fa-share-alt"></i> Share</button>
      </div>
    </div>
  </div>
</div>

<!-- Bill Modal -->
<div id="billModal" class="modal-overlay" onclick="closeModalOnOverlay(event,'billModal')">
  <div class="modal-sheet">
    <div class="modal-handle"></div>
    <h3 style="font-size:18px;font-weight:700;margin-bottom:4px;"><i class="fas fa-file-invoice-dollar" style="color:#f59e0b;"></i> Pay Bill</h3>
    <div style="font-size:12px;color:var(--text-muted);margin-bottom:16px;">Category: <span id="billCategory" style="color:#f59e0b;font-weight:600;">Electricity</span></div>
    <div style="display:flex;flex-direction:column;gap:12px;">
      <input id="billAcc" class="input-field" placeholder="Consumer / Account Number" />
      <input id="billAmt" class="input-field" placeholder="Bill Amount (&#8377;)" type="number" />
      <div style="background:var(--bg-card2);border-radius:10px;padding:12px;display:flex;flex-direction:column;gap:6px;font-size:12px;">
        <div style="display:flex;justify-content:space-between;"><span style="color:var(--text-muted);">Consumer</span><span id="billConsumerName">Arjun Kumar</span></div>
        <div style="display:flex;justify-content:space-between;"><span style="color:var(--text-muted);">Due Date</span><span style="color:#ef4444;">3 days remaining</span></div>
        <div style="display:flex;justify-content:space-between;"><span style="color:var(--text-muted);">Payment via</span><span>UPI / Wallet</span></div>
      </div>
      <button class="btn-primary" style="width:100%;padding:14px;" onclick="payBill()"><i class="fas fa-check"></i> Pay Bill</button>
      <button class="btn-secondary" style="width:100%;" onclick="closeModal('billModal')">Cancel</button>
    </div>
  </div>
</div>

<!-- NFT Detail Modal -->
<div id="nftDetailModal" class="modal-overlay" onclick="closeModalOnOverlay(event,'nftDetailModal')">
  <div class="modal-sheet">
    <div class="modal-handle"></div>
    <div style="text-align:center;">
      <div style="font-size:80px;margin-bottom:12px;">👾</div>
      <h3 style="font-size:20px;font-weight:800;margin-bottom:4px;">CryptoPunk #3421</h3>
      <p style="color:var(--text-muted);font-size:13px;margin-bottom:16px;">CryptoPunks Collection</p>
      <div class="grid-2" style="gap:10px;margin-bottom:16px;">
        <div class="card" style="padding:10px;text-align:center;"><div style="font-size:10px;color:var(--text-muted);">Floor Price</div><div style="font-size:16px;font-weight:700;">85 ETH</div></div>
        <div class="card" style="padding:10px;text-align:center;"><div style="font-size:10px;color:var(--text-muted);">Est. Value</div><div style="font-size:16px;font-weight:700;color:#10b981;">&#8377;22,81,000</div></div>
        <div class="card" style="padding:10px;text-align:center;"><div style="font-size:10px;color:var(--text-muted);">Rarity</div><div style="font-size:14px;font-weight:700;color:#f59e0b;">Legendary</div></div>
        <div class="card" style="padding:10px;text-align:center;"><div style="font-size:10px;color:var(--text-muted);">Rank</div><div style="font-size:16px;font-weight:700;">#42</div></div>
      </div>
      <div style="display:flex;gap:8px;">
        <button class="btn-primary" style="flex:1;" onclick="showToast('NFT listed on OpenSea! 🎉','success')"><i class="fas fa-tag"></i> List for Sale</button>
        <button class="btn-secondary" style="flex:1;" onclick="showToast('Transfer initiated ✓','info')"><i class="fas fa-paper-plane"></i> Transfer</button>
      </div>
    </div>
  </div>
</div>

<!-- Add Token Modal -->
<div id="addTokenModal" class="modal-overlay" onclick="closeModalOnOverlay(event,'addTokenModal')">
  <div class="modal-sheet">
    <div class="modal-handle"></div>
    <h3 style="font-size:18px;font-weight:700;margin-bottom:16px;"><i class="fas fa-plus" style="color:#6366f1;"></i> Add Token</h3>
    <input class="input-field" placeholder="Search by name or contract address..." style="margin-bottom:12px;" />
    <div class="card" style="padding:8px;">
      <div class="token-row"><div class="token-icon" style="background:#2A5ADA22;color:#2A5ADA;">&#9717;</div><div style="flex:1;"><div style="font-size:13px;font-weight:600;">LINK — Chainlink</div></div><button class="btn-primary" style="padding:6px 12px;font-size:11px;" onclick="showToast('LINK added ✓','success')"><i class="fas fa-plus"></i></button></div>
      <div class="token-row"><div class="token-icon" style="background:#B6509E22;color:#B6509E;">A</div><div style="flex:1;"><div style="font-size:13px;font-weight:600;">AAVE — Aave</div></div><button class="btn-primary" style="padding:6px 12px;font-size:11px;" onclick="showToast('AAVE added ✓','success')"><i class="fas fa-plus"></i></button></div>
      <div class="token-row"><div class="token-icon" style="background:#40649F22;color:#40649F;">C</div><div style="flex:1;"><div style="font-size:13px;font-weight:600;">CRV — Curve</div></div><button class="btn-primary" style="padding:6px 12px;font-size:11px;" onclick="showToast('CRV added ✓','success')"><i class="fas fa-plus"></i></button></div>
      <div class="token-row"><div class="token-icon" style="background:#1AAB9B22;color:#1AAB9B;">M</div><div style="flex:1;"><div style="font-size:13px;font-weight:600;">MKR — Maker</div></div><button class="btn-primary" style="padding:6px 12px;font-size:11px;" onclick="showToast('MKR added ✓','success')"><i class="fas fa-plus"></i></button></div>
    </div>
  </div>
</div>

<!-- Buy NFT Modal -->
<div id="buyNFTModal" class="modal-overlay" onclick="closeModalOnOverlay(event,'buyNFTModal')">
  <div class="modal-sheet">
    <div class="modal-handle"></div>
    <h3 style="font-size:18px;font-weight:700;margin-bottom:16px;"><i class="fas fa-shopping-bag" style="color:#ec4899;"></i> NFT Marketplace</h3>
    <input class="input-field" placeholder="Search NFTs, collections..." style="margin-bottom:12px;"/>
    <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px;">
      <button class="chip active">All</button>
      <button class="chip">Art</button>
      <button class="chip">Gaming</button>
      <button class="chip">Music</button>
      <button class="chip">Sports</button>
    </div>
    <div class="grid-2" style="gap:10px;">
      <div class="card" style="padding:12px;cursor:pointer;" onclick="showToast('Opening listing... 🖼️','info')"><div style="font-size:40px;text-align:center;margin-bottom:8px;">🤖</div><div style="font-size:12px;font-weight:700;">CloneX #9012</div><div style="font-size:11px;color:#8b5cf6;font-weight:600;">18 ETH</div><button class="btn-primary" style="width:100%;padding:6px;font-size:11px;margin-top:8px;" onclick="event.stopPropagation();showToast('Buying NFT... 🎨','success')">Buy Now</button></div>
      <div class="card" style="padding:12px;cursor:pointer;" onclick="showToast('Opening listing... 🖼️','info')"><div style="font-size:40px;text-align:center;margin-bottom:8px;">🌍</div><div style="font-size:12px;font-weight:700;">Otherside #4521</div><div style="font-size:11px;color:#8b5cf6;font-weight:600;">3.2 ETH</div><button class="btn-primary" style="width:100%;padding:6px;font-size:11px;margin-top:8px;" onclick="event.stopPropagation();showToast('Buying NFT... 🎨','success')">Buy Now</button></div>
      <div class="card" style="padding:12px;cursor:pointer;" onclick="showToast('Opening listing... 🖼️','info')"><div style="font-size:40px;text-align:center;margin-bottom:8px;">🦍</div><div style="font-size:12px;font-weight:700;">MAYC #8832</div><div style="font-size:11px;color:#8b5cf6;font-weight:600;">8.5 ETH</div><button class="btn-primary" style="width:100%;padding:6px;font-size:11px;margin-top:8px;" onclick="event.stopPropagation();showToast('Buying NFT... 🎨','success')">Buy Now</button></div>
      <div class="card" style="padding:12px;cursor:pointer;" onclick="showToast('Opening listing... 🖼️','info')"><div style="font-size:40px;text-align:center;margin-bottom:8px;">🧙‍♀️</div><div style="font-size:12px;font-weight:700;">WoW #3291</div><div style="font-size:11px;color:#8b5cf6;font-weight:600;">2.1 ETH</div><button class="btn-primary" style="width:100%;padding:6px;font-size:11px;margin-top:8px;" onclick="event.stopPropagation();showToast('Buying NFT... 🎨','success')">Buy Now</button></div>
    </div>
  </div>
</div>

<!-- Edit Profile Modal -->
<div id="editProfileModal" class="modal-overlay" onclick="closeModalOnOverlay(event,'editProfileModal')">
  <div class="modal-sheet">
    <div class="modal-handle"></div>
    <h3 style="font-size:18px;font-weight:700;margin-bottom:16px;"><i class="fas fa-user-edit" style="color:#6366f1;"></i> Edit Profile</h3>
    <div style="display:flex;flex-direction:column;gap:12px;">
      <div style="text-align:center;margin-bottom:8px;">
        <div id="editAvatarPreview" onclick="changeAvatar()" style="font-size:56px;cursor:pointer;display:inline-block;filter:drop-shadow(0 0 12px rgba(99,102,241,0.5));">🧑</div>
        <div style="font-size:11px;color:var(--text-muted);margin-top:4px;">Tap to change avatar</div>
      </div>
      <div>
        <label style="font-size:12px;color:var(--text-muted);margin-bottom:4px;display:block;">Full Name</label>
        <input id="editName" class="input-field" placeholder="Full Name" />
      </div>
      <div>
        <label style="font-size:12px;color:var(--text-muted);margin-bottom:4px;display:block;">Email</label>
        <input id="editEmail" class="input-field" placeholder="Email Address" type="email" />
      </div>
      <div>
        <label style="font-size:12px;color:var(--text-muted);margin-bottom:4px;display:block;">Phone Number</label>
        <input id="editPhone" class="input-field" placeholder="+91 XXXXX XXXXX" />
      </div>
      <div>
        <label style="font-size:12px;color:var(--text-muted);margin-bottom:4px;display:block;">Date of Birth</label>
        <input id="editDob" class="input-field" type="date" />
      </div>
      <div style="background:rgba(99,102,241,0.05);border-radius:10px;padding:12px;font-size:12px;">
        <div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span style="color:var(--text-muted);">PAN Card</span><span id="editPanDisplay" style="font-weight:600;"></span></div>
        <div style="display:flex;justify-content:space-between;"><span style="color:var(--text-muted);">KYC Level</span><span class="badge badge-green" style="font-size:10px;"></span></div>
      </div>
      <div style="display:flex;gap:10px;">
        <button class="btn-secondary" style="flex:1;" onclick="closeModal('editProfileModal')">Cancel</button>
        <button class="btn-primary" style="flex:1;" onclick="saveProfile()"><i class="fas fa-save"></i> Save Profile</button>
      </div>
    </div>
  </div>
</div>

<!-- Deposit Modal -->
<div id="depositModal" class="modal-overlay" onclick="closeModalOnOverlay(event,'depositModal')">
  <div class="modal-sheet">
    <div class="modal-handle"></div>
    <h3 style="font-size:18px;font-weight:700;margin-bottom:16px;"><i class="fas fa-arrow-circle-down" style="color:#10b981;"></i> Deposit Funds</h3>
    <div style="display:flex;flex-direction:column;gap:12px;">
      <div class="tab-bar" id="depositTabBar">
        <button class="tab-item active" onclick="switchDepositMethod('upi',this)">UPI</button>
        <button class="tab-item" onclick="switchDepositMethod('bank',this)">Bank Transfer</button>
        <button class="tab-item" onclick="switchDepositMethod('card',this)">Card</button>
      </div>
      <div id="depositUPI">
        <div style="font-size:12px;color:var(--text-muted);margin-bottom:8px;">Your UPI Receive ID</div>
        <div style="background:var(--bg-card2);border-radius:10px;padding:12px;font-family:monospace;font-size:14px;font-weight:700;color:#6366f1;margin-bottom:12px;">arjun.kumar@ybl</div>
        <input id="depositUPIAmt" class="input-field" placeholder="Amount to deposit (&#8377;)" type="number" />
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;">
          <button class="chip" onclick="setDepositAmt(1000)">&#8377;1,000</button>
          <button class="chip" onclick="setDepositAmt(5000)">&#8377;5,000</button>
          <button class="chip" onclick="setDepositAmt(10000)">&#8377;10,000</button>
          <button class="chip" onclick="setDepositAmt(25000)">&#8377;25,000</button>
        </div>
      </div>
      <div id="depositBank" style="display:none;">
        <select id="depositBankSel" class="input-field" style="margin-bottom:8px;">
          <option>SBI — State Bank of India</option>
          <option>HDFC Bank</option>
          <option>ICICI Bank</option>
          <option>Axis Bank</option>
          <option>Kotak Mahindra Bank</option>
          <option>Punjab National Bank</option>
        </select>
        <input id="depositBankAmt" class="input-field" placeholder="Amount (&#8377;)" type="number" />
        <div style="background:var(--bg-card2);border-radius:10px;padding:12px;margin-top:8px;font-size:12px;">
          <div style="font-weight:600;margin-bottom:6px;">NexWallet Bank Details</div>
          <div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span style="color:var(--text-muted);">Account Name</span><span>NexWallet Pvt Ltd</span></div>
          <div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span style="color:var(--text-muted);">Account No.</span><span style="font-family:monospace;">0421 0012 3456 789</span></div>
          <div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span style="color:var(--text-muted);">IFSC Code</span><span style="font-family:monospace;">HDFC0001234</span></div>
          <div style="display:flex;justify-content:space-between;"><span style="color:var(--text-muted);">Transfer Type</span><span>NEFT / RTGS / IMPS</span></div>
        </div>
      </div>
      <div id="depositCard" style="display:none;">
        <input id="depositCardNum" class="input-field" placeholder="Card Number" maxlength="19" oninput="formatCardNum(this)" style="margin-bottom:8px;" />
        <div style="display:flex;gap:8px;margin-bottom:8px;">
          <input id="depositCardExp" class="input-field" placeholder="MM/YY" maxlength="5" style="flex:1;" />
          <input id="depositCardCVV" class="input-field" placeholder="CVV" maxlength="3" type="password" style="flex:1;" />
        </div>
        <input id="depositCardAmt" class="input-field" placeholder="Amount (&#8377;)" type="number" />
      </div>
      <div style="background:rgba(16,185,129,0.05);border:1px solid rgba(16,185,129,0.2);border-radius:10px;padding:10px;font-size:12px;">
        <i class="fas fa-shield-alt" style="color:#10b981;"></i> 256-bit SSL encrypted · RBI compliant · Instant credit
      </div>
      <button class="btn-green" style="width:100%;padding:14px;" onclick="processDeposit()"><i class="fas fa-arrow-circle-down"></i> Deposit Now</button>
      <button class="btn-secondary" style="width:100%;" onclick="closeModal('depositModal')">Cancel</button>
    </div>
  </div>
</div>

<!-- Withdraw Modal -->
<div id="withdrawModal" class="modal-overlay" onclick="closeModalOnOverlay(event,'withdrawModal')">
  <div class="modal-sheet">
    <div class="modal-handle"></div>
    <h3 style="font-size:18px;font-weight:700;margin-bottom:16px;"><i class="fas fa-arrow-circle-up" style="color:#f59e0b;"></i> Withdraw Funds</h3>
    <div style="display:flex;flex-direction:column;gap:12px;">
      <div class="tab-bar" id="withdrawTabBar">
        <button class="tab-item active" onclick="switchWithdrawMethod('upi',this)">UPI</button>
        <button class="tab-item" onclick="switchWithdrawMethod('bank',this)">Bank Transfer</button>
        <button class="tab-item" onclick="switchWithdrawMethod('crypto',this)">Crypto</button>
      </div>
      <div id="withdrawUPI">
        <input id="withdrawUPIId" class="input-field" placeholder="UPI ID (name@bank)" style="margin-bottom:8px;" />
        <input id="withdrawUPIAmt" class="input-field" placeholder="Amount to withdraw (&#8377;)" type="number" />
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;">
          <button class="chip" onclick="setWithdrawAmt('upi',500)">&#8377;500</button>
          <button class="chip" onclick="setWithdrawAmt('upi',1000)">&#8377;1,000</button>
          <button class="chip" onclick="setWithdrawAmt('upi',5000)">&#8377;5,000</button>
          <button class="chip" onclick="setWithdrawAmt('upi',10000)">&#8377;10,000</button>
        </div>
      </div>
      <div id="withdrawBank" style="display:none;">
        <select id="withdrawBankSel" class="input-field" style="margin-bottom:8px;">
          <option>SBI — State Bank of India (✓ Linked)</option>
          <option>HDFC Bank (✓ Linked)</option>
          <option>ICICI Bank (✓ Linked)</option>
          <option>Axis Bank (✓ Linked)</option>
        </select>
        <input id="withdrawBankAmt" class="input-field" placeholder="Amount (&#8377;)" type="number" />
        <div style="background:var(--bg-card2);border-radius:10px;padding:10px;margin-top:8px;font-size:12px;">
          <div style="display:flex;justify-content:space-between;"><span style="color:var(--text-muted);">Processing Time</span><span>NEFT: 2hrs · IMPS: Instant</span></div>
        </div>
      </div>
      <div id="withdrawCrypto" style="display:none;">
        <select id="withdrawCryptoToken" class="input-field" style="margin-bottom:8px;">
          <option>BTC</option><option>ETH</option><option>USDT</option><option>SOL</option><option>BNB</option>
        </select>
        <input id="withdrawCryptoAddr" class="input-field" placeholder="Destination wallet address" style="margin-bottom:8px;" />
        <input id="withdrawCryptoAmt" class="input-field" placeholder="Amount" type="number" />
      </div>
      <div style="background:rgba(239,68,68,0.05);border:1px solid rgba(239,68,68,0.2);border-radius:10px;padding:10px;font-size:12px;">
        <i class="fas fa-exclamation-triangle" style="color:#ef4444;"></i> Always verify details. Withdrawals above &#8377;50,000 require 2-of-3 multi-sig.
      </div>
      <button class="btn-primary" style="width:100%;padding:14px;" onclick="processWithdraw()"><i class="fas fa-arrow-circle-up"></i> Withdraw Now</button>
      <button class="btn-secondary" style="width:100%;" onclick="closeModal('withdrawModal')">Cancel</button>
    </div>
  </div>
</div>

<!-- Card Payment Modal -->
<div id="cardPayModal" class="modal-overlay" onclick="closeModalOnOverlay(event,'cardPayModal')">
  <div class="modal-sheet">
    <div class="modal-handle"></div>
    <h3 style="font-size:18px;font-weight:700;margin-bottom:16px;"><i class="fas fa-credit-card" style="color:#6366f1;"></i> Card Payment</h3>
    <div style="display:flex;flex-direction:column;gap:12px;">
      <div id="selectedCardDisplay" style="background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:14px;padding:20px;color:white;">
        <div style="font-size:10px;opacity:0.8;margin-bottom:8px;">SELECTED CARD</div>
        <div id="cardPayNumber" style="font-size:16px;font-weight:700;letter-spacing:2px;font-family:monospace;margin-bottom:8px;">•••• •••• •••• 4523</div>
        <div style="display:flex;justify-content:space-between;"><span id="cardPayHolder" style="font-size:13px;">ARJUN KUMAR</span><span id="cardPayExpiry" style="font-size:13px;">12/27</span></div>
      </div>
      <input id="cardPayRecipient" class="input-field" placeholder="Merchant / Recipient name" />
      <input id="cardPayAmt" class="input-field" placeholder="Amount (&#8377;)" type="number" />
      <input id="cardPayNote" class="input-field" placeholder="Description / Note" />
      <div style="background:var(--bg-card2);border-radius:10px;padding:12px;font-size:12px;">
        <div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span style="color:var(--text-muted);">Rewards Earned</span><span style="color:#10b981;">+1% cashback</span></div>
        <div style="display:flex;justify-content:space-between;"><span style="color:var(--text-muted);">Processing Fee</span><span>₹0 (Free)</span></div>
      </div>
      <button class="btn-primary" style="width:100%;padding:14px;" onclick="processCardPay()"><i class="fas fa-lock"></i> Pay Securely</button>
      <button class="btn-secondary" style="width:100%;" onclick="closeModal('cardPayModal')">Cancel</button>
    </div>
  </div>
</div>

<!-- Net Banking Modal -->
<div id="netBankModal" class="modal-overlay" onclick="closeModalOnOverlay(event,'netBankModal')">
  <div class="modal-sheet">
    <div class="modal-handle"></div>
    <h3 style="font-size:18px;font-weight:700;margin-bottom:16px;"><i class="fas fa-university" style="color:#22409A;"></i> Net Banking Transfer</h3>
    <div style="display:flex;flex-direction:column;gap:12px;">
      <div class="tab-bar">
        <button class="tab-item active" onclick="switchNetBankTab('neft',this)">NEFT</button>
        <button class="tab-item" onclick="switchNetBankTab('rtgs',this)">RTGS</button>
        <button class="tab-item" onclick="switchNetBankTab('imps',this)">IMPS</button>
      </div>
      <select id="netBankSel" class="input-field">
        <option>SBI — State Bank of India</option>
        <option>HDFC Bank</option>
        <option>ICICI Bank</option>
        <option>Axis Bank</option>
        <option>Kotak Mahindra</option>
        <option>Punjab National Bank</option>
        <option>Bank of Baroda</option>
        <option>Canara Bank</option>
      </select>
      <input id="netBankAccNum" class="input-field" placeholder="Beneficiary Account Number" />
      <input id="netBankIFSC" class="input-field" placeholder="IFSC Code" />
      <input id="netBankName" class="input-field" placeholder="Account Holder Name" />
      <input id="netBankAmt" class="input-field" placeholder="Amount (&#8377;)" type="number" />
      <input id="netBankNote" class="input-field" placeholder="Remarks / Purpose" />
      <div id="netBankInfo" style="background:var(--bg-card2);border-radius:10px;padding:10px;font-size:12px;">
        <div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span style="color:var(--text-muted);">Transfer Type</span><span id="netBankType" style="color:#6366f1;font-weight:600;">NEFT</span></div>
        <div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span style="color:var(--text-muted);">Processing Time</span><span id="netBankTime">2-4 hours</span></div>
        <div style="display:flex;justify-content:space-between;"><span style="color:var(--text-muted);">Min / Max Amount</span><span id="netBankLimits">&#8377;1 / &#8377;10L</span></div>
      </div>
      <button class="btn-primary" style="width:100%;padding:14px;" onclick="processNetBanking()"><i class="fas fa-paper-plane"></i> Transfer Now</button>
      <button class="btn-secondary" style="width:100%;" onclick="closeModal('netBankModal')">Cancel</button>
    </div>
  </div>
</div>

<!-- Processing Modal -->
<div id="processingModal" class="modal-overlay">
  <div class="modal-sheet" style="border-radius:24px;max-width:340px;margin:0 auto 80px;">
    <div style="text-align:center;margin-bottom:20px;">
      <div style="width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#8b5cf6);display:flex;align-items:center;justify-content:center;margin:0 auto 12px;animation:glow 2s ease-in-out infinite;">
        <i class="fas fa-spinner" style="color:white;font-size:20px;animation:spin 0.8s linear infinite;"></i>
      </div>
      <div style="font-size:16px;font-weight:700;">Processing Transaction</div>
      <div style="font-size:12px;color:var(--text-muted);margin-top:4px;">Sub-2 second execution</div>
    </div>
    <div id="processingSteps" style="display:flex;flex-direction:column;gap:4px;"></div>
  </div>
</div>

<!-- Confirm Dialog Modal -->
<div id="confirmModal" class="modal-overlay">
  <div class="modal-sheet" style="border-radius:24px;max-width:340px;margin:0 auto 80px;">
    <div class="modal-handle"></div>
    <div style="text-align:center;margin-bottom:20px;">
      <div style="width:56px;height:56px;border-radius:50%;background:rgba(99,102,241,0.15);display:flex;align-items:center;justify-content:center;margin:0 auto 12px;"><i class="fas fa-question-circle" style="color:#6366f1;font-size:24px;"></i></div>
      <div style="font-size:16px;font-weight:700;margin-bottom:8px;">Confirm Action</div>
      <div id="confirmMessage" style="font-size:14px;color:var(--text-muted);line-height:1.5;"></div>
    </div>
    <div style="display:flex;gap:10px;">
      <button class="btn-secondary" style="flex:1;" onclick="doCancel()">Cancel</button>
      <button class="btn-primary" style="flex:1;" onclick="doConfirm()"><i class="fas fa-check"></i> Confirm</button>
    </div>
  </div>
</div>

<!-- Trade Modal -->
<div id="tradeModal" class="modal-overlay" onclick="closeModalOnOverlay(event,'tradeModal')">
  <div class="modal-sheet">
    <div class="modal-handle"></div>
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
      <div id="tradeLogo" style="width:48px;height:48px;border-radius:50%;background:#62EEA22;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:700;">₿</div>
      <div>
        <div id="tradeSymbol" style="font-size:18px;font-weight:800;">BTC</div>
        <div id="tradePrice" style="font-size:14px;color:var(--text-muted);">₹68,42,350</div>
      </div>
      <div style="margin-left:auto;text-align:right;"><div style="font-size:12px;color:var(--text-muted);">Balance</div><div id="tradeBalance" style="font-size:13px;font-weight:600;">0.0421 BTC</div></div>
    </div>
    <div id="tradeModeBar" class="tab-bar" style="margin-bottom:12px;">
      <button class="tab-item active" data-mode="buy" onclick="setTradeMode('buy',this)" style="color:#10b981;">Buy</button>
      <button class="tab-item" data-mode="sell" onclick="setTradeMode('sell',this)" style="">Sell</button>
      <button class="tab-item" data-mode="convert" onclick="setTradeMode('convert',this)">Convert</button>
    </div>
    <div style="display:flex;flex-direction:column;gap:12px;">
      <div>
        <label id="tradeAmtLabel" style="font-size:12px;color:var(--text-muted);margin-bottom:4px;display:block;">Amount (&#8377; INR)</label>
        <input id="tradeAmtInput" class="input-field" placeholder="Enter ₹ amount" type="number" oninput="calcTradeValue()" />
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:6px;">
        <button class="chip" onclick="tradeQuick(25)">25%</button>
        <button class="chip" onclick="tradeQuick(50)">50%</button>
        <button class="chip" onclick="tradeQuick(75)">75%</button>
        <button class="chip" onclick="tradeQuick(100)">Max</button>
      </div>
      <div style="background:var(--bg-card2);border-radius:10px;padding:12px;font-size:13px;font-weight:600;color:#10b981;" id="tradeInrValue">≈ ₹0</div>
      <div style="background:var(--bg-card2);border-radius:10px;padding:10px;font-size:12px;">
        <div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span style="color:var(--text-muted);">Slippage</span><span>0.5%</span></div>
        <div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span style="color:var(--text-muted);">Fee</span><span>0.1%</span></div>
        <div style="display:flex;justify-content:space-between;"><span style="color:var(--text-muted);">Route</span><span style="color:#6366f1;">Best Price ✓</span></div>
      </div>
      <button class="btn-primary" style="width:100%;padding:14px;" onclick="executeTrade()"><i class="fas fa-exchange-alt"></i> Execute Trade</button>
      <button class="btn-secondary" style="width:100%;" onclick="closeModal('tradeModal')">Cancel</button>
    </div>
  </div>
</div>

<!-- Token Detail Modal -->
<div id="tokenDetailModal" class="modal-overlay" onclick="closeModalOnOverlay(event,'tokenDetailModal')">
  <div class="modal-sheet">
    <div class="modal-handle"></div>
    <div style="display:flex;align-items:center;gap:14px;margin-bottom:16px;">
      <div id="tdLogo" style="width:56px;height:56px;border-radius:50%;background:#62EEA22;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:700;">₿</div>
      <div>
        <div id="tdSymbol" style="font-size:20px;font-weight:800;">BTC</div>
        <div id="tdName" style="font-size:13px;color:var(--text-muted);">Bitcoin</div>
        <span id="tdChain" class="chain-badge"></span>
      </div>
      <div style="margin-left:auto;text-align:right;">
        <div id="tdPrice" style="font-size:18px;font-weight:700;">₹68,42,350</div>
        <div id="tdChange" style="font-size:13px;color:#10b981;">+2.34%</div>
      </div>
    </div>
    <div class="grid-2" style="gap:10px;margin-bottom:16px;">
      <div style="background:var(--bg-card2);border-radius:12px;padding:12px;text-align:center;"><div style="font-size:10px;color:var(--text-muted);margin-bottom:4px;">Your Balance</div><div id="tdBalance" style="font-size:15px;font-weight:700;">0.0421 BTC</div></div>
      <div style="background:var(--bg-card2);border-radius:12px;padding:12px;text-align:center;"><div style="font-size:10px;color:var(--text-muted);margin-bottom:4px;">Value</div><div id="tdValue" style="font-size:15px;font-weight:700;color:#10b981;">₹2,87,943</div></div>
    </div>
    <div style="display:flex;gap:8px;">
      <button class="btn-primary" style="flex:1;" onclick="closeModal('tokenDetailModal');openModal('sendModal')"><i class="fas fa-paper-plane"></i> Send</button>
      <button class="btn-green" style="flex:1;" onclick="closeModal('tokenDetailModal');openModal('receiveModal')"><i class="fas fa-qrcode"></i> Receive</button>
      <button class="btn-secondary" style="flex:1;" onclick="closeModal('tokenDetailModal');openTradeModal(STATE.selectedToken)"><i class="fas fa-exchange-alt"></i> Trade</button>
    </div>
  </div>
</div>

<!-- Transaction Detail Modal -->
<div id="txDetailModal" class="modal-overlay" onclick="closeModalOnOverlay(event,'txDetailModal')">
  <div class="modal-sheet">
    <div class="modal-handle"></div>
    <h3 id="txDetailTitle" style="font-size:16px;font-weight:700;margin-bottom:16px;">Transaction Details</h3>
    <div style="display:flex;flex-direction:column;gap:10px;">
      <div style="text-align:center;margin-bottom:8px;">
        <div id="txDetailAmount" style="font-size:28px;font-weight:800;color:#10b981;">+0.0025 BTC</div>
        <div id="txDetailValue" style="font-size:14px;color:var(--text-muted);">₹17,106</div>
      </div>
      <div style="background:var(--bg-card2);border-radius:12px;padding:14px;display:flex;flex-direction:column;gap:10px;font-size:13px;">
        <div style="display:flex;justify-content:space-between;"><span style="color:var(--text-muted);">Status</span><span id="txDetailStatus" class="badge badge-green">completed</span></div>
        <div style="display:flex;justify-content:space-between;"><span style="color:var(--text-muted);">Time</span><span id="txDetailTime">2 min ago</span></div>
        <div style="display:flex;justify-content:space-between;"><span style="color:var(--text-muted);">Details</span><span id="txDetailNote" style="text-align:right;max-width:60%;">—</span></div>
        <div style="display:flex;justify-content:space-between;align-items:center;"><span style="color:var(--text-muted);">Tx Hash</span><div style="display:flex;align-items:center;gap:6px;"><span id="txDetailHash" style="font-family:monospace;font-size:11px;">0x...</span><button onclick="copyTxHash()" style="background:none;border:none;color:#6366f1;cursor:pointer;font-size:12px;"><i class="fas fa-copy"></i></button></div></div>
      </div>
      <div style="display:flex;gap:8px;">
        <button class="btn-secondary" style="flex:1;" onclick="viewOnExplorer()"><i class="fas fa-external-link-alt"></i> Explorer</button>
        <button class="btn-secondary" style="flex:1;" onclick="closeModal('txDetailModal')">Close</button>
      </div>
    </div>
  </div>
</div>

<!-- DeFi Action Modal -->
<div id="defiActionModal" class="modal-overlay" onclick="closeModalOnOverlay(event,'defiActionModal')">
  <div class="modal-sheet">
    <div class="modal-handle"></div>
    <h3 id="defiModalTitle" style="font-size:18px;font-weight:700;margin-bottom:4px;">Deposit to Aave V3</h3>
    <div style="margin-bottom:16px;display:flex;align-items:center;gap:8px;">
      <span id="defiModalAPY" class="badge badge-green">8.42% APY</span>
      <span id="defiModalToken" style="font-size:12px;color:var(--text-muted);">USDC</span>
    </div>
    <div style="display:flex;flex-direction:column;gap:12px;">
      <input id="defiAmtInput" class="input-field" placeholder="Amount" type="number" />
      <div id="defiModalNote" style="background:var(--bg-card2);border-radius:10px;padding:10px;font-size:12px;color:var(--text-muted);"></div>
      <div style="background:rgba(99,102,241,0.05);border-radius:10px;padding:10px;font-size:12px;">
        <div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span style="color:var(--text-muted);">Gas Fee</span><span>~$2.50</span></div>
        <div style="display:flex;justify-content:space-between;"><span style="color:var(--text-muted);">Network</span><span>Ethereum</span></div>
      </div>
      <button id="defiConfirmBtn" class="btn-primary" style="width:100%;padding:14px;" onclick="confirmDefiAction()">Deposit</button>
      <button class="btn-secondary" style="width:100%;" onclick="closeModal('defiActionModal')">Cancel</button>
    </div>
  </div>
</div>

<!-- Staking Action Modal -->
<div id="stakeActionModal" class="modal-overlay" onclick="closeModalOnOverlay(event,'stakeActionModal')">
  <div class="modal-sheet">
    <div class="modal-handle"></div>
    <h3 id="stakeModalTitle" style="font-size:18px;font-weight:700;margin-bottom:4px;">Stake ETH</h3>
    <div style="margin-bottom:16px;"><span id="stakeModalAPY" style="font-size:12px;color:var(--text-muted);">3.8% APY · Lido stETH</span></div>
    <div style="display:flex;flex-direction:column;gap:12px;">
      <div id="stakeModalBalance" style="font-size:12px;color:var(--text-muted);padding:10px;background:var(--bg-card2);border-radius:10px;">Available: 0.845 ETH</div>
      <input id="stakeAmtInput" class="input-field" placeholder="Amount to stake" type="number" />
      <div style="display:flex;flex-wrap:wrap;gap:6px;">
        <button class="chip" onclick="stakeQuick(25)">25%</button>
        <button class="chip" onclick="stakeQuick(50)">50%</button>
        <button class="chip" onclick="stakeQuick(100)">Max</button>
      </div>
      <div style="background:rgba(99,102,241,0.05);border-radius:10px;padding:10px;font-size:12px;">
        <div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span style="color:var(--text-muted);">Estimated Rewards/yr</span><span style="color:#10b981;" id="stakeEstReward">—</span></div>
        <div style="display:flex;justify-content:space-between;"><span style="color:var(--text-muted);">Unbonding Period</span><span>Varies by protocol</span></div>
      </div>
      <button id="stakeConfirmBtn" class="btn-primary" style="width:100%;padding:14px;" onclick="confirmStakeAction()">Stake</button>
      <button class="btn-secondary" style="width:100%;" onclick="closeModal('stakeActionModal')">Cancel</button>
    </div>
  </div>
</div>

<!-- NFT Transfer Modal -->
<div id="nftTransferModal" class="modal-overlay" onclick="closeModalOnOverlay(event,'nftTransferModal')">
  <div class="modal-sheet">
    <div class="modal-handle"></div>
    <h3 style="font-size:18px;font-weight:700;margin-bottom:8px;"><i class="fas fa-paper-plane" style="color:#ec4899;"></i> Transfer NFT</h3>
    <div style="font-size:13px;color:var(--text-muted);margin-bottom:16px;">Transferring: <span id="nftTransferName" style="color:var(--text);font-weight:600;">CryptoPunk #3421</span></div>
    <div style="display:flex;flex-direction:column;gap:12px;">
      <input id="nftTransferAddr" class="input-field" placeholder="Recipient wallet address (0x...)" />
      <div style="background:rgba(239,68,68,0.05);border:1px solid rgba(239,68,68,0.2);border-radius:10px;padding:10px;font-size:12px;color:#ef4444;">
        <i class="fas fa-exclamation-triangle"></i> NFT transfers are irreversible. Double-check the address.
      </div>
      <button class="btn-primary" style="width:100%;padding:14px;" onclick="confirmNFTTransfer()"><i class="fas fa-paper-plane"></i> Transfer NFT</button>
      <button class="btn-secondary" style="width:100%;" onclick="closeModal('nftTransferModal')">Cancel</button>
    </div>
  </div>
</div>

<!-- Add Guardian Modal -->
<div id="addGuardianModal" class="modal-overlay" onclick="closeModalOnOverlay(event,'addGuardianModal')">
  <div class="modal-sheet">
    <div class="modal-handle"></div>
    <h3 style="font-size:18px;font-weight:700;margin-bottom:16px;"><i class="fas fa-user-plus" style="color:#8b5cf6;"></i> Add Guardian</h3>
    <div style="display:flex;flex-direction:column;gap:12px;">
      <input id="guardianName" class="input-field" placeholder="Guardian's Full Name" />
      <input id="guardianEmail" class="input-field" placeholder="Guardian's Email Address" type="email" />
      <input class="input-field" placeholder="Relationship (e.g., Sister, Friend)" />
      <div style="background:rgba(139,92,246,0.05);border-radius:10px;padding:10px;font-size:12px;color:var(--text-muted);">
        Guardian will receive an invitation email. They need to accept to be added to your social recovery.
      </div>
      <button class="btn-primary" style="width:100%;padding:14px;" onclick="confirmAddGuardian()"><i class="fas fa-user-plus"></i> Send Invitation</button>
      <button class="btn-secondary" style="width:100%;" onclick="closeModal('addGuardianModal')">Cancel</button>
    </div>
  </div>
</div>

<!-- Link Bank Modal -->
<div id="linkBankModal" class="modal-overlay" onclick="closeModalOnOverlay(event,'linkBankModal')">
  <div class="modal-sheet">
    <div class="modal-handle"></div>
    <h3 style="font-size:18px;font-weight:700;margin-bottom:16px;"><i class="fas fa-university" style="color:#22409A;"></i> Link Bank Account</h3>
    <div style="display:flex;flex-direction:column;gap:12px;">
      <select id="newBankSelect" class="input-field">
        <option>State Bank of India</option>
        <option>HDFC Bank</option>
        <option>ICICI Bank</option>
        <option>Axis Bank</option>
        <option>Kotak Mahindra Bank</option>
        <option>Punjab National Bank</option>
        <option>Bank of Baroda</option>
        <option>Canara Bank</option>
        <option>Union Bank of India</option>
        <option>Indian Bank</option>
      </select>
      <input id="newAccNumber" class="input-field" placeholder="Account Number" />
      <input id="newIFSC" class="input-field" placeholder="IFSC Code" />
      <input class="input-field" placeholder="Account Holder Name" />
      <div style="background:rgba(16,185,129,0.05);border-radius:10px;padding:10px;font-size:12px;color:var(--text-muted);">
        <i class="fas fa-info-circle" style="color:#10b981;"></i> A small penny drop of &#8377;1 will be sent and refunded to verify your account.
      </div>
      <button class="btn-primary" style="width:100%;padding:14px;" onclick="confirmLinkBank()"><i class="fas fa-link"></i> Link Account</button>
      <button class="btn-secondary" style="width:100%;" onclick="closeModal('linkBankModal')">Cancel</button>
    </div>
  </div>
</div>

<!-- UPI QR Modal -->
<div id="upiQRModal" class="modal-overlay" onclick="closeModalOnOverlay(event,'upiQRModal')">
  <div class="modal-sheet" style="text-align:center;">
    <div class="modal-handle"></div>
    <h3 style="font-size:18px;font-weight:700;margin-bottom:16px;"><i class="fas fa-qrcode" style="color:#06b6d4;"></i> UPI QR Code</h3>
    <div style="background:white;padding:20px;border-radius:16px;display:inline-block;margin-bottom:16px;">
      <svg width="180" height="180" viewBox="0 0 37 37">
        <rect width="37" height="37" fill="white"/>
        <rect x="0" y="0" width="7" height="7" fill="black"/><rect x="1" y="1" width="5" height="5" fill="white"/><rect x="2" y="2" width="3" height="3" fill="black"/>
        <rect x="0" y="30" width="7" height="7" fill="black"/><rect x="1" y="31" width="5" height="5" fill="white"/><rect x="2" y="32" width="3" height="3" fill="black"/>
        <rect x="30" y="0" width="7" height="7" fill="black"/><rect x="31" y="1" width="5" height="5" fill="white"/><rect x="32" y="2" width="3" height="3" fill="black"/>
        <rect x="9" y="0" fill="black" width="1" height="1"/><rect x="11" y="0" fill="black" width="1" height="1"/><rect x="14" y="0" fill="black" width="1" height="1"/>
        <rect x="10" y="1" fill="black" width="1" height="1"/><rect x="13" y="1" fill="black" width="1" height="1"/><rect x="15" y="1" fill="black" width="1" height="1"/>
        <rect x="9" y="2" fill="black" width="1" height="1"/><rect x="12" y="2" fill="black" width="1" height="1"/><rect x="16" y="2" fill="black" width="1" height="1"/>
        <rect x="10" y="3" fill="black" width="1" height="1"/><rect x="14" y="3" fill="black" width="1" height="1"/>
        <rect x="9" y="4" fill="black" width="1" height="1"/><rect x="11" y="4" fill="black" width="1" height="1"/><rect x="15" y="4" fill="black" width="1" height="1"/>
        <rect x="13" y="5" fill="black" width="1" height="1"/><rect x="9" y="6" fill="black" width="1" height="1"/><rect x="16" y="6" fill="black" width="1" height="1"/>
        <rect x="0" y="9" fill="black" width="1" height="1"/><rect x="3" y="9" fill="black" width="1" height="1"/><rect x="5" y="9" fill="black" width="1" height="1"/>
        <rect x="1" y="10" fill="black" width="1" height="1"/><rect x="4" y="10" fill="black" width="1" height="1"/>
        <rect x="2" y="11" fill="black" width="1" height="1"/><rect x="6" y="11" fill="black" width="1" height="1"/>
        <rect x="0" y="12" fill="black" width="1" height="1"/><rect x="3" y="13" fill="black" width="1" height="1"/>
        <rect x="18" y="9" fill="black" width="1" height="1"/><rect x="21" y="9" fill="black" width="1" height="1"/>
        <rect x="20" y="10" fill="black" width="1" height="1"/><rect x="22" y="11" fill="black" width="1" height="1"/>
        <rect x="19" y="12" fill="black" width="1" height="1"/><rect x="21" y="13" fill="black" width="1" height="1"/>
      </svg>
    </div>
    <div style="font-size:15px;font-weight:700;color:#6366f1;margin-bottom:4px;">arjun.kumar@ybl</div>
    <div style="font-size:12px;color:var(--text-muted);margin-bottom:16px;">Scan with any UPI app to pay</div>
    <div style="display:flex;gap:8px;justify-content:center;">
      <button class="btn-primary" onclick="showToast('QR code downloaded! ✓','success')"><i class="fas fa-download"></i> Download QR</button>
      <button class="btn-secondary" onclick="showToast('QR code shared! ✓','info')"><i class="fas fa-share-alt"></i> Share</button>
    </div>
  </div>
</div>

<!-- UPI Pay Modal -->
<div id="upiPayModal" class="modal-overlay" onclick="closeModalOnOverlay(event,'upiPayModal')">
  <div class="modal-sheet">
    <div class="modal-handle"></div>
    <h3 style="font-size:18px;font-weight:700;margin-bottom:16px;"><i class="fas fa-at" style="color:#06b6d4;"></i> Quick UPI Pay</h3>
    <div style="display:flex;flex-direction:column;gap:12px;">
      <input id="upiModalId" class="input-field" placeholder="UPI ID (name@bank)" />
      <input id="upiModalAmt" class="input-field" placeholder="Amount (&#8377;)" type="number" />
      <input id="upiModalNote" class="input-field" placeholder="Note (optional)" />
      <div style="display:flex;flex-wrap:wrap;gap:6px;">
        <button class="chip" onclick="document.getElementById('upiModalAmt').value=100">&#8377;100</button>
        <button class="chip" onclick="document.getElementById('upiModalAmt').value=500">&#8377;500</button>
        <button class="chip" onclick="document.getElementById('upiModalAmt').value=1000">&#8377;1,000</button>
        <button class="chip" onclick="document.getElementById('upiModalAmt').value=5000">&#8377;5,000</button>
      </div>
      <button class="btn-primary" style="width:100%;padding:14px;" onclick="processUPIModal()"><i class="fas fa-paper-plane"></i> Pay Now</button>
      <button class="btn-secondary" style="width:100%;" onclick="closeModal('upiPayModal')">Cancel</button>
    </div>
  </div>
</div>

<style>
@keyframes spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
.pin-key{background:var(--bg-card);border:1px solid var(--border);border-radius:50%;width:64px;height:64px;color:var(--text);font-size:20px;font-weight:600;cursor:pointer;transition:all 0.2s;margin:auto;display:flex;align-items:center;justify-content:center;}
.pin-key:hover{background:var(--bg-card2);}
.mr-1{margin-right:4px;}
</style>

<script src="/static/app.js"></script>
</body>
</html>`

export default app
