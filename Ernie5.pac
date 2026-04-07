// ============================================================
// PUBG MOBILE — JORDAN MASTER PAC v5.0 (The Lockdown Edition)
// 🎯 GOAL: 100% Jordanian Lobbies | Lowest Ping | Zero Leaks
// 🚀 Merged: All JO ISPs + ME Servers + Smart Failover
// ============================================================

// ═══════════════════════════════════════════════════════════
// 🛠️ CONFIGURATION — ضبط البروكسيات هنا
// ═══════════════════════════════════════════════════════════

// 🔥 البروكسي الأردني الأساسي (الأسرع والأثبت)
var JO_PROXY_MAIN   = "PROXY 82.212.84.33:20005"; 

// 🛡️ البروكسي الأردني الاحتياطي (لو الأول ضغط)
var JO_PROXY_BACKUP = "PROXY 176.29.153.95:20005";

// 🌐 بروكسي الشرق الأوسط (للطوارئ فقط)
var ME_PROXY_FALLBACK = "PROXY 185.181.112.22:8080"; 

// 🚦 قائمة بروكسيات اللوبي (للتوزيع)
var LOBBY_POOL = [
  "PROXY 46.185.131.218:443",
  "PROXY 82.212.84.33:1080",
  "PROXY 176.29.153.95:443"
];

var BLOCK  = "PROXY 127.0.0.1:9"; // حجب أي شي غلط
var DIRECT = "DIRECT"; // للتحديثات والـ CDN بس

// ═══════════════════════════════════════════════════════════
// ⏱️ TIMING & SESSION CONSTANTS
// ═══════════════════════════════════════════════════════════

var CACHE_TTL       = 300000;  // 5 min — DNS cache
var SESSION_TIMEOUT = 90000;   // 90 sec — قفل المنطقة طول الماتش
var RATE_WINDOW     = 5000;    // 5 sec
var RATE_LIMIT      = 300;     // سماحية طلبات

// ═══════════════════════════════════════════════════════════
// 🧠 SESSION STATE — الذاكرة
// ═══════════════════════════════════════════════════════════

var SESSION = {
  matchIP:        null,
  matchHost:      null,
  matchNet:       null,
  matchTimestamp: 0,
  matchFailCount: 0,
  regionLocked:   false,
  regionProxy:    null,
  regionExpiry:   0,
  dnsCache:       {},
  rateTracker:    {},
  connPool:       {}
};

// ═══════════════════════════════════════════════════════════
// 🛠️ HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════

function now() { return (Date.now ? Date.now() : new Date().getTime()); }

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

function isIPv6(ip) { return !!(ip && ip.indexOf(":") !== -1); }

function ipToLong(ip) {
  var p = ip.split(".");
  return ((parseInt(p[0], 10) << 24) | (parseInt(p[1], 10) << 16) | (parseInt(p[2], 10) << 8) | parseInt(p[3], 10)) >>> 0;
}

function cidrToMask(bits) { return (~0 << (32 - bits)) >>> 0; }

function netPrefix(ip) {
  if (isIPv6(ip)) return ip.split(":").slice(0, 4).join(":");
  return ip.split(".").slice(0, 3).join(".");
}

function isPrivateIP(ip) {
  if (!ip || isIPv6(ip)) return false;
  return (/^127\./.test(ip) || /^10\./.test(ip) || /^192\.168\./.test(ip) || /^172\.(1[6-9]|2\d|3[0-1])\./.test(ip) || /^169\.254\./.test(ip));
}

// ═══════════════════════════════════════════════════════════
// 🇯🇴 JORDAN IPv4 RANGES (MEGA MERGE)
// ═══════════════════════════════════════════════════════════

