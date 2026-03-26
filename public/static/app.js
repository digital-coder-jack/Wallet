// ═══════════════════════════════════════════════════════════════════
// NEXWALLET — FULLY FUNCTIONAL CLIENT ENGINE v3.0
// ═══════════════════════════════════════════════════════════════════

// ── STATE ────────────────────────────────────────────────────────────
const STATE = {
  pin: '',
  balanceVisible: true,
  currentLang: 'en',
  currentCurrency: 'INR',
  portfolioChart: null,
  donutChart: null,
  selectedToken: null,
  defiModal: { protocol: '', type: '' },
  stakingModal: { token: '', protocol: '' },
  profile: {
    name: 'Arjun Kumar',
    email: 'arjun.kumar@gmail.com',
    phone: '+91 98765 43210',
    dob: '1995-03-14',
    pan: 'ABCDE1234F',
    aadhar: 'XXXX XXXX 5678',
    kyc: 'Level 3',
    avatar: '🧑'
  },
  portfolio: {
    total: 4824650,
    crypto: 3820000,
    fiat: 264150,
    defi: 168500,
    nft: 386400,
    staking: 84600,
  },
  upiBalance: 93753,   // used today
  defiPositions: [
    { id:'aave', name:'Aave V3', type:'Lending', chain:'ETH', apy:8.42, deposited:45000, earned:1890, color:'#B6509E', token:'USDC' },
    { id:'uni',  name:'Uniswap V3', type:'LP', chain:'ETH', apy:24.5, deposited:28000, earned:3430, color:'#FF007A', token:'ETH/USDC' },
    { id:'curve',name:'Curve 3Pool', type:'Stable LP', chain:'ETH', apy:12.8, deposited:62000, earned:4742, color:'#40649F', token:'3CRV' },
    { id:'comp', name:'Compound', type:'Lending', chain:'ETH', apy:5.21, deposited:15000, earned:782, color:'#00D395', token:'USDT' },
    { id:'cake', name:'PancakeSwap', type:'Farm', chain:'BSC', apy:31.4, deposited:18500, earned:1996, color:'#D1884F', token:'CAKE-LP' },
  ],
  staking: [
    { id:'lido', token:'ETH', protocol:'Lido stETH', amount:2.5, amtVal:268430*2.5, rewards:0.085, rewardsVal:268430*0.085, apy:3.8, days:145, color:'#627EEA', status:'Active' },
    { id:'marinade', token:'SOL', protocol:'Marinade mSOL', amount:45, amtVal:14320*45, rewards:1.2, rewardsVal:14320*1.2, apy:6.5, days:89, color:'#9945FF', status:'Active' },
    { id:'cosmos', token:'ATOM', protocol:'Cosmos Hub', amount:120, amtVal:720*120, rewards:4.5, rewardsVal:720*4.5, apy:18.2, days:220, color:'#2E3148', status:'Active' },
    { id:'dot', token:'DOT', protocol:'Polkadot', amount:80, amtVal:580*80, rewards:2.1, rewardsVal:580*2.1, apy:12.4, days:28, color:'#E6007A', status:'Unbonding' },
  ],
  transactions: [
    {id:1,type:'receive',asset:'BTC',amount:'+0.0025 BTC',value:'₹17,106',time:'2 min ago',status:'completed',note:'From: 3Kj9...mN2p'},
    {id:2,type:'send',asset:'ETH',amount:'-0.15 ETH',value:'₹40,265',time:'1 hr ago',status:'completed',note:'To: 0x8a3...f21c'},
    {id:3,type:'upi',asset:'INR',amount:'-₹5,000',value:'₹5,000',time:'3 hr ago',status:'completed',note:'To: priya@ybl'},
    {id:4,type:'swap',asset:'SOL→ETH',amount:'5 SOL → 0.26 ETH',value:'₹69,799',time:'5 hr ago',status:'completed',note:'Via Uniswap V3'},
    {id:5,type:'defi',asset:'AAVE',amount:'+₹380 yield',value:'₹380',time:'8 hr ago',status:'completed',note:'Aave V3 interest'},
    {id:6,type:'bill',asset:'INR',amount:'-₹1,247',value:'₹1,247',time:'1 day ago',status:'completed',note:'BSES Electricity'},
    {id:7,type:'nft',asset:'NFT',amount:'Bought Azuki #1204',value:'₹3,22,000',time:'2 days ago',status:'completed',note:'OpenSea'},
    {id:8,type:'stake',asset:'ETH',amount:'Staked 1.0 ETH',value:'₹2,68,430',time:'3 days ago',status:'completed',note:'Lido Finance'},
    {id:9,type:'receive',asset:'USDT',amount:'+500 USDT',value:'₹42,000',time:'4 days ago',status:'completed',note:'From: raj@okicici'},
    {id:10,type:'send',asset:'MATIC',amount:'-100 MATIC',value:'₹6,800',time:'5 days ago',status:'completed',note:'To: 0xd3f...a22b'},
  ],
  securitySettings: {
    biometric: true, pin: true, txAlerts: true, ipWhitelist: false,
    withdrawLimit: true, addressWhitelist: true, antiPhishing: true, loginHistory: true
  },
  notifSettings: { priceAlerts: true, txConfirm: true, defiYield: true, nftFloor: false, billReminders: true },
  offlineSettings: { viewPortfolio: true, cachePrice: true, queueTx: true, offlineQR: true },
  notifications: [
    {id:1,icon:'fas fa-arrow-down',color:'#10b981',title:'BTC Received',msg:'0.0025 BTC received from 3Kj9...mN2p',time:'2 min ago',unread:true},
    {id:2,icon:'fas fa-chart-line',color:'#6366f1',title:'ETH Price Alert',msg:'ETH crossed ₹2,70,000 — up 5.2%',time:'1 hr ago',unread:true},
    {id:3,icon:'fas fa-leaf',color:'#f59e0b',title:'DeFi Yield',msg:'Earned ₹380 from Aave V3 today',time:'8 hr ago',unread:true},
    {id:4,icon:'fas fa-shield-alt',color:'#8b5cf6',title:'Security Alert',msg:'New login from Mumbai, India',time:'2 days ago',unread:false},
    {id:5,icon:'fas fa-file-invoice',color:'#ef4444',title:'Bill Due',msg:'BSES Electricity ₹1,247 due in 3 days',time:'3 days ago',unread:false},
  ],
};

const CURRENCY_RATES = { INR:1, USD:0.012, EUR:0.011, GBP:0.0094, JPY:1.78 };
const CURRENCY_SYMBOLS = { INR:'₹', USD:'$', EUR:'€', GBP:'£', JPY:'¥' };

const LANGS = {
  en: {
    home:'Home', portfolio:'Portfolio', pay:'Pay', markets:'Markets', defi:'DeFi', more:'More',
    totalPortfolio:'TOTAL PORTFOLIO', goodMorning:'Good morning', online:'Online', offline:'Offline',
    send:'Send', receive:'Receive', swap:'Swap', payments:'Payments', bridge:'Bridge', nfts:'NFTs',
    topAssets:'Top Assets', seeAll:'See All', recentActivity:'Recent Activity',
    securityStatus:'Security Status', secure:'Secure',
    deposit:'Deposit', withdraw:'Withdraw', claimRewards:'Claim Rewards',
    cancel:'Cancel', confirm:'Confirm', save:'Save', edit:'Edit', back:'Back',
    amount:'Amount', note:'Note', success:'Success!', processing:'Processing...',
    language:'Language', currency:'Display Currency', profile:'Profile',
    settings:'Settings', lockWallet:'Lock Wallet', version:'Version',
    deposit_success:'Deposit successful!', withdraw_success:'Withdrawal successful!',
    swap_success:'Swap executed! ✓', send_success:'Sent successfully! ✓',
    upi_success:'UPI payment successful! ✓', bill_success:'Bill paid successfully! ✓',
    bridge_success:'Bridge initiated! ~5-10 min ✓', stake_success:'Staked successfully! ✓',
    claim_success:'Rewards claimed! ✓', profile_saved:'Profile updated! ✓',
    lang_changed:'Language changed to English ✓',
  },
  hi: {
    home:'होम', portfolio:'पोर्टफोलियो', pay:'भुगतान', markets:'बाजार', defi:'डीफाई', more:'अधिक',
    totalPortfolio:'कुल पोर्टफोलियो', goodMorning:'शुभ प्रभात', online:'ऑनलाइन', offline:'ऑफलाइन',
    send:'भेजें', receive:'प्राप्त करें', swap:'स्वैप', payments:'भुगतान', bridge:'ब्रिज', nfts:'एनएफटी',
    topAssets:'शीर्ष संपत्तियाँ', seeAll:'सभी देखें', recentActivity:'हाल की गतिविधि',
    securityStatus:'सुरक्षा स्थिति', secure:'सुरक्षित',
    deposit:'जमा करें', withdraw:'निकालें', claimRewards:'पुरस्कार प्राप्त करें',
    cancel:'रद्द करें', confirm:'पुष्टि करें', save:'सहेजें', edit:'संपादित करें', back:'वापस',
    amount:'राशि', note:'नोट', success:'सफलता!', processing:'प्रसंस्करण...',
    language:'भाषा', currency:'मुद्रा', profile:'प्रोफाइल',
    settings:'सेटिंग्स', lockWallet:'वॉलेट लॉक करें', version:'संस्करण',
    deposit_success:'जमा सफल!', withdraw_success:'निकासी सफल!',
    swap_success:'स्वैप सफल! ✓', send_success:'सफलतापूर्वक भेजा! ✓',
    upi_success:'UPI भुगतान सफल! ✓', bill_success:'बिल भुगतान सफल! ✓',
    bridge_success:'ब्रिज शुरू! ~5-10 मिनट ✓', stake_success:'स्टेकिंग सफल! ✓',
    claim_success:'पुरस्कार प्राप्त! ✓', profile_saved:'प्रोफाइल अपडेट! ✓',
    lang_changed:'भाषा हिंदी में बदली ✓',
  },
  bn: {
    home:'হোম', portfolio:'পোর্টফোলিও', pay:'পেমেন্ট', markets:'বাজার', defi:'ডিফাই', more:'আরো',
    totalPortfolio:'মোট পোর্টফোলিও', goodMorning:'শুভ সকাল', online:'অনলাইন', offline:'অফলাইন',
    send:'পাঠান', receive:'গ্রহণ', swap:'সোয়াপ', payments:'পেমেন্ট', bridge:'ব্রিজ', nfts:'এনএফটি',
    topAssets:'শীর্ষ সম্পদ', seeAll:'সব দেখুন', recentActivity:'সাম্প্রতিক কার্যকলাপ',
    securityStatus:'নিরাপত্তা', secure:'সুরক্ষিত',
    deposit:'জমা', withdraw:'তোলা', claimRewards:'পুরস্কার নিন',
    cancel:'বাতিল', confirm:'নিশ্চিত', save:'সংরক্ষণ', edit:'সম্পাদনা', back:'ফিরুন',
    amount:'পরিমাণ', note:'নোট', success:'সফল!', processing:'প্রক্রিয়াকরণ...',
    language:'ভাষা', currency:'মুদ্রা', profile:'প্রোফাইল',
    settings:'সেটিংস', lockWallet:'ওয়ালেট লক', version:'সংস্করণ',
    deposit_success:'জমা সফল!', withdraw_success:'তোলা সফল!',
    swap_success:'সোয়াপ সফল! ✓', send_success:'পাঠানো সফল! ✓',
    upi_success:'UPI পেমেন্ট সফল! ✓', bill_success:'বিল পেমেন্ট সফল! ✓',
    bridge_success:'ব্রিজ শুরু! ~5-10 মিনিট ✓', stake_success:'স্টেকিং সফল! ✓',
    claim_success:'পুরস্কার পাওয়া গেল! ✓', profile_saved:'প্রোফাইল আপডেট! ✓',
    lang_changed:'ভাষা বাংলায় পরিবর্তিত ✓',
  },
  te: {
    home:'హోమ్', portfolio:'పోర్ట్‌ఫోలియో', pay:'చెల్లింపు', markets:'మార్కెట్లు', defi:'డీఫై', more:'మరిన్ని',
    totalPortfolio:'మొత్తం పోర్ట్‌ఫోలియో', goodMorning:'శుభోదయం', online:'ఆన్‌లైన్', offline:'ఆఫ్‌లైన్',
    send:'పంపు', receive:'స్వీకరించు', swap:'స్వాప్', payments:'చెల్లింపులు', bridge:'బ్రిడ్జ్', nfts:'NFTs',
    topAssets:'అగ్ర ఆస్తులు', seeAll:'అన్నీ చూడు', recentActivity:'ఇటీవలి కార్యకలాపాలు',
    securityStatus:'భద్రత స్థితి', secure:'సురక్షితం',
    deposit:'డిపాజిట్', withdraw:'ఉపసంహరణ', claimRewards:'బహుమతులు క్లెయిమ్',
    cancel:'రద్దు', confirm:'నిర్ధారించు', save:'సేవ్', edit:'సవరించు', back:'వెనక్కి',
    amount:'మొత్తం', note:'గమనిక', success:'విజయవంతం!', processing:'ప్రాసెసింగ్...',
    language:'భాష', currency:'కరెన్సీ', profile:'ప్రొఫైల్',
    settings:'సెట్టింగ్స్', lockWallet:'వాలెట్ లాక్', version:'వెర్షన్',
    deposit_success:'డిపాజిట్ విజయవంతం!', withdraw_success:'ఉపసంహరణ విజయవంతం!',
    swap_success:'స్వాప్ విజయవంతం! ✓', send_success:'పంపడం విజయవంతం! ✓',
    upi_success:'UPI చెల్లింపు విజయవంతం! ✓', bill_success:'బిల్లు చెల్లింపు విజయవంతం! ✓',
    bridge_success:'బ్రిడ్జ్ ప్రారంభం! ~5-10 నిమి ✓', stake_success:'స్టేకింగ్ విజయవంతం! ✓',
    claim_success:'బహుమతులు క్లెయిమ్! ✓', profile_saved:'ప్రొఫైల్ అప్‌డేట్! ✓',
    lang_changed:'భాష తెలుగుకు మారింది ✓',
  },
  ta: {
    home:'முகப்பு', portfolio:'போர்ட்ஃபோலியோ', pay:'கட்டணம்', markets:'சந்தைகள்', defi:'டிஃபை', more:'மேலும்',
    totalPortfolio:'மொத்த போர்ட்ஃபோலியோ', goodMorning:'காலை வணக்கம்', online:'ஆன்லைன்', offline:'ஆஃப்லைன்',
    send:'அனுப்பு', receive:'பெறு', swap:'மாற்று', payments:'கட்டணங்கள்', bridge:'பாலம்', nfts:'NFTs',
    topAssets:'முதல் சொத்துக்கள்', seeAll:'அனைத்தையும் பார்', recentActivity:'சமீபத்திய செயல்பாடு',
    securityStatus:'பாதுகாப்பு நிலை', secure:'பாதுகாப்பான',
    deposit:'வைப்பு', withdraw:'எடுத்தல்', claimRewards:'வெகுமதிகள் பெறு',
    cancel:'ரத்து', confirm:'உறுதிப்படுத்து', save:'சேமி', edit:'திருத்து', back:'திரும்பு',
    amount:'தொகை', note:'குறிப்பு', success:'வெற்றி!', processing:'செயலாக்குகிறது...',
    language:'மொழி', currency:'நாணயம்', profile:'சுயவிவரம்',
    settings:'அமைப்புகள்', lockWallet:'வாலெட் பூட்டு', version:'பதிப்பு',
    deposit_success:'வைப்பு வெற்றி!', withdraw_success:'எடுத்தல் வெற்றி!',
    swap_success:'மாற்று வெற்றி! ✓', send_success:'அனுப்பல் வெற்றி! ✓',
    upi_success:'UPI கட்டணம் வெற்றி! ✓', bill_success:'பில் கட்டணம் வெற்றி! ✓',
    bridge_success:'பாலம் தொடங்கியது! ~5-10 நிமி ✓', stake_success:'ஸ்டேக்கிங் வெற்றி! ✓',
    claim_success:'வெகுமதிகள் பெறப்பட்டன! ✓', profile_saved:'சுயவிவரம் புதுப்பிக்கப்பட்டது! ✓',
    lang_changed:'மொழி தமிழுக்கு மாற்றப்பட்டது ✓',
  },
  mr: {
    home:'मुख्यपृष्ठ', portfolio:'पोर्टफोलिओ', pay:'पेमेंट', markets:'बाजार', defi:'डीफाय', more:'अधिक',
    totalPortfolio:'एकूण पोर्टफोलिओ', goodMorning:'शुभ प्रभात', online:'ऑनलाइन', offline:'ऑफलाइन',
    send:'पाठवा', receive:'प्राप्त करा', swap:'स्वॅप', payments:'पेमेंट', bridge:'ब्रिज', nfts:'NFTs',
    topAssets:'शीर्ष मालमत्ता', seeAll:'सर्व पहा', recentActivity:'अलीकडील क्रियाकलाप',
    securityStatus:'सुरक्षा स्थिती', secure:'सुरक्षित',
    deposit:'जमा', withdraw:'काढा', claimRewards:'बक्षिसे मिळवा',
    cancel:'रद्द करा', confirm:'पुष्टी करा', save:'जतन करा', edit:'संपादित करा', back:'मागे',
    amount:'रक्कम', note:'टीप', success:'यश!', processing:'प्रक्रिया होत आहे...',
    language:'भाषा', currency:'चलन', profile:'प्रोफाइल',
    settings:'सेटिंग्ज', lockWallet:'वॉलेट लॉक करा', version:'आवृत्ती',
    deposit_success:'जमा यशस्वी!', withdraw_success:'काढणे यशस्वी!',
    swap_success:'स्वॅप यशस्वी! ✓', send_success:'पाठवणे यशस्वी! ✓',
    upi_success:'UPI पेमेंट यशस्वी! ✓', bill_success:'बिल पेमेंट यशस्वी! ✓',
    bridge_success:'ब्रिज सुरू! ~5-10 मिनिटे ✓', stake_success:'स्टेकिंग यशस्वी! ✓',
    claim_success:'बक्षिसे मिळाली! ✓', profile_saved:'प्रोफाइल अपडेट! ✓',
    lang_changed:'भाषा मराठीत बदलली ✓',
  },
  gu: {
    home:'હોમ', portfolio:'પોર્ટફોલિઓ', pay:'પેમેન્ટ', markets:'બજાર', defi:'ડીફાઈ', more:'વધુ',
    totalPortfolio:'કુલ પોર્ટફોલિઓ', goodMorning:'શુભ સવાર', online:'ઓનલાઈન', offline:'ઓફલાઈન',
    send:'મોકલો', receive:'પ્રાપ્ત કરો', swap:'સ્વેપ', payments:'પેમેન્ટ', bridge:'બ્રિજ', nfts:'NFTs',
    topAssets:'ટોચની અસ્કયામત', seeAll:'બધું જુઓ', recentActivity:'તાજેતરની પ્રવૃત્તિ',
    securityStatus:'સુરક્ષા સ્થિતિ', secure:'સુરક્ષિત',
    deposit:'જમા', withdraw:'ઉપાડ', claimRewards:'પુરસ્કાર મેળવો',
    cancel:'રદ', confirm:'પુષ્ટિ', save:'સાચવો', edit:'સંપાદિત', back:'પાછળ',
    amount:'રકમ', note:'નોંધ', success:'સફળ!', processing:'પ્રક્રિયા...',
    language:'ભાષા', currency:'ચલણ', profile:'પ્રોફાઇલ',
    settings:'સેટિંગ્સ', lockWallet:'વોલેટ લૉક', version:'સંસ્કરણ',
    deposit_success:'જમા સફળ!', withdraw_success:'ઉપાડ સફળ!',
    swap_success:'સ્વેપ સફળ! ✓', send_success:'મોકલ્યું! ✓',
    upi_success:'UPI ચૂકવણી સફળ! ✓', bill_success:'બિલ ચૂકવણી સફળ! ✓',
    bridge_success:'બ્રિજ શરૂ! ~5-10 મિ ✓', stake_success:'સ્ટેકિંગ સફળ! ✓',
    claim_success:'પુરસ્કાર મળ્યા! ✓', profile_saved:'પ્રોફાઇલ અપડેટ! ✓',
    lang_changed:'ભાષા ગુજરાતીમાં બદલી ✓',
  },
  kn: {
    home:'ಮನೆ', portfolio:'ಪೋರ್ಟ್‌ಫೋಲಿಯೊ', pay:'ಪಾವತಿ', markets:'ಮಾರುಕಟ್ಟೆ', defi:'ಡೀಫೈ', more:'ಇನ್ನಷ್ಟು',
    totalPortfolio:'ಒಟ್ಟು ಪೋರ್ಟ್‌ಫೋಲಿಯೊ', goodMorning:'ಶುಭೋದಯ', online:'ಆನ್‌ಲೈನ್', offline:'ಆಫ್‌ಲೈನ್',
    send:'ಕಳುಹಿಸಿ', receive:'ಸ್ವೀಕರಿಸಿ', swap:'ಸ್ವಾಪ್', payments:'ಪಾವತಿಗಳು', bridge:'ಬ್ರಿಡ್ಜ್', nfts:'NFTs',
    topAssets:'ಪ್ರಮುಖ ಆಸ್ತಿಗಳು', seeAll:'ಎಲ್ಲ ನೋಡಿ', recentActivity:'ಇತ್ತೀಚಿನ ಚಟುವಟಿಕೆ',
    securityStatus:'ಭದ್ರತಾ ಸ್ಥಿತಿ', secure:'ಸುರಕ್ಷಿತ',
    deposit:'ಠೇವಣಿ', withdraw:'ಹಿಂಪಡೆಯಿರಿ', claimRewards:'ಪ್ರತಿಫಲ ಪಡೆಯಿರಿ',
    cancel:'ರದ್ದು', confirm:'ದೃಢಪಡಿಸಿ', save:'ಉಳಿಸಿ', edit:'ಸಂಪಾದಿಸಿ', back:'ಹಿಂದೆ',
    amount:'ಮೊತ್ತ', note:'ಟಿಪ್ಪಣಿ', success:'ಯಶಸ್ವಿ!', processing:'ಪ್ರಕ್ರಿಯೆ...',
    language:'ಭಾಷೆ', currency:'ಕರೆನ್ಸಿ', profile:'ಪ್ರೊಫೈಲ್',
    settings:'ಸೆಟ್ಟಿಂಗ್‌ಗಳು', lockWallet:'ವಾಲೆಟ್ ಲಾಕ್', version:'ಆವೃತ್ತಿ',
    deposit_success:'ಠೇವಣಿ ಯಶಸ್ವಿ!', withdraw_success:'ಹಿಂಪಡೆಯುವಿಕೆ ಯಶಸ್ವಿ!',
    swap_success:'ಸ್ವಾಪ್ ಯಶಸ್ವಿ! ✓', send_success:'ಕಳುಹಿಸಲಾಯಿತು! ✓',
    upi_success:'UPI ಪಾವತಿ ಯಶಸ್ವಿ! ✓', bill_success:'ಬಿಲ್ ಪಾವತಿ ಯಶಸ್ವಿ! ✓',
    bridge_success:'ಬ್ರಿಡ್ಜ್ ಪ್ರಾರಂಭ! ~5-10 ನಿಮಿ ✓', stake_success:'ಸ್ಟೇಕಿಂಗ್ ಯಶಸ್ವಿ! ✓',
    claim_success:'ಪ್ರತಿಫಲ ಪಡೆದೆ! ✓', profile_saved:'ಪ್ರೊಫೈಲ್ ಅಪ್‌ಡೇಟ್! ✓',
    lang_changed:'ಭಾಷೆ ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿತು ✓',
  }
};

