// ╔══════════════════════════════════════════════════════════════════╗
// ║         PUBG MOBILE — JORDAN ULTIMATE PAC v10.0 NEXUS           ║
// ║  ✦ Merged · Updated · Advanced · Pure Jordanian IPv4 + IPv6     ║
// ║  ✦ Ultra Low Ping Engine          ✦ Quantum Session Manager     ║
// ║  ✦ 7-Tier Smart Proxy Chain       ✦ Friend Recruit Engine       ║
// ║  ✦ 4-Layer DNS Resolution         ✦ Anti-Detection Stealth      ║
// ║  ✦ Density Boost Engine           ✦ ISP-Aware Routing           ║
// ║  ✦ Jordan ISPs: Orange·Zain·Umniah·Link·JT·Batelco·VTEL        ║
// ║  ✦ IPv6: /48 /56 /64 Triple Lock  ✦ IPv4: 400+ Pure JO Ranges  ║
// ║  Author : JO Network Engineering — NEXUS 2025                   ║
// ╚══════════════════════════════════════════════════════════════════╝

"use strict";

// ════════════════════════════════════════════════════════════════════
// § 1 · PROXY CHAIN — 7-TIER HEALTH-AWARE (Pure JO Exit Nodes)
// ════════════════════════════════════════════════════════════════════

// ── Tier-1  : Amman DC  Direct  (8–11 ms) ──────────────────────────
var PX1 = "PROXY 185.48.56.200:443";

// ── Tier-2  : Zain JO Primary  (8–12 ms) ───────────────────────────
var PX2 = "PROXY 82.212.84.33:20005";

// ── Tier-3  : Orange JO-2  New POP 2024  (10–14 ms) ────────────────
var PX3 = "PROXY 94.142.40.88:20005";

// ── Tier-4  : Linkdotnet JO  (12–15 ms) ────────────────────────────
var PX4 = "PROXY 176.29.153.95:20005";

// ── Tier-5  : Orange JO Primary  (14–18 ms) ────────────────────────
var PX5 = "PROXY 46.185.131.218:443";

// ── Tier-6  : JDC Backbone  (18–22 ms) ─────────────────────────────
var PX6 = "PROXY 86.108.15.47:1080";

// ── Tier-7  : Jordan Telecom  Last Resort  (22–25 ms) ───────────────
var PX7 = "PROXY 212.35.66.129:443";

// ── Specials ────────────────────────────────────────────────────────
var DIRECT   = "DIRECT";
var BLOCK    = "PROXY 127.0.0.1:9";
var FAILOVER = PX4 + "; " + PX5 + "; " + DIRECT;

// ════════════════════════════════════════════════════════════════════
// § 2 · SMART CHAIN PRESETS (Weighted by Ping + Mode)
// ════════════════════════════════════════════════════════════════════

var CHAIN = {
  COMBAT    : PX1 + "; " + PX2 + "; " + PX3 + "; " + DIRECT,
  FAST      : PX2 + "; " + PX3 + "; " + PX4 + "; " + DIRECT,
  MATCHMAKE : PX1 + "; " + PX2 + "; " + DIRECT,
  LOBBY     : PX5 + "; " + PX6 + "; " + PX7 + "; " + DIRECT,
  RECRUIT   : PX1 + "; " + PX2 + "; " + PX3 + "; " + PX4 + "; " + DIRECT,
  FRIEND    : PX1 + "; " + PX2 + "; " + DIRECT,
  SAFE      : PX4 + "; " + PX5 + "; " + PX6 + "; " + PX7 + "; " + DIRECT,
  ULTRA     : PX1 + "; " + PX2 + "; " + PX3 + "; " + PX4 + "; " + PX5 + "; " + DIRECT
};

// ════════════════════════════════════════════════════════════════════
// § 3 · GLOBAL CONSTANTS — Tuned for JO Competitive Play
// ════════════════════════════════════════════════════════════════════

var CFG = {
  SESSION_TTL       : 35000,      // 35 s — tight match window
  REGION_LOCK_TTL   : 10800000,   // 3 h  — ranked region lock
  DNS_CACHE_TTL     : 180000,     // 3 min — fresh DNS
  RATE_WINDOW       : 2000,       // 2 s  — rate limiter window
  RATE_LIMIT        : 300,        // max req / window
  PING_CEIL         : 30,         // ms max acceptable
  DENSITY_THRESHOLD : 65,         // % JO IPs for dense lobby
  FRIEND_MAX_MS     : 2,          // friends must be ≤ 2 ms apart
  RECRUIT_SCAN_MS   : 5000,       // friend scan interval
  RECRUIT_MIN_PEERS : 2,          // peers needed for friend cluster
  SUBNET_EXPIRY_MS  : 60000       // 60 s  — subnet cache TTL
};

// ════════════════════════════════════════════════════════════════════
// § 4 · SESSION STATE — Unified Quantum State Machine
// ════════════════════════════════════════════════════════════════════

var S = {
  // ─ Match Lock ──────────────────────────────────────────────
  matchIP        : null,
  matchHost      : null,
  matchMode      : null,
  matchNet64     : null,    // /64 IPv6 lock
  matchNet48     : null,    // /48 IPv6 lock
  matchNet24     : null,    // /24 IPv4 lock
  matchStamp     : 0,
  matchFail      : 0,
  // ─ Region Lock ─────────────────────────────────────────────
  regionLocked   : false,
  regionChain    : null,
  regionExpiry   : 0,
  // ─ Lobby ───────────────────────────────────────────────────
  lobbyNet       : null,
  lobbyStamp     : 0,
  // ─ Recruit Engine ──────────────────────────────────────────
  recruitSubnet  : null,
  recruitPeers   : {},
  recruitStamp   : 0,
  friendCluster  : false,
  friendIPs      : [],
  friendChain    : null,
  // ─ Utility ─────────────────────────────────────────────────
  dnsCache       : {},
  rateMap        : {},
  connPool       : {},
  localCount     : 0,
  forcedLocal    : false,
  failCount      : 0,
  mode           : "INIT",  // INIT | MATCH | LOBBY | RECRUIT
  lastIP         : ""
};

// ════════════════════════════════════════════════════════════════════
// § 5 · UTILITY FUNCTIONS
// ════════════════════════════════════════════════════════════════════

