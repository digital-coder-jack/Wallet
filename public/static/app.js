// ═══════════════════════════════════════════════════════════
// NEXWALLET — FULL CLIENT JAVASCRIPT
// ═══════════════════════════════════════════════════════════

const tokens = [
  {symbol:'BTC',name:'Bitcoin',price:6842350,change:2.34,balance:0.0421,logo:'₿',color:'#F7931A',chain:'Bitcoin'},
  {symbol:'ETH',name:'Ethereum',price:268430,change:1.87,balance:0.845,logo:'Ξ',color:'#627EEA',chain:'Ethereum'},
  {symbol:'BNB',name:'BNB',price:48200,change:-0.54,balance:2.1,logo:'B',color:'#F3BA2F',chain:'BSC'},
  {symbol:'SOL',name:'Solana',price:14320,change:4.21,balance:8.5,logo:'S',color:'#9945FF',chain:'Solana'},
  {symbol:'MATIC',name:'Polygon',price:68,change:3.15,balance:450,logo:'P',color:'#8247E5',chain:'Polygon'},
  {symbol:'ADA',name:'Cardano',price:38,change:-1.23,balance:820,logo:'A',color:'#0033AD',chain:'Cardano'},
  {symbol:'DOT',name:'Polkadot',price:580,change:2.67,balance:35,logo:'●',color:'#E6007A',chain:'Polkadot'},
  {symbol:'AVAX',name:'Avalanche',price:2840,change:5.12,balance:12,logo:'A',color:'#E84142',chain:'Avalanche'},
  {symbol:'LINK',name:'Chainlink',price:1180,change:1.45,balance:28,logo:'⬡',color:'#2A5ADA',chain:'Ethereum'},
  {symbol:'UNI',name:'Uniswap',price:920,change:-2.1,balance:15,logo:'🦄',color:'#FF007A',chain:'Ethereum'},
  {symbol:'ATOM',name:'Cosmos',price:720,change:0.98,balance:40,logo:'⚛',color:'#2E3148',chain:'Cosmos'},
  {symbol:'LTC',name:'Litecoin',price:7420,change:1.32,balance:1.5,logo:'Ł',color:'#BFBBBB',chain:'Litecoin'},
  {symbol:'XRP',name:'XRP',price:45,change:-0.87,balance:1200,logo:'X',color:'#00AAE4',chain:'XRP'},
  {symbol:'DOGE',name:'Dogecoin',price:12,change:6.54,balance:3500,logo:'D',color:'#C2A633',chain:'Dogecoin'},
  {symbol:'SHIB',name:'Shiba Inu',price:0.0018,change:8.23,balance:5000000,logo:'🐕',color:'#FFA409',chain:'Ethereum'},
  {symbol:'USDT',name:'Tether',price:84,change:0.01,balance:5000,logo:'₮',color:'#26A17B',chain:'Multi'},
  {symbol:'USDC',name:'USD Coin',price:84,change:0.00,balance:3000,logo:'$',color:'#2775CA',chain:'Multi'},
  {symbol:'AAVE',name:'Aave',price:8420,change:3.45,balance:2.5,logo:'A',color:'#B6509E',chain:'Ethereum'},
  {symbol:'CRV',name:'Curve',price:32,change:-1.67,balance:180,logo:'C',color:'#40649F',chain:'Ethereum'},
  {symbol:'MKR',name:'Maker',price:118400,change:2.11,balance:0.15,logo:'M',color:'#1AAB9B',chain:'Ethereum'},
  {symbol:'SNX',name:'Synthetix',price:285,change:1.82,balance:50,logo:'S',color:'#00D1FF',chain:'Ethereum'},
  {symbol:'COMP',name:'Compound',price:4250,change:-0.95,balance:3,logo:'C',color:'#00D395',chain:'Ethereum'},
  {symbol:'YFI',name:'Yearn',price:675000,change:3.21,balance:0.008,logo:'Y',color:'#006AE3',chain:'Ethereum'},
  {symbol:'SUSHI',name:'SushiSwap',price:85,change:2.45,balance:120,logo:'🍣',color:'#FA52A0',chain:'Ethereum'},
  {symbol:'1INCH',name:'1inch',price:190,change:1.12,balance:200,logo:'1',color:'#94A6C3',chain:'Ethereum'},
  {symbol:'NEAR',name:'NEAR Protocol',price:380,change:4.56,balance:85,logo:'N',color:'#00C08B',chain:'NEAR'},
  {symbol:'FTM',name:'Fantom',price:42,change:7.23,balance:500,logo:'F',color:'#1969FF',chain:'Fantom'},
  {symbol:'ARB',name:'Arbitrum',price:125,change:2.87,balance:300,logo:'◆',color:'#28A0F0',chain:'Arbitrum'},
  {symbol:'OP',name:'Optimism',price:195,change:3.14,balance:180,logo:'⚡',color:'#FF0420',chain:'Optimism'},
  {symbol:'INJ',name:'Injective',price:2850,change:5.67,balance:12,logo:'I',color:'#00C2FF',chain:'Injective'},
];