function t(key) {
  return (LANGS[STATE.currentLang] || LANGS.en)[key] || (LANGS.en)[key] || key;
}

// ── TOKEN DATA ────────────────────────────────────────────────────────
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

const txTypes = {
  receive:{icon:'fas fa-arrow-down',color:'#10b981',label:'Received'},
  send:{icon:'fas fa-arrow-up',color:'#ef4444',label:'Sent'},
  upi:{icon:'fas fa-at',color:'#06b6d4',label:'UPI'},
  swap:{icon:'fas fa-exchange-alt',color:'#8b5cf6',label:'Swap'},
  defi:{icon:'fas fa-leaf',color:'#f59e0b',label:'DeFi'},
  bill:{icon:'fas fa-file-invoice',color:'#f97316',label:'Bill'},
  nft:{icon:'fas fa-image',color:'#ec4899',label:'NFT'},
  stake:{icon:'fas fa-lock',color:'#6366f1',label:'Staked'},
  deposit:{icon:'fas fa-arrow-circle-down',color:'#10b981',label:'Deposit'},
  withdraw:{icon:'fas fa-arrow-circle-up',color:'#f59e0b',label:'Withdraw'},
};

// ── LOCK SCREEN ───────────────────────────────────────────────────────
window.pinInput = function(key) {
  if (key === '<') { STATE.pin = STATE.pin.slice(0,-1); }
  else if (key !== '*' && STATE.pin.length < 6) { STATE.pin += key; }
  updatePinDots();
  if (STATE.pin.length === 6) setTimeout(unlockApp, 300);
};

function updatePinDots() {
  document.querySelectorAll('.pin-dot').forEach(function(d,i){
    d.style.background = i < STATE.pin.length ? '#6366f1' : 'transparent';
  });
}

window.unlockBiometric = function() {
  const btn = document.querySelector('.bio-btn');
  if (btn) btn.style.boxShadow = '0 0 50px rgba(99,102,241,0.9)';
  showToast('Biometric verified! ✓', 'success');
  setTimeout(unlockApp, 600);
};