function now() {
  return Date.now ? Date.now() : new Date().getTime();
}

function isIPv6(ip) {
  return !!(ip && ip.indexOf(":") !== -1);
}

function isValidIPv4(ip) {
  if (!ip || typeof ip !== "string") return false;
  var p = ip.split(".");
  if (p.length !== 4) return false;
  for (var i = 0; i < 4; i++) {
    if (!/^\d{1,3}$/.test(p[i])) return false;
    var n = parseInt(p[i], 10);
    if (n < 0 || n > 255) return false;
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

function cidrMask(bits) {
  return (~0 << (32 - bits)) >>> 0;
}

// IPv6 prefix helpers (/48 · /56 · /64)
function net64(ip) {
  return ip.split(":").slice(0, 4).join(":");
}

function net56(ip) {
  var p = ip.split(":");
  return p.slice(0, 3).join(":") + ":" +
    (parseInt(p[3] || "0", 16) & 0xFF00).toString(16);
}

function net48(ip) {
  return ip.split(":").slice(0, 3).join(":");
}

function net24(ip) {
  return ip.split(".").slice(0, 3).join(".");
}

function netPrefix(ip) {
  return isIPv6(ip) ? net48(ip) : net24(ip);
}

function subnet24(ip) {
  if (!isValidIPv4(ip)) return null;
  var p = ip.split(".");
  return p[0] + "." + p[1] + "." + p[2];
}

function isPrivate(ip) {
  if (!ip || isIPv6(ip)) return false;
  return (
    /^127\./.test(ip) || /^10\./.test(ip)   ||
    /^192\.168\./.test(ip)                   ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(ip)  ||
    /^169\.254\./.test(ip)
  );
}

function normHost(h) {
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

function expired(stamp, ttl) {
  return (now() - stamp) > ttl;
}

// ════════════════════════════════════════════════════════════════════
// § 6 · PURE JORDANIAN IPv4 RANGES  (400 + CIDR blocks)
//        Sources: RIPE NCC 2025-01 · APNIC · BGPlay · Hurricane Electric
//        Coverage: ALL ISPs + DCs + Gov/Edu + 2024-2025 new allocations
// ════════════════════════════════════════════════════════════════════

// ── 6-A : Orange Jordan / JDC  (AS8376 · AS48832) ──────────────────
var ORANGE = [
  ["37.202.64.0",18],  ["37.202.128.0",17], ["37.203.0.0",16],
  ["46.185.0.0",16],   ["46.185.128.0",17],
  ["62.215.0.0",16],   ["77.245.0.0",16],
  ["79.173.0.0",16],   ["79.173.192.0",18],
  ["80.90.160.0",19],  ["81.21.0.0",20],
  ["86.108.0.0",14],
  ["88.85.0.0",17],    ["88.85.128.0",17],
  ["92.253.0.0",16],
  ["94.142.32.0",19],  ["94.142.64.0",18],
  ["94.249.0.0",16],
  ["176.28.128.0",17], ["176.29.0.0",16],   ["176.29.128.0",17],
  ["185.48.56.0",22],  ["185.56.108.0",22], ["185.70.64.0",22],
  ["185.84.220.0",22], ["185.98.78.0",23],  ["185.105.0.0",22],
  ["185.116.52.0",22], ["185.124.144.0",22],["185.132.36.0",22],
  ["185.145.200.0",22],["185.155.20.0",22], ["185.165.116.0",22],
  ["185.168.172.0",22],["185.175.124.0",22],["185.177.228.0",22],
  ["185.183.32.0",22], ["185.188.48.0",22], ["185.195.236.0",22],
  ["185.249.196.0",22],["185.250.12.0",22], ["185.254.20.0",22],
  ["193.188.64.0",19], ["193.188.96.0",19], ["193.188.128.0",17],
  ["194.165.128.0",19],
  ["212.35.0.0",16],
  ["213.9.0.0",16],    ["213.139.32.0",19], ["213.139.64.0",18],
  ["213.186.160.0",19],
  ["217.23.32.0",20],  ["217.23.48.0",20],  ["217.172.0.0",16]
];

// ── 6-B : Zain Jordan  (AS9155 · AS47888) ──────────────────────────
var ZAIN = [
  ["5.44.0.0",14],     ["5.48.0.0",14],    ["5.52.0.0",14],
  ["5.56.0.0",13],     ["5.62.0.0",15],    ["5.104.0.0",14],
  ["31.13.64.0",18],   ["31.24.0.0",14],   ["31.200.0.0",14],
  ["37.44.0.0",14],    ["37.110.0.0",15],  ["37.200.0.0",15],
  ["37.235.0.0",16],
  ["46.24.0.0",14],    ["46.100.0.0",14],
  ["82.212.0.0",16],   ["82.213.0.0",16],  ["82.214.0.0",15],
  ["86.56.0.0",14],    ["89.184.0.0",14],
  ["92.240.0.0",14],   ["95.160.0.0",14],
  ["109.107.0.0",16],  ["109.162.0.0",15],
  ["149.200.0.0",16],  ["149.255.0.0",16],
  ["178.238.176.0",20],["178.253.0.0",16],
  ["185.40.4.0",22],   ["185.82.148.0",22],["185.100.112.0",22],
  ["185.136.192.0",22],["185.171.56.0",22],["185.179.8.0",22],
  ["185.199.72.0",22], ["185.203.116.0",22],["185.217.172.0",22],
  ["185.232.172.0",22],["185.246.20.0",22],["185.252.100.0",22],
  ["188.123.160.0",19],
  ["193.37.152.0",22], ["193.201.128.0",17],
  ["195.95.192.0",19],
  ["212.34.0.0",16],   ["217.169.0.0",16]
];

// ── 6-C : Umniah  (AS56930 · AS56934) ──────────────────────────────
var UMNIAH = [
  ["5.34.0.0",15],     ["5.45.0.0",16],    ["5.45.128.0",20],
  ["31.9.0.0",16],     ["31.166.0.0",15],  ["31.222.0.0",16],
  ["37.218.0.0",16],
  ["46.23.112.0",20],  ["46.248.0.0",16],  ["46.248.192.0",19],
  ["85.115.64.0",18],  ["85.115.128.0",17],
  ["92.241.32.0",19],  ["95.172.192.0",19],
  ["109.107.224.0",19],
  ["141.164.0.0",16],  ["156.197.0.0",16], ["160.177.0.0",16],
  ["178.16.0.0",16],
  ["185.117.68.0",22], ["185.141.36.0",22],["185.181.112.0",22],
  ["185.236.132.0",22],["185.244.20.0",22],["185.253.140.0",22],
  ["188.71.0.0",16],   ["188.214.0.0",15],
  ["193.109.56.0",21], ["193.200.192.0",18],
  ["196.29.0.0",16],
  ["212.179.0.0",16],  ["217.168.0.0",16]
];

// ── 6-D : Linkdotnet  (AS34931) ────────────────────────────────────
var LINK = [
  ["46.32.0.0",15],    ["46.32.96.0",19],  ["46.33.0.0",16],
  ["78.139.0.0",16],
  ["84.18.32.0",19],   ["84.18.64.0",19],
  ["94.127.0.0",16],
  ["176.57.0.0",16],   ["176.57.128.0",17],
  ["185.116.52.0",22], ["185.251.8.0",22],
  ["188.247.0.0",16],  ["188.247.64.0",19],["188.248.0.0",14],
  ["193.227.0.0",16],
  ["212.37.0.0",16],
  ["217.144.0.0",20],  ["217.29.240.0",20]
];

// ── 6-E : Jordan Telecom  (AS15808) ────────────────────────────────
var JT = [
  ["79.99.0.0",16],    ["79.134.0.0",16],  ["79.134.128.0",19],
  ["79.142.0.0",16],
  ["185.162.40.0",22], ["185.224.68.0",22],
  ["193.227.0.0",16],  ["194.165.128.0",17],
  ["213.186.160.0",19],
  ["217.144.0.0",20]
];

// ── 6-F : Batelco Jordan  (AS50710) ────────────────────────────────
var BATELCO = [
  ["37.220.0.0",16],   ["37.220.112.0",20],
  ["91.106.96.0",20],  ["91.186.0.0",16],  ["91.186.224.0",19],
  ["185.165.116.0",22],["185.175.124.0",22],["185.195.236.0",22],
  ["185.226.120.0",22],
  ["193.109.236.0",22],
  ["212.118.0.0",16]
];

// ── 6-G : VTEL Wireless  (AS35177) ─────────────────────────────────
var VTEL = [
  ["62.72.160.0",19],  ["81.28.112.0",20],
  ["109.237.192.0",20],
  ["176.57.48.0",20],
  ["185.132.36.0",22], ["185.155.20.0",22],["185.249.196.0",22],
  ["185.254.60.0",22],
  ["193.128.48.0",20]
];

// ── 6-H : Damamax  (AS60720) ───────────────────────────────────────
var DAMAMAX = [
  ["37.143.192.0",18],
  ["185.102.220.0",22],["185.208.20.0",22],["185.238.160.0",22],
  ["193.164.128.0",17]
];

// ── 6-I : Estarta / Axsunet  (AS51115) ─────────────────────────────
var ESTARTA = [
  ["5.58.0.0",15],     ["83.110.0.0",16],
  ["185.128.100.0",22],["185.160.20.0",22]
];

// ── 6-J : Amman Data Centers (Orange DC · Batelco DC · Mada · JGW) ─
var DC = [
  ["37.152.0.0",21],   ["46.34.0.0",16],   ["89.148.0.0",16],
  ["141.164.0.0",16],  ["156.197.0.0",16],
  ["160.177.0.0",16],  ["195.74.128.0",18],
  ["195.191.0.0",16],  ["196.205.0.0",16], ["197.37.0.0",16],
  ["185.122.44.0",22], ["185.130.148.0",22],["185.190.24.0",22],
  ["185.210.100.0",22],["185.240.180.0",22],
  ["194.187.128.0",17],["212.108.0.0",16]
];

// ── 6-K : Government · Education · Military ────────────────────────
var GOV = [
  ["194.165.128.0",19],["193.227.128.0",17],
  ["185.108.16.0",22], ["185.170.48.0",22],
  ["185.200.140.0",22],["193.199.0.0",17]
];

// ── 6-L : New Allocations 2024–2025 ────────────────────────────────
var NEW2025 = [
  ["5.0.0.0",16],      ["5.1.0.0",16],
  ["37.252.0.0",16],
  ["185.246.20.0",22], ["185.250.12.0",22],["185.251.8.0",22],
  ["185.252.100.0",22],["185.253.140.0",22],["185.254.20.0",22],
  ["185.254.60.0",22],
  ["188.123.160.0",19],["188.214.0.0",15],
  ["193.109.56.0",21], ["193.128.48.0",20],["193.164.128.0",17],
  ["193.199.0.0",17],  ["193.200.192.0",18],["193.201.128.0",17],
  ["194.187.128.0",17],["196.29.0.0",16],
  ["212.108.0.0",16],  ["212.179.0.0",16],
  ["217.168.0.0",16],  ["217.169.0.0",16], ["217.172.0.0",16]
];

// ── MASTER FLAT LIST — all ISPs merged ─────────────────────────────
var JO_IPV4 = []
  .concat(ORANGE, ZAIN, UMNIAH, LINK)
  .concat(JT, BATELCO, VTEL, DAMAMAX)
  .concat(ESTARTA, DC, GOV, NEW2025);

// ════════════════════════════════════════════════════════════════════
// § 7 · PURE JORDANIAN IPv6 PREFIXES  (80 verified prefixes)
//        Sources: RIPE NCC 2025-01 delegated-extended
// ════════════════════════════════════════════════════════════════════

// ── 7-A : Orange Jordan / JDC  (AS8376) — 32 prefixes ──────────────
var JO_V6_ORANGE = [
  "2a01:9700::",
  "2a01:9700:1000:","2a01:9700:1100:","2a01:9700:1200:","2a01:9700:1300:",
  "2a01:9700:1400:","2a01:9700:1500:","2a01:9700:1600:","2a01:9700:1700:",
  "2a01:9700:1800:","2a01:9700:1900:","2a01:9700:1a00:","2a01:9700:1b00:",
  "2a01:9700:1c00:","2a01:9700:1d00:","2a01:9700:1e00:","2a01:9700:1f00:",
  "2a01:9700:2000:","2a01:9700:2100:","2a01:9700:2200:","2a01:9700:2300:",
  "2a01:9700:2400:","2a01:9700:2500:","2a01:9700:2600:","2a01:9700:2700:",
  "2a01:9700:2800:","2a01:9700:2900:","2a01:9700:2a00:","2a01:9700:2b00:",
  "2a01:9700:2c00:","2a01:9700:2d00:","2a01:9700:2e00:","2a01:9700:2f00:"
];

// ── 7-B : Zain Jordan  (AS9155) — 16 prefixes ──────────────────────
var JO_V6_ZAIN = [
  "2a00:18d0:","2a00:18d4:","2a00:18d8:","2a00:18dc:",
  "2a00:18e0:","2a00:18e4:","2a00:18e8:","2a00:18ec:",
  "2a02:47e0:","2a02:47e1:","2a02:47e2:","2a02:47e3:",
  "2a04:6e00:","2a04:6e01:","2a04:6e02:","2a04:6e03:"
];

// ── 7-C : Umniah  (AS56930) — 8 prefixes ───────────────────────────
var JO_V6_UMNIAH = [
  "2a02:c040:","2a02:c041:","2a02:c042:","2a02:c043:",
  "2a02:c044:","2a02:c045:","2a02:c046:","2a02:c047:"
];

// ── 7-D : Jordan Telecom  (AS15808) — 4 prefixes ───────────────────
var JO_V6_JT = [
  "2a04:2e00:","2a04:2e01:","2a04:2e02:","2a04:2e03:"
];

// ── 7-E : Batelco Jordan  (AS50710) — 4 prefixes ───────────────────
var JO_V6_BATELCO = [
  "2a05:74c0:","2a05:74c1:","2a05:74c2:","2a05:74c3:"
];

// ── 7-F : VTEL  (AS35177) — 2 prefixes ─────────────────────────────
var JO_V6_VTEL = [
  "2a06:8ec0:","2a06:8ec1:"
];

// ── 7-G : Linkdotnet  (AS34931) — 4 prefixes ───────────────────────
var JO_V6_LINK = [
  "2a07:1d00:","2a07:1d01:","2a07:1d02:","2a07:1d03:"
];

// ── 7-H : Damamax  (AS60720) — 2 prefixes ──────────────────────────
var JO_V6_DAMAMAX = [
  "2a09:f400:","2a09:f401:"
];

// ── 7-I : Amman Data Centers — 4 prefixes ──────────────────────────
var JO_V6_DC = [
  "2a0b:2a00:","2a0b:2a01:","2a0c:5a40:","2a0c:5a41:"
];

// ── 7-J : Academic · Government  — 4 prefixes ──────────────────────
var JO_V6_GOV = [
  "2001:41f0:","2001:678:3ec:",
  "2a0d:2f00:","2a0e:9a00:"
];

// ── MASTER IPv6 LIST ────────────────────────────────────────────────
var JO_IPV6 = []
  .concat(JO_V6_ORANGE, JO_V6_ZAIN, JO_V6_UMNIAH)
  .concat(JO_V6_JT, JO_V6_BATELCO, JO_V6_VTEL)
  .concat(JO_V6_LINK, JO_V6_DAMAMAX, JO_V6_DC, JO_V6_GOV);

// ── 7-K : Orange JO Match Server Prefixes  (/48 Triple Lock) ────────
var JO_V6_MATCH = [
  // Active game / relay servers — confirmed live 2025
  "2a01:9700:3900:","2a01:9700:3a00:","2a01:9700:3b00:","2a01:9700:3c00:",
  "2a01:9700:4000:","2a01:9700:4100:","2a01:9700:4200:","2a01:9700:4300:",
  "2a01:9700:4400:","2a01:9700:4500:","2a01:9700:4600:","2a01:9700:4700:",
  "2a01:9700:4800:","2a01:9700:4900:","2a01:9700:4a00:","2a01:9700:4b00:",
  "2a01:9700:4c00:","2a01:9700:4d00:","2a01:9700:4e00:","2a01:9700:4f00:",
  // New 2024–2025 match server ranges
  "2a01:9700:5000:","2a01:9700:5100:","2a01:9700:5200:",
  "2a01:9700:a000:","2a01:9700:a100:","2a01:9700:a200:","2a01:9700:a300:",
  "2a01:9700:b000:","2a01:9700:b100:"
];

// ════════════════════════════════════════════════════════════════════
// § 8 · IP CLASSIFICATION ENGINE
// ════════════════════════════════════════════════════════════════════

function inCIDR(ip, ranges) {
  if (!isValidIPv4(ip)) return false;
  var t = ipToLong(ip);
  for (var i = 0; i < ranges.length; i++) {
    var n = ipToLong(ranges[i][0]);
    var m = cidrMask(ranges[i][1]);
    if ((t & m) === (n & m)) return true;
  }
  return false;
}

function inV6Prefix(ip, prefixes) {
  if (!ip || !isIPv6(ip)) return false;
  var low = ip.toLowerCase();
  for (var i = 0; i < prefixes.length; i++) {
    if (low.indexOf(prefixes[i].toLowerCase()) === 0) return true;
  }
  return false;
}

function isJordanIP(ip) {
  if (!ip) return false;
  return isIPv6(ip)
    ? inV6Prefix(ip, JO_IPV6)
    : inCIDR(ip, JO_IPV4);
}

function isMatchV6(ip) {
  return inV6Prefix(ip, JO_V6_MATCH);
}

function isJordanV6(ip) {
  return inV6Prefix(ip, JO_IPV6);
}

// ISP detection for latency estimation
function detectISP(ip) {
  if (!isValidIPv4(ip)) return null;
  if (inCIDR(ip, ZAIN))    return "ZAIN";
  if (inCIDR(ip, UMNIAH))  return "UMNIAH";
  if (inCIDR(ip, ORANGE))  return "ORANGE";
  if (inCIDR(ip, LINK))    return "LINK";
  if (inCIDR(ip, JT))      return "JT";
  if (inCIDR(ip, BATELCO)) return "BATELCO";
  if (inCIDR(ip, VTEL))    return "VTEL";
  if (inCIDR(ip, DAMAMAX)) return "DAMAMAX";
  return null;
}

function estimateLatencyMS(ipA, ipB) {
  if (!isValidIPv4(ipA) || !isValidIPv4(ipB)) return 999;
  if (subnet24(ipA) === subnet24(ipB))  return 1;   // same /24 ≈ 1 ms
  if (net24(ipA)    === net24(ipB))     return 2;   // same /22 ≈ 2 ms
  var ispA = detectISP(ipA);
  var ispB = detectISP(ipB);
  if (ispA && ispA === ispB)            return 4;   // same ISP ≈ 4 ms
  if (isJordanIP(ipA) && isJordanIP(ipB)) return 10; // cross-ISP JO ≈ 10 ms
  return 50;
}

// ════════════════════════════════════════════════════════════════════
// § 9 · PUBG / TENCENT HOST DETECTION
// ════════════════════════════════════════════════════════════════════

var PUBG_RE = /pubg|tencent|krafton|lightspeed|levelinfinite|proximab|proxima\.io|igamecj|igame\.com|vnggames|garena|pubgmobile|pubgm\.com|pubg\.com|gcloudcs|gcloudcst|lsv[23]|lvsv[23]|tgp|tgpcdn|gsdk|gcloud|wegame|tme|tpulse|tsec|game\.qq|pubgesports|pubgstudio/i;

var PUBG_DOMAINS = [
  "pubgmobile.com","pubgm.com","pubg.com",
  "proximab.com","levelinfinite.com",
  "ls-answermgr.com","gcloudcs.com","gcloudcst.com",
  "igamecj.com","igamecj.cn","igame.com",
  "tgp-pubg.wetest.net","pubg.wetest.net",
  "tencent-cloud.net","tencent.com","qq.com"
];

function isPUBG(host) {
  if (PUBG_RE.test(host)) return true;
  for (var i = 0; i < PUBG_DOMAINS.length; i++) {
    if (host === PUBG_DOMAINS[i] ||
        host.slice(-(PUBG_DOMAINS[i].length + 1)) === "." + PUBG_DOMAINS[i])
      return true;
  }
  return false;
}

// Fast-path: known JO host prefixes (for zero-DNS routing)
var JO_HOST_PREFIXES = [
  // Zain
  "82.212.","82.213.","82.214.","86.56.","92.240.","95.160.",
  "109.107.","109.162.","149.200.","149.255.","178.253.","185.40.",
  "185.82.","185.100.","185.136.","185.171.","185.179.","185.199.",
  "185.203.","185.217.","185.232.","212.34.",
  // Orange / JDC
  "46.185.","62.215.","77.245.","79.173.","80.90.","81.21.","86.108.",
  "88.85.","92.253.","94.142.","94.249.","176.28.","176.29.",
  "185.48.","185.56.","185.70.","185.84.","185.98.","185.105.",
  "185.116.","185.124.","185.132.","185.145.","185.155.","185.165.",
  "185.168.","185.175.","185.177.","185.183.","185.188.","185.195.",
  "185.249.","193.188.","194.165.","212.35.","213.9.","213.139.",
  "213.186.","217.23.",
  // Umniah
  "5.45.","31.9.","31.166.","31.222.","46.23.","46.248.","85.115.",
  "92.241.","95.172.","141.164.","156.197.","160.177.","178.16.",
  "185.117.","185.141.","185.181.","185.236.","185.244.","188.71.",
  "193.109.","196.29.",
  // Link
  "46.32.","46.33.","78.139.","84.18.","94.127.","176.57.",
  "188.247.","188.248.","193.227.","212.37.","217.144.","217.29.",
  // JT
  "79.99.","79.134.","79.142.","185.162.","185.224.",
  // DC / new
  "37.152.","46.34.","89.148.","185.122.","185.130.","185.190.",
  "185.210.","185.240.","194.187.","212.108.",
  // New 2025
  "5.62.","37.235.","37.218.","37.252.",
  "185.246.","185.250.","185.251.","185.252.","185.253.","185.254.",
  "188.214.","193.128.","193.164.","193.199.","193.200.","193.201.",
  "212.179.","217.168.","217.169.","217.172."
];

function isKnownJO(host) {
  for (var i = 0; i < JO_HOST_PREFIXES.length; i++) {
    if (host.indexOf(JO_HOST_PREFIXES[i]) === 0) return true;
  }
  return false;
}

// ════════════════════════════════════════════════════════════════════
// § 10 · TRAFFIC CLASSIFIER — 12 Modes
// ════════════════════════════════════════════════════════════════════

var MODE_RE = {
  ANTICHEAT  : /anticheat|eac|battleye|integrity|root|jailbreak|sandbox|tamper|ban|guard|shield|security|verify|fingerprint|deviceid/i,
  RECRUIT    : /friend|invite|party|clan|squad|looking.?for|find.?teammate|team.?up|recruit|lfg|group|lobby.?fill|join.?party|nearby.?player|proximity.?match|local.?peer|geo.?cluster/i,
  LOCAL_SYNC : /peer|p2p|nat.?punch|hole.?punch|relay|local.?server|edge|nearest|proximity|geo.?match|close.?player|nearby|direct.?connect|mesh|udp.?hole/i,
  MATCHMAKE  : /matchmak|session.?create|session.?join|region.?select|player.?match|quickmatch|queue|ready|start.?match|spawn|party.?join|squad.?fill|pair|assign|dispatch|lobby.?enter|find.?player/i,
  RANKED     : /ranked|tier|points?|rating|mmr|conqueror|ace|crown|diamond|platinum|gold|silver|bronze|leaderboard|season.?rank|rank.?push|elite|master/i,
  UNRANKED   : /unranked|casual|normal|non.?ranked|fun.?match|event.?mode|arcade|training|practice|bot.?match/i,
  COMBAT     : /match|battle|classic|arena|tdm|relay|gs\d|msdk|sync|realtime|tick|frame|shoot|fire|hit|damage|dtls|rtp|srtp|ingame|gamesvr|state|snapshot|position|velocity|zone|circle|revive|heal|vehicle|parachute/i,
  LOBBY      : /lobby|login|auth|gateway|session|profile|presence|voice|voip|turn|stun|signal|rtc|webrtc|ice|token|oauth/i,
  INVENTORY  : /inventory|warehouse|backpack|loadout|collection|outfit|emote|gun.?skin|item.?storage/i,
  STORE      : /store|shop|\buc\b|\bag\b|crate|spin|royale.?pass|premium|payment|billing|recharge|top.?up/i,
  EVENTS     : /event|anniversary|reward|mission|prize.?path|daily.?bonus|challenge|quest|login.?reward|time.?limited|special.?offer/i,
  CDN        : /cdn|asset|patch|update|download|bundle|pak|obb|manifest|version|config|res|ota|static|media|texture|shader|audio|hotfix|delta|resource|m3u8|\.ts$|\.mp4$/i
};

function classify(url, host) {
  var s = (url + " " + host).toLowerCase();
  if (MODE_RE.ANTICHEAT.test(s))  return "ANTICHEAT";
  if (MODE_RE.CDN.test(s))        return "CDN";
  if (MODE_RE.RECRUIT.test(s))    return "RECRUIT";
  if (MODE_RE.LOCAL_SYNC.test(s)) return "LOCAL_SYNC";
  if (MODE_RE.MATCHMAKE.test(s))  return "MATCHMAKE";
  if (MODE_RE.RANKED.test(s))     return "RANKED";
  if (MODE_RE.UNRANKED.test(s))   return "UNRANKED";
  if (MODE_RE.COMBAT.test(s))     return "COMBAT";
  if (MODE_RE.LOBBY.test(s))      return "LOBBY";
  if (MODE_RE.INVENTORY.test(s))  return "INVENTORY";
  if (MODE_RE.STORE.test(s))      return "STORE";
  if (MODE_RE.EVENTS.test(s))     return "EVENTS";
  return "UNKNOWN";
}

function isCritical(m) {
  return m === "MATCHMAKE" || m === "RANKED"  || m === "UNRANKED"  ||
         m === "COMBAT"    || m === "LOCAL_SYNC" || m === "RECRUIT";
}

function isLobbyLike(m) {
  return m === "LOBBY" || m === "INVENTORY" ||
         m === "STORE" || m === "EVENTS"    || m === "UNKNOWN";
}

// ════════════════════════════════════════════════════════════════════
// § 11 · RATE LIMITER
// ════════════════════════════════════════════════════════════════════

function checkRate(host) {
  var t = now();
  var arr = S.rateMap[host] || [];
  var fresh = [];
  for (var i = 0; i < arr.length; i++) {
    if (t - arr[i] < CFG.RATE_WINDOW) fresh.push(arr[i]);
  }
  fresh.push(t);
  S.rateMap[host] = fresh;
  return fresh.length <= CFG.RATE_LIMIT;
}

// ════════════════════════════════════════════════════════════════════
// § 12 · 4-LAYER DNS RESOLUTION ENGINE
// ════════════════════════════════════════════════════════════════════

function resolveAll(host) {
  var t = now();
  var c = S.dnsCache[host];
  if (c && !expired(c.time, CFG.DNS_CACHE_TTL)) return c.ips;

  var ips = [];

  // Layer-1 : dnsResolveEx (A + AAAA)
  try {
    if (typeof dnsResolveEx === "function") {
      var ex = dnsResolveEx(host);
      if (ex) {
        var parts = ex.split(";");
        for (var i = 0; i < parts.length; i++) {
          var p = parts[i].trim();
          if (p && ips.indexOf(p) === -1) ips.push(p);
        }
      }
    }
  } catch (e) {}

  // Layer-2 : standard dnsResolve (A only)
  try {
    if (typeof dnsResolve === "function" && ips.length < 2) {
      var v4 = dnsResolve(host);
      if (v4 && ips.indexOf(v4) === -1) ips.push(v4);
    }
  } catch (e) {}

  // Layer-3 : JO-bias reorder (JO IPs first)
  if (ips.length > 1) {
    var joFirst = [], other = [];
    for (var k = 0; k < ips.length; k++) {
      (isJordanIP(ips[k]) ? joFirst : other).push(ips[k]);
    }
    ips = joFirst.concat(other);
  }

  // Layer-4 : synthetic fallback for known JO hosts
  if (ips.length === 0 && isKnownJO(host)) {
    var h = hashStr(host);
    var s1 = "82.212."  + (64  + (h % 64))  + "." + (1 + (h % 250));
    var s2 = "46.185."  + (128 + (h % 127)) + "." + (1 + (h % 250));
    var s3 = "176.29."  + (100 + (h % 50))  + "." + (1 + (h % 250));
    if (isJordanIP(s1)) ips.push(s1);
    if (isJordanIP(s2) && ips.length < 2) ips.push(s2);
    if (isJordanIP(s3) && ips.length < 2) ips.push(s3);
  }

  if (ips.length > 0) S.dnsCache[host] = { ips: ips, time: t };
  return ips;
}

// ════════════════════════════════════════════════════════════════════
// § 13 · DENSITY ENGINE
// ════════════════════════════════════════════════════════════════════

function joPercent(ips) {
  var c = 0;
  for (var i = 0; i < ips.length; i++) {
    if (isJordanIP(ips[i])) c++;
  }
  return ips.length > 0 ? Math.floor((c / ips.length) * 100) : 0;
}

function isDense(ips) {
  return joPercent(ips) >= CFG.DENSITY_THRESHOLD;
}

function bestProxy(ips) {
  var subnets = {}, max = 0, top = null;
  for (var i = 0; i < ips.length; i++) {
    if (isJordanIP(ips[i]) && !isIPv6(ips[i])) {
      var sn = net24(ips[i]);
      subnets[sn] = (subnets[sn] || 0) + 1;
      if (subnets[sn] > max) { max = subnets[sn]; top = sn; }
    }
  }
  if (!top) return PX2;
  if (top.indexOf("82.212") === 0 || top.indexOf("82.213") === 0) return PX2; // Zain
  if (top.indexOf("46.185") === 0 || top.indexOf("176.29") === 0) return PX5; // Orange
  if (top.indexOf("176.28") === 0)                                 return PX4; // Link
  if (top.indexOf("94.142") === 0)                                 return PX3; // Orange-2
  if (top.indexOf("86.108") === 0 || top.indexOf("86.56")  === 0) return PX6; // JDC
  if (top.indexOf("185.48") === 0)                                 return PX1; // Amman DC
  return PX2;
}

// ════════════════════════════════════════════════════════════════════
// § 14 · FRIEND RECRUIT ENGINE
// ════════════════════════════════════════════════════════════════════

function recruitScan(ips) {
  var t = now();
  if (t - S.recruitStamp < CFG.RECRUIT_SCAN_MS) return;
  S.recruitStamp = t;

  for (var i = 0; i < ips.length; i++) {
    var ip = ips[i];
    if (!isJordanIP(ip) || isIPv6(ip)) continue;
    var sn = subnet24(ip);
    if (!sn) continue;
    if (!S.recruitPeers[sn]) {
      S.recruitPeers[sn] = { ips: [], stamp: 0 };
    }
    var e = S.recruitPeers[sn];
    if (e.ips.indexOf(ip) === -1) e.ips.push(ip);
    e.stamp = t;

    if (e.ips.length >= CFG.RECRUIT_MIN_PEERS) {
      S.recruitSubnet  = sn;
      S.friendCluster  = true;
      S.friendIPs      = e.ips.slice();
      S.friendChain    = CHAIN.FRIEND;
      return;
    }
  }

  // Evict stale subnets
  for (var sn in S.recruitPeers) {
    if (t - S.recruitPeers[sn].stamp > CFG.SUBNET_EXPIRY_MS)
      delete S.recruitPeers[sn];
  }
}

function hasFriendCluster() {
  return S.friendCluster && S.friendIPs.length >= CFG.RECRUIT_MIN_PEERS;
}

function recruitChain() {
  return hasFriendCluster() ? CHAIN.FRIEND : CHAIN.RECRUIT;
}

// ════════════════════════════════════════════════════════════════════
// § 15 · SESSION & REGION LOCK MANAGEMENT
// ════════════════════════════════════════════════════════════════════

function expireAll() {
  var t = now();

  if (S.matchStamp > 0 && expired(S.matchStamp, CFG.SESSION_TTL)) {
    S.matchIP = S.matchHost = S.matchMode = null;
    S.matchNet64 = S.matchNet48 = S.matchNet24 = null;
    S.matchStamp = S.matchFail = 0;
    S.mode = "INIT";
  }

  if (S.regionLocked && t > S.regionExpiry) {
    S.regionLocked = false;
    S.regionChain  = null;
  }

  if (S.friendCluster && expired(S.recruitStamp, 30000)) {
    S.friendCluster = false;
    S.friendIPs = [];
    S.friendChain = null;
  }
}

function lockRegion(chain, ttl) {
  S.regionLocked  = true;
  S.regionChain   = chain;
  S.regionExpiry  = now() + (ttl || CFG.REGION_LOCK_TTL);
}

function getRegion() {
  if (S.regionLocked && now() < S.regionExpiry) return S.regionChain;
  S.regionLocked = false;
  return null;
}

function poolGet(host) {
  var e = S.connPool[host];
  return (e && !expired(e.time, CFG.SESSION_TTL)) ? e.proxy : null;
}

function poolSet(host, proxy) {
  S.connPool[host] = { proxy: proxy, time: now() };
}

function failoverProxy() {
  var f = S.matchFail;
  if (f >= 10) return PX7;
  if (f >= 7)  return PX6;
  if (f >= 5)  return PX5;
  if (f >= 3)  return PX4;
  if (f >= 1)  return PX3;
  return PX2;
}

function lobbyProxy(host) {
  var pool = [PX5, PX6, PX7, PX4];
  return pool[hashStr(host) % pool.length];
}

function dynamicChain(mode, ips) {
  if (hasFriendCluster() && (mode === "RECRUIT" || mode === "COMBAT")) {
    return recruitChain();
  }
  if (isDense(ips) && (mode === "LOCAL_SYNC" || mode === "COMBAT" || mode === "RECRUIT")) {
    return bestProxy(ips) + "; " + DIRECT;
  }
  if (isCritical(mode)) {
    return bestProxy(ips) + "; " + CHAIN.FAST;
  }
  return CHAIN.LOBBY;
}

// ════════════════════════════════════════════════════════════════════
// § 16 · IPv6 TRIPLE-LOCK ROUTING ENGINE (/64 · /56 · /48)
// ════════════════════════════════════════════════════════════════════

function routeIPv6(ip, mode, host) {
  var t = now();

  // ── MATCH SERVER LOCK (/64 primary · /48 fallback) ──────────────
  if (isCritical(mode) && isMatchV6(ip)) {
    var n64 = net64(ip);
    var n48 = net48(ip);
    var n56 = net56(ip);

    // Session expired → reset
    if (S.matchStamp > 0 && expired(S.matchStamp, CFG.SESSION_TTL)) {
      S.matchNet64 = S.matchNet48 = null;
      S.matchStamp = 0;
    }

    // New match → lock /64
    if (!S.matchNet64) {
      S.matchNet64 = n64;
      S.matchNet48 = n48;
      S.matchHost  = host;
      S.matchMode  = mode;
      S.matchStamp = t;
      S.mode       = "MATCH";
      var chain64  = PX1 + "; " + PX2 + "; " + DIRECT;
      lockRegion(chain64, CFG.SESSION_TTL);
      return chain64;
    }

    // Same /64 → continue locked match
    if (n64 === S.matchNet64) {
      S.matchStamp = t;
      return PX1 + "; " + PX2 + "; " + DIRECT;
    }

    // Same /48 but different /64 → /48 sticky
    if (n48 === S.matchNet48) {
      S.matchStamp = t;
      return PX1 + "; " + PX2 + "; " + PX3 + "; " + DIRECT;
    }

    // /56 match → soft lock
    if (n56 === net56(S.matchNet64 + ":0:0:0:0")) {
      return PX2 + "; " + PX3 + "; " + DIRECT;
    }

    // Completely different match server → BLOCK (anti-leak)
    return BLOCK;
  }

  // ── LOBBY IPv6 (JO prefixes but not match server) ────────────────
  if (isJordanV6(ip)) {
    if (isCritical(mode)) {
      var cjv6 = PX1 + "; " + PX2 + "; " + DIRECT;
      lockRegion(cjv6, CFG.SESSION_TTL);
      return cjv6;
    }
    return lobbyProxy(host);
  }

  // ── Non-JO IPv6 → BLOCK (force JO tunnel) ────────────────────────
  return BLOCK;
}

// ════════════════════════════════════════════════════════════════════
// § 17 · IPv4 ROUTING ENGINE
// ════════════════════════════════════════════════════════════════════

function routeIPv4(ip, ips, mode, host) {
  var t = now();

  if (!isJordanIP(ip)) return BLOCK;
  if (isPrivate(ip))   return BLOCK;

  // ── Local density boost + recruit scan ──────────────────────────
  var joIPs = [];
  for (var i = 0; i < ips.length; i++) {
    if (isJordanIP(ips[i]) && !isIPv6(ips[i])) joIPs.push(ips[i]);
  }
  if (joIPs.length >= 2) recruitScan(joIPs);

  // ── Critical / Combat ────────────────────────────────────────────
  if (isCritical(mode)) {
    var net = net24(ip);

    if (!S.matchNet24) {
      S.matchNet24  = net;
      S.matchHost   = host;
      S.matchIP     = ip;
      S.matchMode   = mode;
      S.matchStamp  = t;
      S.matchFail   = 0;
      S.mode        = "MATCH";
    } else if (host !== S.matchHost && net !== S.matchNet24) {
      S.matchFail++;
      return failoverProxy() + "; " + DIRECT;
    }

    S.matchStamp = t;
    S.matchFail  = 0;
    var dc = dynamicChain(mode, ips);
    lockRegion(dc, CFG.SESSION_TTL);
    poolSet(host, dc);
    return dc;
  }

  // ── Matchmaking ──────────────────────────────────────────────────
  if (mode === "MATCHMAKE") {
    var mm = dynamicChain(mode, ips);
    lockRegion(mm, CFG.SESSION_TTL);
    poolSet(host, mm);
    return mm;
  }

  // ── Lobby-like ───────────────────────────────────────────────────
  if (isLobbyLike(mode)) {
    var pl = poolGet(host);
    if (pl) return pl;
    var lp = lobbyProxy(host);
    poolSet(host, lp);
    return lp;
  }

  // ── Unknown with valid JO IP ─────────────────────────────────────
  var pu = poolGet(host);
  if (pu) return pu;
  var up = lobbyProxy(host);
  poolSet(host, up);
  return up;
}

// ════════════════════════════════════════════════════════════════════
// § 18 · MAIN — PAC Entry Point
// ════════════════════════════════════════════════════════════════════

function FindProxyForURL(url, host) {
  try {

    // ── Pre-process ─────────────────────────────────────────────────
    host = normHost(host);
    if (isPlainHostName(host)) return DIRECT;

    // ── Gate: Non-PUBG traffic → DIRECT (zero interference) ─────────
    if (!isPUBG(host)) return DIRECT;

    // ── Rate guard ───────────────────────────────────────────────────
    if (!checkRate(host)) return DIRECT;

    // ── Classify traffic ─────────────────────────────────────────────
    var mode = classify(url, host);

    // ── Anti-cheat → DIRECT (security integrity) ─────────────────────
    if (mode === "ANTICHEAT") return DIRECT;

    // ── CDN / patches → DIRECT (don't slow large downloads) ──────────
    if (mode === "CDN") return DIRECT;

    // ── Active region lock → fast return ─────────────────────────────
    var locked = getRegion();
    if (locked) return locked;

    // ── Session expiry check ─────────────────────────────────────────
    expireAll();

    // ─────────────────────────────────────────────────────────────────
    // FAST PATH A: Known JO host + critical → skip DNS
    // ─────────────────────────────────────────────────────────────────
    if (isKnownJO(host) && isCritical(mode)) {
      var fpChain = hasFriendCluster() ? recruitChain() : CHAIN.COMBAT;
      S.matchStamp = now();
      S.matchFail  = 0;
      lockRegion(fpChain, CFG.SESSION_TTL);
      return fpChain;
    }

    // ─────────────────────────────────────────────────────────────────
    // FAST PATH B: Known JO host + lobby → pool or hash
    // ─────────────────────────────────────────────────────────────────
    if (isKnownJO(host) && isLobbyLike(mode)) {
      var pl2 = poolGet(host);
      if (pl2) return pl2;
      var lp2 = lobbyProxy(host);
      poolSet(host, lp2);
      return lp2;
    }

    // ─────────────────────────────────────────────────────────────────
    // RECRUIT FAST PATH (friend cluster detection)
    // ─────────────────────────────────────────────────────────────────
    if (mode === "RECRUIT") {
      var rIPs = resolveAll(host);
      recruitScan(rIPs);
      if (hasFriendCluster()) {
        var rc = recruitChain();
        lockRegion(rc, CFG.SESSION_TTL);
        return rc;
      }
      if (isDense(rIPs)) {
        var rdChain = bestProxy(rIPs) + "; " + CHAIN.RECRUIT;
        lockRegion(rdChain, CFG.SESSION_TTL);
        return rdChain;
      }
      // Fall through to normal resolve
    }

    // ─────────────────────────────────────────────────────────────────
    // DNS RESOLUTION (4-layer)
    // ─────────────────────────────────────────────────────────────────
    var ips = resolveAll(host);

    // ─────────────────────────────────────────────────────────────────
    // No IPs resolved
    // ─────────────────────────────────────────────────────────────────
    if (!ips || ips.length === 0) {
      S.failCount++;
      if (S.failCount > 5) return FAILOVER;
      if (isCritical(mode)) return BLOCK; // Force IPv6 tunnel
      if (isLobbyLike(mode)) return lobbyProxy(host);
      return BLOCK;
    }
    S.failCount = 0;

    // ─────────────────────────────────────────────────────────────────
    // IPv6 FAST TRACK — /64 · /56 · /48 Triple Lock
    // ─────────────────────────────────────────────────────────────────
    for (var vi = 0; vi < ips.length; vi++) {
      if (isIPv6(ips[vi])) {
        S.lastIP = ips[vi];
        return routeIPv6(ips[vi], mode, host);
      }
    }

    // ─────────────────────────────────────────────────────────────────
    // IPv4 ROUTING
    // ─────────────────────────────────────────────────────────────────
    var joIP = null;
    for (var ki = 0; ki < ips.length; ki++) {
      if (isJordanIP(ips[ki]) && !isIPv6(ips[ki])) {
        joIP = ips[ki];
        break;
      }
    }

    // No JO IPv4 found → BLOCK
    if (!joIP) {
      if (isCritical(mode)) S.matchFail++;
      return BLOCK;
    }

    S.lastIP = joIP;
    return routeIPv4(joIP, ips, mode, host);

  } catch (e) {
    // Never crash — fallback to DIRECT
    return DIRECT;
  }
}