const allTxns = [
  {id:1,type:'receive',asset:'BTC',amount:'+0.0025 BTC',value:'₹17,106',time:'2 min ago',status:'completed'},
  {id:2,type:'send',asset:'ETH',amount:'-0.15 ETH',value:'₹40,265',time:'1 hr ago',status:'completed'},
  {id:3,type:'upi',asset:'INR',amount:'-₹5,000',value:'₹5,000',time:'3 hr ago',status:'completed'},
  {id:4,type:'swap',asset:'SOL→ETH',amount:'5 SOL → 0.26 ETH',value:'₹69,799',time:'5 hr ago',status:'completed'},
  {id:5,type:'defi',asset:'AAVE',amount:'+₹380 yield',value:'₹380',time:'8 hr ago',status:'completed'},
  {id:6,type:'bill',asset:'INR',amount:'-₹1,247',value:'₹1,247',time:'1 day ago',status:'completed'},
  {id:7,type:'nft',asset:'NFT',amount:'Bought Azuki #1204',value:'₹3,22,000',time:'2 days ago',status:'completed'},
  {id:8,type:'stake',asset:'ETH',amount:'Staked 1.0 ETH',value:'₹2,68,430',time:'3 days ago',status:'completed'},
  {id:9,type:'receive',asset:'USDT',amount:'+500 USDT',value:'₹42,000',time:'4 days ago',status:'completed'},
  {id:10,type:'send',asset:'MATIC',amount:'-100 MATIC',value:'₹6,800',time:'5 days ago',status:'completed'},
];

const txTypes = {
  receive:{icon:'fas fa-arrow-down',color:'#10b981',label:'Received'},
  send:{icon:'fas fa-arrow-up',color:'#ef4444',label:'Sent'},
  upi:{icon:'fas fa-at',color:'#06b6d4',label:'UPI'},
  swap:{icon:'fas fa-exchange-alt',color:'#8b5cf6',label:'Swap'},
  defi:{icon:'fas fa-leaf',color:'#f59e0b',label:'DeFi'},
  bill:{icon:'fas fa-file-invoice',color:'#f97316',label:'Bill'},
  nft:{icon:'fas fa-image',color:'#ec4899',label:'NFT'},
  stake:{icon:'fas fa-lock',color:'#6366f1',label:'Staked'},
};

let pinEntered = '';
let balanceVisible = true;
let portfolioChart = null;
let donutChart = null;

// ── LOCK SCREEN ──────────────────────────────────────────

window.pinInput = function(key) {
  if (key === '<') { pinEntered = pinEntered.slice(0,-1); }
  else if (key !== '*') { if (pinEntered.length < 6) pinEntered += key; }
  updatePinDots();
  if (pinEntered.length === 6) {
    setTimeout(() => { unlockApp(); }, 300);
  }
}

function updatePinDots() {
  const dots = document.querySelectorAll('.pin-dot');
  dots.forEach((d,i) => {
    d.style.background = i < pinEntered.length ? '#6366f1' : 'transparent';
  });
}