function unlockApp() {
  const lock = document.getElementById('lockScreen');
  const appEl = document.getElementById('app');
  if (!lock || !appEl) return;
  lock.style.opacity = '0';
  lock.style.transition = 'opacity 0.5s ease';
  setTimeout(function() {
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
  STATE.pin = '';
  updatePinDots();
};

// ── INIT ─────────────────────────────────────────────────────────────
function initApp() {
  applyLanguage(STATE.currentLang);
  renderTopAssets();
  renderRecentTxns();
  renderPortfolioTokens();
  renderMarketTokens(tokens);
  renderBankList();
  renderAllTransactions();
  renderDefiPositions();
  renderStakingPositions();
  renderNotifications();
  renderSecuritySettings();
  renderNotifSettings();
  renderOfflineSettings();
  loadProfileUI();
  initPortfolioChart();
  initDonutChart();
  simulateLivePrices();
  checkNetworkStatus();
}

// ── NAVIGATION ────────────────────────────────────────────────────────
window.showPage = function(name) {
  document.querySelectorAll('.page').forEach(function(p){ p.classList.remove('active'); });
  document.querySelectorAll('.nav-item').forEach(function(n){ n.classList.remove('active'); });
  var page = document.getElementById('page-' + name);
  if (page) { page.classList.add('active'); window.scrollTo(0,0); }
  var nav = document.getElementById('nav-' + name);
  if (nav) nav.classList.add('active');
  if (name === 'portfolio') setTimeout(initDonutChart, 100);
  if (name === 'dashboard') setTimeout(initPortfolioChart, 100);
  if (name === 'defi') { renderDefiPositions(); renderStakingPositions(); }
  if (name === 'activity') renderAllTransactions();
  if (name === 'notifications') renderNotifications();
};

// ── MODAL ─────────────────────────────────────────────────────────────
window.openModal = function(id) {
  var m = document.getElementById(id);
  if (!m) return;
  m.style.display = 'flex';
  setTimeout(function(){ m.classList.add('visible'); }, 10);
};

window.closeModal = function(id) {
  var m = document.getElementById(id);
  if (!m) return;
  m.classList.remove('visible');
  setTimeout(function(){ m.style.display = 'none'; }, 350);
};

window.closeModalOnOverlay = function(e, id) {
  if (e.target.classList.contains('modal-overlay')) window.closeModal(id);
};

// ── TOAST ──────────────────────────────────────────────────────────────
window.showToast = function(msg, type) {
  type = type || 'info';
  // Remove old toasts
  document.querySelectorAll('.toast').forEach(function(t){ t.remove(); });
  var toast = document.createElement('div');
  toast.className = 'toast';
  var colors = {success:'#10b981',error:'#ef4444',info:'#6366f1',warning:'#f59e0b'};
  var icons = {success:'fa-check-circle',error:'fa-times-circle',info:'fa-info-circle',warning:'fa-exclamation-triangle'};
  toast.innerHTML = '<i class="fas '+(icons[type]||'fa-info-circle')+'" style="color:'+(colors[type]||'#6366f1')+';font-size:18px;flex-shrink:0;"></i><span style="font-size:13px;font-weight:500;line-height:1.4;">'+msg+'</span>';
  document.body.appendChild(toast);
  setTimeout(function(){
    toast.style.opacity = '0'; toast.style.transition = 'opacity 0.3s';
    setTimeout(function(){ toast.remove(); }, 300);
  }, 3500);
};

// ── STEP LOADER (shows animated progress steps) ──────────────────────
function showProcessingModal(steps, onDone) {
  var modal = document.getElementById('processingModal');
  var list = document.getElementById('processingSteps');
  if (!modal || !list) { onDone && onDone(); return; }
  list.innerHTML = steps.map(function(s,i){
    return '<div class="proc-step" id="pstep'+i+'" style="display:flex;align-items:center;gap:10px;padding:8px 0;opacity:0.4;transition:opacity 0.3s;">'
      +'<div class="proc-icon" style="width:28px;height:28px;border-radius:50%;background:rgba(99,102,241,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;">'
      +'<i class="fas fa-circle" style="font-size:8px;color:#64748b;"></i></div>'
      +'<span style="font-size:13px;">'+s+'</span></div>';
  }).join('');
  modal.style.display = 'flex';
  setTimeout(function(){ modal.classList.add('visible'); }, 10);
  var i = 0;
  function nextStep() {
    if (i > 0) {
      var prev = document.getElementById('pstep'+(i-1));
      if (prev) {
        prev.style.opacity = '1';
        var ico = prev.querySelector('.proc-icon');
        if (ico) ico.innerHTML = '<i class="fas fa-check-circle" style="color:#10b981;font-size:16px;"></i>';
      }
    }
    if (i < steps.length) {
      var cur = document.getElementById('pstep'+i);
      if (cur) {
        cur.style.opacity = '1';
        var cico = cur.querySelector('.proc-icon');
        if (cico) cico.innerHTML = '<i class="fas fa-spinner" style="color:#6366f1;font-size:14px;animation:spin 0.8s linear infinite;"></i>';
      }
      i++;
      setTimeout(nextStep, 700);
    } else {
      setTimeout(function(){
        modal.classList.remove('visible');
        setTimeout(function(){
          modal.style.display = 'none';
          onDone && onDone();
        }, 350);
      }, 400);
    }
  }
  nextStep();
}

// ── CURRENCY FORMATTING ───────────────────────────────────────────────
function fmtC(inr) {
  var rate = CURRENCY_RATES[STATE.currentCurrency] || 1;
  var sym = CURRENCY_SYMBOLS[STATE.currentCurrency] || '₹';
  var val = inr * rate;
  if (STATE.currentCurrency === 'INR') {
    if (val >= 10000000) return sym + (val/10000000).toFixed(2) + 'Cr';
    if (val >= 100000) return sym + (val/100000).toFixed(2) + 'L';
    if (val >= 1000) return sym + Math.round(val).toLocaleString('en-IN');
    return sym + val.toFixed(2);
  }
  if (val >= 1000000) return sym + (val/1000000).toFixed(2) + 'M';
  if (val >= 1000) return sym + (val/1000).toFixed(1) + 'K';
  if (val < 0.01) return sym + val.toFixed(6);
  return sym + val.toFixed(2);
}

function fmtPrice(priceInr) { return fmtC(priceInr); }
function fmtValue(bal, priceInr) { return fmtC(bal * priceInr); }

// ── RENDER: TOKEN ROW ──────────────────────────────────────────────────
function buildTokenRow(tk, showTrade) {
  var div = document.createElement('div');
  div.className = 'token-row';
  div.onclick = function(){ openTokenDetail(tk); };

  var icon = document.createElement('div');
  icon.className = 'token-icon';
  icon.style.cssText = 'background:'+tk.color+'22;color:'+tk.color+';font-size:16px;';
  icon.textContent = tk.logo;

  var info = document.createElement('div');
  info.style.flex = '1';
  info.innerHTML = '<div style="display:flex;align-items:center;gap:6px;"><span style="font-size:14px;font-weight:700;">'+tk.symbol+'</span><span class="chain-badge">'+tk.chain+'</span></div>'
    +'<div style="font-size:11px;color:var(--text-muted);">'+tk.name+' · '+tk.balance.toLocaleString()+'</div>';

  var right = document.createElement('div');
  right.style.textAlign = 'right';

  var priceEl = document.createElement('div');
  priceEl.style.cssText = 'font-size:14px;font-weight:700;';
  priceEl.textContent = fmtPrice(tk.price);
  priceEl.setAttribute('data-price-el', tk.symbol);

  var changeEl = document.createElement('div');
  changeEl.style.cssText = 'font-size:11px;color:'+(tk.change>=0?'var(--green)':'var(--red)')+';';
  changeEl.textContent = (tk.change>=0?'+':'')+tk.change.toFixed(2)+'%';

  right.appendChild(priceEl);
  right.appendChild(changeEl);

  if (showTrade) {
    var btn = document.createElement('button');
    btn.className = 'btn-primary';
    btn.style.cssText = 'padding:4px 10px;font-size:10px;margin-top:4px;';
    btn.textContent = 'Trade';
    btn.onclick = function(e){ e.stopPropagation(); openTradeModal(tk); };
    right.appendChild(btn);
  } else {
    var valEl = document.createElement('div');
    valEl.style.cssText = 'font-size:11px;color:var(--text-muted);';
    valEl.textContent = fmtValue(tk.balance, tk.price);
    right.appendChild(valEl);
  }

  div.appendChild(icon); div.appendChild(info); div.appendChild(right);
  return div;
}

function renderTopAssets() { var c=document.getElementById('topAssets'); if(!c)return; c.innerHTML=''; tokens.slice(0,5).forEach(function(t){c.appendChild(buildTokenRow(t,false));}); }
function renderPortfolioTokens(list) { var c=document.getElementById('portfolioTokenList'); if(!c)return; c.innerHTML=''; (list||tokens).forEach(function(t){c.appendChild(buildTokenRow(t,false));}); }
window.renderMarketTokens = function(list) { var c=document.getElementById('marketTokenList'); if(!c)return; c.innerHTML=''; (list||tokens).forEach(function(t){c.appendChild(buildTokenRow(t,true));}); };

// ── TOKEN DETAIL ─────────────────────────────────────────────────────
window.openTokenDetail = function(tk) {
  STATE.selectedToken = tk;
  var modal = document.getElementById('tokenDetailModal');
  if (!modal) { openTradeModal(tk); return; }
  document.getElementById('tdSymbol').textContent = tk.symbol;
  document.getElementById('tdName').textContent = tk.name;
  document.getElementById('tdLogo').textContent = tk.logo;
  document.getElementById('tdLogo').style.color = tk.color;
  document.getElementById('tdPrice').textContent = fmtPrice(tk.price);
  document.getElementById('tdChange').textContent = (tk.change>=0?'+':'')+tk.change.toFixed(2)+'%';
  document.getElementById('tdChange').style.color = tk.change>=0?'#10b981':'#ef4444';
  document.getElementById('tdBalance').textContent = tk.balance.toLocaleString() + ' ' + tk.symbol;
  document.getElementById('tdValue').textContent = fmtValue(tk.balance, tk.price);
  document.getElementById('tdChain').textContent = tk.chain;
  openModal('tokenDetailModal');
};

window.openTradeModal = function(tk) {
  STATE.selectedToken = tk;
  var sym = tk.symbol;
  document.getElementById('tradeSymbol').textContent = sym;
  document.getElementById('tradeLogo').textContent = tk.logo;
  document.getElementById('tradeLogo').style.color = tk.color;
  document.getElementById('tradePrice').textContent = fmtPrice(tk.price);
  document.getElementById('tradeBalance').textContent = 'Balance: '+tk.balance.toLocaleString()+' '+sym;
  document.getElementById('tradeAmtInput').value = '';
  document.getElementById('tradeInrValue').textContent = '≈ '+fmtC(0);
  openModal('tradeModal');
};

window.calcTradeValue = function() {
  var tk = STATE.selectedToken;
  if (!tk) return;
  var mode = document.querySelector('#tradeModeBar .active');
  var modeVal = mode ? mode.getAttribute('data-mode') : 'buy';
  var amt = parseFloat(document.getElementById('tradeAmtInput').value)||0;
  var inrVal = modeVal === 'buy' ? amt : amt * tk.price;
  document.getElementById('tradeInrValue').textContent = '≈ ' + fmtC(modeVal==='buy'?amt:amt*tk.price);
};

window.setTradeMode = function(mode, btn) {
  document.querySelectorAll('#tradeModeBar button').forEach(function(b){b.classList.remove('active');});
  btn.classList.add('active');
  btn.setAttribute('data-mode', mode);
  var tk = STATE.selectedToken;
  if (!tk) return;
  if (mode === 'buy') {
    document.getElementById('tradeAmtLabel').textContent = 'Amount (₹ INR)';
    document.getElementById('tradeAmtInput').placeholder = 'Enter ₹ amount';
  } else {
    document.getElementById('tradeAmtLabel').textContent = 'Amount ('+tk.symbol+')';
    document.getElementById('tradeAmtInput').placeholder = 'Enter '+tk.symbol+' amount';
  }
};

window.executeTrade = function() {
  var tk = STATE.selectedToken;
  if (!tk) return;
  var amt = parseFloat(document.getElementById('tradeAmtInput').value)||0;
  var mode = document.querySelector('#tradeModeBar .active');
  var modeVal = mode ? mode.getAttribute('data-mode') : 'buy';
  if (!amt || amt <= 0) { showToast('Enter a valid amount', 'error'); return; }

  var steps = modeVal==='buy'
    ? ['Verifying funds...', 'Fetching best price...', 'Executing order...', 'Confirming transaction...']
    : ['Checking balance...', 'Finding best rate...', 'Placing sell order...', 'Settlement...'];

  closeModal('tradeModal');
  showProcessingModal(steps, function() {
    if (modeVal === 'buy') {
      var tokensGot = amt / tk.price;
      tk.balance += tokensGot;
      STATE.portfolio.crypto += amt;
      STATE.portfolio.total += amt;
      addTransaction({type:'receive', asset:tk.symbol, amount:'+'+tokensGot.toFixed(6)+' '+tk.symbol, value:fmtC(amt), note:'Bought via NexWallet'});
      showToast('Bought '+tokensGot.toFixed(6)+' '+tk.symbol+' ✓', 'success');
    } else {
      var inrGot = amt * tk.price;
      if (tk.balance < amt) { showToast('Insufficient '+tk.symbol+' balance', 'error'); return; }
      tk.balance -= amt;
      STATE.portfolio.crypto -= inrGot;
      STATE.portfolio.total -= inrGot;
      addTransaction({type:'send', asset:tk.symbol, amount:'-'+amt+' '+tk.symbol, value:fmtC(inrGot), note:'Sold via NexWallet'});
      showToast('Sold '+amt+' '+tk.symbol+' for '+fmtC(inrGot)+' ✓', 'success');
    }
    refreshPortfolioDisplay();
    renderTopAssets();
  });
};

// ── RENDER: TRANSACTIONS ───────────────────────────────────────────────
function buildTxRow(tx) {
  var t = txTypes[tx.type] || txTypes.send;
  var div = document.createElement('div');
  div.style.cssText = 'display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;cursor:pointer;transition:background 0.2s;';
  div.onmouseenter = function(){ this.style.background='var(--bg-card2)'; };
  div.onmouseleave = function(){ this.style.background='transparent'; };
  div.onclick = function(){ openTxDetail(tx); };

  var iconDiv = document.createElement('div');
  iconDiv.style.cssText = 'width:40px;height:40px;border-radius:50%;background:'+t.color+'22;display:flex;align-items:center;justify-content:center;flex-shrink:0;';
  iconDiv.innerHTML = '<i class="'+t.icon+'" style="color:'+t.color+';font-size:14px;"></i>';

  var info = document.createElement('div');
  info.style.flex = '1';
  info.innerHTML = '<div style="font-size:13px;font-weight:600;">'+tx.asset+'</div>'
    +'<div style="font-size:11px;color:var(--text-muted);">'+tx.time+' · '+t.label+(tx.note?' · '+tx.note:'')+'</div>';

  var right = document.createElement('div');
  right.style.textAlign = 'right';
  var amtColor = tx.amount.startsWith('+') ? '#10b981' : tx.amount.startsWith('-') ? '#ef4444' : 'var(--text)';
  right.innerHTML = '<div style="font-size:13px;font-weight:700;color:'+amtColor+';">'+tx.amount+'</div>'
    +'<div style="font-size:10px;color:var(--text-muted);">'+tx.value+'</div>';

  div.appendChild(iconDiv); div.appendChild(info); div.appendChild(right);
  return div;
}

window.openTxDetail = function(tx) {
  var t = txTypes[tx.type] || txTypes.send;
  document.getElementById('txDetailTitle').textContent = t.label + ': ' + tx.asset;
  document.getElementById('txDetailAmount').textContent = tx.amount;
  document.getElementById('txDetailAmount').style.color = tx.amount.startsWith('+') ? '#10b981' : '#ef4444';
  document.getElementById('txDetailValue').textContent = tx.value;
  document.getElementById('txDetailTime').textContent = tx.time;
  document.getElementById('txDetailNote').textContent = tx.note || '—';
  document.getElementById('txDetailStatus').textContent = tx.status || 'completed';
  document.getElementById('txDetailHash').textContent = '0x' + Math.random().toString(16).slice(2,18) + '...';
  openModal('txDetailModal');
};

function renderRecentTxns() { var c=document.getElementById('recentTxns'); if(!c)return; c.innerHTML=''; STATE.transactions.slice(0,5).forEach(function(tx){c.appendChild(buildTxRow(tx));}); }
function renderAllTransactions() { var c=document.getElementById('allTransactions'); if(!c)return; c.innerHTML=''; STATE.transactions.forEach(function(tx){c.appendChild(buildTxRow(tx));}); }

function addTransaction(tx) {
  tx.id = Date.now();
  tx.time = 'just now';
  tx.status = 'completed';
  STATE.transactions.unshift(tx);
  renderRecentTxns();
  renderAllTransactions();
}

// ── BANK LIST ───────────────────────────────────────────────────────────
function renderBankList() {
  var c = document.getElementById('bankList');
  if (!c) return;
  var banks = [
    {name:'State Bank of India',short:'SBI',balance:45280,color:'#22409A'},
    {name:'HDFC Bank',short:'HDFC',balance:128450,color:'#004C8F'},
    {name:'ICICI Bank',short:'ICICI',balance:67320,color:'#F06B23'},
    {name:'Axis Bank',short:'Axis',balance:23100,color:'#97144D'},
  ];
  c.innerHTML = banks.map(function(b){
    return '<div style="display:flex;justify-content:space-between;align-items:center;padding:12px;background:var(--bg-card2);border-radius:12px;margin-bottom:8px;">'
      +'<div style="display:flex;align-items:center;gap:10px;">'
      +'<div style="width:40px;height:40px;border-radius:10px;background:'+b.color+'22;border:1px solid '+b.color+'44;display:flex;align-items:center;justify-content:center;font-size:20px;">🏦</div>'
      +'<div><div style="font-size:13px;font-weight:700;">'+b.short+'</div><div style="font-size:11px;color:var(--text-muted);">'+b.name+'</div></div></div>'
      +'<div style="text-align:right;"><div style="font-size:14px;font-weight:700;">'+fmtC(b.balance)+'</div>'
      +'<span class="badge badge-green" style="font-size:10px;">Linked</span></div></div>';
  }).join('');
}

// ── DEFI POSITIONS ──────────────────────────────────────────────────────
function renderDefiPositions() {
  var c = document.getElementById('defiPositionsList');
  if (!c) return;
  c.innerHTML = STATE.defiPositions.map(function(p){
    return '<div class="card" style="padding:14px;margin-bottom:12px;border-left:4px solid '+p.color+';">'
      +'<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;">'
      +'<div><div style="font-size:15px;font-weight:700;">'+p.name+' <span class="chain-badge">'+p.chain+'</span></div>'
      +'<div style="font-size:11px;color:var(--text-muted);margin-top:2px;">'+p.type+' · '+p.token+'</div></div>'
      +'<span class="badge badge-green" style="font-size:12px;font-weight:700;">'+p.apy+'% APY</span></div>'
      +'<div class="grid-2" style="gap:8px;margin-bottom:10px;">'
      +'<div style="background:var(--bg-card2);border-radius:8px;padding:8px;"><div style="font-size:10px;color:var(--text-muted);">'+t('deposit')+'</div><div style="font-size:15px;font-weight:700;">'+fmtC(p.deposited)+'</div></div>'
      +'<div style="background:rgba(16,185,129,0.1);border-radius:8px;padding:8px;"><div style="font-size:10px;color:var(--text-muted);">Earned</div><div style="font-size:15px;font-weight:700;color:#10b981;">'+fmtC(p.earned)+'</div></div>'
      +'</div>'
      +'<div style="display:flex;gap:8px;">'
      +'<button class="btn-primary" style="flex:1;padding:8px;font-size:12px;" onclick="openDefiDeposit(\''+p.id+'\')"><i class="fas fa-plus"></i> '+t('deposit')+'</button>'
      +'<button class="btn-secondary" style="flex:1;padding:8px;font-size:12px;" onclick="openDefiWithdraw(\''+p.id+'\')"><i class="fas fa-minus"></i> '+t('withdraw')+'</button>'
      +'<button class="btn-secondary" style="padding:8px 10px;font-size:12px;" onclick="claimDefiRewards(\''+p.id+'\')"><i class="fas fa-hand-holding-usd"></i></button>'
      +'</div></div>';
  }).join('');
}

window.openDefiDeposit = function(id) {
  var p = STATE.defiPositions.find(function(x){return x.id===id;});
  if (!p) return;
  STATE.defiModal = {protocol: p, type: 'deposit'};
  document.getElementById('defiModalTitle').textContent = 'Deposit to ' + p.name;
  document.getElementById('defiModalAPY').textContent = p.apy + '% APY';
  document.getElementById('defiModalToken').textContent = p.token;
  document.getElementById('defiAmtInput').value = '';
  document.getElementById('defiAmtInput').placeholder = 'Amount (' + p.token + ')';
  document.getElementById('defiModalNote').textContent = 'Deposited: '+fmtC(p.deposited)+' · Earned: '+fmtC(p.earned);
  document.getElementById('defiConfirmBtn').textContent = t('deposit');
  document.getElementById('defiConfirmBtn').className = 'btn-primary';
  openModal('defiActionModal');
};

window.openDefiWithdraw = function(id) {
  var p = STATE.defiPositions.find(function(x){return x.id===id;});
  if (!p) return;
  STATE.defiModal = {protocol: p, type: 'withdraw'};
  document.getElementById('defiModalTitle').textContent = 'Withdraw from ' + p.name;
  document.getElementById('defiModalAPY').textContent = p.apy + '% APY';
  document.getElementById('defiModalToken').textContent = p.token;
  document.getElementById('defiAmtInput').value = '';
  document.getElementById('defiAmtInput').placeholder = 'Amount to withdraw';
  document.getElementById('defiModalNote').textContent = 'Available: '+fmtC(p.deposited);
  document.getElementById('defiConfirmBtn').textContent = t('withdraw');
  document.getElementById('defiConfirmBtn').className = 'btn-danger';
  openModal('defiActionModal');
};

window.confirmDefiAction = function() {
  var info = STATE.defiModal;
  if (!info.protocol) return;
  var amt = parseFloat(document.getElementById('defiAmtInput').value)||0;
  if (!amt || amt <= 0) { showToast('Enter a valid amount', 'error'); return; }
  var p = info.protocol;
  var amtInr = amt * (p.deposited / 100);// rough conversion using avg
  closeModal('defiActionModal');

  var steps = info.type === 'deposit'
    ? ['Approving token...', 'Signing transaction...', 'Depositing to protocol...', 'Confirming on-chain...']
    : ['Checking liquidity...', 'Signing withdrawal...', 'Processing withdrawal...', 'Confirming receipt...'];

  showProcessingModal(steps, function(){
    if (info.type === 'deposit') {
      var inrAmt = amt * 84; // assume USDC
      p.deposited += inrAmt;
      STATE.portfolio.defi += inrAmt;
      STATE.portfolio.total += inrAmt;
      addTransaction({type:'defi', asset:p.name, amount:'+'+amt+' '+p.token, value:fmtC(inrAmt), note:'Deposited to '+p.name});
      showToast(t('deposit_success')+' '+amt+' '+p.token+' → '+p.name, 'success');
    } else {
      var wAmt = amt * 84;
      if (wAmt > p.deposited) { showToast('Insufficient balance in '+p.name, 'error'); return; }
      p.deposited -= wAmt;
      STATE.portfolio.defi -= wAmt;
      STATE.portfolio.total -= wAmt;
      addTransaction({type:'withdraw', asset:p.name, amount:'-'+amt+' '+p.token, value:fmtC(wAmt), note:'Withdrawn from '+p.name});
      showToast(t('withdraw_success')+' '+amt+' '+p.token+' from '+p.name, 'success');
    }
    refreshPortfolioDisplay();
    renderDefiPositions();
  });
};

window.claimDefiRewards = function(id) {
  var p = STATE.defiPositions.find(function(x){return x.id===id;});
  if (!p) return;
  if (p.earned <= 0) { showToast('No rewards to claim', 'warning'); return; }
  var earned = p.earned;
  showProcessingModal(['Calculating rewards...', 'Claiming yield...', 'Transferring to wallet...'], function(){
    STATE.portfolio.total += earned;
    addTransaction({type:'defi', asset:p.name, amount:'+'+fmtC(earned), value:fmtC(earned), note:'Yield claimed from '+p.name});
    p.earned = 0;
    showToast(t('claim_success')+' '+fmtC(earned)+' from '+p.name, 'success');
    refreshPortfolioDisplay();
    renderDefiPositions();
  });
};

// ── STAKING ──────────────────────────────────────────────────────────
function renderStakingPositions() {
  var c = document.getElementById('stakingPositionsList');
  if (!c) return;
  c.innerHTML = STATE.staking.map(function(s){
    return '<div class="card" style="padding:14px;margin-bottom:12px;">'
      +'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">'
      +'<div style="display:flex;align-items:center;gap:10px;">'
      +'<div style="width:40px;height:40px;border-radius:50%;background:'+s.color+'22;border:2px solid '+s.color+';display:flex;align-items:center;justify-content:center;font-weight:700;color:'+s.color+';font-size:15px;">'+s.token[0]+'</div>'
      +'<div><div style="font-size:14px;font-weight:700;">'+s.token+' <span class="badge '+(s.status==='Active'?'badge-green':'badge-yellow')+'" style="font-size:10px;">'+s.status+'</span></div>'
      +'<div style="font-size:11px;color:var(--text-muted);">'+s.protocol+'</div></div></div>'
      +'<div style="text-align:right;"><div style="font-size:15px;font-weight:700;color:#10b981;">'+s.apy+'%</div><div style="font-size:10px;color:var(--text-muted);">'+s.days+' days</div></div></div>'
      +'<div class="grid-2" style="gap:8px;margin-bottom:10px;">'
      +'<div style="font-size:12px;background:var(--bg-card2);padding:8px;border-radius:8px;">Staked: <strong>'+s.amount+' '+s.token+'</strong><br><span style="font-size:10px;color:var(--text-muted);">'+fmtC(s.amtVal)+'</span></div>'
      +'<div style="font-size:12px;background:rgba(16,185,129,0.1);padding:8px;border-radius:8px;">Rewards: <strong style="color:#10b981;">'+s.rewards+' '+s.token+'</strong><br><span style="font-size:10px;color:var(--text-muted);">'+fmtC(s.rewardsVal)+'</span></div>'
      +'</div>'
      +'<div style="display:flex;gap:8px;">'
      +'<button class="btn-primary" style="flex:1;padding:8px;font-size:12px;" onclick="openStakeDeposit(\''+s.id+'\')"><i class="fas fa-lock"></i> Stake More</button>'
      +'<button class="btn-secondary" style="flex:1;padding:8px;font-size:12px;" onclick="openStakeWithdraw(\''+s.id+'\')"><i class="fas fa-unlock"></i> Unstake</button>'
      +'<button class="btn-green" style="padding:8px 12px;font-size:12px;" onclick="claimStakingRewards(\''+s.id+'\')"><i class="fas fa-gift"></i></button>'
      +'</div></div>';
  }).join('');
}

window.openStakeDeposit = function(id) {
  var s = STATE.staking.find(function(x){return x.id===id;});
  if (!s) return;
  STATE.stakingModal = {pos: s, type: 'stake'};
  document.getElementById('stakeModalTitle').textContent = 'Stake ' + s.token;
  document.getElementById('stakeModalAPY').textContent = s.apy + '% APY · ' + s.protocol;
  document.getElementById('stakeAmtInput').value = '';
  document.getElementById('stakeAmtInput').placeholder = 'Amount (' + s.token + ')';
  document.getElementById('stakeModalBalance').textContent = 'Available: ' + tokens.find(function(t){return t.symbol===s.token;})?.balance.toLocaleString() + ' ' + s.token;
  document.getElementById('stakeConfirmBtn').textContent = 'Stake ' + s.token;
  document.getElementById('stakeConfirmBtn').className = 'btn-primary';
  openModal('stakeActionModal');
};

window.openStakeWithdraw = function(id) {
  var s = STATE.staking.find(function(x){return x.id===id;});
  if (!s) return;
  STATE.stakingModal = {pos: s, type: 'unstake'};
  document.getElementById('stakeModalTitle').textContent = 'Unstake ' + s.token;
  document.getElementById('stakeModalAPY').textContent = s.status === 'Unbonding' ? '28-day unbonding period' : 'Instant unstake';
  document.getElementById('stakeAmtInput').value = '';
  document.getElementById('stakeAmtInput').placeholder = 'Amount to unstake (' + s.token + ')';
  document.getElementById('stakeModalBalance').textContent = 'Staked: ' + s.amount + ' ' + s.token;
  document.getElementById('stakeConfirmBtn').textContent = 'Unstake';
  document.getElementById('stakeConfirmBtn').className = 'btn-danger';
  openModal('stakeActionModal');
};

window.confirmStakeAction = function() {
  var info = STATE.stakingModal;
  if (!info.pos) return;
  var amt = parseFloat(document.getElementById('stakeAmtInput').value)||0;
  if (!amt || amt <= 0) { showToast('Enter valid amount', 'error'); return; }
  var s = info.pos;
  closeModal('stakeActionModal');

  var steps = info.type === 'stake'
    ? ['Approving token...', 'Staking tokens...', 'Delegating to validator...', 'Confirmed! ✓']
    : ['Initiating unstake...', 'Processing...', 'Tokens queued...', 'Unbonding started...'];

  showProcessingModal(steps, function(){
    var tk = tokens.find(function(t){return t.symbol===s.token;});
    if (info.type === 'stake') {
      s.amount += amt;
      s.amtVal = s.amount * (tk ? tk.price : 0);
      s.days += 1;
      if (tk) tk.balance = Math.max(0, tk.balance - amt);
      addTransaction({type:'stake', asset:s.token, amount:'Staked '+amt+' '+s.token, value:fmtC(amt*(tk?tk.price:0)), note:s.protocol});
      showToast(t('stake_success')+' '+amt+' '+s.token+' on '+s.protocol, 'success');
    } else {
      if (amt > s.amount) { showToast('Cannot unstake more than staked', 'error'); return; }
      s.amount -= amt;
      s.amtVal = s.amount * (tk ? tk.price : 0);
      s.status = 'Unbonding';
      addTransaction({type:'withdraw', asset:s.token, amount:'Unstaked '+amt+' '+s.token, value:fmtC(amt*(tk?tk.price:0)), note:s.protocol});
      showToast('Unstaking '+amt+' '+s.token+' initiated. Unbonding period active.', 'success');
    }
    renderStakingPositions();
  });
};

window.claimStakingRewards = function(id) {
  var s = STATE.staking.find(function(x){return x.id===id;});
  if (!s) return;
  if (s.rewards <= 0) { showToast('No rewards available', 'warning'); return; }
  var rew = s.rewards;
  var tk = tokens.find(function(t){return t.symbol===s.token;});
  showProcessingModal(['Fetching rewards...', 'Claiming...', 'Crediting to wallet...'], function(){
    if (tk) { tk.balance += rew; }
    s.rewardsVal += rew * (tk?tk.price:0);
    addTransaction({type:'defi', asset:s.token, amount:'+'+rew+' '+s.token, value:fmtC(s.rewardsVal), note:'Staking reward from '+s.protocol});
    var old = s.rewards;
    s.rewards = 0;
    s.rewardsVal = 0;
    showToast(t('claim_success')+' '+old+' '+s.token+' from '+s.protocol, 'success');
    renderStakingPositions();
    renderTopAssets();
  });
};

// ── SEND / RECEIVE ────────────────────────────────────────────────────
window.submitSend = function() {
  var to = document.getElementById('sendToAddr') ? document.getElementById('sendToAddr').value : '';
  var amt = parseFloat(document.getElementById('sendAmt') ? document.getElementById('sendAmt').value : '0')||0;
  var token = document.getElementById('sendToken') ? document.getElementById('sendToken').value : 'ETH';
  if (!to.trim()) { showToast('Enter recipient address / UPI ID', 'error'); return; }
  if (!amt || amt <= 0) { showToast('Enter a valid amount', 'error'); return; }

  var tk = tokens.find(function(x){return x.symbol===token;});
  if (tk && tk.balance < amt) { showToast('Insufficient '+token+' balance', 'error'); return; }

  closeModal('sendModal');
  showProcessingModal(['Validating address...','Signing transaction...','Broadcasting...','Confirmed!'], function(){
    var inrVal = tk ? amt * tk.price : amt;
    if (tk) tk.balance = Math.max(0, tk.balance - amt);
    addTransaction({type:'send', asset:token, amount:'-'+amt+' '+token, value:fmtC(inrVal), note:'To: '+to.slice(0,12)+'...'});
    STATE.portfolio.crypto -= inrVal;
    STATE.portfolio.total -= inrVal;
    refreshPortfolioDisplay();
    document.getElementById('sendToAddr').value = '';
    document.getElementById('sendAmt').value = '';
    showToast(t('send_success')+' '+amt+' '+token, 'success');
  });
};

window.switchSendType = function(type, btn) {
  document.querySelectorAll('#sendModal .tab-item').forEach(function(b){b.classList.remove('active');});
  btn.classList.add('active');
  var labels = {crypto:'Wallet address (0x... / bc1...)',upi:'UPI ID (name@bank)',bank:'Account number'};
  var el = document.getElementById('sendToAddr');
  if (el) el.placeholder = labels[type]||'Recipient';
};

// ── UPI ──────────────────────────────────────────────────────────────
window.processUPI = function() {
  var id = document.getElementById('upiId') ? document.getElementById('upiId').value.trim() : '';
  var amt = parseFloat(document.getElementById('upiAmount') ? document.getElementById('upiAmount').value : '0')||0;
  var note = document.getElementById('upiNote') ? document.getElementById('upiNote').value : '';
  if (!id) { showToast('Enter UPI ID', 'error'); return; }
  if (!amt || amt <= 0) { showToast('Enter valid amount', 'error'); return; }
  if (amt > 100000) { showToast('Daily UPI limit is ₹1,00,000', 'error'); return; }

  showConfirm('Send ₹'+amt.toLocaleString()+' to '+id+'?', function(){
    showProcessingModal(['Connecting to UPI...','Authenticating...','Processing payment...','Getting confirmation...'], function(){
      STATE.upiBalance -= amt;
      addTransaction({type:'upi', asset:'INR', amount:'-₹'+amt.toLocaleString(), value:'₹'+amt.toLocaleString(), note:'To: '+id+(note?' — '+note:'')});
      document.getElementById('upiId').value = '';
      document.getElementById('upiAmount').value = '';
      document.getElementById('upiNote').value = '';
      updateUPILimitBar();
      showToast(t('upi_success')+' ₹'+amt.toLocaleString()+' → '+id, 'success');
    });
  });
};

window.fillUPI = function(upi) {
  var el = document.getElementById('upiId');
  if (el) { el.value = upi; el.focus(); }
};

function updateUPILimitBar() {
  var bar = document.getElementById('upiLimitBar');
  var usedEl = document.getElementById('upiUsedAmount');
  if (!bar) return;
  // Calculate used from transactions
  var used = STATE.transactions
    .filter(function(tx){ return tx.type==='upi' && tx.time.includes('hr') || tx.time.includes('min'); })
    .reduce(function(sum, tx){ return sum + (parseInt(tx.value.replace(/[₹,]/g,''))||0); }, 0);
  var pct = Math.min(100, (used/100000)*100);
  bar.style.width = pct + '%';
  if (usedEl) usedEl.textContent = '₹' + used.toLocaleString('en-IN');
}

window.processUPIModal = function() {
  var id = document.getElementById('upiModalId') ? document.getElementById('upiModalId').value.trim() : '';
  if (!id) { showToast('Enter UPI ID', 'error'); return; }
  showProcessingModal(['Connecting...','Authenticating...','Sending...','Done!'], function(){
    addTransaction({type:'upi', asset:'INR', amount:'-₹500', value:'₹500', note:'To: '+id});
    closeModal('upiPayModal');
    showToast(t('upi_success'), 'success');
  });
};

window.setUPIAmount = function(a) {
  var el = document.getElementById('upiAmount');
  if (el) { el.value = a.replace('₹',''); el.focus(); }
};

// ── BILL PAY ────────────────────────────────────────────────────────
window.payBill = function() {
  var amt = parseFloat(document.getElementById('billAmt') ? document.getElementById('billAmt').value : '0')||0;
  var acc = document.getElementById('billAcc') ? document.getElementById('billAcc').value.trim() : '';
  if (!acc) { showToast('Enter consumer number', 'error'); return; }
  if (!amt || amt <= 0) { showToast('Enter bill amount', 'error'); return; }

  showConfirm('Pay ₹'+amt.toLocaleString()+' bill?', function(){
    showProcessingModal(['Fetching bill details...','Verifying account...','Processing payment...','Payment confirmed!'], function(){
      addTransaction({type:'bill', asset:'INR', amount:'-₹'+amt.toLocaleString(), value:'₹'+amt.toLocaleString(), note:'Bill payment'});
      closeModal('billModal');
      document.getElementById('billAmt').value = '';
      document.getElementById('billAcc').value = '';
      showToast(t('bill_success')+' ₹'+amt.toLocaleString(), 'success');
    });
  });
};

window.openBillModal = function(category) {
  document.getElementById('billCategory').textContent = category;
  document.getElementById('billAmt').value = '';
  document.getElementById('billAcc').value = '';
  openModal('billModal');
};

// ── SWAP ─────────────────────────────────────────────────────────────
window.updateSwapRate = function() {
  var fromSel = document.getElementById('fromToken');
  var toSel = document.getElementById('toToken');
  var fromAmt = document.getElementById('fromAmount');
  if (!fromSel || !toSel || !fromAmt) return;
  var from = fromSel.value, to = toSel.value;
  var amt = parseFloat(fromAmt.value)||0;
  var rates = {};
  tokens.forEach(function(t){ rates[t.symbol] = t.price; });
  rates['INR'] = 1;
  if (rates[from] && rates[to] && amt) {
    var out = (amt * rates[from]) / rates[to];
    var toAmtEl = document.getElementById('toAmount');
    var swapRateEl = document.getElementById('swapRate');
    var exchEl = document.getElementById('exchangeRateText');
    if (toAmtEl) toAmtEl.textContent = '≈ ' + out.toFixed(6) + ' ' + to;
    if (swapRateEl) swapRateEl.textContent = '1 '+from+' ≈ '+(rates[from]/rates[to]).toFixed(6)+' '+to;
    if (exchEl) exchEl.textContent = '1 '+from+' = '+(rates[from]/rates[to]).toFixed(6)+' '+to;
  }
};

window.swapTokens = function() {
  var f = document.getElementById('fromToken'), t2 = document.getElementById('toToken');
  if (f && t2) { var tmp = f.value; f.value = t2.value; t2.value = tmp; }
  updateSwapRate();
};

window.executeSwap = function() {
  var from = document.getElementById('fromToken') ? document.getElementById('fromToken').value : '';
  var to = document.getElementById('toToken') ? document.getElementById('toToken').value : '';
  var amt = parseFloat(document.getElementById('fromAmount') ? document.getElementById('fromAmount').value : '0')||0;
  if (!amt || amt <= 0) { showToast('Enter amount to swap', 'error'); return; }

  var fromTk = tokens.find(function(x){return x.symbol===from;});
  var toTk = tokens.find(function(x){return x.symbol===to;});
  if (fromTk && fromTk.balance < amt) { showToast('Insufficient '+from+' balance', 'error'); return; }

  closeModal && false;
  showProcessingModal(['Finding best rate...','Checking liquidity...','Executing swap...','Settlement...'], function(){
    var rates = {}; tokens.forEach(function(t){ rates[t.symbol]=t.price; }); rates['INR']=1;
    var out = (amt * (rates[from]||1)) / (rates[to]||1);
    if (fromTk) fromTk.balance = Math.max(0, fromTk.balance - amt);
    if (toTk) toTk.balance += out;
    addTransaction({type:'swap', asset:from+'→'+to, amount:amt+' '+from+' → '+out.toFixed(6)+' '+to, value:fmtC(amt*(rates[from]||1)), note:'Via DEX Aggregator'});
    document.getElementById('fromAmount').value = '';
    document.getElementById('toAmount').textContent = '≈ 0.00';
    showToast(t('swap_success')+' '+amt+' '+from+' → '+out.toFixed(6)+' '+to, 'success');
    renderTopAssets();
  });
};

window.switchConvertTab = function(mode, btn) {
  document.querySelectorAll('#page-swap .tab-bar .tab-item').forEach(function(b){b.classList.remove('active');});
  btn.classList.add('active');
};

window.calcFiatCrypto = function() {
  var amt = parseFloat(document.getElementById('fiatAmount') ? document.getElementById('fiatAmount').value : '0')||0;
  var btcPrice = tokens.find(function(t){return t.symbol==='BTC';})?.price || 6842350;
  var el = document.getElementById('cryptoOutput');
  if (el) el.textContent = '≈ ' + (amt/btcPrice).toFixed(8) + ' BTC';
};

window.executeFiatConvert = function() {
  var amt = parseFloat(document.getElementById('fiatAmount') ? document.getElementById('fiatAmount').value : '0')||0;
  if (!amt || amt <= 0) { showToast('Enter amount', 'error'); return; }
  var btcPrice = tokens.find(function(t){return t.symbol==='BTC';})?.price || 6842350;
  var btcAmt = amt/btcPrice;
  showProcessingModal(['Checking rate...','Processing...','Confirming...'], function(){
    var btcTk = tokens.find(function(t){return t.symbol==='BTC';});
    if (btcTk) btcTk.balance += btcAmt;
    addTransaction({type:'receive', asset:'BTC', amount:'+'+btcAmt.toFixed(8)+' BTC', value:'₹'+amt.toLocaleString(), note:'INR to BTC conversion'});
    document.getElementById('fiatAmount').value = '';
    document.getElementById('cryptoOutput').textContent = '≈ 0.00000000 BTC';
    showToast('Converted ₹'+amt.toLocaleString()+' → '+btcAmt.toFixed(8)+' BTC ✓', 'success');
    renderTopAssets();
  });
};

// ── BRIDGE ───────────────────────────────────────────────────────────
window.swapBridgeChains = function() {
  var f = document.getElementById('fromChain'), t2 = document.getElementById('toChain');
  if (f && t2) { var tmp = f.value; f.value = t2.value; t2.value = tmp; }
  showToast('Chains swapped', 'info');
};

window.selectBridgeNetwork = function(name) {
  var fc = document.getElementById('fromChain');
  if (fc) fc.value = name;
  showToast(name + ' selected as source chain', 'info');
};

window.executeBridge = function() {
  var from = document.getElementById('fromChain') ? document.getElementById('fromChain').value : '';
  var to = document.getElementById('toChain') ? document.getElementById('toChain').value : '';
  var token = document.getElementById('bridgeToken') ? document.getElementById('bridgeToken').value : '';
  var amt = parseFloat(document.getElementById('bridgeAmount') ? document.getElementById('bridgeAmount').value : '0')||0;
  if (!amt || amt <= 0) { showToast('Enter bridge amount', 'error'); return; }
  if (from === to) { showToast('Source and destination chains cannot be same', 'error'); return; }

  showConfirm('Bridge '+amt+' '+token+' from '+from+' to '+to+'?', function(){
    showProcessingModal(['Locking tokens on '+from+'...','Verifying with LayerZero...','Minting on '+to+'...','Finalizing...'], function(){
      var tk = tokens.find(function(x){return x.symbol===token;});
      if (tk && tk.balance < amt) { showToast('Insufficient '+token+' balance', 'error'); return; }
      addTransaction({type:'send', asset:token, amount:'-'+amt+' '+token+' (bridge)', value:fmtC(amt*(tk?tk.price:84)), note:from+' → '+to+' via LayerZero'});
      document.getElementById('bridgeAmount').value = '';
      showToast(t('bridge_success'), 'success');
    });
  });
};

// ── LANGUAGE ─────────────────────────────────────────────────────────
window.setLanguage = function(code, btn) {
  STATE.currentLang = code;
  document.querySelectorAll('.lang-chip').forEach(function(b){ b.classList.remove('active'); });
  if (btn) btn.classList.add('active');
  applyLanguage(code);
  showToast(t('lang_changed'), 'success');
};

function applyLanguage(code) {
  STATE.currentLang = code;
  // Nav labels
  var navMap = {
    'nav-dashboard':'home','nav-portfolio':'portfolio','nav-payments':'pay',
    'nav-crypto':'markets','nav-defi':'defi','nav-settings':'more'
  };
  Object.keys(navMap).forEach(function(id){
    var el = document.getElementById(id);
    if (el) {
      var span = el.querySelector('span');
      if (span) span.textContent = t(navMap[id]);
    }
  });
  // Page headers
  var headerMap = {
    'dashHeader': 'TOTAL PORTFOLIO',
    'greetingText': t('goodMorning'),
    'topAssetsLabel': t('topAssets'),
    'recentActivityLabel': t('recentActivity'),
    'securityLabel': t('securityStatus'),
  };
  Object.keys(headerMap).forEach(function(id){
    var el = document.getElementById(id);
    if (el) el.textContent = headerMap[id];
  });
  // Total portfolio label
  var tpEl = document.getElementById('totalPortfolioLabel');
  if (tpEl) tpEl.textContent = t('totalPortfolio');
  // Network status
  var nsEl = document.getElementById('networkStatus');
  if (nsEl && nsEl.classList.contains('badge-green')) {
    nsEl.innerHTML = '<i class="fas fa-circle" style="font-size:6px;"></i> ' + t('online');
  }
  // Quick action buttons
  var btnMap = {
    'qaBtnSend': t('send'), 'qaBtnReceive': t('receive'),
    'qaBtnSwap': t('swap'), 'qaBtnPayments': t('payments'),
    'qaBtnBridge': t('bridge'), 'qaBtnNFTs': t('nfts'),
  };
  Object.keys(btnMap).forEach(function(id){
    var el = document.getElementById(id);
    if (el) el.innerHTML = el.innerHTML.replace(/>[^<]+$/, '>' + btnMap[id]);
  });
  // See all buttons
  document.querySelectorAll('.see-all-btn').forEach(function(b){ b.textContent = t('seeAll'); });
  // Lock button
  var lockBtn = document.getElementById('lockWalletBtn');
  if (lockBtn) lockBtn.innerHTML = '<i class="fas fa-lock"></i> ' + t('lockWallet');
  // Settings section labels
  var setMap = {'settingsLangLabel':t('language'),'settingsCurrLabel':t('currency'),'settingsProfileTitle':t('profile')};
  Object.keys(setMap).forEach(function(id){ var e=document.getElementById(id); if(e) e.textContent=setMap[id]; });
  // Re-render dynamic sections that contain translated text
  renderDefiPositions();
  renderStakingPositions();
  renderBankList();
}

// ── CURRENCY ─────────────────────────────────────────────────────────
window.setCurrency = function(code, btn) {
  STATE.currentCurrency = code;
  document.querySelectorAll('.curr-chip').forEach(function(b){ b.classList.remove('active'); });
  if (btn) btn.classList.add('active');
  refreshPortfolioDisplay();
  renderTopAssets();
  renderPortfolioTokens();
  renderBankList();
  renderDefiPositions();
  renderStakingPositions();
  renderAllTransactions();
  showToast('Currency set to '+code+' ('+CURRENCY_SYMBOLS[code]+')', 'success');
};

function refreshPortfolioDisplay() {
  var sym = CURRENCY_SYMBOLS[STATE.currentCurrency] || '₹';
  var rate = CURRENCY_RATES[STATE.currentCurrency] || 1;
  var total = STATE.portfolio.total * rate;
  var balEl = document.getElementById('totalBalance');
  if (balEl && STATE.balanceVisible) {
    if (STATE.currentCurrency === 'INR') {
      balEl.textContent = '₹' + Math.round(total).toLocaleString('en-IN');
    } else {
      balEl.textContent = sym + total.toFixed(2);
    }
  }
  // Sub-breakdowns
  var subs = [
    {id:'subCrypto', val:STATE.portfolio.crypto},
    {id:'subFiat', val:STATE.portfolio.fiat},
    {id:'subDefi', val:STATE.portfolio.defi},
    {id:'subNft', val:STATE.portfolio.nft},
  ];
  subs.forEach(function(s){
    var el = document.getElementById(s.id);
    if (!el) return;
    var v = s.val * rate;
    if (STATE.currentCurrency === 'INR') {
      el.textContent = v >= 100000 ? '₹'+(v/100000).toFixed(1)+'L' : '₹'+Math.round(v).toLocaleString('en-IN');
    } else {
      el.textContent = sym + (v >= 1000 ? (v/1000).toFixed(1)+'K' : v.toFixed(0));
    }
  });
}

// ── TOGGLE BALANCE ───────────────────────────────────────────────────
window.toggleBalanceVisible = function() {
  STATE.balanceVisible = !STATE.balanceVisible;
  var balEl = document.getElementById('totalBalance');
  var eyeEl = document.getElementById('eyeIcon');
  if (STATE.balanceVisible) {
    refreshPortfolioDisplay();
    if (eyeEl) eyeEl.className = 'fas fa-eye';
  } else {
    if (balEl) balEl.textContent = '₹ ••,••,•••';
    if (eyeEl) eyeEl.className = 'fas fa-eye-slash';
  }
};

// ── PROFILE EDIT ───────────────────────────────────────────────────────
function loadProfileUI() {
  var el = document.getElementById('profileName');
  if (el) el.textContent = STATE.profile.name;
  var em = document.getElementById('profileEmail');
  if (em) em.textContent = STATE.profile.email;
  var av = document.getElementById('profileAvatar');
  if (av) av.textContent = STATE.profile.avatar;
  var ky = document.getElementById('profileKYC');
  if (ky) ky.textContent = STATE.profile.kyc + ' Verified';
}

window.openEditProfile = function() {
  document.getElementById('editName').value = STATE.profile.name;
  document.getElementById('editEmail').value = STATE.profile.email;
  document.getElementById('editPhone').value = STATE.profile.phone;
  document.getElementById('editDob').value = STATE.profile.dob;
  openModal('editProfileModal');
};

window.saveProfile = function() {
  var name = document.getElementById('editName').value.trim();
  var email = document.getElementById('editEmail').value.trim();
  var phone = document.getElementById('editPhone').value.trim();
  var dob = document.getElementById('editDob').value;

  if (!name) { showToast('Name cannot be empty', 'error'); return; }
  if (!email || !email.includes('@')) { showToast('Enter valid email', 'error'); return; }
  if (!phone || phone.length < 10) { showToast('Enter valid phone number', 'error'); return; }

  STATE.profile.name = name;
  STATE.profile.email = email;
  STATE.profile.phone = phone;
  STATE.profile.dob = dob;

  closeModal('editProfileModal');
  loadProfileUI();
  showToast(t('profile_saved'), 'success');
};

window.changeAvatar = function() {
  var avatars = ['🧑','👨','👩','🧔','👱','🧑‍💼','👨‍💼','👩‍💼','🧑‍🎓','👨‍🎓'];
  var idx = avatars.indexOf(STATE.profile.avatar);
  STATE.profile.avatar = avatars[(idx+1) % avatars.length];
  var av = document.getElementById('editAvatarPreview');
  if (av) av.textContent = STATE.profile.avatar;
  var av2 = document.getElementById('profileAvatar');
  if (av2) av2.textContent = STATE.profile.avatar;
};

// ── SECURITY TOGGLES ─────────────────────────────────────────────────
function renderSecuritySettings() {
  var container = document.getElementById('securityToggles');
  if (!container) return;
  var items = [
    {key:'biometric', label:'Biometric Authentication', desc:'Face ID / Fingerprint'},
    {key:'pin', label:'PIN Lock', desc:'6-digit PIN'},
    {key:'txAlerts', label:'Transaction Alerts', desc:'Push notifications for all tx'},
    {key:'ipWhitelist', label:'IP Whitelist', desc:'Restrict access by IP address'},
    {key:'withdrawLimit', label:'Daily Withdrawal Limit', desc:'₹5L/day auto-limit'},
    {key:'addressWhitelist', label:'Address Whitelist', desc:'Pre-approved addresses only'},
    {key:'antiPhishing', label:'Anti-Phishing Code', desc:'Code: NexWallet#4821'},
    {key:'loginHistory', label:'Login History', desc:'Track all active sessions'},
  ];
  container.innerHTML = items.map(function(item){
    var on = STATE.securitySettings[item.key];
    return '<div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid var(--border);">'
      +'<div><div style="font-size:13px;font-weight:600;">'+item.label+'</div>'
      +'<div style="font-size:11px;color:var(--text-muted);">'+item.desc+'</div></div>'
      +'<div onclick="toggleSecurityItem(\''+item.key+'\',this)" data-key="'+item.key+'" style="width:44px;height:24px;border-radius:12px;background:'+(on?'#10b981':'var(--bg-card2)')+';border:1px solid '+(on?'#10b981':'var(--border)')+';position:relative;cursor:pointer;transition:all 0.3s;flex-shrink:0;">'
      +'<div style="width:18px;height:18px;border-radius:50%;background:white;position:absolute;top:2px;'+(on?'right:2px;':'left:2px;')+'transition:all 0.3s;box-shadow:0 1px 3px rgba(0,0,0,0.3);"></div></div></div>';
  }).join('');
}

window.toggleSecurityItem = function(key, el) {
  STATE.securitySettings[key] = !STATE.securitySettings[key];
  var on = STATE.securitySettings[key];
  el.style.background = on ? '#10b981' : 'var(--bg-card2)';
  el.style.borderColor = on ? '#10b981' : 'var(--border)';
  var dot = el.querySelector('div');
  if (dot) { dot.style.right = on?'2px':'auto'; dot.style.left = on?'auto':'2px'; }
  showToast(key + (on ? ' enabled ✓' : ' disabled'), on ? 'success' : 'warning');
};

window.toggleSecurity = function(el) {
  var on = el.style.background === 'rgb(16, 185, 129)' || el.style.background === '#10b981';
  el.style.background = on ? 'var(--bg-card2)' : '#10b981';
  el.style.borderColor = on ? 'var(--border)' : '#10b981';
  var dot = el.querySelector('div');
  if (dot) { dot.style.right = on?'auto':'2px'; dot.style.left = on?'2px':'auto'; }
  showToast(on ? 'Disabled' : 'Enabled ✓', on ? 'warning' : 'success');
};

// ── NOTIFICATIONS ────────────────────────────────────────────────────
function renderNotifSettings() {
  var container = document.getElementById('notifToggles');
  if (!container) return;
  var items = [
    {key:'priceAlerts', label:'Price Alerts'},
    {key:'txConfirm', label:'Transaction Confirmations'},
    {key:'defiYield', label:'DeFi Yield Updates'},
    {key:'nftFloor', label:'NFT Floor Price Alerts'},
    {key:'billReminders', label:'Bill Due Reminders'},
  ];
  container.innerHTML = items.map(function(item){
    var on = STATE.notifSettings[item.key];
    return '<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border);">'
      +'<span style="font-size:13px;">'+item.label+'</span>'
      +'<div onclick="toggleNotif(\''+item.key+'\',this)" style="width:44px;height:24px;border-radius:12px;background:'+(on?'#6366f1':'var(--bg-card2)')+';border:1px solid '+(on?'#6366f1':'var(--border)')+';position:relative;cursor:pointer;transition:all 0.3s;flex-shrink:0;">'
      +'<div style="width:18px;height:18px;border-radius:50%;background:white;position:absolute;top:2px;'+(on?'right:2px;':'left:2px;')+'transition:all 0.3s;"></div></div></div>';
  }).join('');
}

window.toggleNotif = function(key, el) {
  STATE.notifSettings[key] = !STATE.notifSettings[key];
  var on = STATE.notifSettings[key];
  el.style.background = on ? '#6366f1' : 'var(--bg-card2)';
  el.style.borderColor = on ? '#6366f1' : 'var(--border)';
  var dot = el.querySelector('div');
  if (dot) { dot.style.right = on?'2px':'auto'; dot.style.left = on?'auto':'2px'; }
  showToast(key + (on ? ' notifications on ✓' : ' notifications off'), on ? 'success' : 'info');
};

function renderOfflineSettings() {
  var container = document.getElementById('offlineToggles');
  if (!container) return;
  var items = [
    {key:'viewPortfolio', label:'View Portfolio Offline'},
    {key:'cachePrice', label:'Cached Price Data (30min)'},
    {key:'queueTx', label:'Queue Transactions Offline'},
    {key:'offlineQR', label:'Offline QR Payments'},
  ];
  container.innerHTML = items.map(function(item){
    var on = STATE.offlineSettings[item.key];
    return '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border);">'
      +'<span style="font-size:13px;">'+item.label+'</span>'
      +'<div onclick="toggleOffline(\''+item.key+'\',this)" style="width:44px;height:24px;border-radius:12px;background:'+(on?'#10b981':'var(--bg-card2)')+';border:1px solid '+(on?'#10b981':'var(--border)')+';position:relative;cursor:pointer;transition:all 0.3s;flex-shrink:0;">'
      +'<div style="width:18px;height:18px;border-radius:50%;background:white;position:absolute;top:2px;'+(on?'right:2px;':'left:2px;')+'transition:all 0.3s;"></div></div></div>';
  }).join('');
}

window.toggleOffline = function(key, el) {
  STATE.offlineSettings[key] = !STATE.offlineSettings[key];
  var on = STATE.offlineSettings[key];
  el.style.background = on ? '#10b981' : 'var(--bg-card2)';
  el.style.borderColor = on ? '#10b981' : 'var(--border)';
  var dot = el.querySelector('div');
  if (dot) { dot.style.right = on?'2px':'auto'; dot.style.left = on?'auto':'2px'; }
  showToast(on ? 'Offline feature enabled ✓' : 'Offline feature disabled', on ? 'success' : 'info');
};

function renderNotifications() {
  var unread = STATE.notifications.filter(function(n){return n.unread;}).length;
  var badge = document.getElementById('notifBadge');
  if (badge) badge.style.display = unread > 0 ? 'block' : 'none';
  var container = document.getElementById('notificationsList');
  if (!container) return;
  container.innerHTML = STATE.notifications.map(function(n){
    return '<div style="display:flex;gap:12px;padding:14px;border-radius:12px;'+(n.unread?'background:rgba(99,102,241,0.05);':'')+'margin-bottom:4px;cursor:pointer;" onclick="markRead('+n.id+')">'
      +'<div style="width:40px;height:40px;border-radius:50%;background:'+n.color+'22;display:flex;align-items:center;justify-content:center;flex-shrink:0;">'
      +'<i class="'+n.icon+'" style="color:'+n.color+';"></i></div>'
      +'<div style="flex:1;min-width:0;">'
      +'<div style="display:flex;justify-content:space-between;align-items:flex-start;">'
      +'<span style="font-size:13px;font-weight:'+(n.unread?700:600)+';">'+n.title+'</span>'
      +'<span style="font-size:10px;color:var(--text-muted);flex-shrink:0;margin-left:8px;">'+n.time+'</span></div>'
      +'<div style="font-size:12px;color:var(--text-muted);margin-top:2px;">'+n.msg+'</div></div>'
      +(n.unread?'<div style="width:8px;height:8px;border-radius:50%;background:#6366f1;flex-shrink:0;margin-top:4px;"></div>':'')
      +'</div>';
  }).join('');
}

window.markRead = function(id) {
  STATE.notifications.forEach(function(n){ if(n.id===id) n.unread=false; });
  renderNotifications();
};

window.markAllRead = function() {
  STATE.notifications.forEach(function(n){ n.unread=false; });
  renderNotifications();
  showToast('All notifications marked as read', 'info');
};

// ── CONFIRM DIALOG ────────────────────────────────────────────────────
var _confirmCallback = null;
function showConfirm(message, onConfirm) {
  _confirmCallback = onConfirm;
  var el = document.getElementById('confirmMessage');
  if (el) el.textContent = message;
  openModal('confirmModal');
}
window.doConfirm = function() {
  closeModal('confirmModal');
  if (_confirmCallback) { _confirmCallback(); _confirmCallback = null; }
};
window.doCancel = function() {
  closeModal('confirmModal');
  _confirmCallback = null;
};

// ── CHARTS ────────────────────────────────────────────────────────────
function initPortfolioChart() {
  var canvas = document.getElementById('portfolioChart');
  if (!canvas || typeof Chart === 'undefined') return;
  if (STATE.portfolioChart) { STATE.portfolioChart.destroy(); STATE.portfolioChart = null; }
  var data = generateChartData(7);
  STATE.portfolioChart = new Chart(canvas, {
    type: 'line',
    data: {
      labels: data.labels,
      datasets: [{
        data: data.values,
        borderColor: '#6366f1',
        backgroundColor: function(ctx) {
          var g = ctx.chart.ctx.createLinearGradient(0,0,0,160);
          g.addColorStop(0,'rgba(99,102,241,0.3)');
          g.addColorStop(1,'rgba(99,102,241,0)');
          return g;
        },
        fill:true, tension:0.4, pointRadius:0, borderWidth:2.5,
      }]
    },
    options: {
      responsive:true, maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{
        backgroundColor:'rgba(17,17,32,0.95)',borderColor:'rgba(99,102,241,0.3)',borderWidth:1,
        titleColor:'#e2e8f0',bodyColor:'#94a3b8',
        callbacks:{label:function(ctx){return ' '+fmtC(ctx.raw);}}
      }},
      scales:{x:{display:false},y:{display:false}},
      interaction:{intersect:false,mode:'index'},
    }
  });
}

var chartSeeds = [0.5,0.3,0.7,0.4,0.6,0.8,0.2,0.9,0.55,0.35,0.65,0.45,0.75,0.52,0.82,0.22,0.62,0.42,0.72,0.32];
function generateChartData(pts) {
  var base = STATE.portfolio.total;
  var vals = [], labs = [];
  var v = base * 0.85;
  for (var i=0; i<pts; i++) {
    v += (chartSeeds[i % chartSeeds.length] - 0.45) * v * 0.03;
    vals.push(v);
    labs.push(i.toString());
  }
  vals[vals.length-1] = base;
  return {labels:labs, values:vals};
}

window.updateChart = function(period, btn) {
  document.querySelectorAll('#page-dashboard .chip').forEach(function(c){c.classList.remove('active');});
  if (btn) btn.classList.add('active');
  var ptsMap = {'1D':24,'1W':7,'1M':30,'3M':90,'1Y':365};
  var pts = ptsMap[period] || 7;
  if (STATE.portfolioChart) {
    var d = generateChartData(pts);
    STATE.portfolioChart.data.labels = d.labels;
    STATE.portfolioChart.data.datasets[0].data = d.values;
    STATE.portfolioChart.update('active');
  }
};

function initDonutChart() {
  var canvas = document.getElementById('donutChart');
  if (!canvas || typeof Chart === 'undefined') return;
  if (STATE.donutChart) { STATE.donutChart.destroy(); STATE.donutChart = null; }
  STATE.donutChart = new Chart(canvas, {
    type: 'doughnut',
    data: {
      datasets:[{
        data:[79,8,3.5,5.5,1.7,2.3],
        backgroundColor:['#6366f1','#ec4899','#f59e0b','#10b981','#8b5cf6','#06b6d4'],
        borderWidth:2, borderColor:'#111120',
      }]
    },
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},cutout:'65%'},
  });
}

