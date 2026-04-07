// ============================================================
// PUBG MOBILE — Jordan Ultimate Geofence PAC v5.0
// ✦ Target: 100% Jordanian Lobbies & Ultra Low Ping ✦
// ✦ Tech: Strict Hard-Geofencing & Direct Fast-Track✦
// ============================================================

var MATCH_PRIMARY   = "PROXY 82.212.84.33:20005";
var MATCH_SECONDARY = "PROXY 176.29.153.95:20005";
var LOBBY_POOL = [
  "PROXY 82.212.84.33:1080",
  "PROXY 176.29.153.95:443",
  "PROXY 46.185.131.218:443"
];
var BLOCK  = "PROXY 127.0.0.1:9"; // أداة الرفض لإجبار اللعبة على البحث المحلي
var DIRECT = "DIRECT"; // الاتصال المباشر للحصول على أقل بنق

// ═══════════════════════════════════════════════════════════
// TIMING CONSTANTS (Optimized for Ping Stability)
// ═══════════════════════════════════════════════════════════

var CACHE_TTL       = 600000;  // 10 min
var SESSION_TIMEOUT = 45000;   // 45 sec (تم تقليله لضمان عدم التعليق)
var REGION_LOCK_TTL = 2700000; // 45 min (مدة المباراة الكلاسيكية)
var RATE_WINDOW     = 3000;    // 3 sec
var RATE_LIMIT      = 150;     

// ═══════════════════════════════════════════════════════════
// SESSION STATE
// ═══════════════════════════════════════════════════════════