window.unlockBiometric = function() {
  const btn = document.querySelector('.bio-btn');
  if(btn) btn.style.boxShadow = '0 0 40px rgba(99,102,241,0.8)';
  showToast('Biometric verified! ✓','success');
  setTimeout(unlockApp, 600);
}

function unlockApp() {
  const lock = document.getElementById('lockScreen');
  const appEl = document.getElementById('app');
  if (!lock || !appEl) return;
  lock.style.opacity = '0';
  lock.style.transition = 'opacity 0.5s ease';
  setTimeout(() => {
    lock.style.display = 'none';
    appEl.style.display = 'block';
    initApp();
  }, 500);
}

window.lockApp = function() {
  document.getElementById('app').style.display = 'none';
  const lock = document.getElementById('lockScreen');
  lock.style.display = 'flex';
  lock.style.opacity = '1';
  pinEntered = '';
  updatePinDots();
}

// ── APP INIT ────────────────────────────────────────────

function initApp() {
  renderTopAssets();
  renderRecentTxns();
  renderPortfolioTokens();
  renderMarketTokens(tokens);
  renderBankList();
  renderAllTransactions();
  initPortfolioChart();
  initDonutChart();
  simulateLivePrices();
  checkNetworkStatus();
  setupNavigation();
}

// ── NAVIGATION ───────────────────────────────────────────

function setupNavigation() {
  // No extra setup needed — onclick handlers are inline
}

window.showPage = function(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const page = document.getElementById('page-' + name);
  if (page) { page.classList.add('active'); }
  const navItem = document.getElementById('nav-' + name);
  if (navItem) navItem.classList.add('active');
  window.scrollTo(0,0);
  // Init charts when switching to portfolio
  if (name === 'portfolio') setTimeout(initDonutChart, 100);
  if (name === 'dashboard') setTimeout(initPortfolioChart, 100);
}

// ── MODALS ───────────────────────────────────────────────

window.openModal = function(id) {
  const m = document.getElementById(id);
  if (!m) return;
  m.style.display = 'flex';
  setTimeout(() => m.classList.add('visible'), 10);
}

window.closeModal = function(id) {
  const m = document.getElementById(id);
  if (!m) return;
  m.classList.remove('visible');
  setTimeout(() => m.style.display = 'none', 300);
}

window.closeModalOnOverlay = function(e, id) {
  if (e.target.classList.contains('modal-overlay')) window.closeModal(id);
}

// ── TOAST ────────────────────────────────────────────────

window.showToast = function(msg, type) {
  type = type || 'info';
  const toast = document.createElement('div');
  toast.className = 'toast';
  const colors = {success:'#10b981',error:'#ef4444',info:'#6366f1',warning:'#f59e0b'};
  const icons = {success:'fa-check-circle',error:'fa-times-circle',info:'fa-info-circle',warning:'fa-exclamation-triangle'};
  toast.innerHTML = '<i class="fas ' + (icons[type]||icons.info) + '" style="color:' + (colors[type]||colors.info) + ';font-size:18px;"></i><span style="font-size:13px;font-weight:500;">' + msg + '</span>';
  document.body.appendChild(toast);
  setTimeout(function() {
    toast.style.opacity='0'; toast.style.transition='opacity 0.3s';
    setTimeout(function(){toast.remove();},300);
  }, 3000);
}

// ── FORMAT HELPERS ───────────────────────────────────────

function fmtPrice(p) {
  if (p >= 1000000) return '₹' + (p/100000).toFixed(2) + 'L';
  if (p >= 1000) return '₹' + Math.round(p).toLocaleString('en-IN');
  if (p < 0.01) return '₹' + p.toFixed(6);
  return '₹' + p.toFixed(2);
}

function fmtValue(bal, price) {
  const v = bal * price;
  if (v >= 100000) return '₹' + (v/100000).toFixed(2) + 'L';
  if (v >= 1000) return '₹' + Math.round(v).toLocaleString('en-IN');
  return '₹' + v.toFixed(2);
}

// ── RENDER FUNCTIONS ─────────────────────────────────────

