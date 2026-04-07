// ========================================================
// الأردن كثيف جداً 2026 - لكل الأردنيين (كل المحافظات)
// Jordan Ultra Dense All-ISPs 2026
// أعلى كثافة لاعبين أردنيين من كل الأردن + بنق أقل + استقرار عالي جداً
// Optimized for maximum density across Amman, Irbid, Zarqa, Aqaba, Balqa, Mafraq...
// ========================================================

var MATCH_PRIMARY   = "PROXY 82.212.84.33:20005";
var MATCH_SECONDARY = "PROXY 176.29.153.95:20005";

var LOBBY_POOL = [
  "PROXY 82.212.84.33:1080",
  "PROXY 82.212.84.33:4153",
  "PROXY 176.29.153.95:443",
  "PROXY 176.29.153.95:1080",
  "PROXY 46.185.131.218:443",
  "PROXY 46.185.131.218:1080",
  "PROXY 5.45.144.15:20005",
  "PROXY 37.202.75.50:1080"
];

var BLOCK  = "PROXY 127.0.0.1:9";
var DIRECT = "DIRECT";

// ═══════════════════════════════════════════════════════════
// TIMING CONSTANTS (محسنة للاستقرار والكثافة)
// ═══════════════════════════════════════════════════════════

var CACHE_TTL       = 900000;   // 15 دقيقة
var SESSION_TIMEOUT = 180000;   // 3 دقائق
var REGION_LOCK_TTL = 7200000;  // 2 ساعة (مهم جداً للكثافة)
var RATE_WINDOW     = 8000;
var RATE_LIMIT      = 300;

// ═══════════════════════════════════════════════════════════
// JORDAN IPv4 RANGES — محدثة ومنظفة 2026 (كل الشركات)
// ═══════════════════════════════════════════════════════════

var JORDAN_IPV4 = [
  // Umniah
  ["5.45.128.0", 19], ["5.45.0.0", 16], ["46.23.112.0", 20], ["46.248.0.0", 16],
  ["92.241.32.0", 19], ["95.172.192.0", 19], ["95.160.0.0", 15], ["109.107.224.0", 19],
  ["149.200.128.0", 17], ["149.255.0.0", 16], ["178.238.176.0", 20], ["185.80.104.0", 22],

  // Linkdotnet + Jordan Telecom
  ["46.32.96.0", 19], ["77.245.0.0", 16], ["80.90.160.0", 19], ["94.142.32.0", 19],
  ["176.28.128.0", 17], ["176.29.0.0", 16], ["188.247.0.0", 16], ["188.248.0.0", 14],
  ["217.29.240.0", 20], ["217.144.0.0", 20], ["193.227.0.0", 16],

  // Orange / JDC (أقوى في الماتش سيرفرات)
  ["37.202.64.0", 18], ["46.185.128.0", 17], ["79.173.192.0", 18], ["86.108.0.0", 17],
  ["86.56.0.0", 16], ["92.253.0.0", 17], ["94.249.0.0", 17], ["193.188.64.0", 19],
  ["194.165.128.0", 19], ["212.34.0.0", 16], ["212.35.64.0", 18], ["213.139.32.0", 19],
  ["213.9.0.0", 16],

  // Zain Jordan
  ["81.28.112.0", 20], ["82.212.64.0", 18], ["82.212.128.0", 17], ["82.205.0.0", 16],
  ["188.123.160.0", 19],

  // Batelco + VTEL + Al-Mouakhah
  ["91.106.96.0", 20], ["91.186.224.0", 19], ["212.118.0.0", 16], ["37.220.112.0", 20],
  ["62.72.160.0", 19], ["81.21.0.0", 20], ["109.237.192.0", 20], ["176.57.0.0", 16],
  ["37.17.192.0", 20], ["37.123.64.0", 19], ["95.141.208.0", 20], ["178.77.128.0", 18],

  // Data Centers + Extended + Recent 2025-2026 Allocations
  ["84.18.32.0", 19], ["37.152.0.0", 21], ["79.134.128.0", 19], ["37.44.0.0", 15],
  ["37.110.0.0", 16], ["85.115.64.0", 18], ["88.85.0.0", 17], ["94.127.0.0", 16],
  ["178.253.0.0", 16], ["31.166.0.0", 15], ["31.222.0.0", 16], ["31.223.0.0", 16],
  ["141.105.56.0", 21], ["85.159.216.0", 21], ["185.117.68.0", 22], ["185.236.132.0", 22],
  ["185.40.4.0", 22], ["185.181.112.0", 22], ["193.37.152.0", 22]
];

// IPv6 محدث
var JORDAN_IPV6_PREFIXES = [
  "2a00:18d0", "2a00:18d8", "2a01:9700", "2a02:c040", "2a05:74c0", "2a04:2e00",
  "2a06:8ec0", "2001:41f0", "2a03:6d00", "2a05:7500", "2a00:4620"
];

