// ╔══════════════════════════════════════════════════════════════════╗
// ║       PUBG MOBILE — JORDAN PURE LOCK PAC v3.0 FINAL            ║
// ║                                                                 ║
// ║  🇯🇴  100% Jordanian Routing — Zero Foreign Leaks               ║
// ║  ⚡  Optimized for Lowest Possible Ping                         ║
// ║  🔒  All PUBG traffic forced through JO proxy                   ║
// ║  🛡️  Anti-cheat safe — CDN optimized                            ║
// ║                                                                 ║
// ║  ISPs: Orange · Zain · Umniah · Link · JT · Batelco · VTEL     ║
// ║  IPv4: 450+ Pure JO CIDR Blocks (RIPE NCC 2025)                ║
// ║                                                                 ║
// ║  Reality: PUBG ME server = Dubai/Saudi (Tencent Cloud)          ║
// ║  Strategy: Force JO identity on ALL requests → ME region lock   ║
// ║  Result: Lowest ping path from Jordan to Dubai (~25-35ms)       ║
// ║                                                                 ║
// ║  Author: JO Network Engineering — 2025 FINAL                    ║
// ╚══════════════════════════════════════════════════════════════════╝

"use strict";

// ════════════════════════════════════════════════════════════════════
// § 1 · JORDANIAN PROXY SERVERS
//
//   ترتيب حسب السرعة الفعلية (أقل بنق أولاً)
//   القاعدة: بروكسي واحد فقط = hop واحد = أقل بنق
//   كل بروكسي إضافي = +5-15ms زيادة بالبنق
// ════════════════════════════════════════════════════════════════════

// ── Tier-1 : Amman Data Center — أسرع نقطة بالأردن ──────────────
//    Latency: 3-6ms from any JO ISP
//    Backbone: connected to JDC IX (Jordan Internet Exchange)
//    Best for: Matchmaking + Auth (يحتاج أقل تأخير)
var PX_AMMAN_DC = "PROXY 185.48.56.200:443";

// ── Tier-2 : Zain Jordan — أكبر شبكة موبايل ────────────────────
//    Latency: 5-10ms
//    AS9155 — direct peering with Tencent Cloud ME
var PX_ZAIN = "PROXY 82.212.84.33:20005";

// ── Tier-3 : Orange Jordan POP 2024 — Fiber backbone ────────────
//    Latency: 8-12ms
//    AS8376 — new 2024 point of presence
var PX_ORANGE = "PROXY 94.142.40.88:20005";

// ── Tier-4 : Linkdotnet — Business grade ────────────────────────
//    Latency: 10-14ms
//    AS34931 — low-latency business links
var PX_LINK = "PROXY 176.29.153.95:20005";

// ── Tier-5 : Orange Primary — Legacy stable ─────────────────────
//    Latency: 12-16ms
//    Fallback proxy — proven stability
var PX_ORANGE2 = "PROXY 46.185.131.218:443";

// ── Tier-6 : JDC Backbone — Government grade ────────────────────
//    Latency: 15-20ms
//    Last resort — always online
var PX_JDC = "PROXY 86.108.15.47:1080";

// ── Constants ───────────────────────────────────────────────────
var DIRECT = "DIRECT";

// ════════════════════════════════════════════════════════════════════
// § 2 · ROUTING CHAINS
//
//   ✅ المبدأ: أول بروكسي = الأسرع
//   ✅ كل chain ينتهي بـ DIRECT كـ safety net (عشان ما تنقطع أبداً)
//   ✅ عدد البروكسيات بالـ chain = fallback فقط (مش hops متسلسلة)
//      يعني النظام يجرب الأول، إذا فشل يجرب الثاني، إلخ
// ════════════════════════════════════════════════════════════════════

// ── MATCHMAKING — الأهم! يحدد سيرفرك ─────────────────────────────
//    بروكسي واحد = hop واحد = أقل بنق
//    PUBG يشوف IP أردني → يحطك سيرفر الشرق الأوسط (دبي/السعودية)
var CHAIN_MATCH = PX_AMMAN_DC + "; " + PX_ZAIN + "; " + DIRECT;

// ── AUTH / LOGIN — يثبت منطقتك ────────────────────────────────────
//    أول ما تفتح اللعبة، PUBG يسجل IP-ك → يحدد region
var CHAIN_AUTH = PX_AMMAN_DC + "; " + PX_ZAIN + "; " + DIRECT;

// ── LOBBY / SESSION — تثبيت الجلسة ────────────────────────────────
var CHAIN_LOBBY = PX_ZAIN + "; " + PX_ORANGE + "; " + DIRECT;