function buildTokenRow(t, showBuy) {
  const div = document.createElement('div');
  div.className = 'token-row';
  div.onclick = function() { openTokenDetail(t.symbol); };

  const icon = document.createElement('div');
  icon.className = 'token-icon';
  icon.style.cssText = 'background:' + t.color + '22;color:' + t.color + ';font-size:16px;';
  icon.textContent = t.logo;

  const info = document.createElement('div');
  info.style.flex = '1';
  info.innerHTML = '<div style="display:flex;align-items:center;gap:6px;"><span style="font-size:14px;font-weight:700;">' + t.symbol + '</span><span class="chain-badge">' + t.chain + '</span></div><div style="font-size:11px;color:var(--text-muted);">' + t.name + ' · ' + t.balance.toLocaleString() + '</div>';

  const right = document.createElement('div');
  right.style.textAlign = 'right';
  const priceDiv = document.createElement('div');
  priceDiv.style.cssText = 'font-size:14px;font-weight:700;';
  priceDiv.textContent = fmtPrice(t.price);
  const changeDiv = document.createElement('div');
  changeDiv.style.cssText = 'font-size:11px;color:' + (t.change >= 0 ? 'var(--green)' : 'var(--red)') + ';';
  changeDiv.textContent = (t.change >= 0 ? '+' : '') + t.change + '%';
  right.appendChild(priceDiv);
  right.appendChild(changeDiv);

  if (showBuy) {
    const btn = document.createElement('button');
    btn.className = 'btn-primary';
    btn.style.cssText = 'padding:4px 10px;font-size:10px;margin-top:3px;';
    btn.textContent = 'Trade';
    btn.onclick = function(e) { e.stopPropagation(); openModal('sendModal'); };
    right.appendChild(btn);
  } else {
    const valDiv = document.createElement('div');
    valDiv.style.cssText = 'font-size:11px;color:var(--text-muted);';
    valDiv.textContent = fmtValue(t.balance, t.price);
    right.appendChild(valDiv);
  }

  div.appendChild(icon);
  div.appendChild(info);
  div.appendChild(right);
  return div;
}

function renderTopAssets() {
  const c = document.getElementById('topAssets');
  if (!c) return;
  c.innerHTML = '';
  tokens.slice(0,5).forEach(t => c.appendChild(buildTokenRow(t, false)));
}

function renderPortfolioTokens() {
  const c = document.getElementById('portfolioTokenList');
  if (!c) return;
  c.innerHTML = '';
  tokens.forEach(t => c.appendChild(buildTokenRow(t, false)));
}

window.renderMarketTokens = function(list) {
  const c = document.getElementById('marketTokenList');
  if (!c) return;
  c.innerHTML = '';
  (list || tokens).forEach(t => c.appendChild(buildTokenRow(t, true)));
}

function buildTxRow(tx) {
  const t = txTypes[tx.type] || txTypes.send;
  const div = document.createElement('div');
  div.style.cssText = 'display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;cursor:pointer;transition:background 0.2s;';
  div.onmouseenter = function() { this.style.background='var(--bg-card2)'; };
  div.onmouseleave = function() { this.style.background='transparent'; };

  const iconDiv = document.createElement('div');
  iconDiv.style.cssText = 'width:40px;height:40px;border-radius:50%;background:' + t.color + '22;display:flex;align-items:center;justify-content:center;flex-shrink:0;';
  iconDiv.innerHTML = '<i class="' + t.icon + '" style="color:' + t.color + ';font-size:14px;"></i>';

  const info = document.createElement('div');
  info.style.flex = '1';
  info.innerHTML = '<div style="font-size:13px;font-weight:600;">' + tx.asset + '</div><div style="font-size:11px;color:var(--text-muted);">' + tx.time + ' · ' + t.label + '</div>';

  const right = document.createElement('div');
  right.style.textAlign = 'right';
  const amtColor = tx.amount.startsWith('+') ? '#10b981' : tx.amount.startsWith('-') ? '#ef4444' : 'var(--text)';
  right.innerHTML = '<div style="font-size:13px;font-weight:700;color:' + amtColor + ';">' + tx.amount + '</div><div style="font-size:10px;color:var(--text-muted);">' + tx.value + '</div>';

  div.appendChild(iconDiv);
  div.appendChild(info);
  div.appendChild(right);
  return div;
}