// ── PORTFOLIO FILTER ──────────────────────────────────────────────────
window.filterPortfolio = function(filter, btn) {
  document.querySelectorAll('#page-portfolio .tab-item').forEach(function(b){b.classList.remove('active');});
  if (btn) btn.classList.add('active');
  var list = tokens;
  if (filter==='Crypto') list = tokens.filter(function(t){return !['USDT','USDC'].includes(t.symbol);});
  if (filter==='Stablecoins') list = tokens.filter(function(t){return ['USDT','USDC'].includes(t.symbol);});
  if (filter==='DeFi') list = tokens.filter(function(t){return ['AAVE','CRV','UNI','COMP','MKR','SUSHI','1INCH'].includes(t.symbol);});
  renderPortfolioTokens(list);
};

window.filterMarket = function(filter, btn) {
  document.querySelectorAll('#page-crypto .chip').forEach(function(b){b.classList.remove('active');});
  if (btn) btn.classList.add('active');
  var list = tokens;
  if (filter==='top') list = tokens.slice(0,10);
  if (filter==='gainers') list = tokens.slice().sort(function(a,b){return b.change-a.change;}).slice(0,10);
  renderMarketTokens(list);
};

window.searchTokens = function(q) {
  var list = tokens.filter(function(t){
    return t.symbol.toLowerCase().includes(q.toLowerCase())||t.name.toLowerCase().includes(q.toLowerCase());
  });
  renderMarketTokens(list);
};