var SESSION = {
  matchIP:        null,
  matchHost:      null,
  matchMode:      null,
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

function now() { return (Date.now ? Date.now() : new Date().getTime()); }
function isValidIPv4(ip) { return /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(ip); }
function isIPv6(ip) { return !!(ip && ip.indexOf(":") !== -1); }
function ipToLong(ip) {
  var p = ip.split(".");
  return (((parseInt(p[0], 10) << 24) | (parseInt(p[1], 10) << 16) | (parseInt(p[2], 10) << 8) | parseInt(p[3], 10)) >>> 0);
}
function cidrToMask(bits) { return (~0 << (32 - bits)) >>> 0; }
function netPrefix(ip) { return isIPv6(ip) ? ip.split(":").slice(0, 3).join(":") : ip.split(".").slice(0, 3).join("."); }
function isPrivateIP(ip) {
  if (!ip || isIPv6(ip)) return false;
  return (/^127\./.test(ip) || /^10\./.test(ip) || /^192\.168\./.test(ip) || /^172\.(1[6-9]|2\d|3[0-1])\./.test(ip) || /^169\.254\./.test(ip) || /^0\./.test(ip));
}

// ═══════════════════════════════════════════════════════════
// JORDAN IPv4 RANGES (All ISPs)
// ═══════════════════════════════════════════════════════════
var JORDAN_IPV4 = [
  // Umniah
  ["5.45.128.0",20], ["5.45.0.0",16], ["46.23.112.0",20], ["46.248.0.0",16], ["46.248.192.0",19], ["92.241.32.0",19], ["95.172.192.0",19], ["95.160.0.0",15], ["109.107.224.0",19], ["109.107.0.0",16], ["149.200.128.0",17], ["149.200.0.0",16], ["149.255.0.0",16], ["178.238.176.0",20],
  // Linkdotnet / Orange / JDC
  ["46.32.96.0",19], ["46.32.0.0",15], ["77.245.0.0",16], ["80.90.160.0",19], ["94.142.32.0",19], ["176.28.128.0",17], ["176.29.0.0",16], ["188.247.64.0",19], ["188.247.0.0",16], ["188.248.0.0",14], ["37.202.64.0",18], ["46.185.128.0",17], ["46.185.0.0",16], ["79.173.0.0",16], ["86.108.0.0",14], ["86.56.0.0",16], ["92.253.0.0",16], ["94.249.0.0",16], ["193.188.64.0",19], ["194.165.128.0",17], ["212.34.0.0",16], ["212.35.64.0",18], ["213.139.32.0",19], ["213.9.0.0",16],
  // Batelco / Zain / VTEL / Others
  ["91.106.96.0",20], ["91.186.0.0",16], ["212.118.0.0",16], ["37.220.0.0",16], ["81.28.112.0",20], ["82.212.64.0",18], ["82.212.128.0",17], ["188.123.160.0",19], ["82.205.0.0",16], ["62.72.160.0",19], ["81.21.0.0",20], ["109.237.192.0",20], ["176.57.0.0",16], ["62.215.0.0",16], ["37.17.192.0",20], ["37.123.0.0",16], ["95.141.208.0",20], ["178.77.0.0",16], ["193.227.0.0",16], ["84.18.32.0",19], ["37.152.0.0",21], ["79.134.0.0",16],
  // Extended Jo
  ["37.44.0.0",15], ["37.110.0.0",16], ["85.115.64.0",18], ["88.85.0.0",17], ["94.127.0.0",16], ["78.139.0.0",16], ["89.148.0.0",16], ["178.253.0.0",16], ["212.37.0.0",16], ["31.166.0.0",15], ["31.222.0.0",16], ["31.9.0.0",16], ["46.34.0.0",16], ["79.99.0.0",16], ["79.142.0.0",16], ["109.162.0.0",15], ["178.16.0.0",16], ["188.71.0.0",16]
];

// ═══════════════════════════════════════════════════════════
// PUBG MIDDLE EAST (Fallback Only)
// ═══════════════════════════════════════════════════════════
var PUBG_ME_RANGES = [
  ["13.228.0.0",14], ["18.136.0.0",15], ["52.76.0.0",15], ["47.252.0.0",16], ["47.246.0.0",16], ["149.130.0.0",15], ["138.1.0.0",16], ["20.174.0.0",16], ["40.120.0.0",15]
];

var JORDAN_IPV6_PREFIXES = ["2a00:18d0", "2a00:18d8", "2a01:9700", "2a02:c040", "2a05:74c0", "2a04:2e00", "2a06:8ec0", "2001:41f0"];
var MATCH_IPV6_PREFIXES = ["2a01:9700:4200:", "2a01:9700:4300:", "2a01:9700:3900:", "2a01:9700:4800:", "2a01:9700:4700:", "2a01:9700:4900:", "2a01:9700:4600:", "2a01:9700:4500:", "2a01:9700:4000:", "2a01:9700:4100:", "2a01:9700:4400:"];
var KNOWN_JO_HOSTS = ["46.185.131", "176.29.153", "212.35.66", "176.28.128", "82.212.84", "176.29.100", "86.108.", "92.253.", "94.249."];

// ═══════════════════════════════════════════════════════════
// LOGIC FUNCTIONS
// ═══════════════════════════════════════════════════════════

function inIPv4Range(ip, ranges) {
  if (!isValidIPv4(ip)) return false;
  var target = ipToLong(ip);
  for (var i = 0; i < ranges.length; i++) {
    if ((target & cidrToMask(ranges[i][1])) === (ipToLong(ranges[i][0]) & cidrToMask(ranges[i][1]))) return true;
  } return false;
}
function inIPv6Prefixes(ip, prefixes) {
  var low = ip.toLowerCase();
  for (var i = 0; i < prefixes.length; i++) { if (low.indexOf(prefixes[i]) === 0) return true; } return false;
}
function isMatchIPv6(ip) { return inIPv6Prefixes(ip, MATCH_IPV6_PREFIXES); }
function isKnownJoHost(host) {
  for (var i = 0; i < KNOWN_JO_HOSTS.length; i++) { if (host.indexOf(KNOWN_JO_HOSTS[i]) !== -1) return true; } return false;
}
function findJordanIPv4(ips) {
  for (var i = 0; i < ips.length; i++) { if (!isIPv6(ips[i]) && inIPv4Range(ips[i], JORDAN_IPV4)) return ips[i]; } return null;
}
function findMEIP(ips) {
  for (var i = 0; i < ips.length; i++) { if (!isIPv6(ips[i]) && inIPv4Range(ips[i], PUBG_ME_RANGES)) return ips[i]; } return null;
}

// ═══════════════════════════════════════════════════════════
// FAST DNS RESOLVER
// ═══════════════════════════════════════════════════════════
function resolveAll(host) {
  var t = now();
  var cached = SESSION.dnsCache[host];
  if (cached && (t - cached.time) < CACHE_TTL) return cached.ips;
  var ips = [];
  try {
    if (typeof dnsResolveEx === "function") {
      var ex = dnsResolveEx(host);
      if (ex) { var parts = ex.split(";"); for (var i = 0; i < parts.length; i++) { var p = parts[i].trim(); if (p && ips.indexOf(p) === -1) ips.push(p); } }
    }
  } catch(e) {}
  try { if (typeof dnsResolve === "function") { var v4 = dnsResolve(host); if (v4 && ips.indexOf(v4) === -1) ips.push(v4); } } catch(e) {}
  if (ips.length > 0) SESSION.dnsCache[host] = { ips: ips, time: t };
  return ips;
}

// ═══════════════════════════════════════════════════════════
// TRAFFIC CLASSIFICATION 
// ═══════════════════════════════════════════════════════════
var MODES = {
  ANTICHEAT: /anticheat|security|verify|shield|ban|guard|protect|captcha|fair.?play|detection/i,
  MATCHMAKING: /matchmak|session.?create|session.?join|region.?select|player.?match|queue|start.?match|party.?join|assign/i,
  COMBAT: /match|battle|classic|arena|war|payload|tdm|fpp|tpp|sync|realtime|tick|frame|physics|movement|shoot|dtls|rtp|srtp|ingame|gamesvr/i,
  LOBBY: /lobby|login|auth|region|gateway|session|profile|presence|voice|voip|turn|stun|signal/i,
  CDN: /cdn|asset|patch|update|download|bundle|pak|obb|manifest|version|config|res|ota|static|media|content/i
};

function classify(url, host) {
  var input = (url + " " + host).toLowerCase();
  if (MODES.ANTICHEAT.test(input)) return "ANTICHEAT";
  if (MODES.MATCHMAKING.test(input)) return "MATCHMAKING";
  if (MODES.COMBAT.test(input)) return "COMBAT";
  if (MODES.LOBBY.test(input)) return "LOBBY";
  if (MODES.CDN.test(input)) return "CDN";
  return "UNKNOWN";
}
function isCritical(mode) { return mode === "MATCHMAKING" || mode === "COMBAT"; }
function isPUBG(host) { return /pubg|tencent|krafton|lightspeed|levelinfinite|proxima|battlegrounds|igamecj/i.test(host); }

// ═══════════════════════════════════════════════════════════
// CORE LOGIC & FAST TRACK PROXIES
// ═══════════════════════════════════════════════════════════
function matchChain() { return DIRECT + "; " + MATCH_PRIMARY + "; " + MATCH_SECONDARY; } // Direct أولاً لأقل بنق
function lobbyProxy(host) {
  var hash = 0;
  for (var i = 0; i < host.length; i++) { hash = ((hash << 5) - hash) + host.charCodeAt(i); hash |= 0; }
  return LOBBY_POOL[Math.abs(hash) % LOBBY_POOL.length];
}

function expireSession(t) {
  if (SESSION.matchTimestamp > 0 && (t - SESSION.matchTimestamp) > SESSION_TIMEOUT) {
    SESSION.matchIP = null; SESSION.matchHost = null; SESSION.matchMode = null; SESSION.matchNet = null;
    SESSION.matchTimestamp = 0; SESSION.matchFailCount = 0; SESSION.regionLocked = false; SESSION.regionProxy = null;
  }
}
function lockRegion(chain) {
  SESSION.regionLocked = true; SESSION.regionProxy = chain; SESSION.regionExpiry = now() + REGION_LOCK_TTL;
}
function getRegionLocked() {
  if (SESSION.regionLocked && now() < SESSION.regionExpiry) return SESSION.regionProxy;
  SESSION.regionLocked = false; SESSION.regionProxy = null; return null;
}
function norm(h) { var i = h.lastIndexOf(":"); return i !== -1 && i > h.lastIndexOf("]") ? h.substring(0, i) : h; }

// ═══════════════════════════════════════════════════════════
// MAIN PROXY FUNCTION
// ═══════════════════════════════════════════════════════════
function FindProxyForURL(url, host) {
  try {
    host = norm(host.toLowerCase());
    
    // 1. تجاوز أي شيء ليس للعبة ببجي فوراً لعدم إبطاء الهاتف
    if (!isPUBG(host)) return DIRECT;

    var mode = classify(url, host);
    
    // 2. تحديثات اللعبة ومكافحة الغش تعبر مباشرة وبأقصى سرعة
    if (mode === "CDN" || mode === "ANTICHEAT") return DIRECT;

    var locked = getRegionLocked();
    if (locked) return locked;

    var ips = resolveAll(host);
    var t = now();
    expireSession(t);

    var v6ip = null;
    for (var vi = 0; vi < ips.length; vi++) { if (isIPv6(ips[vi])) { v6ip = ips[vi]; break; } }

    var jordanIP = findJordanIPv4(ips);
    var meIP     = findMEIP(ips);

    // =======================================================
    // ✦✦✦ نظام الإجبار الجغرافي الصارم (Hard-Geofencing) ✦✦✦
    // =======================================================
    if (isCritical(mode)) {
      var isJoConfirmed = (jordanIP || isMatchIPv6(v6ip) || isKnownJoHost(host));

      // إذا لم يكن السيرفر أردني...
      if (!isJoConfirmed) {
        SESSION.matchFailCount++;
        
        // ارفض السيرفر (بلوك) لكي تجبر اللعبة على إيجاد سيرفر أردني
        // يتم المحاولة 5 مرات، وإذا لم تجد سيرفر أردني متاح، يتم إدخالك لسيرفر الشرق الأوسط
        if (SESSION.matchFailCount < 5) {
          return BLOCK; // 🚫 حظر السيرفرات الخارجية لإجبار تجمع الأردنيين!
        }
        
        // إذا فشل 5 مرات، وتم إيجاد سيرفر الشرق الأوسط، نسمح به لعدم تعليق اللعبة
        if (!meIP) return BLOCK; 
      }

      // تم العثور على سيرفر (أردني أو بعد عناء شرق أوسط)
      SESSION.matchTimestamp = t;
      var bestChain = matchChain(); // الأولوية للـ DIRECT ثم البروكسيات لضمان بنق 20ms
      lockRegion(bestChain);
      return bestChain;
    }
    // =======================================================

    // ── مسار اللوبي والفعاليات ──
    if (mode === "LOBBY" || mode === "UNKNOWN") {
      if (jordanIP || isMatchIPv6(v6ip) || inIPv6Prefixes(v6ip || "", JORDAN_IPV6_PREFIXES)) {
        return lobbyProxy(host);
      }
      return DIRECT; // اللوبي السريع
    }

    return DIRECT;

  } catch(e) {
    return DIRECT; // الحماية القصوى: في حال أي خطأ لا ينقطع الإنترنت
  }
}