function renderRecentTxns() {
  const c = document.getElementById('recentTxns');
  if (!c) return;
  c.innerHTML = '';
  allTxns.slice(0,5).forEach(tx => c.appendChild(buildTxRow(tx)));
}

function renderAllTransactions() {
  const c = document.getElementById('allTransactions');
  if (!c) return;
  c.innerHTML = '';
  allTxns.forEach(tx => c.appendChild(buildTxRow(tx)));
}

function renderBankList() {
  const c = document.getElementById('bankList');
  if (!c) return;
  const banks = [
    {name:'State Bank of India',short:'SBI',balance:'₹45,280',color:'#22409A'},
    {name:'HDFC Bank',short:'HDFC',balance:'₹1,28,450',color:'#004C8F'},
    {name:'ICICI Bank',short:'ICICI',balance:'₹67,320',color:'#F06B23'},
    {name:'Axis Bank',short:'Axis',balance:'₹23,100',color:'#97144D'},
  ];
  c.innerHTML = banks.map(b =>
    '<div style="display:flex;justify-content:space-between;align-items:center;padding:12px;background:var(--bg-card2);border-radius:12px;margin-bottom:8px;">' +
    '<div style="display:flex;align-items:center;gap:10px;">' +
    '<div style="width:40px;height:40px;border-radius:10px;background:' + b.color + '22;border:1px solid ' + b.color + '44;display:flex;align-items:center;justify-content:center;font-size:20px;">🏦</div>' +
    '<div><div style="font-size:13px;font-weight:700;">' + b.short + '</div><div style="font-size:11px;color:var(--text-muted);">' + b.name + '</div></div></div>' +
    '<div style="text-align:right;"><div style="font-size:14px;font-weight:700;">' + b.balance + '</div><span class="badge badge-green" style="font-size:10px;">Linked</span></div>' +
    '</div>'
  ).join('');
}

// ── CHARTS ───────────────────────────────────────────────

function initPortfolioChart() {
  const canvas = document.getElementById('portfolioChart');
  if (!canvas || typeof Chart === 'undefined') return;
  if (portfolioChart) { portfolioChart.destroy(); portfolioChart = null; }
  const data = generateChartData('W');
  portfolioChart = new Chart(canvas, {
    type: 'line',
    data: {
      labels: data.labels,
      datasets: [{
        data: data.values,
        borderColor: '#6366f1',
        backgroundColor: function(ctx) {
          const g = ctx.chart.ctx.createLinearGradient(0,0,0,160);
          g.addColorStop(0,'rgba(99,102,241,0.3)');
          g.addColorStop(1,'rgba(99,102,241,0)');
          return g;
        },
        fill: true, tension: 0.4, pointRadius: 0, borderWidth: 2.5,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: {display:false}, tooltip: {
        backgroundColor:'rgba(17,17,32,0.95)',borderColor:'rgba(99,102,241,0.3)',
        borderWidth:1,titleColor:'#e2e8f0',bodyColor:'#94a3b8',
        callbacks: {label: function(ctx) { return ' ₹' + Math.round(ctx.raw).toLocaleString('en-IN'); }}
      }},
      scales: {x:{display:false},y:{display:false}},
      interaction:{intersect:false,mode:'index'},
    }
  });
}

function generateChartData(period) {
  const pts = {D:24,W:7,M:30,Q:90,Y:365}[period] || 7;
  const base = 4500000;
  const vals = []; const labs = [];
  let v = base;
  const seed = [0.5,0.3,0.7,0.4,0.6,0.8,0.2,0.9,0.5,0.3,0.6,0.4,0.7,0.5,0.8,0.2,0.6,0.4,0.7,0.3];
  for (let i=0;i<pts;i++) {
    v += (seed[i%seed.length]-0.45)*v*0.03;
    vals.push(v);
    labs.push(i.toString());
  }
  return {labels:labs, values:vals};
}

window.updateChart = function(period, btn) {
  document.querySelectorAll('#page-dashboard .chip').forEach(function(c){ c.classList.remove('active'); });
  btn.classList.add('active');
  if (portfolioChart) {
    const d = generateChartData(period.replace('1','').replace('3','Q'));
    portfolioChart.data.labels = d.labels;
    portfolioChart.data.datasets[0].data = d.values;
    portfolioChart.update('active');
  }
}

function initDonutChart() {
  const canvas = document.getElementById('donutChart');
  if (!canvas || typeof Chart === 'undefined') return;
  if (donutChart) { donutChart.destroy(); donutChart = null; }
  donutChart = new Chart(canvas, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [79,8,3.5,5.5,1.7,2.3],
        backgroundColor:['#6366f1','#ec4899','#f59e0b','#10b981','#8b5cf6','#06b6d4'],
        borderWidth:2, borderColor:'#111120',
      }]
    },
    options: {
      responsive:true, maintainAspectRatio:false,
      plugins:{legend:{display:false}},
      cutout:'65%',
    }
  });
}