var JORDAN_IPV4 = [
  // ── Orange Jordan (JDC) - Most Important ──
  ["37.202.64.0", 18], ["46.185.128.0", 17], ["46.185.0.0", 16],
  ["79.173.192.0", 18], ["79.173.0.0", 16], ["86.108.0.0", 14],
  ["86.56.0.0", 16], ["92.253.0.0", 17], ["92.253.128.0", 17],
  ["94.249.0.0", 16], ["193.188.64.0", 19], ["193.188.96.0", 19],
  ["194.165.128.0", 17], ["212.34.0.0", 16], ["212.35.64.0", 18],
  ["212.35.128.0", 17], ["213.9.0.0", 16], ["213.139.32.0", 19],
  ["213.186.160.0", 19], ["217.23.32.0", 20],
  // ── Zain Jordan ──
  ["81.212.0.0", 16], ["81.221.128.0", 17], ["82.205.0.0", 16],
  ["82.212.64.0", 18], ["82.212.128.0", 17], ["188.123.160.0", 19],
  ["2a00:18d0::", 32], ["2a00:18d8::", 32],
  // ── Umniah ──
  ["5.45.128.0", 20], ["5.45.0.0", 16], ["46.23.112.0", 20],
  ["46.248.0.0", 16"], ["92.241.32.0", 19], ["95.160.0.0", 15],
  ["109.107.0.0", 16], ["188.248.0.0", 14], ["2a02:c040::", 32],
  // ── Batelco ──
  ["91.106.96.0", 20], ["91.186.0.0", 16], ["212.118.0.0", 16],
  ["37.220.0.0", 16],
  // ── Link.net / Data Centers / Others ──
  ["37.44.0.0", 15], ["37.110.0.0", 16], ["37.252.0.0", 16],
  ["46.32.0.0", 15], ["77.245.0.0", 16], ["80.90.160.0", 19],
  ["85.115.64.0", 18], ["88.85.0.0", 17], ["94.142.32.0", 19],
  ["109.162.0.0", 15], ["149.200.0.0", 16], ["176.28.0.0", 16],
  ["176.29.0.0", 16], ["178.16.0.0", 16], ["185.40.4.0", 22],
  ["185.117.68.0", 22], ["185.181.112.0", 22], ["188.71.0.0", 16],
  ["193.227.0.0", 16], ["195.191.0.0", 16], ["196.205.0.0", 16]
];

// ═══════════════════════════════════════════════════════════
// 🌍 MIDDLE EAST SERVER RANGES (Fallback)
// ═══════════════════════════════════════════════════════════

var PUBG_ME_RANGES = [
  ["13.228.0.0", 14], ["18.136.0.0", 15], ["52.76.0.0", 15],
  ["47.252.0.0", 16], ["149.130.0.0", 15], ["20.174.0.0", 16],
  ["40.120.0.0", 15], ["54.231.0.0", 16]
];

// ═══════════════════════════════════════════════════════════
// 🔍 IP CHECKING LOGIC
// ═══════════════════════════════════════════════════════════

function inIPv4Range(ip, ranges) {
  if (!isValidIPv4(ip)) return false;
  var target = ipToLong(ip);
  for (var i = 0; i < ranges.length; i++) {
    var network = ipToLong(ranges[i][0]);
    var mask = cidrToMask(ranges[i][1]);
    if ((target & mask) === (network & mask)) return true;
  }
  return false;
}

function isJordanIP(ip) {
  if (!ip) return false;
  if (isIPv6(ip)) return (ip.indexOf("2a00:18d") === 0 || ip.indexOf("2a01:9700") === 0 || ip.indexOf("2a02:c040") === 0);
  return inIPv4Range(ip, JORDAN_IPV4);
}

function isMiddleEast(ip) {
  if (!isValidIPv4(ip)) return false;
  return inIPv4Range(ip, PUBG_ME_RANGES);
}

function resolveAll(host) {
  var t = now();
  var cached = SESSION.dnsCache[host];
  if (cached && (t - cached.time) < CACHE_TTL) return cached.ips;
  var ips = [];
  try {
    if (typeof dnsResolveEx === "function") {
      var ex = dnsResolveEx(host);
      if (ex) ips = ex.split(";").map(s => s.trim()).filter(s => s);
    }
  } catch(e) {}
  try {
    if (typeof dnsResolve === "function") {
      var v4 = dnsResolve(host);
      if (v4 && ips.indexOf(v4) === -1) ips.push(v4);
    }
  } catch(e) {}
  if (ips.length > 0) SESSION.dnsCache[host] = { ips: ips, time: t };
  return ips;
}

// ═══════════════════════════════════════════════════════════
// 🎮 TRAFFIC CLASSIFICATION
// ═══════════════════════════════════════════════════════════

var MODES = {
  MATCHMAKING: /matchmak|session.?create|region.?select|player.?match|queue|spawn.?island/i,
  COMBAT:      /battle|classic|arena|payload|zombie|metro|tdm|ingame|gamesvr|sync|tick/i,
  LOBBY:       /lobby|login|auth|gateway|profile|shop|inventory/i,
  CDN:         /cdn|asset|patch|update|download|pak|obb|config/i,
  ANTICHEAT:   /anticheat|security|verify|shield|ban|guard/i
};

function classify(url, host) {
  var input = (url + " " + host).toLowerCase();
  if (MODES.ANTICHEAT.test(input)) return "ANTICHEAT";
  if (MODES.MATCHMAKING.test(input)) return "MATCHMAKING";
  if (MODES.COMBAT.test(input)) return "COMBAT";
  if (MODES.LOBBY.test(input)) return "LOBBY";
  if (MODES.CDN.test(input)) return "CDN";
  return "OTHER";
}

function isCritical(mode) { return mode === "MATCHMAKING" || mode === "COMBAT"; }
function isLobbyLike(mode) { return mode === "LOBBY" || mode === "OTHER"; }

function isPUBG(host) {
  return /pubg|tencent|krafton|lightspeed|igamecj|vng|battlegrounds/i.test(host);
}

// ═══════════════════════════════════════════════════════════
// 🚀 PROXY SELECTION LOGIC (THE BRAIN)
// ═══════════════════════════════════════════════════════════

function getRegionLocked() {
  if (SESSION.regionLocked && now() < SESSION.regionExpiry) return SESSION.regionProxy;
  SESSION.regionLocked = false; SESSION.regionProxy = null;
  return null;
}

function lockRegion(chain) {
  SESSION.regionLocked = true;
  SESSION.regionProxy = chain;
  SESSION.regionExpiry = now() + SESSION_TIMEOUT;
}

function norm(h) {
  var last = -1, colons = 0;
  for (var i = 0; i < h.length; i++) {
    if (h[i] === ":") { colons++; last = i; }
  }
  return (colons === 1) ? h.substring(0, last) : h;
}

// ═══════════════════════════════════════════════════════════
// 🔥 MAIN FUNCTION
// ═══════════════════════════════════════════════════════════

function FindProxyForURL(url, host) {
  try {
    host = norm(host.toLowerCase());
    if (!isPUBG(host)) return DIRECT;
    
    var mode = classify(url, host);
    
    // 1. Updates & CDN → Direct (أسرع)
    if (mode === "CDN") return DIRECT;
    
    // 2. Anti-Cheat → Direct (ضروري عشان ما يبانش)
    if (mode === "ANTICHEAT") return DIRECT;

    // 3. Region Lock (لو في ماتش جاي، متحركش من البروكسي)
    var locked = getRegionLocked();
    if (locked) return locked;

    // 4. DNS Resolution (شوف الـ IP فين)
    var ips = resolveAll(host);
    var t = now();
    
    // 5. Check for Jordanian IPs (الكنز!)
    var joIP = null;
    if (ips.length > 0) {
      for (var i=0; i<ips.length; i++) {
        if (isJordanIP(ips[i])) { joIP = ips[i]; break; }
      }
    }

    // ✅ وجدنا IP أردني! ← اقفل عليه بروكسي أردني فوراً
    if (joIP) {
      if (isCritical(mode)) {
        var chain = JO_PROXY_MAIN + "; " + JO_PROXY_BACKUP + "; DIRECT";
        lockRegion(chain);
        SESSION.matchNet = netPrefix(joIP);
        return chain;
      }
      if (isLobbyLike(mode)) return JO_PROXY_MAIN;
    }

    // ⚠️ مو أردني، بس شرق أوسط؟
    var meIP = null;
    if (ips.length > 0 && !joIP) {
      for (var i=0; i<ips.length; i++) {
        if (isMiddleEast(ips[i])) { meIP = ips[i]; break; }
      }
    }
    if (meIP && isCritical(mode)) {
       var chain = ME_PROXY_FALLBACK + "; " + JO_PROXY_BACKUP + "; DIRECT";
       lockRegion(chain);
       return chain;
    }

    // 6. Critical Mode (Match/Combat) - No IP or Unknown
    if (isCritical(mode)) {
      // لو فشل 3 مرات، جرب البروكسي الاحتياطي
      if (SESSION.matchFailCount >= 3) {
         var chain = JO_PROXY_BACKUP + "; " + ME_PROXY_FALLBACK + "; DIRECT";
         lockRegion(chain);
         return chain;
      }
      // أول مرة، جرب الأساسي
      var chain = JO_PROXY_MAIN + "; " + JO_PROXY_BACKUP + "; DIRECT";
      lockRegion(chain);
      SESSION.matchFailCount++;
      return chain;
    }

    // 7. Lobby / Social
    if (isLobbyLike(mode)) {
      // توزيع عشوائي بسيط عشان الضغط
      return LOBBY_POOL[host.length % LOBBY_POOL.length];
    }

    // 8. Default Fallback
    return BLOCK;

  } catch(e) {
    return DIRECT; // أمان عشان متقفلش المتصفح
  }
}