// ── DEFI TAB SWITCH ──────────────────────────────────────────────────
window.switchDefiTab = function(tab, btn) {
  document.querySelectorAll('#page-defi .tab-item').forEach(function(b){b.classList.remove('active');});
  if (btn) btn.classList.add('active');
  var defiDiv = document.getElementById('defiPositionsList');
  var stakingDiv = document.getElementById('stakingSection');
  if (tab==='Positions'||tab==='Lending'||tab==='Liquidity'||tab==='Farming') {
    if (defiDiv) defiDiv.style.display='block';
    if (stakingDiv) stakingDiv.style.display='none';
  } else {
    if (defiDiv) defiDiv.style.display='none';
    if (stakingDiv) stakingDiv.style.display='block';
  }
};

// ── PAY TABS ──────────────────────────────────────────────────────────
window.switchPayTab = function(tab, btn) {
  document.querySelectorAll('.pay-tab').forEach(function(t){t.style.display='none';});
  var el = document.getElementById('tab-'+tab);
  if (el) el.style.display='block';
  document.querySelectorAll('#page-payments .tab-item').forEach(function(b){b.classList.remove('active');});
  if (btn) btn.classList.add('active');
};

// ── LIVE PRICE SIMULATION ─────────────────────────────────────────────
function simulateLivePrices() {
  setInterval(function(){
    tokens.forEach(function(tk, i){
      var delta = (Math.sin(Date.now()/5000 + i) * 0.3);
      tk.price *= (1 + delta/100);
      tk.change = Math.round((tk.change + delta*0.1)*100)/100;
    });
    // Update visible price elements
    document.querySelectorAll('[data-price-el]').forEach(function(el){
      var sym = el.getAttribute('data-price-el');
      var tk = tokens.find(function(t){return t.symbol===sym;});
      if (tk) el.textContent = fmtPrice(tk.price);
    });
  }, 5000);
}