// ── PAYMENTS ─────────────────────────────────────────────

window.switchPayTab = function(tab, btn) {
  document.querySelectorAll('.pay-tab').forEach(function(t){ t.style.display='none'; });
  const el = document.getElementById('tab-'+tab);
  if (el) el.style.display='block';
  document.querySelectorAll('#page-payments .tab-item').forEach(function(b){ b.classList.remove('active'); });
  btn.classList.add('active');
}

window.fillUPI = function(upi) {
  const el = document.getElementById('upiId');
  if(el){ el.value = upi; el.focus(); }
}

window.processUPI = function() {
  const id = document.getElementById('upiId') ? document.getElementById('upiId').value : '';
  const amt = document.getElementById('upiAmount') ? document.getElementById('upiAmount').value : '';
  if (!id || !amt) { showToast('Enter UPI ID and amount','error'); return; }
  showToast('Sending ₹' + amt + ' to ' + id + '... ⚡','info');
  setTimeout(function(){ showToast('Payment Successful! ✓','success'); },1500);
}

window.processUPIModal = function() {
  showToast('UPI payment processing... ⚡','info');
  setTimeout(function(){ showToast('Payment Successful! ✓','success'); closeModal('upiPayModal'); },1500);
}

window.setUPIAmount = function(a) {
  showToast('Amount set to ' + a,'info');
}

window.payBill = function() {
  showToast('Bill payment processing...','info');
  setTimeout(function(){ showToast('Bill paid successfully! ✓','success'); closeModal('billModal'); },1500);
}

// ── SWAP ─────────────────────────────────────────────────

window.updateSwapRate = function() {
  const from = document.getElementById('fromToken') ? document.getElementById('fromToken').value : 'BTC';
  const to = document.getElementById('toToken') ? document.getElementById('toToken').value : 'ETH';
  const amt = parseFloat(document.getElementById('fromAmount') ? document.getElementById('fromAmount').value : '0') || 0;
  const rates = {BTC:6842350,ETH:268430,SOL:14320,BNB:48200,USDT:84,MATIC:68,INR:1,USDC:84};
  if (from && to && rates[from] && rates[to] && amt) {
    const out = (amt * rates[from]) / rates[to];
    const toAmtEl = document.getElementById('toAmount');
    const swapRateEl = document.getElementById('swapRate');
    const exchEl = document.getElementById('exchangeRateText');
    if(toAmtEl) toAmtEl.textContent = '≈ ' + out.toFixed(6) + ' ' + to;
    if(swapRateEl) swapRateEl.textContent = '1 ' + from + ' ≈ ' + (rates[from]/rates[to]).toFixed(4) + ' ' + to;
    if(exchEl) exchEl.textContent = '1 ' + from + ' = ' + (rates[from]/rates[to]).toFixed(4) + ' ' + to;
  }
}

window.swapTokens = function() {
  const f = document.getElementById('fromToken');
  const t = document.getElementById('toToken');
  if(f && t){ const tmp = f.value; f.value = t.value; t.value = tmp; }
  updateSwapRate();
  showToast('Tokens swapped! ⇅','info');
}