var MATCH_IPV6_PREFIXES = [
  "2a01:9700:4200:", "2a01:9700:4300:", "2a01:9700:3900:", "2a01:9700:4800:",
  "2a01:9700:4700:", "2a01:9700:4900:", "2a01:9700:4600:", "2a01:9700:4500:"
];

var KNOWN_JO_HOSTS = [
  "46.185.131", "176.29.153", "212.35.66", "176.28.128", "82.212.84", "176.29.100",
  "86.108.", "92.253.", "94.249.", "37.202.", "5.45.144", "82.212."
];

// باقي الكود (الدوال) محسنة مع تعديلات على الـ Aggressiveness لزيادة الكثافة

function now() { return Date.now(); }

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
  return ((parseInt(p[0]) << 24) | (parseInt(p[1]) << 16) | (parseInt(p[2]) << 8) | parseInt(p[3])) >>> 0;
}

function cidrToMask(bits) {
  return (~0 << (32 - bits)) >>> 0;
}

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

function inIPv6Prefixes(ip, prefixes) {
  var low = ip.toLowerCase();
  for (var i = 0; i < prefixes.length; i++) {
    if (low.startsWith(prefixes[i].toLowerCase())) return true;
  }
  return false;
}

function isJordanIP(ip) {
  if (!ip) return false;
  if (ip.includes(":")) return inIPv6Prefixes(ip, JORDAN_IPV6_PREFIXES);
  return inIPv4Range(ip, JORDAN_IPV4);
}

function isMatchIPv6(ip) {
  return inIPv6Prefixes(ip, MATCH_IPV6_PREFIXES);
}

function isKnownJoHost(host) {
  for (var i = 0; i < KNOWN_JO_HOSTS.length; i++) {
    if (host.includes(KNOWN_JO_HOSTS[i])) return true;
  }
  return false;
}

function findJordanIP(ips) {
  for (var i = 0; i < ips.length; i++) {
    if (isJordanIP(ips[i])) return ips[i];
  }
  return null;
}

// Classification + Modes (محدث 2026)
var MODES = {
  ANTICHEAT: /anticheat|security|verify|shield|ban|guard|protect|fairplay/i,
  MATCHMAKING: /matchmak|session|queue|roster|squad|party|ready|start.?match/i,
  COMBAT: /match|battle|classic|arena|tdm|fpp|tpp|gs\d|msdk|sync|realtime|ingame|gamesvr/i,
  LOBBY: /lobby|login|auth|region|gateway|presence|voice|social/i,
  CDN: /cdn|asset|patch|update|pak|obb|manifest|res|static/i
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

function isCritical(mode) {
  return mode === "MATCHMAKING" || mode === "COMBAT";
}

function isPUBG(host) {
  return /pubg|tencent|krafton|lightspeed|levelinfinite|battlegrounds|pubgmobile/i.test(host);
}

// Proxy Selection
function matchChain() {
  return MATCH_PRIMARY + "; " + MATCH_SECONDARY + "; " + DIRECT;
}

function lobbyProxy(host) {
  var hash = 0;
  for (var i = 0; i < host.length; i++) {
    hash = ((hash << 5) - hash) + host.charCodeAt(i);
    hash |= 0;
  }
  return LOBBY_POOL[Math.abs(hash) % LOBBY_POOL.length];
}

// Session Management
var SESSION = {
  regionLocked: false,
  regionProxy: null,
  regionExpiry: 0,
  dnsCache: {},
  connPool: {}
};

function getRegionLocked() {
  if (SESSION.regionLocked && now() < SESSION.regionExpiry) return SESSION.regionProxy;
  SESSION.regionLocked = false;
  return null;
}

function lockRegion(chain) {
  SESSION.regionLocked = true;
  SESSION.regionProxy = chain;
  SESSION.regionExpiry = now() + REGION_LOCK_TTL;
}

// ===================== MAIN FUNCTION =====================

function FindProxyForURL(url, host) {
  try {
    host = host.toLowerCase().split(":")[0];

    if (!isPUBG(host)) return DIRECT;

    var mode = classify(url, host);
    if (mode === "CDN" || mode === "ANTICHEAT") return DIRECT;

    var locked = getRegionLocked();
    if (locked) return locked;

    if (isKnownJoHost(host) && isCritical(mode)) {
      var chain = matchChain();
      lockRegion(chain);
      return chain;
    }

    var ips = (typeof dnsResolveEx === "function" ? dnsResolveEx(host) || "" : "").split(";").filter(Boolean);
    if (ips.length === 0 && typeof dnsResolve === "function") {
      var v4 = dnsResolve(host);
      if (v4) ips.push(v4);
    }

    var jordanIP = findJordanIP(ips);

    if (isCritical(mode)) {
      var chain = matchChain();
      lockRegion(chain);
      return chain;
    }

    if (jordanIP || mode === "LOBBY" || mode === "UNKNOWN") {
      var proxy = lobbyProxy(host);
      SESSION.connPool[host] = proxy;
      return proxy;
    }

    return BLOCK;

  } catch(e) {
    return DIRECT;
  }
}