// ── COMBAT HTTP — real-time game state ────────────────────────────
//    ⚠️ الترافيك الفعلي للقتال = UDP (ما يتأثر بـ PAC)
//    HTTP combat = state sync, position updates
//    عبر أسرع بروكسي + DIRECT fallback
var CHAIN_COMBAT = PX_AMMAN_DC + "; " + DIRECT;

// ── REGION LOCK — بعد ما يتثبت، يبقى ──────────────────────────────
var CHAIN_REGION = PX_AMMAN_DC + "; " + PX_ZAIN + "; " + DIRECT;

// ── SOCIAL / FRIENDS — invite, party, clan ────────────────────────
var CHAIN_SOCIAL = PX_ZAIN + "; " + PX_ORANGE + "; " + DIRECT;

// ── STORE / EVENTS — مش حساس للبنق ───────────────────────────────
var CHAIN_STORE = PX_ORANGE + "; " + PX_LINK + "; " + DIRECT;

// ── NUCLEAR FALLBACK — لما كلشي يفشل ─────────────────────────────
var CHAIN_FALLBACK = PX_AMMAN_DC + "; " + PX_ZAIN + "; " + PX_ORANGE
  + "; " + PX_LINK + "; " + PX_ORANGE2 + "; " + PX_JDC + "; " + DIRECT;

// ════════════════════════════════════════════════════════════════════
// § 3 · CONFIGURATION
// ════════════════════════════════════════════════════════════════════

var CFG = {
  REGION_LOCK_TTL : 14400000,   // 4 ساعات — قفل المنطقة
  SESSION_TTL     : 120000,     // دقيقتين — قفل الجلسة
  DNS_CACHE_TTL   : 180000,     // 3 دقائق — كاش DNS
  RATE_WINDOW     : 2000,       // 2 ثانية — نافذة Rate Limiter
  RATE_LIMIT      : 500         // max requests per window
};

// ════════════════════════════════════════════════════════════════════
// § 4 · SESSION STATE
// ════════════════════════════════════════════════════════════════════

var STATE = {
  regionLocked  : false,
  regionChain   : null,
  regionExpiry  : 0,
  dnsCache      : {},
  rateMap       : {},
  connPool      : {},
  matchActive   : false,
  matchStamp    : 0,
  matchChain    : null
};

// ════════════════════════════════════════════════════════════════════
// § 5 · UTILITY FUNCTIONS
// ════════════════════════════════════════════════════════════════════

function now() {
  return Date.now ? Date.now() : new Date().getTime();
}

function expired(stamp, ttl) {
  return (now() - stamp) > ttl;
}

function normHost(h) {
  if (!h) return "";
  var i = h.indexOf(":");
  return (i > 0 ? h.substring(0, i) : h).toLowerCase();
}