window.executeSwap = function() {
  const from = document.getElementById('fromToken') ? document.getElementById('fromToken').value : '';
  const to = document.getElementById('toToken') ? document.getElementById('toToken').value : '';
  const amt = document.getElementById('fromAmount') ? document.getElementById('fromAmount').value : '';
  if (!amt || amt<=0) { showToast('Enter an amount to swap','error'); return; }
  showToast('Swapping ' + amt + ' ' + from + ' → ' + to + '... ⚡','info');
  setTimeout(function(){ showToast('Swap successful! Sub-2s ✓','success'); },1200);
}

window.switchConvertTab = function(t,btn) {
  document.querySelectorAll('#page-swap .tab-item').forEach(function(b){b.classList.remove('active');});
  btn.classList.add('active');
}

window.calcFiatCrypto = function() {
  const amt = parseFloat(document.getElementById('fiatAmount') ? document.getElementById('fiatAmount').value : '0') || 0;
  const btcPrice = 6842350;
  const el = document.getElementById('cryptoOutput');
  if(el) el.textContent = '≈ ' + (amt/btcPrice).toFixed(8) + ' BTC';
}

// ── BRIDGE ────────────────────────────────────────────────

window.swapBridgeChains = function() {
  const f = document.getElementById('fromChain');
  const t = document.getElementById('toChain');
  if(f&&t){ const tmp = f.value; f.value = t.value; t.value = tmp; }
  showToast('Chains swapped! ⇄','info');
}

window.selectBridgeNetwork = function(name, el) {
  const fc = document.getElementById('fromChain');
  if(fc) fc.value = name;
  showToast(name + ' selected as source chain','info');
}

window.executeBridge = function() {
  const from = document.getElementById('fromChain') ? document.getElementById('fromChain').value : '';
  const to = document.getElementById('toChain') ? document.getElementById('toChain').value : '';
  const token = document.getElementById('bridgeToken') ? document.getElementById('bridgeToken').value : '';
  const amt = document.getElementById('bridgeAmount') ? document.getElementById('bridgeAmount').value : '';
  if (!amt) { showToast('Enter bridge amount','error'); return; }
  showToast('Bridging ' + amt + ' ' + token + ' from ' + from + ' to ' + to + '... 🔗','info');
  setTimeout(function(){ showToast('Bridge initiated! Est. 5-10 min ✓','success'); },1500);
}

// ── SECURITY ─────────────────────────────────────────────

window.toggleSecurity = function(el) {
  const isOn = el.style.background === 'rgb(16, 185, 129)';
  el.style.background = isOn ? 'var(--bg-card2)' : '#10b981';
  el.style.borderColor = isOn ? 'var(--border)' : '#10b981';
  const dot = el.querySelector('div');
  if(dot){ dot.style.right = isOn ? 'auto' : '2px'; dot.style.left = isOn ? '2px' : 'auto'; }
  showToast(isOn ? 'Feature disabled' : 'Feature enabled ✓', isOn ? 'warning' : 'success');
}

// ── PORTFOLIO ────────────────────────────────────────────

window.filterPortfolio = function(filter, btn) {
  document.querySelectorAll('#page-portfolio .tab-item').forEach(function(b){b.classList.remove('active');});
  btn.classList.add('active');
  let list = tokens;
  if (filter === 'Crypto') list = tokens.filter(function(t){return !['USDT','USDC'].includes(t.symbol);});
  if (filter === 'Fiat') list = tokens.filter(function(t){return ['USDT','USDC'].includes(t.symbol);});
  const c = document.getElementById('portfolioTokenList');
  if(c){ c.innerHTML=''; list.forEach(function(t){ c.appendChild(buildTokenRow(t,false)); }); }
}

window.filterMarket = function(filter, btn) {
  document.querySelectorAll('#page-crypto .chip').forEach(function(b){b.classList.remove('active');});
  btn.classList.add('active');
  let list = tokens;
  if (filter==='top') list = tokens.slice(0,10);
  if (filter==='gainers') list = tokens.slice().sort(function(a,b){return b.change-a.change;}).slice(0,10);
  renderMarketTokens(list);
}