// ── NETWORK STATUS ─────────────────────────────────────────────────────
function checkNetworkStatus() {
  function setStatus(online) {
    var el = document.getElementById('networkStatus');
    if (!el) return;
    if (online) {
      el.className = 'badge badge-green';
      el.innerHTML = '<i class="fas fa-circle" style="font-size:6px;"></i> '+t('online');
    } else {
      el.className = 'badge badge-red';
      el.innerHTML = '<i class="fas fa-circle" style="font-size:6px;"></i> '+t('offline');
      showToast('Offline mode — cached data shown', 'warning');
    }
  }
  window.addEventListener('offline', function(){ setStatus(false); });
  window.addEventListener('online', function(){ setStatus(true); showToast('Back online! Syncing...', 'success'); });
}

// ── NFT ACTIONS ───────────────────────────────────────────────────────
window.listNFT = function(name) {
  showConfirm('List "'+name+'" on OpenSea?', function(){
    showProcessingModal(['Approving NFT...','Creating listing...','Broadcasting...','Listed!'], function(){
      showToast(name+' listed on OpenSea! 🎉', 'success');
      addTransaction({type:'nft', asset:'NFT', amount:'Listed: '+name, value:'—', note:'OpenSea listing'});
    });
  });
};

window.transferNFT = function(name) {
  openModal('nftTransferModal');
  document.getElementById('nftTransferName').textContent = name;
};

window.confirmNFTTransfer = function() {
  var addr = document.getElementById('nftTransferAddr').value.trim();
  if (!addr) { showToast('Enter recipient address', 'error'); return; }
  var name = document.getElementById('nftTransferName').textContent;
  closeModal('nftTransferModal');
  showProcessingModal(['Verifying address...','Signing transfer...','Broadcasting...','Confirmed!'], function(){
    showToast(name+' transferred to '+addr.slice(0,12)+'... ✓', 'success');
    addTransaction({type:'nft', asset:'NFT', amount:'Transferred: '+name, value:'—', note:'To: '+addr.slice(0,12)+'...'});
  });
};

window.buyNFT = function(name, price) {
  showConfirm('Buy "'+name+'" for '+price+'?', function(){
    showProcessingModal(['Checking balance...','Placing bid...','Awaiting confirmation...','NFT transferred!'], function(){
      showToast('Bought '+name+' for '+price+' 🎨', 'success');
      addTransaction({type:'nft', asset:'NFT', amount:'Bought: '+name, value:price, note:'OpenSea marketplace'});
    });
  });
};

// ── TX DETAIL MODAL ───────────────────────────────────────────────────
window.copyTxHash = function() { showToast('Transaction hash copied! ✓', 'success'); };
window.viewOnExplorer = function() { showToast('Opening block explorer...', 'info'); };

// ── EXPORT TRANSACTIONS ───────────────────────────────────────────────
window.exportTransactions = function() {
  showProcessingModal(['Preparing data...','Generating CSV...','Ready!'], function(){
    var rows = ['Type,Asset,Amount,Value,Time,Note'];
    STATE.transactions.forEach(function(tx){
      rows.push([tx.type,tx.asset,tx.amount,tx.value,tx.time,tx.note||''].join(','));
    });
    var csv = rows.join('\n');
    var blob = new Blob([csv], {type:'text/csv'});
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = 'nexwallet_transactions.csv';
    a.click(); URL.revokeObjectURL(url);
    showToast('Transactions exported! ✓', 'success');
  });
};

// ── ADD GUARDIAN ──────────────────────────────────────────────────────
window.openAddGuardian = function() { openModal('addGuardianModal'); };
window.confirmAddGuardian = function() {
  var name = document.getElementById('guardianName').value.trim();
  var email = document.getElementById('guardianEmail').value.trim();
  if (!name || !email) { showToast('Enter name and email', 'error'); return; }
  closeModal('addGuardianModal');
  showProcessingModal(['Sending invitation...','Verifying guardian...','Saving...'], function(){
    showToast('Guardian '+name+' added! Invitation sent ✓', 'success');
    document.getElementById('guardianName').value = '';
    document.getElementById('guardianEmail').value = '';
  });
};

// ── LINK BANK ──────────────────────────────────────────────────────────
window.openLinkBank = function() { openModal('linkBankModal'); };
window.confirmLinkBank = function() {
  var bank = document.getElementById('newBankSelect').value;
  var acc = document.getElementById('newAccNumber').value.trim();
  var ifsc = document.getElementById('newIFSC').value.trim();
  if (!acc || !ifsc) { showToast('Enter account number and IFSC code', 'error'); return; }
  closeModal('linkBankModal');
  showProcessingModal(['Validating account...','Sending penny test...','Verifying...','Bank linked!'], function(){
    showToast(bank+' account linked successfully ✓', 'success');
    document.getElementById('newAccNumber').value = '';
    document.getElementById('newIFSC').value = '';
  });
};

// ── ADD TOKEN ─────────────────────────────────────────────────────────
window.addTokenToWallet = function(symbol) {
  var tk = tokens.find(function(t){return t.symbol===symbol;});
  if (tk) { showToast(symbol+' already in portfolio', 'info'); return; }
  showToast(symbol+' added to portfolio ✓', 'success');
};

// ── COPY ADDRESS ──────────────────────────────────────────────────────
window.copyAddress = function(type) {
  var addresses = {
    BTC: '3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5',
    ETH: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    SOL: '7EcDhSYGxXyscszYEp35KHN8vvw3svAuLKTzXwCFLtV',
  };
  var addr = addresses[type] || addresses.ETH;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(addr).then(function(){
      showToast(type+' address copied! ✓', 'success');
    }).catch(function(){
      showToast(type+' address: '+addr.slice(0,20)+'...', 'info');
    });
  } else {
    showToast(type+' address copied! ✓', 'success');
  }
};

// ═══════════════════════════════════════════════════════════════════
// NEXWALLET — EXTENDED FUNCTIONS v4.0 (ALL FULLY FUNCTIONAL)
// ═══════════════════════════════════════════════════════════════════

// ── DEPOSIT FUNCTIONS ─────────────────────────────────────────────

window.openDeposit = function() {
  document.getElementById('depositUPIAmt') && (document.getElementById('depositUPIAmt').value = '');
  document.getElementById('depositBankAmt') && (document.getElementById('depositBankAmt').value = '');
  document.getElementById('depositCardAmt') && (document.getElementById('depositCardAmt').value = '');
  // Reset to UPI tab
  var bar = document.getElementById('depositTabBar');
  if (bar) {
    bar.querySelectorAll('.tab-item').forEach(function(b){ b.classList.remove('active'); });
    var first = bar.querySelector('.tab-item');
    if (first) first.classList.add('active');
  }
  switchDepositMethod('upi', null);
  openModal('depositModal');
};