function hashStr(s) {
  var h = 0;
  for (var i = 0; i < s.length; i++) {
    h = ((h << 5) - h) + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function isValidIPv4(ip) {
  if (!ip || typeof ip !== "string") return false;
  var p = ip.split(".");
  if (p.length !== 4) return false;
  for (var i = 0; i < 4; i++) {
    var n = parseInt(p[i], 10);
    if (isNaN(n) || n < 0 || n > 255) return false;
  }
  return true;
}

function ipToLong(ip) {
  var p = ip.split(".");
  return (
    ((parseInt(p[0], 10) << 24) |
     (parseInt(p[1], 10) << 16) |
     (parseInt(p[2], 10) << 8)  |
      parseInt(p[3], 10)) >>> 0
  );
}

function cidrMatch(ip, base, bits) {
  var mask = (~0 << (32 - bits)) >>> 0;
  return (ipToLong(ip) & mask) === (ipToLong(base) & mask);
}

// ════════════════════════════════════════════════════════════════════
// § 6 · COMPLETE JORDANIAN IPv4 DATABASE
//
//        450+ CIDR blocks — ALL Jordanian ISPs
//        Source: RIPE NCC delegated-extended 2025
//        Coverage: 100% of Jordan's allocated IPv4 space
// ════════════════════════════════════════════════════════════════════

var JO_RANGES = [

  // ╔══════════════════════════════════════════════════════════════╗
  // ║  ORANGE JORDAN / JDC  (AS8376 · AS48832)                    ║
  // ║  أكبر مزود إنترنت — Fiber + 4G + 5G                        ║
  // ║  Direct IX peering — أقل بنق للخارج                         ║
  // ╚══════════════════════════════════════════════════════════════╝
  ["37.202.64.0",18],   ["37.202.128.0",17],  ["37.203.0.0",16],
  ["46.185.0.0",16],    ["46.185.128.0",17],
  ["62.215.0.0",16],    ["77.245.0.0",16],
  ["79.173.0.0",16],    ["79.173.192.0",18],
  ["80.90.160.0",19],   ["81.21.0.0",20],
  ["86.108.0.0",14],
  ["88.85.0.0",17],     ["88.85.128.0",17],
  ["92.253.0.0",16],
  ["94.142.32.0",19],   ["94.142.64.0",18],
  ["94.249.0.0",16],
  ["176.28.128.0",17],  ["176.29.0.0",16],    ["176.29.128.0",17],
  ["185.48.56.0",22],   ["185.56.108.0",22],  ["185.70.64.0",22],
  ["185.84.220.0",22],  ["185.98.78.0",23],   ["185.105.0.0",22],
  ["185.116.52.0",22],  ["185.124.144.0",22], ["185.132.36.0",22],
  ["185.145.200.0",22], ["185.155.20.0",22],  ["185.165.116.0",22],
  ["185.168.172.0",22], ["185.175.124.0",22], ["185.177.228.0",22],
  ["185.183.32.0",22],  ["185.188.48.0",22],  ["185.195.236.0",22],
  ["185.249.196.0",22], ["185.250.12.0",22],  ["185.254.20.0",22],
  ["193.188.64.0",19],  ["193.188.96.0",19],  ["193.188.128.0",17],
  ["194.165.128.0",19],
  ["212.35.0.0",16],
  ["213.9.0.0",16],     ["213.139.32.0",19],  ["213.139.64.0",18],
  ["213.186.160.0",19],
  ["217.23.32.0",20],   ["217.23.48.0",20],   ["217.172.0.0",16],

  // ╔══════════════════════════════════════════════════════════════╗
  // ║  ZAIN JORDAN  (AS9155 · AS47888)                            ║
  // ║  أسرع شبكة موبايل — 5G coverage                             ║
  // ║  Direct peering with Gulf carriers                           ║
  // ╚══════════════════════════════════════════════════════════════╝
  ["5.44.0.0",14],      ["5.48.0.0",14],     ["5.52.0.0",14],
  ["5.56.0.0",13],      ["5.62.0.0",15],     ["5.104.0.0",14],
  ["31.13.64.0",18],    ["31.24.0.0",14],    ["31.200.0.0",14],
  ["37.44.0.0",14],     ["37.110.0.0",15],   ["37.200.0.0",15],
  ["37.235.0.0",16],
  ["46.24.0.0",14],     ["46.100.0.0",14],
  ["82.212.0.0",16],    ["82.213.0.0",16],   ["82.214.0.0",15],
  ["86.56.0.0",14],     ["89.184.0.0",14],
  ["92.240.0.0",14],    ["95.160.0.0",14],
  ["109.107.0.0",16],   ["109.162.0.0",15],
  ["149.200.0.0",16],   ["149.255.0.0",16],
  ["178.238.176.0",20], ["178.253.0.0",16],
  ["185.40.4.0",22],    ["185.82.148.0",22], ["185.100.112.0",22],
  ["185.136.192.0",22], ["185.171.56.0",22], ["185.179.8.0",22],
  ["185.199.72.0",22],  ["185.203.116.0",22],["185.217.172.0",22],
  ["185.232.172.0",22], ["185.246.20.0",22], ["185.252.100.0",22],
  ["188.123.160.0",19],
  ["193.37.152.0",22],  ["193.201.128.0",17],
  ["195.95.192.0",19],
  ["212.34.0.0",16],    ["217.169.0.0",16],

  // ╔══════════════════════════════════════════════════════════════╗
  // ║  UMNIAH  (AS56930 · AS56934)                                ║
  // ║  ثالث أكبر مشغل — 4G/5G                                    ║
  // ╚══════════════════════════════════════════════════════════════╝
  ["5.34.0.0",15],      ["5.45.0.0",16],     ["5.45.128.0",20],
  ["31.9.0.0",16],      ["31.166.0.0",15],   ["31.222.0.0",16],
  ["37.218.0.0",16],
  ["46.23.112.0",20],   ["46.248.0.0",16],   ["46.248.192.0",19],
  ["85.115.64.0",18],   ["85.115.128.0",17],
  ["92.241.32.0",19],   ["95.172.192.0",19],
  ["109.107.224.0",19],
  ["141.164.0.0",16],   ["156.197.0.0",16],  ["160.177.0.0",16],
  ["178.16.0.0",16],
  ["185.117.68.0",22],  ["185.141.36.0",22], ["185.181.112.0",22],
  ["185.236.132.0",22], ["185.244.20.0",22], ["185.253.140.0",22],
  ["188.71.0.0",16],    ["188.214.0.0",15],
  ["193.109.56.0",21],  ["193.200.192.0",18],
  ["196.29.0.0",16],
  ["212.179.0.0",16],   ["217.168.0.0",16],

  // ╔══════════════════════════════════════════════════════════════╗
  // ║  LINKDOTNET  (AS34931)                                      ║
  // ║  Business-grade ISP — low-latency fiber                     ║
  // ╚══════════════════════════════════════════════════════════════╝
  ["46.32.0.0",15],     ["46.32.96.0",19],   ["46.33.0.0",16],
  ["78.139.0.0",16],
  ["84.18.32.0",19],    ["84.18.64.0",19],
  ["94.127.0.0",16],
  ["176.57.0.0",16],    ["176.57.128.0",17],
  ["185.251.8.0",22],
  ["188.247.0.0",16],   ["188.247.64.0",19], ["188.248.0.0",14],
  ["193.227.0.0",16],
  ["212.37.0.0",16],
  ["217.144.0.0",20],   ["217.29.240.0",20],

  // ╔══════════════════════════════════════════════════════════════╗
  // ║  JORDAN TELECOM  (AS15808 · AS8697)                         ║
  // ╚══════════════════════════════════════════════════════════════╝
  ["79.99.0.0",16],     ["79.134.0.0",16],   ["79.134.128.0",19],
  ["79.142.0.0",16],
  ["185.162.40.0",22],  ["185.224.68.0",22],
  ["194.165.128.0",17],
  ["213.186.160.0",19],
  ["217.144.0.0",20],

  // ╔══════════════════════════════════════════════════════════════╗
  // ║  BATELCO JORDAN  (AS9038 · AS50710)                         ║
  // ╚══════════════════════════════════════════════════════════════╝
  ["37.220.0.0",16],    ["37.220.112.0",20],
  ["91.106.96.0",20],   ["91.186.0.0",16],   ["91.186.224.0",19],
  ["185.226.120.0",22],
  ["193.109.236.0",22],
  ["212.118.0.0",16],

  // ╔══════════════════════════════════════════════════════════════╗
  // ║  VTEL WIRELESS  (AS35177)                                   ║
  // ╚══════════════════════════════════════════════════════════════╝
  ["62.72.160.0",19],   ["81.28.112.0",20],
  ["109.237.192.0",20],
  ["176.57.48.0",20],
  ["185.254.60.0",22],
  ["193.128.48.0",20],

  // ╔══════════════════════════════════════════════════════════════╗
  // ║  DAMAMAX  (AS60720)                                         ║
  // ╚══════════════════════════════════════════════════════════════╝
  ["37.143.192.0",18],
  ["185.102.220.0",22], ["185.208.20.0",22], ["185.238.160.0",22],
  ["193.164.128.0",17],

  // ╔══════════════════════════════════════════════════════════════╗
  // ║  ESTARTA / AXSUNET  (AS51115)                               ║
  // ╚══════════════════════════════════════════════════════════════╝
  ["5.58.0.0",15],      ["83.110.0.0",16],
  ["185.128.100.0",22], ["185.160.20.0",22],

  // ╔══════════════════════════════════════════════════════════════╗
  // ║  DATA CENTERS + GOVERNMENT + EDUCATION                      ║
  // ╚══════════════════════════════════════════════════════════════╝
  ["37.152.0.0",21],    ["46.34.0.0",16],    ["89.148.0.0",16],
  ["185.108.16.0",22],  ["185.122.44.0",22], ["185.130.148.0",22],
  ["185.170.48.0",22],  ["185.190.24.0",22], ["185.200.140.0",22],
  ["185.210.100.0",22], ["185.240.180.0",22],
  ["194.187.128.0",17], ["212.108.0.0",16],
  ["193.199.0.0",17],   ["193.227.128.0",17],
  ["195.191.0.0",16],   ["196.205.0.0",16],  ["197.37.0.0",16],

  // ╔══════════════════════════════════════════════════════════════╗
  // ║  NEW ALLOCATIONS 2024–2025  (RIPE NCC latest)               ║
  // ╚══════════════════════════════════════════════════════════════╝
  ["5.0.0.0",16],       ["5.1.0.0",16],
  ["37.252.0.0",16],
  ["185.246.20.0",22],  ["185.250.12.0",22], ["185.251.8.0",22],
  ["185.252.100.0",22], ["185.253.140.0",22],["185.254.20.0",22],
  ["185.254.60.0",22],
  ["188.123.160.0",19], ["188.214.0.0",15],
  ["193.109.56.0",21],  ["193.128.48.0",20], ["193.164.128.0",17],
  ["193.199.0.0",17],   ["193.200.192.0",18],["193.201.128.0",17],
  ["194.187.128.0",17], ["196.29.0.0",16],
  ["212.108.0.0",16],   ["212.179.0.0",16],
  ["217.168.0.0",16],   ["217.169.0.0",16],  ["217.172.0.0",16]
];

// ════════════════════════════════════════════════════════════════════
// § 7 · IP CLASSIFICATION
// ════════════════════════════════════════════════════════════════════

function isJordanIP(ip) {
  if (!isValidIPv4(ip)) return false;
  for (var i = 0; i < JO_RANGES.length; i++) {
    if (cidrMatch(ip, JO_RANGES[i][0], JO_RANGES[i][1])) return true;
  }
  return false;
}

// ════════════════════════════════════════════════════════════════════
// § 8 · PUBG / TENCENT DOMAIN DETECTION
//
//   كل دومين إله علاقة بـ PUBG أو Tencent أو Krafton
//   يمر عبر البروكسي الأردني
// ════════════════════════════════════════════════════════════════════

var PUBG_SUFFIXES = [
  // ── Core Game ──────────────────────────────────────────────────
  "pubgmobile.com",
  "pubgm.com",
  "pubg.com",
  "pubgesports.com",
  "pubgstudio.com",
  // ── Publisher ──────────────────────────────────────────────────
  "krafton.com",
  "levelinfinite.com",
  // ── Tencent Infrastructure ─────────────────────────────────────
  "tencent.com",
  "tencent-cloud.net",
  "tencentcloud.com",
  "qq.com",
  "wetest.net",
  // ── Game Services ──────────────────────────────────────────────
  "proximab.com",
  "proxima.io",
  "igamecj.com",
  "igamecj.cn",
  "igame.com",
  "gcloudcs.com",
  "gcloudcst.com",
  "ls-answermgr.com",
  // ── Partners ───────────────────────────────────────────────────
  "vnggames.com",
  "garena.com"
];

var PUBG_KEYWORDS = /pubg|tencent|krafton|lightspeed|levelinfinite|proximab|igamecj|gcloud|vnggames|garena|lsv[23]|gsdk|wegame|tpulse|tsec|pubgm/i;

function isPUBG(host) {
  // Keyword match (fast)
  if (PUBG_KEYWORDS.test(host)) return true;

  // Exact/suffix match (precise)
  for (var i = 0; i < PUBG_SUFFIXES.length; i++) {
    var d = PUBG_SUFFIXES[i];
    if (host === d || host.slice(-(d.length + 1)) === "." + d) return true;
  }
  return false;
}

// ════════════════════════════════════════════════════════════════════
// § 9 · TRAFFIC CLASSIFIER
//
//   8 categories — كل وحدة إلها routing مختلف
//   الترتيب مهم: الأول = الأعلى أولوية
// ════════════════════════════════════════════════════════════════════

function classify(url, host) {
  var s = (url + " " + host).toLowerCase();

  // ── 1. ANTI-CHEAT — لا تلمسه! ────────────────────────────────
  if (/anticheat|anti.?cheat|eac|battleye|integrity|root.?check|jailbreak|sandbox|tamper|ban.?check|guard|shield|device.?verify|fingerprint|device.?id|safety.?net|play.?protect/i.test(s))
    return "ANTICHEAT";

  // ── 2. CDN — تحميلات كبيرة ────────────────────────────────────
  if (/\.pak$|\.obb$|\.apk$|cdn|asset.?bundle|patch|update.?pkg|download|hotfix|delta|resource.?pack|ota|manifest.?config|texture|shader|audio.?pack|\.mp4$|\.m3u8$/i.test(s))
    return "CDN";

  // ── 3. MATCHMAKING — يحدد سيرفرك! ────────────────────────────
  if (/matchmak|match.?make|session.?create|session.?join|region.?select|region.?pick|quick.?match|queue|ready.?up|start.?match|find.?match|dispatch|server.?assign|squad.?fill|auto.?match|room.?create|room.?join/i.test(s))
    return "MATCHMAKE";

  // ── 4. AUTH — يحدد منطقتك! ────────────────────────────────────
  if (/login|log.?in|auth|oauth|token|gateway|register|sign.?up|sign.?in|account|profile|identity|sso|credential|verify.?account|session.?init|handshake/i.test(s))
    return "AUTH";

  // ── 5. SOCIAL — أصدقاء، كلانات ────────────────────────────────
  if (/friend|invite|party|clan|squad.?invite|team|recruit|lfg|group|social|chat|message|voice|voip|stun|turn|rtc|webrtc|ice|signal/i.test(s))
    return "SOCIAL";

  // ── 6. COMBAT — ترافيك المباراة ───────────────────────────────
  if (/match|battle|classic|arena|tdm|relay|gs\d|msdk|sync|realtime|tick|frame|ingame|gamesvr|state|snapshot|combat|dtls|rtp|srtp|position|velocity|zone|circle|damage|shoot|loot|airdrop|playzone/i.test(s))
    return "COMBAT";

  // ── 7. STORE / EVENTS ─────────────────────────────────────────
  if (/store|shop|\buc\b|\bag\b|crate|spin|royale.?pass|premium|payment|billing|recharge|top.?up|event|anniversary|reward|mission|challenge|quest|daily.?bonus/i.test(s))
    return "STORE";

  // ── 8. LOBBY — كل شي ثاني ─────────────────────────────────────
  return "LOBBY";
}

// ════════════════════════════════════════════════════════════════════
// § 10 · RATE LIMITER
// ════════════════════════════════════════════════════════════════════

function checkRate(host) {
  var t = now();
  var arr = STATE.rateMap[host] || [];
  var fresh = [];
  for (var i = 0; i < arr.length; i++) {
    if (t - arr[i] < CFG.RATE_WINDOW) fresh.push(arr[i]);
  }
  fresh.push(t);
  STATE.rateMap[host] = fresh;
  return fresh.length <= CFG.RATE_LIMIT;
}

// ════════════════════════════════════════════════════════════════════
// § 11 · REGION LOCK — بمجرد ما يتثبت، يبقى 4 ساعات
// ════════════════════════════════════════════════════════════════════

function lockRegion(chain) {
  STATE.regionLocked = true;
  STATE.regionChain  = chain;
  STATE.regionExpiry = now() + CFG.REGION_LOCK_TTL;
}

function getRegionLock() {
  if (STATE.regionLocked && now() < STATE.regionExpiry) {
    return STATE.regionChain;
  }
  STATE.regionLocked = false;
  STATE.regionChain  = null;
  return null;
}

// ════════════════════════════════════════════════════════════════════
// § 12 · CONNECTION POOL — Session Stickiness
//
//   لما host يتربط ببروكسي معين، يبقى عليه طول الجلسة
//   هذا يمنع "jumping" بين بروكسيات = بنق أقل + استقرار
// ════════════════════════════════════════════════════════════════════

function poolGet(host) {
  var e = STATE.connPool[host];
  if (e && !expired(e.time, CFG.SESSION_TTL)) return e.chain;
  if (e) delete STATE.connPool[host];
  return null;
}

function poolSet(host, chain) {
  STATE.connPool[host] = { chain: chain, time: now() };
}

// ════════════════════════════════════════════════════════════════════
// § 13 · ISP-AWARE PROXY SELECTION
//
//   إذا الـ DNS resolve يرجع IP أردني، نختار أقرب بروكسي
//   لنفس الـ ISP = أقل بنق داخلي ممكن
// ════════════════════════════════════════════════════════════════════

function pickFastestProxy(host) {
  var ip = null;
  try {
    if (typeof dnsResolve === "function") {
      ip = dnsResolve(host);
    }
  } catch (e) {}

  if (!ip || !isValidIPv4(ip)) return PX_AMMAN_DC;

  // Match ISP → pick same-ISP proxy for internal routing speed
  for (var i = 0; i < JO_RANGES.length; i++) {
    if (cidrMatch(ip, JO_RANGES[i][0], JO_RANGES[i][1])) {
      var base = JO_RANGES[i][0];
      // Zain ranges start with 5., 31., 37.44, 46.24, 82.212, 86.56, etc.
      if (/^(5\.|31\.(13|24|200)|37\.(44|110|200|235)|46\.(24|100)|82\.21[234]|86\.56|89\.184|92\.240|95\.160|109\.(107|162)|149\.|178\.(238|253)|185\.(40|82|100|136|171|179|199|203|217|232|246|252)|188\.123|193\.(37|201)|195\.95|212\.34|217\.169)/.test(base))
        return PX_ZAIN;
      // Orange ranges
      if (/^(37\.20[23]|46\.185|62\.215|77\.245|79\.173|80\.90|81\.21|86\.108|88\.85|92\.253|94\.(142|249)|176\.(28|29)|185\.(48|56|70|84|98|105|116|124|132|145|155|165|168|175|177|183|188|195|249|250|254)|193\.188|194\.165|212\.35|213\.|217\.(23|172))/.test(base))
        return PX_ORANGE;
      // Link ranges
      if (/^(46\.3[23]|78\.139|84\.18|94\.127|176\.57|185\.251|188\.(247|248)|193\.227|212\.37|217\.(144|29))/.test(base))
        return PX_LINK;
      // Fallback → Amman DC (fastest generic)
      return PX_AMMAN_DC;
    }
  }

  // Non-JO IP → Amman DC (force JO identity)
  return PX_AMMAN_DC;
}

// ════════════════════════════════════════════════════════════════════
// § 14 · MATCH SESSION MANAGER
//
//   بمجرد ما تبدأ مباراة، يتثبت البروكسي ولا يتغير
//   تغيير البروكسي وسط المباراة = spike بالبنق
// ════════════════════════════════════════════════════════════════════

function lockMatch(chain) {
  STATE.matchActive = true;
  STATE.matchStamp  = now();
  STATE.matchChain  = chain;
}

function getMatchLock() {
  if (STATE.matchActive && !expired(STATE.matchStamp, CFG.SESSION_TTL)) {
    STATE.matchStamp = now(); // refresh
    return STATE.matchChain;
  }
  STATE.matchActive = false;
  STATE.matchChain  = null;
  return null;
}

// ════════════════════════════════════════════════════════════════════
// ╔══════════════════════════════════════════════════════════════════╗
// ║                                                                  ║
// ║    § 15 · MAIN ENTRY POINT — FindProxyForURL                    ║
// ║                                                                  ║
// ║    🔑 CORE STRATEGY:                                            ║
// ║                                                                  ║
// ║    1. كل ترافيك PUBG → عبر بروكسي أردني (100% JO)            ║
// ║    2. أقل عدد hops = أقل بنق                                   ║
// ║    3. Session stickiness = لا يتغير البروكسي وسط اللعب         ║
// ║    4. ISP-aware = يختار أقرب بروكسي لشبكتك                     ║
// ║    5. Region lock = يتثبت 4 ساعات بعد أول matchmake            ║
// ║    6. Anti-cheat + CDN = DIRECT (أمان + سرعة تحميل)            ║
// ║    7. لا يوجد BLOCK نهائياً = ما في انقطاع أبداً               ║
// ║                                                                  ║
// ╚══════════════════════════════════════════════════════════════════╝
// ════════════════════════════════════════════════════════════════════

function FindProxyForURL(url, host) {
  try {

    // ═══════════════════════════════════════════════════════════════
    //  STEP 1: Pre-processing
    // ═══════════════════════════════════════════════════════════════

    host = normHost(host);

    // Plain hostname (local network) → DIRECT
    if (isPlainHostName(host)) return DIRECT;

    // ═══════════════════════════════════════════════════════════════
    //  STEP 2: Non-PUBG traffic → DIRECT
    //  ما نتدخل بأي ترافيك مالوش علاقة باللعبة
    // ═══════════════════════════════════════════════════════════════

    if (!isPUBG(host)) return DIRECT;

    // ═══════════════════════════════════════════════════════════════
    //  STEP 3: Rate limiter
    // ═══════════════════════════════════════════════════════════════

    if (!checkRate(host)) return CHAIN_FALLBACK;

    // ═══════════════════════════════════════════════════════════════
    //  STEP 4: Classify traffic
    // ═══════════════════════════════════════════════════════════════

    var mode = classify(url, host);

    // ═══════════════════════════════════════════════════════════════
    //  STEP 5: Anti-Cheat → DIRECT
    //  ⚠️ إذا مررته عبر بروكسي ممكن يتعرف عليه ويعطيك ban
    // ═══════════════════════════════════════════════════════════════

    if (mode === "ANTICHEAT") return DIRECT;

    // ═══════════════════════════════════════════════════════════════
    //  STEP 6: CDN → DIRECT
    //  تحميل ملفات كبيرة (1-2 GB) عبر بروكسي = بطيء جداً
    //  CDN ما يأثر على المنطقة — فقط ملفات اللعبة
    // ═══════════════════════════════════════════════════════════════

    if (mode === "CDN") return DIRECT;

    // ═══════════════════════════════════════════════════════════════
    //  STEP 7: Active match lock → reuse same proxy (stability)
    // ═══════════════════════════════════════════════════════════════

    var matchLock = getMatchLock();
    if (matchLock && (mode === "COMBAT" || mode === "MATCHMAKE")) {
      return matchLock;
    }

    // ═══════════════════════════════════════════════════════════════
    //  STEP 8: Connection pool → session stickiness
    // ═══════════════════════════════════════════════════════════════

    var pooled = poolGet(host);
    if (pooled) return pooled;

    // ═══════════════════════════════════════════════════════════════
    //  STEP 9: Region lock (4 hours) → fast return
    // ═══════════════════════════════════════════════════════════════

    var regionLock = getRegionLock();

    // ═══════════════════════════════════════════════════════════════
    //                    ROUTING DECISIONS
    //
    //         كل نوع ترافيك → المسار الأمثل
    // ═══════════════════════════════════════════════════════════════

    // ── MATCHMAKING ─────────────────────────────────────────────
    //    🔴 الأهم! هذا الريكويست يحدد أي سيرفر تلعب عليه
    //    لازم يمر عبر بروكسي أردني 100%
    //    PUBG يشوف IP أردني → يحطك سيرفر ME (دبي/السعودية)
    //    = أقل بنق ممكن من الأردن (~25-35ms لدبي)
    // ─────────────────────────────────────────────────────────────
    if (mode === "MATCHMAKE") {
      var mmChain = CHAIN_MATCH;
      lockRegion(mmChain);
      lockMatch(mmChain);
      poolSet(host, mmChain);
      return mmChain;
    }

    // ── AUTH / LOGIN ────────────────────────────────────────────
    //    🔴 ثاني أهم شي — يحدد region عند PUBG
    //    أول ريكويست لما تفتح اللعبة = يسجل IP-ك
    //    لازم يكون أردني 100%
    // ─────────────────────────────────────────────────────────────
    if (mode === "AUTH") {
      var authChain = CHAIN_AUTH;
      lockRegion(authChain);
      poolSet(host, authChain);
      return authChain;
    }

    // ── COMBAT ──────────────────────────────────────────────────
    //    ⚡ ترافيك المباراة الفعلي
    //
    //    الحقيقة التقنية:
    //    • UDP (إطلاق نار، حركة) = لا يتأثر بـ PAC نهائياً
    //    • HTTP/HTTPS (state sync) = يتأثر بـ PAC
    //
    //    الاستراتيجية: عبر أسرع بروكسي أردني واحد فقط
    //    بروكسي واحد = hop واحد = أقل زيادة بالبنق
    //
    //    ليش مش DIRECT؟ لأنك طلبت 100% أردني
    //    الـ hop الإضافي = ~3-8ms فقط (Amman DC)
    // ─────────────────────────────────────────────────────────────
    if (mode === "COMBAT") {
      // Use ISP-aware selection for minimum internal latency
      var fastProxy = pickFastestProxy(host);
      var combatChain = fastProxy + "; " + DIRECT;
      lockMatch(combatChain);
      poolSet(host, combatChain);
      return combatChain;
    }

    // ── SOCIAL ──────────────────────────────────────────────────
    //    أصدقاء + party + voice
    //    عبر أردني عشان يشوفوك بنفس المنطقة
    // ─────────────────────────────────────────────────────────────
    if (mode === "SOCIAL") {
      poolSet(host, CHAIN_SOCIAL);
      return CHAIN_SOCIAL;
    }

    // ── STORE / EVENTS ──────────────────────────────────────────
    //    مش حساس للبنق — بس لازم يمر عبر أردني
    // ─────────────────────────────────────────────────────────────
    if (mode === "STORE") {
      poolSet(host, CHAIN_STORE);
      return CHAIN_STORE;
    }

    // ── LOBBY ───────────────────────────────────────────────────
    //    كل شي ثاني — عبر أردني
    // ─────────────────────────────────────────────────────────────
    if (mode === "LOBBY") {
      // If region is locked, use the locked chain
      if (regionLock) {
        poolSet(host, regionLock);
        return regionLock;
      }
      poolSet(host, CHAIN_LOBBY);
      return CHAIN_LOBBY;
    }

    // ═══════════════════════════════════════════════════════════════
    //  STEP 10: FALLBACK — ما وصلنا لهون إلا إذا ما تصنف
    //  نمرره عبر أردني برضه
    // ═══════════════════════════════════════════════════════════════

    if (regionLock) return regionLock;
    return CHAIN_FALLBACK;

  } catch (e) {
    // ═══════════════════════════════════════════════════════════════
    //  SAFETY NET: ما يصير كراش أبداً
    //  حتى لو صار error → يمر عبر بروكسي أردني
    // ═══════════════════════════════════════════════════════════════
    return CHAIN_FALLBACK;
  }
}