window.searchTokens = function(q) {
  const list = tokens.filter(function(t){
    return t.symbol.toLowerCase().includes(q.toLowerCase())||t.name.toLowerCase().includes(q.toLowerCase());
  });
  renderMarketTokens(list);
}

// ── DeFi ─────────────────────────────────────────────────

window.switchDefiTab = function(tab, btn) {
  document.querySelectorAll('#page-defi .tab-item').forEach(function(b){b.classList.remove('active');});
  btn.classList.add('active');
  showToast('Showing ' + tab + ' positions','info');
}

// ── MISC ─────────────────────────────────────────────────

window.toggleBalanceVisible = function() {
  balanceVisible = !balanceVisible;
  const bal = document.getElementById('totalBalance');
  const eye = document.getElementById('eyeIcon');
  if (bal) bal.textContent = balanceVisible ? '₹48,24,650' : '₹••,••,•••';
  if (eye) eye.className = balanceVisible ? 'fas fa-eye' : 'fas fa-eye-slash';
}

window.setLanguage = function(code, btn) {
  document.querySelectorAll('#page-settings .chip').forEach(function(b){ b.classList.remove('active'); });
  btn.classList.add('active');
  const names = {en:'English',hi:'Hindi',bn:'Bengali',te:'Telugu',ta:'Tamil',mr:'Marathi',gu:'Gujarati',kn:'Kannada'};
  showToast('Language set to ' + (names[code]||code),'success');
}

window.setCurrency = function(c, btn) {
  document.querySelectorAll('#page-settings .chip').forEach(function(b){ b.classList.remove('active'); });
  btn.classList.add('active');
  showToast('Currency set to ' + c,'success');
}

window.submitSend = function() {
  const to = document.getElementById('sendToAddr') ? document.getElementById('sendToAddr').value : '';
  const amt = document.getElementById('sendAmt') ? document.getElementById('sendAmt').value : '';
  const token = document.getElementById('sendToken') ? document.getElementById('sendToken').value : '';
  if (!to || !amt) { showToast('Fill all required fields','error'); return; }
  showToast('Sending ' + amt + ' ' + token + '... ⚡','info');
  setTimeout(function(){ showToast('Transaction confirmed! <2s ✓','success'); closeModal('sendModal'); },1500);
}

window.switchSendType = function(type, btn) {
  document.querySelectorAll('#sendModal .tab-item').forEach(function(b){b.classList.remove('active');});
  btn.classList.add('active');
  const placeholders = {crypto:'0x... / bc1... (wallet address)',upi:'name@bank (UPI ID)',bank:'Account number'};
  const el = document.getElementById('sendToAddr');
  if(el) el.placeholder = placeholders[type] || '';
}

window.openTokenDetail = function(symbol) {
  showToast(symbol + ' — Tap to view chart & trade 📈','info');
}

// ── LIVE PRICES SIMULATION ───────────────────────────────

function simulateLivePrices() {
  setInterval(function() {
    const seed = [0.1,-0.2,0.15,-0.05,0.2,-0.1,0.05,-0.15,0.18,-0.08];
    tokens.forEach(function(t, i) {
      const delta = seed[i%seed.length] * 0.5;
      t.price *= (1 + delta/100);
      t.change = Math.round((t.change + delta*0.1)*100)/100;
    });
  }, 8000);
}

// ── NETWORK STATUS ────────────────────────────────────────

function checkNetworkStatus() {
  const el = document.getElementById('networkStatus');
  window.addEventListener('offline', function(){
    if(el) { el.className='badge badge-red'; el.innerHTML='<i class="fas fa-circle" style="font-size:6px;"></i> Offline'; }
    showToast('Offline mode active — cached data shown','warning');
  });
  window.addEventListener('online', function(){
    if(el) { el.className='badge badge-green'; el.innerHTML='<i class="fas fa-circle" style="font-size:6px;"></i> Online'; }
    showToast('Back online! Syncing...','success');
  });
}

// ── AUTO-UNLOCK (DEMO) ────────────────────────────────────

// For demo: auto unlock after a brief moment
window.addEventListener('DOMContentLoaded', function() {
  // User can click biometric or enter PIN
  // For demo purposes, the lock screen is ready
});