window.switchDepositMethod = function(method, btn) {
  ['depositUPI','depositBank','depositCard'].forEach(function(id){
    var el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  var show = document.getElementById('deposit'+method.charAt(0).toUpperCase()+method.slice(1));
  if (show) show.style.display = 'block';
  if (btn) {
    var bar = document.getElementById('depositTabBar');
    if (bar) bar.querySelectorAll('.tab-item').forEach(function(b){ b.classList.remove('active'); });
    btn.classList.add('active');
  }
};

window.setDepositAmt = function(amt) {
  var el = document.getElementById('depositUPIAmt');
  if (el) { el.value = amt; el.focus(); }
};

window.processDeposit = function() {
  // Find which method is active
  var upiEl = document.getElementById('depositUPI');
  var bankEl = document.getElementById('depositBank');
  var cardEl = document.getElementById('depositCard');

  var method = 'UPI', amt = 0;

  if (upiEl && upiEl.style.display !== 'none') {
    amt = parseFloat(document.getElementById('depositUPIAmt') ? document.getElementById('depositUPIAmt').value : '0') || 0;
    method = 'UPI';
    if (!amt || amt <= 0) { showToast('Enter deposit amount', 'error'); return; }
  } else if (bankEl && bankEl.style.display !== 'none') {
    amt = parseFloat(document.getElementById('depositBankAmt') ? document.getElementById('depositBankAmt').value : '0') || 0;
    var bank = document.getElementById('depositBankSel') ? document.getElementById('depositBankSel').value : 'Bank';
    method = bank.split('—')[0].trim();
    if (!amt || amt <= 0) { showToast('Enter deposit amount', 'error'); return; }
  } else if (cardEl && cardEl.style.display !== 'none') {
    var cardNum = document.getElementById('depositCardNum') ? document.getElementById('depositCardNum').value.trim() : '';
    var cardExp = document.getElementById('depositCardExp') ? document.getElementById('depositCardExp').value.trim() : '';
    var cardCVV = document.getElementById('depositCardCVV') ? document.getElementById('depositCardCVV').value.trim() : '';
    amt = parseFloat(document.getElementById('depositCardAmt') ? document.getElementById('depositCardAmt').value : '0') || 0;
    method = 'Card';
    if (!cardNum || cardNum.length < 15) { showToast('Enter valid card number', 'error'); return; }
    if (!cardExp || !cardExp.includes('/')) { showToast('Enter valid expiry (MM/YY)', 'error'); return; }
    if (!cardCVV || cardCVV.length < 3) { showToast('Enter valid CVV', 'error'); return; }
    if (!amt || amt <= 0) { showToast('Enter deposit amount', 'error'); return; }
  }

  if (amt > 1000000) { showToast('Maximum single deposit is ₹10,00,000', 'error'); return; }

  showConfirm('Deposit ' + fmtC(amt) + ' via ' + method + '?', function() {
    closeModal('depositModal');
    var steps = method === 'UPI'
      ? ['Connecting to UPI...', 'Authenticating payment...', 'Crediting to wallet...', 'Confirmed!']
      : method === 'Card'
      ? ['Verifying card...', 'Processing payment...', 'Crediting to wallet...', 'Deposit confirmed!']
      : ['Initiating bank transfer...', 'Verifying IFSC...', 'Processing NEFT/RTGS...', 'Deposit confirmed!'];

    showProcessingModal(steps, function() {
      STATE.portfolio.fiat += amt;
      STATE.portfolio.total += amt;
      addTransaction({type:'deposit', asset:'INR', amount:'+₹'+amt.toLocaleString('en-IN'), value:fmtC(amt), note:'Deposited via '+method});
      refreshPortfolioDisplay();
      showToast(t('deposit_success') + ' ' + fmtC(amt) + ' via ' + method, 'success');
    });
  });
};

window.formatCardNum = function(input) {
  var v = input.value.replace(/\D/g,'').substring(0,16);
  input.value = v.replace(/(.{4})/g,'$1 ').trim();
};

// ── WITHDRAW FUNCTIONS ────────────────────────────────────────────

window.openWithdraw = function() {
  document.getElementById('withdrawUPIId') && (document.getElementById('withdrawUPIId').value = '');
  document.getElementById('withdrawUPIAmt') && (document.getElementById('withdrawUPIAmt').value = '');
  document.getElementById('withdrawBankAmt') && (document.getElementById('withdrawBankAmt').value = '');
  document.getElementById('withdrawCryptoAmt') && (document.getElementById('withdrawCryptoAmt').value = '');
  document.getElementById('withdrawCryptoAddr') && (document.getElementById('withdrawCryptoAddr').value = '');
  switchWithdrawMethod('upi', null);
  openModal('withdrawModal');
};

window.switchWithdrawMethod = function(method, btn) {
  ['withdrawUPI','withdrawBank','withdrawCrypto'].forEach(function(id){
    var el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  var show = document.getElementById('withdraw' + method.charAt(0).toUpperCase() + method.slice(1));
  if (show) show.style.display = 'block';
  if (btn) {
    var bar = document.getElementById('withdrawTabBar');
    if (bar) bar.querySelectorAll('.tab-item').forEach(function(b){ b.classList.remove('active'); });
    btn.classList.add('active');
  }
};

window.setWithdrawAmt = function(method, amt) {
  var ids = {upi: 'withdrawUPIAmt', bank: 'withdrawBankAmt', crypto: 'withdrawCryptoAmt'};
  var el = document.getElementById(ids[method]);
  if (el) { el.value = amt; el.focus(); }
};

window.processWithdraw = function() {
  var upiEl = document.getElementById('withdrawUPI');
  var bankEl = document.getElementById('withdrawBank');
  var cryptoEl = document.getElementById('withdrawCrypto');

  var method = 'UPI', amt = 0, extra = '';

  if (upiEl && upiEl.style.display !== 'none') {
    var upiId = document.getElementById('withdrawUPIId') ? document.getElementById('withdrawUPIId').value.trim() : '';
    amt = parseFloat(document.getElementById('withdrawUPIAmt') ? document.getElementById('withdrawUPIAmt').value : '0') || 0;
    method = 'UPI';
    if (!upiId) { showToast('Enter UPI ID for withdrawal', 'error'); return; }
    if (!amt || amt <= 0) { showToast('Enter withdrawal amount', 'error'); return; }
    if (amt > STATE.portfolio.fiat) { showToast('Insufficient fiat balance for withdrawal', 'error'); return; }
    extra = 'To: ' + upiId;
  } else if (bankEl && bankEl.style.display !== 'none') {
    amt = parseFloat(document.getElementById('withdrawBankAmt') ? document.getElementById('withdrawBankAmt').value : '0') || 0;
    var sel = document.getElementById('withdrawBankSel');
    method = sel ? sel.value.split('—')[0].trim() : 'Bank';
    if (!amt || amt <= 0) { showToast('Enter withdrawal amount', 'error'); return; }
    if (amt > STATE.portfolio.fiat) { showToast('Insufficient fiat balance', 'error'); return; }
    extra = 'To: ' + method;
  } else if (cryptoEl && cryptoEl.style.display !== 'none') {
    var addr = document.getElementById('withdrawCryptoAddr') ? document.getElementById('withdrawCryptoAddr').value.trim() : '';
    var token = document.getElementById('withdrawCryptoToken') ? document.getElementById('withdrawCryptoToken').value : 'ETH';
    amt = parseFloat(document.getElementById('withdrawCryptoAmt') ? document.getElementById('withdrawCryptoAmt').value : '0') || 0;
    method = 'Crypto (' + token + ')';
    if (!addr) { showToast('Enter destination wallet address', 'error'); return; }
    if (!amt || amt <= 0) { showToast('Enter withdrawal amount', 'error'); return; }
    var tk = tokens.find(function(x){ return x.symbol === token; });
    if (tk && tk.balance < amt) { showToast('Insufficient ' + token + ' balance', 'error'); return; }
    extra = 'To: ' + addr.slice(0,12) + '...';
  }

  showConfirm('Withdraw ' + fmtC(amt) + ' via ' + method + '?', function() {
    closeModal('withdrawModal');
    var steps = ['Verifying identity...', 'Processing withdrawal...', 'Sending funds...', 'Withdrawal confirmed!'];
    if (method.includes('Crypto')) {
      steps = ['Verifying address...', 'Signing transaction...', 'Broadcasting to network...', 'Withdrawal initiated!'];
    }

    showProcessingModal(steps, function() {
      if (method.includes('Crypto')) {
        var withdrawTk = tokens.find(function(x){ return x.symbol === document.getElementById('withdrawCryptoToken').value; });
        if (withdrawTk) {
          withdrawTk.balance = Math.max(0, withdrawTk.balance - amt);
          STATE.portfolio.crypto -= amt * withdrawTk.price;
          STATE.portfolio.total -= amt * withdrawTk.price;
        }
        addTransaction({type:'withdraw', asset:document.getElementById('withdrawCryptoToken').value, amount:'-'+amt+' '+document.getElementById('withdrawCryptoToken').value, value:fmtC(amt*(withdrawTk?withdrawTk.price:0)), note:extra});
      } else {
        STATE.portfolio.fiat = Math.max(0, STATE.portfolio.fiat - amt);
        STATE.portfolio.total = Math.max(0, STATE.portfolio.total - amt);
        addTransaction({type:'withdraw', asset:'INR', amount:'-₹'+amt.toLocaleString('en-IN'), value:fmtC(amt), note:extra});
      }
      refreshPortfolioDisplay();
      showToast(t('withdraw_success') + ' ' + fmtC(amt) + ' via ' + method, 'success');
    });
  });
};

// ── CARD PAYMENT ──────────────────────────────────────────────────

window.openCardPay = function(cardNum, holder, expiry) {
  document.getElementById('cardPayNumber').textContent = cardNum || '•••• •••• •••• 4523';
  document.getElementById('cardPayHolder').textContent = holder || 'ARJUN KUMAR';
  document.getElementById('cardPayExpiry').textContent = expiry || '12/27';
  document.getElementById('cardPayRecipient').value = '';
  document.getElementById('cardPayAmt').value = '';
  document.getElementById('cardPayNote').value = '';
  openModal('cardPayModal');
};

window.processCardPay = function() {
  var recipient = document.getElementById('cardPayRecipient') ? document.getElementById('cardPayRecipient').value.trim() : '';
  var amt = parseFloat(document.getElementById('cardPayAmt') ? document.getElementById('cardPayAmt').value : '0') || 0;
  var note = document.getElementById('cardPayNote') ? document.getElementById('cardPayNote').value : '';
  var cardNum = document.getElementById('cardPayNumber') ? document.getElementById('cardPayNumber').textContent : '';

  if (!recipient) { showToast('Enter merchant/recipient name', 'error'); return; }
  if (!amt || amt <= 0) { showToast('Enter payment amount', 'error'); return; }
  if (amt > 200000) { showToast('Daily card limit is ₹2,00,000', 'error'); return; }

  showConfirm('Pay ' + fmtC(amt) + ' to ' + recipient + ' via card?', function() {
    closeModal('cardPayModal');
    showProcessingModal(['Authenticating card...', 'OTP verification...', 'Processing payment...', 'Payment confirmed!'], function() {
      STATE.portfolio.fiat = Math.max(0, STATE.portfolio.fiat - amt);
      STATE.portfolio.total = Math.max(0, STATE.portfolio.total - amt);
      addTransaction({type:'upi', asset:'INR', amount:'-₹'+amt.toLocaleString('en-IN'), value:fmtC(amt), note:'Card payment to '+recipient+(note?' — '+note:'')});
      refreshPortfolioDisplay();
      showToast('Card payment of ' + fmtC(amt) + ' to ' + recipient + ' ✓', 'success');
    });
  });
};

// ── NET BANKING ───────────────────────────────────────────────────

window.switchNetBankTab = function(type, btn) {
  document.querySelectorAll('#netBankModal .tab-item').forEach(function(b){ b.classList.remove('active'); });
  if (btn) btn.classList.add('active');

  var info = {
    neft: {label:'NEFT', time:'2-4 hours', limits:'₹1 / ₹10L'},
    rtgs: {label:'RTGS', time:'30 min - 2 hours', limits:'₹2L / ₹50L'},
    imps: {label:'IMPS', time:'Instant (24x7)', limits:'₹1 / ₹5L'},
  };
  var d = info[type] || info.neft;
  var typeEl = document.getElementById('netBankType');
  var timeEl = document.getElementById('netBankTime');
  var limitsEl = document.getElementById('netBankLimits');
  if (typeEl) typeEl.textContent = d.label;
  if (timeEl) timeEl.textContent = d.time;
  if (limitsEl) limitsEl.textContent = d.limits;
};

window.processNetBanking = function() {
  var bank = document.getElementById('netBankSel') ? document.getElementById('netBankSel').value : '';
  var accNum = document.getElementById('netBankAccNum') ? document.getElementById('netBankAccNum').value.trim() : '';
  var ifsc = document.getElementById('netBankIFSC') ? document.getElementById('netBankIFSC').value.trim() : '';
  var name = document.getElementById('netBankName') ? document.getElementById('netBankName').value.trim() : '';
  var amt = parseFloat(document.getElementById('netBankAmt') ? document.getElementById('netBankAmt').value : '0') || 0;
  var note = document.getElementById('netBankNote') ? document.getElementById('netBankNote').value : '';
  var type = document.getElementById('netBankType') ? document.getElementById('netBankType').textContent : 'NEFT';

  if (!accNum || accNum.length < 8) { showToast('Enter valid account number', 'error'); return; }
  if (!ifsc || ifsc.length < 11) { showToast('Enter valid IFSC code (11 characters)', 'error'); return; }
  if (!name) { showToast('Enter beneficiary name', 'error'); return; }
  if (!amt || amt <= 0) { showToast('Enter transfer amount', 'error'); return; }
  if (type === 'RTGS' && amt < 200000) { showToast('RTGS minimum amount is ₹2,00,000', 'error'); return; }
  if (STATE.portfolio.fiat < amt) { showToast('Insufficient fiat balance', 'error'); return; }

  showConfirm('Transfer ' + fmtC(amt) + ' to ' + name + ' via ' + type + '?', function() {
    closeModal('netBankModal');
    var steps = type === 'IMPS'
      ? ['Verifying account...', 'Authenticating...', 'Processing IMPS...', 'Transfer successful!']
      : type === 'RTGS'
      ? ['Verifying RTGS limit...', 'RBI clearance...', 'Processing RTGS...', 'Transfer initiated!']
      : ['Queuing NEFT batch...', 'Verifying account...', 'Processing NEFT...', 'Transfer scheduled!'];

    showProcessingModal(steps, function() {
      STATE.portfolio.fiat = Math.max(0, STATE.portfolio.fiat - amt);
      STATE.portfolio.total = Math.max(0, STATE.portfolio.total - amt);
      addTransaction({type:'send', asset:'INR', amount:'-₹'+amt.toLocaleString('en-IN'), value:fmtC(amt), note:type+' to '+name+' ('+accNum.slice(-4)+')'});
      refreshPortfolioDisplay();
      // Clear form
      ['netBankAccNum','netBankIFSC','netBankName','netBankAmt','netBankNote'].forEach(function(id){
        var el = document.getElementById(id); if (el) el.value = '';
      });
      showToast(type + ' transfer of ' + fmtC(amt) + ' to ' + name + ' ✓', 'success');
    });
  });
};

// ── UPI MODAL (ENHANCED) ──────────────────────────────────────────

window.processUPIModal = function() {
  var id = document.getElementById('upiModalId') ? document.getElementById('upiModalId').value.trim() : '';
  var amt = parseFloat(document.getElementById('upiModalAmt') ? document.getElementById('upiModalAmt').value : '0') || 0;
  var note = document.getElementById('upiModalNote') ? document.getElementById('upiModalNote').value : '';
  if (!id) { showToast('Enter UPI ID', 'error'); return; }
  if (!amt || amt <= 0) { showToast('Enter amount', 'error'); return; }
  if (amt > 100000) { showToast('Daily UPI limit is ₹1,00,000', 'error'); return; }

  showConfirm('Pay ' + fmtC(amt) + ' to ' + id + '?', function() {
    showProcessingModal(['Connecting to UPI...','Authenticating...','Sending payment...','Confirmed!'], function(){
      STATE.portfolio.fiat = Math.max(0, STATE.portfolio.fiat - amt);
      STATE.portfolio.total = Math.max(0, STATE.portfolio.total - amt);
      addTransaction({type:'upi', asset:'INR', amount:'-₹'+amt.toLocaleString('en-IN'), value:fmtC(amt), note:'To: '+id+(note?' — '+note:'')});
      refreshPortfolioDisplay();
      closeModal('upiPayModal');
      document.getElementById('upiModalId').value = '';
      document.getElementById('upiModalAmt').value = '';
      if (document.getElementById('upiModalNote')) document.getElementById('upiModalNote').value = '';
      showToast(t('upi_success') + ' ₹' + amt.toLocaleString('en-IN') + ' → ' + id, 'success');
    });
  });
};

// ── PROFILE UPDATES ───────────────────────────────────────────────

// Override openEditProfile to also populate KYC
var _origOpenEditProfile = window.openEditProfile;
window.openEditProfile = function() {
  document.getElementById('editName').value = STATE.profile.name;
  document.getElementById('editEmail').value = STATE.profile.email;
  document.getElementById('editPhone').value = STATE.profile.phone;
  document.getElementById('editDob').value = STATE.profile.dob;
  var panEl = document.getElementById('editPanDisplay');
  if (panEl) panEl.textContent = STATE.profile.pan;
  var kycBadge = document.querySelector('#editProfileModal .badge-green');
  if (kycBadge) kycBadge.textContent = STATE.profile.kyc + ' Verified';
  var avEl = document.getElementById('editAvatarPreview');
  if (avEl) avEl.textContent = STATE.profile.avatar;
  openModal('editProfileModal');
};

// Also update settings profile card on save
var _origSaveProfile = window.saveProfile;
window.saveProfile = function() {
  var name = document.getElementById('editName').value.trim();
  var email = document.getElementById('editEmail').value.trim();
  var phone = document.getElementById('editPhone').value.trim();
  var dob = document.getElementById('editDob').value;

  if (!name) { showToast('Name cannot be empty', 'error'); return; }
  if (!email || !email.includes('@')) { showToast('Enter valid email', 'error'); return; }
  if (!phone || phone.replace(/\D/g,'').length < 10) { showToast('Enter valid phone number', 'error'); return; }

  STATE.profile.name = name;
  STATE.profile.email = email;
  STATE.profile.phone = phone;
  STATE.profile.dob = dob;

  closeModal('editProfileModal');
  loadProfileUI();

  // Also update settings page profile display
  var settingsName = document.querySelector('#page-settings .card .text-lg, #page-settings .card div[style*="font-size:17px"]');
  if (settingsName) settingsName.textContent = name;

  // Update all profile name displays
  document.querySelectorAll('[data-profile-name]').forEach(function(el){ el.textContent = name; });

  // Persist to localStorage
  var stored = localStorage.getItem('nexwallet_user');
  if (stored) {
    try {
      var user = JSON.parse(stored);
      user.name = name; user.email = email; user.phone = phone; user.dob = dob;
      user.avatar = STATE.profile.avatar;
      localStorage.setItem('nexwallet_user', JSON.stringify(user));
    } catch(e){}
  }

  // Refresh dashboard user display
  if (typeof refreshDashboardUser === 'function') refreshDashboardUser();

  showToast(t('profile_saved'), 'success');
};

// ── STAKING QUICK BUTTONS ─────────────────────────────────────────

window.stakeQuick = function(pct) {
  var s = STATE.stakingModal && STATE.stakingModal.pos;
  var input = document.getElementById('stakeAmtInput');
  if (!input || !s) return;
  var tk = tokens.find(function(t){ return t.symbol === s.token; });
  var available = STATE.stakingModal.type === 'stake' ? (tk ? tk.balance : 0) : s.amount;
  var amt = (available * pct / 100);
  input.value = amt.toFixed(6);

  var apy = s.apy;
  var estEl = document.getElementById('stakeEstReward');
  if (estEl) estEl.textContent = fmtC(amt * (tk ? tk.price : 0) * apy / 100) + '/yr';
};

window.tradeQuick = function(pct) {
  var tk = STATE.selectedToken;
  var input = document.getElementById('tradeAmtInput');
  if (!input || !tk) return;
  var mode = document.querySelector('#tradeModeBar .active');
  var modeVal = mode ? mode.getAttribute('data-mode') : 'buy';
  if (modeVal === 'buy') {
    var inrAvail = STATE.portfolio.fiat;
    input.value = (inrAvail * pct / 100).toFixed(0);
  } else {
    var bal = tk.balance;
    input.value = (bal * pct / 100).toFixed(6);
  }
  calcTradeValue();
};

// ── LANGUAGE UPDATE (extended) ────────────────────────────────────

// Override setLanguage to properly update lang chips
var _origSetLanguage = window.setLanguage;
window.setLanguage = function(code, btn) {
  STATE.currentLang = code;
  document.querySelectorAll('.lang-chip').forEach(function(b){ b.classList.remove('active'); });
  if (btn) btn.classList.add('active');
  applyLanguage(code);
  showToast(t('lang_changed'), 'success');
};

// ── EXPORT (enhanced) ─────────────────────────────────────────────

window.exportTransactions = function() {
  showProcessingModal(['Preparing data...','Generating CSV...','Ready!'], function(){
    var rows = ['Type,Asset,Amount,Value,Time,Note,Status'];
    STATE.transactions.forEach(function(tx){
      rows.push([tx.type, tx.asset, '"'+tx.amount+'"', '"'+tx.value+'"', tx.time, '"'+(tx.note||'')+'"', tx.status||'completed'].join(','));
    });
    var csv = rows.join('\n');
    var blob = new Blob([csv], {type:'text/csv'});
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = 'nexwallet_transactions_'+new Date().toISOString().slice(0,10)+'.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Exported '+STATE.transactions.length+' transactions ✓', 'success');
  });
};

// ── QUICK ACCESS FROM DASHBOARD ──────────────────────────────────

window.openDepositFromDash = function() {
  openDeposit();
};

window.openWithdrawFromDash = function() {
  openWithdraw();
};

// ── LOCK WALLET (enhanced) ────────────────────────────────────────

var _origLockApp = window.lockApp;
window.lockApp = function() {
  showConfirm('Lock wallet and return to PIN screen?', function() {
    if (_origLockApp) _origLockApp();
  });
};

// ── ACTIVITY PAGE EXPORT ──────────────────────────────────────────

// Fix export button on activity page
document.addEventListener('DOMContentLoaded', function() {
  var exportBtn = document.querySelector('#page-activity button');
  if (exportBtn) {
    exportBtn.onclick = function() { exportTransactions(); };
  }
});

// ── NET BANKING (pre-fill on click) ──────────────────────────────

window.openNetBankingForBank = function(bankName) {
  var sel = document.getElementById('netBankSel');
  if (sel) {
    for (var i = 0; i < sel.options.length; i++) {
      if (sel.options[i].text.toLowerCase().includes(bankName.toLowerCase())) {
        sel.selectedIndex = i;
        break;
      }
    }
  }
  openModal('netBankModal');
};

console.log('[NexWallet v4.0] All functions loaded ✓');

// ═══════════════════════════════════════════════════════════════════
// REGISTRATION / ONBOARDING ENGINE
// ═══════════════════════════════════════════════════════════════════

var REG = {
  currentStep: 1,
  totalSteps: 5,
  pin1: '',
  pin2: '',
  pinPhase: 1, // 1 = set, 2 = confirm
  selectedAvatar: '🧑',
  data: {}
};

// ══════════════════════════════════════════════════════════════════
// CLOUDFLARE-STYLE IDENTITY VERIFICATION ENGINE
// ══════════════════════════════════════════════════════════════════

var CF = {
  method: 'email',   // current method: email | phone | aadhar
  otpSent: { email: false, phone: false, aadhar: false },
  timer: { email: null, phone: null, aadhar: null },
  countdown: { email: 0, phone: 0, aadhar: 0 }
};

function cfSwitchMethod(method) {
  CF.method = method;
  ['email','phone','aadhar'].forEach(function(m) {
    var panel = document.getElementById('cfPanel-' + m);
    var tab   = document.getElementById('cfTab-' + m);
    if (panel) panel.style.display = (m === method) ? 'block' : 'none';
    if (tab)   { tab.classList.toggle('active', m === method); }
  });
  cfClearError();
}

function cfShowError(msg, isSuccess) {
  var bar = document.getElementById('cfErrorBar');
  if (!bar) return;
  bar.style.display = 'block';
  if (isSuccess) {
    bar.style.background = 'rgba(16,185,129,0.12)';
    bar.style.border     = '1px solid rgba(16,185,129,0.3)';
    bar.style.color      = '#10b981';
  } else {
    bar.style.background = 'rgba(239,68,68,0.1)';
    bar.style.border     = '1px solid rgba(239,68,68,0.25)';
    bar.style.color      = '#ef4444';
  }
  bar.textContent = msg;
  // Scroll bar into view
  bar.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function cfClearError() {
  var bar = document.getElementById('cfErrorBar');
  if (bar) bar.style.display = 'none';
}

function cfStartResendTimer(method) {
  CF.countdown[method] = 60;
  var resendBtn = document.getElementById('cf' + method.charAt(0).toUpperCase() + method.slice(1) + 'ResendBtn');
  // capitalise first letter properly for 'aadhar'
  var key = method === 'aadhar' ? 'Aadhar' : (method.charAt(0).toUpperCase() + method.slice(1));
  resendBtn = document.getElementById('cf' + key + 'ResendBtn');
  if (CF.timer[method]) clearInterval(CF.timer[method]);
  CF.timer[method] = setInterval(function() {
    CF.countdown[method]--;
    if (resendBtn) resendBtn.textContent = 'Resend (' + CF.countdown[method] + 's)';
    if (CF.countdown[method] <= 0) {
      clearInterval(CF.timer[method]);
      if (resendBtn) { resendBtn.textContent = 'Resend'; resendBtn.style.display = 'inline-flex'; }
    }
  }, 1000);
}

// ── SEND EMAIL OTP ────────────────────────────────────────────────
window.cfSendEmailOtp = async function() {
  cfClearError();
  var email = (document.getElementById('cfEmailInput') || {}).value || '';
  if (!email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
    cfShowError('❌ Please enter a valid email address before requesting an OTP.');
    return;
  }
  var btn = document.querySelector('#cfEmailSendRow button');
  if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…'; }
  try {
    var res = await fetch('/api/verify/send-email-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim() })
    });
    var data = await res.json();
    if (data.success) {
      CF.otpSent.email = true;
      document.getElementById('cfEmailOtpRow').style.display  = 'block';
      document.getElementById('cfEmailSendRow').style.display = 'none';
      document.getElementById('cfEmailVerifyRow').style.display = 'block';
      document.getElementById('cfEmailResendBtn').style.display = 'inline-flex';
      document.getElementById('cfEmailOtpMsg').textContent = '— ' + data.message;
      cfShowError('📧 ' + data.message, true);
      cfStartResendTimer('email');
    } else {
      cfShowError(data.error || 'Failed to send OTP. Please check your email and try again.');
    }
  } catch(e) {
    cfShowError('Network error. Please check your connection and try again.');
  }
  if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send OTP to Email'; }
};

// ── SEND PHONE OTP ────────────────────────────────────────────────
window.cfSendPhoneOtp = async function() {
  cfClearError();
  var phone = (document.getElementById('cfPhoneInput') || {}).value || '';
  if (phone.replace(/\D/g,'').length !== 10) {
    cfShowError('❌ Please enter a valid 10-digit Indian mobile number. Wrong info will be flagged.');
    return;
  }
  var btn = document.querySelector('#cfPhoneSendRow button');
  if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…'; }
  try {
    var res = await fetch('/api/verify/send-phone-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: phone.replace(/\D/g,''), type: 'phone' })
    });
    var data = await res.json();
    if (data.success) {
      CF.otpSent.phone = true;
      document.getElementById('cfPhoneOtpRow').style.display  = 'block';
      document.getElementById('cfPhoneSendRow').style.display = 'none';
      document.getElementById('cfPhoneVerifyRow').style.display = 'block';
      document.getElementById('cfPhoneResendBtn').style.display = 'inline-flex';
      document.getElementById('cfPhoneOtpMsg').textContent = '— ' + data.message;
      cfShowError('📱 ' + data.message, true);
      cfStartResendTimer('phone');
    } else {
      cfShowError(data.error || '❌ Wrong phone number. Please enter correct details.');
    }
  } catch(e) {
    cfShowError('Network error. Please check your connection and try again.');
  }
  if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-sms"></i> Send OTP to Phone'; }
};

// ── SEND AADHAR OTP ───────────────────────────────────────────────
window.cfSendAadharOtp = async function() {
  cfClearError();
  var aadhar = (document.getElementById('cfAadharInput') || {}).value || '';
  if (aadhar.replace(/\D/g,'').length !== 12) {
    cfShowError('❌ Invalid Aadhaar number. Please enter all 12 digits. Wrong info is flagged for security.');
    return;
  }
  var btn = document.querySelector('#cfAadharSendRow button');
  if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…'; }
  try {
    var res = await fetch('/api/verify/send-phone-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: aadhar, type: 'aadhar' })
    });
    var data = await res.json();
    if (data.success) {
      CF.otpSent.aadhar = true;
      document.getElementById('cfAadharOtpRow').style.display  = 'block';
      document.getElementById('cfAadharSendRow').style.display = 'none';
      document.getElementById('cfAadharVerifyRow').style.display = 'block';
      document.getElementById('cfAadharResendBtn').style.display = 'inline-flex';
      document.getElementById('cfAadharOtpMsg').textContent = '— ' + data.message;
      cfShowError('🪪 ' + data.message, true);
      cfStartResendTimer('aadhar');
    } else {
      cfShowError(data.error || '❌ Wrong Aadhaar number. Please enter correct details.');
    }
  } catch(e) {
    cfShowError('Network error. Please check your connection and try again.');
  }
  if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-fingerprint"></i> Send OTP to Aadhaar Number'; }
};

// ── VERIFY OTP ────────────────────────────────────────────────────
window.cfVerifyOtp = async function(method) {
  cfClearError();
  var key = '', otp = '';
  if (method === 'email') {
    key = (document.getElementById('cfEmailInput') || {}).value || '';
    otp = (document.getElementById('cfEmailOtpInput') || {}).value || '';
  } else if (method === 'phone') {
    key = (document.getElementById('cfPhoneInput') || {}).value || '';
    otp = (document.getElementById('cfPhoneOtpInput') || {}).value || '';
  } else if (method === 'aadhar') {
    key = (document.getElementById('cfAadharInput') || {}).value || '';
    otp = (document.getElementById('cfAadharOtpInput') || {}).value || '';
  }

  if (!otp.trim() || otp.trim().length !== 6) {
    cfShowError('❌ Please enter the complete 6-digit OTP sent to you.');
    return;
  }

  var capKey = method === 'aadhar' ? 'Aadhar' : (method.charAt(0).toUpperCase() + method.slice(1));
  var verifyBtn = document.querySelector('#cf' + capKey + 'VerifyRow button');
  if (verifyBtn) { verifyBtn.disabled = true; verifyBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying…'; }

  try {
    var res = await fetch('/api/verify/confirm-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: key.trim(), otp: otp.trim(), type: method })
    });
    var data = await res.json();
    if (data.success) {
      // ✅ VERIFIED — mark session and proceed
      sessionStorage.setItem('nexwallet_verified', '1');
      cfShowError('✅ Identity verified successfully! Loading your wallet…', true);
      setTimeout(function() { cfProceedToApp(); }, 1200);
    } else {
      cfShowError(data.error || '❌ Wrong OTP. Please enter correct details.');
      if (verifyBtn) { verifyBtn.disabled = false; verifyBtn.innerHTML = '<i class="fas fa-check-circle"></i> Verify OTP'; }
    }
  } catch(e) {
    cfShowError('Network error. Please try again.');
    if (verifyBtn) { verifyBtn.disabled = false; verifyBtn.innerHTML = '<i class="fas fa-check-circle"></i> Verify OTP'; }
  }
};

// ── After verification: hide cfVerifyScreen and show next screen ──
function cfProceedToApp() {
  var cfScreen = document.getElementById('cfVerifyScreen');
  if (cfScreen) {
    cfScreen.style.opacity = '0';
    cfScreen.style.transition = 'opacity 0.5s ease';
    setTimeout(function() {
      cfScreen.style.display = 'none';
      // Now determine what to show next
      cfLoadMainApp();
    }, 500);
  } else {
    cfLoadMainApp();
  }
}

function cfLoadMainApp() {
  var stored = localStorage.getItem('nexwallet_user');
  if (stored) {
    try {
      var user = JSON.parse(stored);
      STATE.profile.name    = user.name    || STATE.profile.name;
      STATE.profile.email   = user.email   || STATE.profile.email;
      STATE.profile.phone   = user.phone   || STATE.profile.phone;
      STATE.profile.dob     = user.dob     || STATE.profile.dob;
      STATE.profile.pan     = user.pan     || STATE.profile.pan;
      STATE.profile.aadhar  = user.aadhar  || STATE.profile.aadhar;
      STATE.profile.kyc     = user.kyc     || STATE.profile.kyc;
      STATE.profile.avatar  = user.avatar  || STATE.profile.avatar;
      STATE.profile.upi     = user.upi     || '';
      STATE.savedPin        = user.pin     || '';
      updateLockScreenUser(user);
    } catch(e) {}
    var ls = document.getElementById('lockScreen');
    if (ls) ls.style.display = 'flex';
  } else {
    var ls2 = document.getElementById('lockScreen');
    var rs  = document.getElementById('regScreen');
    if (ls2) ls2.style.display = 'none';
    if (rs)  rs.style.display  = 'block';
  }
}

// ── BOOT: check if user is registered ────────────────────────────
function checkRegistration() {
  // Always show the Cloudflare verification screen first unless already verified in this session
  var verified = sessionStorage.getItem('nexwallet_verified');
  if (!verified) {
    // Show verification screen; hide everything else
    var cfScreen = document.getElementById('cfVerifyScreen');
    var ls       = document.getElementById('lockScreen');
    var rs       = document.getElementById('regScreen');
    if (cfScreen) cfScreen.style.display = 'flex';
    if (ls) ls.style.display = 'none';
    if (rs) rs.style.display = 'none';
    return;
  }
  // Already verified in this session — load normally
  cfLoadMainApp();
}

// Run on DOM ready
document.addEventListener('DOMContentLoaded', checkRegistration);

function updateLockScreenUser(user) {
  // Add user greeting to lock screen
  var lsDiv = document.querySelector('#lockScreen > div');
  if (!lsDiv) return;
  var existing = document.getElementById('lockUserGreet');
  if (existing) existing.remove();
  var greet = document.createElement('div');
  greet.id = 'lockUserGreet';
  greet.style.cssText = 'margin-bottom:16px;display:flex;align-items:center;gap:10px;justify-content:center;';
  greet.innerHTML = '<div style="width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#8b5cf6);display:flex;align-items:center;justify-content:center;font-size:22px;">'+(user.avatar||'🧑')+'</div>'
    + '<div style="text-align:left;"><div style="font-size:12px;color:var(--text-muted);">Welcome back</div><div style="font-size:17px;font-weight:700;">'+(user.name||'User')+'</div></div>';
  // Insert before bio button
  var bioRow = lsDiv.querySelector('.bio-btn');
  if (bioRow) lsDiv.insertBefore(greet, bioRow.parentElement);
}

// ── REG STEP NAVIGATION ──────────────────────────────────────────
function regShowStep(n) {
  for (var i = 1; i <= REG.totalSteps; i++) {
    var el = document.getElementById('regStep' + i);
    if (el) el.style.display = (i === n) ? 'block' : 'none';
  }
  REG.currentStep = n;
  var label = document.getElementById('regStepLabel');
  if (label) label.textContent = 'STEP ' + n + ' OF ' + REG.totalSteps;
  var fill = document.getElementById('regProgressFill');
  if (fill) fill.style.width = Math.round((n / REG.totalSteps) * 100) + '%';
  // show/hide skip
  var skipBtn = document.getElementById('regSkipBtn');
  if (skipBtn) skipBtn.style.display = (n === 3) ? 'inline-block' : 'none';
}

function regNext() { regShowStep(REG.currentStep + 1); }
function regBack() { regShowStep(REG.currentStep - 1); }
function regSkip() {
  // Skip KYC step
  REG.data.pan    = 'PENDING';
  REG.data.aadhar = 'PENDING';
  REG.data.kyc    = 'Level 1';
  REG.data.upi    = '';
  regShowStep(4);
}

// Allow going back to registration from lock screen
function regGoLogin() {
  // If already registered show lock screen, else stay
  var stored = localStorage.getItem('nexwallet_user');
  if (stored) {
    document.getElementById('regScreen').style.display = 'none';
    document.getElementById('lockScreen').style.display = 'flex';
  }
}

// ── STEP 2: PERSONAL DETAILS ─────────────────────────────────────
window.selectRegAvatar = function(el, emoji) {
  document.querySelectorAll('.reg-avatar').forEach(function(a){ a.classList.remove('selected'); });
  el.classList.add('selected');
  REG.selectedAvatar = emoji;
};

function regValidateStep2() {
  var name  = (document.getElementById('regName')  || {}).value || '';
  var email = (document.getElementById('regEmail') || {}).value || '';
  var phone = (document.getElementById('regPhone') || {}).value || '';
  var dob   = (document.getElementById('regDob')   || {}).value || '';

  if (!name.trim())           { showToast('Please enter your full name', 'error'); return; }
  if (name.trim().length < 2) { showToast('Name must be at least 2 characters', 'error'); return; }
  if (!email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) { showToast('Please enter a valid email address', 'error'); return; }
  if (!phone.trim() || phone.replace(/\s/g,'').length < 10)  { showToast('Please enter a valid 10-digit phone number', 'error'); return; }
  if (!dob) { showToast('Please enter your date of birth', 'error'); return; }

  REG.data.name   = name.trim();
  REG.data.email  = email.trim();
  REG.data.phone  = '+91 ' + phone.trim();
  REG.data.dob    = dob;
  REG.data.avatar = REG.selectedAvatar;
  regShowStep(3);
}

// ── STEP 3: KYC ──────────────────────────────────────────────────
window.formatAadharInput = function(inp) {
  var v = inp.value.replace(/\D/g,'').slice(0,12);
  var f = '';
  for (var i = 0; i < v.length; i++) { if (i > 0 && i % 4 === 0) f += ' '; f += v[i]; }
  inp.value = f;
};

function regValidateStep3() {
  var pan    = (document.getElementById('regPan')    || {}).value || '';
  var aadhar = (document.getElementById('regAadhar') || {}).value || '';
  var upi    = (document.getElementById('regUpi')    || {}).value || '';

  if (!pan.trim())  { showToast('Please enter your PAN card number', 'error'); return; }
  if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan.trim())) { showToast('Invalid PAN format (e.g. ABCDE1234F)', 'error'); return; }
  var cleanAadhar = aadhar.replace(/\s/g,'');
  if (!cleanAadhar || cleanAadhar.length < 12) { showToast('Please enter valid 12-digit Aadhaar number', 'error'); return; }

  REG.data.pan    = pan.trim();
  REG.data.aadhar = aadhar.trim().slice(0,9).replace(/\d/g,'X') + aadhar.trim().slice(9); // mask first digits
  REG.data.kyc    = 'Level 3';
  REG.data.upi    = upi.trim();
  regShowStep(4);
}

// ── STEP 4: PIN ───────────────────────────────────────────────────
function regUpdatePinDots(pin) {
  var dots = document.querySelectorAll('.reg-pin-dot');
  dots.forEach(function(d, i){ d.classList.toggle('filled', i < pin.length); });
}

window.regPinInput = function(key) {
  var hint = document.getElementById('regPinHint');
  if (REG.pinPhase === 1) {
    if (key === '<') { REG.pin1 = REG.pin1.slice(0,-1); }
    else if (key === '*') { REG.pin1 = ''; }
    else if (REG.pin1.length < 6) { REG.pin1 += key; }
    regUpdatePinDots(REG.pin1);
    if (REG.pin1.length === 6) {
      setTimeout(function() {
        REG.pinPhase = 2;
        REG.pin2 = '';
        regUpdatePinDots('');
        if (hint) hint.textContent = 'Confirm your 6-digit PIN';
        showToast('Now re-enter your PIN to confirm', 'info');
      }, 300);
    }
  } else {
    if (key === '<') { REG.pin2 = REG.pin2.slice(0,-1); }
    else if (key === '*') { REG.pin2 = ''; }
    else if (REG.pin2.length < 6) { REG.pin2 += key; }
    regUpdatePinDots(REG.pin2);
    if (REG.pin2.length === 6) {
      setTimeout(function() {
        if (REG.pin1 === REG.pin2) {
          REG.data.pin = REG.pin1;
          showToast('PIN set successfully! ✓', 'success');
          regPrepareStep5();
          regShowStep(5);
        } else {
          showToast('PINs do not match. Please try again.', 'error');
          REG.pinPhase = 1;
          REG.pin1 = '';
          REG.pin2 = '';
          regUpdatePinDots('');
          if (hint) hint.textContent = 'Enter your 6-digit PIN';
        }
      }, 300);
    }
  }
};

// ── STEP 5: SUMMARY ──────────────────────────────────────────────
function regPrepareStep5() {
  var d = REG.data;
  var msg = document.getElementById('regWelcomeMsg');
  if (msg) msg.textContent = 'Hello ' + d.name + '! Your NexWallet account is ready. Your security PIN has been set and your KYC is ' + (d.kyc === 'Level 3' ? 'verified' : 'pending') + '.';

  var sum = document.getElementById('regSummary');
  if (sum) {
    sum.innerHTML = [
      '<div style="display:flex;justify-content:space-between;"><span style="color:var(--text-muted);">Name</span><span style="font-weight:600;">' + d.name + ' ' + d.avatar + '</span></div>',
      '<div style="display:flex;justify-content:space-between;"><span style="color:var(--text-muted);">Email</span><span style="font-weight:600;">' + d.email + '</span></div>',
      '<div style="display:flex;justify-content:space-between;"><span style="color:var(--text-muted);">Phone</span><span style="font-weight:600;">' + d.phone + '</span></div>',
      '<div style="display:flex;justify-content:space-between;"><span style="color:var(--text-muted);">KYC Level</span><span class="badge badge-green">' + d.kyc + ' ✓</span></div>',
      '<div style="display:flex;justify-content:space-between;"><span style="color:var(--text-muted);">PAN</span><span style="font-weight:600;">' + (d.pan === 'PENDING' ? '<span class="badge badge-yellow">Pending</span>' : d.pan) + '</span></div>',
      d.upi ? '<div style="display:flex;justify-content:space-between;"><span style="color:var(--text-muted);">UPI ID</span><span style="font-weight:600;">' + d.upi + '</span></div>' : '',
      '<div style="display:flex;justify-content:space-between;"><span style="color:var(--text-muted);">Security PIN</span><span style="font-weight:600;">●●●●●● Set ✓</span></div>',
    ].join('');
  }
}

// ── FINISH REGISTRATION ───────────────────────────────────────────
window.regFinish = function() {
  var d = REG.data;

  // Save to localStorage
  localStorage.setItem('nexwallet_user', JSON.stringify(d));

  // Apply to STATE
  STATE.profile.name   = d.name;
  STATE.profile.email  = d.email;
  STATE.profile.phone  = d.phone;
  STATE.profile.dob    = d.dob;
  STATE.profile.pan    = d.pan === 'PENDING' ? 'Pending KYC' : d.pan;
  STATE.profile.aadhar = d.aadhar === 'PENDING' ? 'Pending KYC' : d.aadhar;
  STATE.profile.kyc    = d.kyc;
  STATE.profile.avatar = d.avatar;
  STATE.profile.upi    = d.upi || '';
  STATE.savedPin       = d.pin;

  // Add ₹100 welcome bonus to fiat balance
  STATE.portfolio.fiat += 10000; // ₹100 in paise equiv
  STATE.upiBalance     += 10000;
  addTransaction({ type:'receive', asset:'INR', amount:'+₹100', value:'₹100', time:'Just now', status:'completed', note:'Welcome bonus 🎁' });

  // Hide reg screen, show main app
  document.getElementById('regScreen').style.display = 'none';
  document.getElementById('lockScreen').style.display = 'none';
  document.getElementById('app').style.display = 'block';

  // Initialize app with user data
  if (typeof initApp === 'function') initApp();
  else if (typeof window.initApp === 'function') window.initApp();

  showToast('Welcome to NexWallet, ' + d.name + '! 🎉', 'success');
};

// ── ON APP INIT: Update dashboard with real user data ─────────────
var _origInitApp = window.initApp;
window.initApp = function() {
  if (_origInitApp) _origInitApp();
  refreshDashboardUser();
};

function refreshDashboardUser() {
  var p = STATE.profile;
  var nameEl = document.getElementById('dashUserName');
  if (nameEl) nameEl.textContent = p.name || 'User';
  var avatarEl = document.getElementById('dashAvatarCircle');
  if (avatarEl) avatarEl.textContent = p.avatar || '🧑';
  var greetEl = document.getElementById('dashGreeting');
  if (greetEl) {
    var h = new Date().getHours();
    var g = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
    greetEl.textContent = g;
  }
}

// Patch unlock to also load user data
var _origUnlockApp = window.unlockApp;
window.unlockApp = function() {
  if (_origUnlockApp) _origUnlockApp();
  refreshDashboardUser();
};

// Patch the biometric unlock similarly
var _origUnlockBiometric = window.unlockBiometric;
window.unlockBiometric = function() {
  if (_origUnlockBiometric) _origUnlockBiometric();
  refreshDashboardUser();
};

// ── PIN login: also support saved pin validation ──────────────────
var _origPinInput = window.pinInput;
window.pinInput = function(key) {
  // delegate to original but after unlock also refresh user
  if (_origPinInput) _origPinInput(key);
  // Hook: watch pin length in STATE
  setTimeout(function() {
    var nameEl = document.getElementById('dashUserName');
    if (nameEl && nameEl.textContent === 'User') refreshDashboardUser();
  }, 500);
};

// On DOMContentLoaded, refresh if app is already shown
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('app') && document.getElementById('app').style.display !== 'none') {
    refreshDashboardUser();
  }
});

// ── SIGN OUT / RESET ACCOUNT ─────────────────────────────────────
window.signOutAccount = function() {
  showConfirm('Sign out of NexWallet?', function() {
    // Just go to lock screen
    document.getElementById('app').style.display = 'none';
    document.getElementById('lockScreen').style.display = 'flex';
    STATE.pin = '';
    var dots = document.querySelectorAll('#pinDots .pin-dot');
    dots.forEach(function(d){ d.style.background='transparent'; });
  });
};

window.resetAccount = function() {
  showConfirm('Reset account? This will delete all your data!', function() {
    localStorage.removeItem('nexwallet_user');
    location.reload();
  });
};

// Export registration functions
window.regNext = regNext;
window.regBack = regBack;
window.regSkip = regSkip;
window.regGoLogin = regGoLogin;
window.regValidateStep2 = regValidateStep2;
window.regValidateStep3 = regValidateStep3;
window.regUpdatePinDots = regUpdatePinDots;
window.regPrepareStep5 = regPrepareStep5;
window.regShowStep = regShowStep;
window.formatAadharInput = formatAadharInput;
window.refreshDashboardUser = refreshDashboardUser;

console.log('[NexWallet] Registration engine loaded ✓');
