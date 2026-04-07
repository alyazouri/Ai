// ============================================================
// PUBG MOBILE — Jordan Supreme PAC v5.0
// ✦ Enhanced for All ISPs: Zain | Orange | Umniah | Batelco | JT ✦
// ✦ Ultra-Dense Jordanian Lobbies | Fail-Safe Multi-ISP Routing ✦
// ✦ Smart ISP Detection | Persistent Sessions | Zero-Leak Policy ✦
// ============================================================

// ═══════════════════════════════════════════════════════════
// PROXY POOL — Multi-ISP Distributed Infrastructure
// Primary: Orange JO | Secondary: Zain JO | Tertiary: Umniah
// Lobby Pool: Mixed ISPs for Load Distribution
// ═══════════════════════════════════════════════════════════

// **Match Proxies** (Low-latency, high-priority)
var MATCH_PRIMARY   = "PROXY 82.212.84.33:20005";      // Orange JO - Amman
var MATCH_SECONDARY = "PROXY 176.29.153.95:20005";      // Zain JO - Amman
var MATCH_TERTIARY  = "PROXY 46.185.131.218:20005";    // Umniah - Amman

// **Lobby Pool** (Distributed across all ISPs)
var LOBBY_POOL = [
  "PROXY 82.212.84.33:1080",      // Orange JO
  "PROXY 176.29.153.95:443",      // Zain JO
  "PROXY 46.185.131.218:443",     // Umniah
  "PROXY 188.247.64.33:1080",     // Linkdotnet - Irbid
  "PROXY 86.108.16.55:1080",      // Orange JO - Zarqa
  "PROXY 92.253.12.77:1080",      // Zain JO - Aqaba
  "PROXY 95.172.192.44:1080",     // Umniah - Balqa
  "PROXY 212.35.66.99:1080",      // Orange JO - Madaba
  "PROXY 79.173.192.33:1080"      // Batelco - Amman
];

// **Security & Fallback**
var BLOCK  = "PROXY 127.0.0.1:9";
var DIRECT = "DIRECT";

// ═══════════════════════════════════════════════════════════
// TIMING CONSTANTS — Optimized for Stability
// ═══════════════════════════════════════════════════════════

var CACHE_TTL       = 900000;   // 15 min — Extended DNS cache
var SESSION_TIMEOUT = 120000;   // 120 sec — Longer match session
var REGION_LOCK_TTL = 7200000;  // 2 hrs — Strong region lock
var RATE_WINDOW     = 3000;     // 3 sec — Aggressive rate limiting
var RATE_LIMIT      = 150;      // Max requests per window
var ISP_LOCK_TTL    = 1800000;  // 30 min — ISP persistence

// ═══════════════════════════════════════════════════════════
// SESSION STATE — Enhanced Tracking
// ═══════════════════════════════════════════════════════════

var SESSION = {
  matchIP:        null,
  matchHost:      null,
  matchMode:      null,
  matchNet:       null,
  matchTimestamp: 0,
  matchFailCount: 0,
  stickyProxy:    null,
  stickyExpiry:   0,
  regionLocked:   false,
  regionProxy:    null,
  regionExpiry:   0,
  dnsCache:       {},
  rateTracker:    {},
  connPool:       {},
  ispDetected:    null,
  ispProxy:       null,
  ispExpiry:      0
};

// ═══════════════════════════════════════════════════════════
// IP & ISP DETECTION — Comprehensive Jordanian Coverage
// ═══════════════════════════════════════════════════════════

function now() { return Date.now(); }

function isValidIPv4(ip) {
  if (!ip || typeof ip !== "string") return false;
  var parts = ip.split(".");
  if (parts.length !== 4) return false;
  for (var i = 0; i < 4; i++) {
    var n = parseInt(parts[i], 10);
    if (isNaN(n) || n < 0 || n > 255) return false;
  }
  return true;
}

function isIPv6(ip) {
  return !!(ip && ip.indexOf(":") !== -1);
}

function ipToLong(ip) {
  var p = ip.split(".");
  return ((parseInt(p[0]) << 24) | (parseInt(p[1]) << 16) | 
          (parseInt(p[2]) << 8)  | parseInt(p[3])) >>> 0;
}

function cidrToMask(bits) {
  return (~0 << (32 - bits)) >>> 0;
}

function netPrefix(ip) {
  if (isIPv6(ip)) return ip.split(":").slice(0, 4).join(":");
  return ip.split(".").slice(0, 3).join(".");
}

function isPrivateIP(ip) {
  if (!ip || isIPv6(ip)) return false;
  return /^(127|10|192\.168|172\.(1[6-9]|2\d|3[01])|169\.254|0)\./.test(ip);
}

// **Detect ISP from IP for optimal routing**
function detectISP(ip) {
  if (!isValidIPv4(ip)) return "UNKNOWN";
  var longIP = ipToLong(ip);
  
  // Orange JO ranges
  if (inIPv4Range(ip, [["37.202.64.0",18],["46.185.0.0",16],["79.173.0.0",16],["86.108.0.0",14],["92.253.0.0",16],["94.249.0.0",16],["82.212.64.0",18]])) return "ORANGE";
  
  // Zain JO ranges
  if (inIPv4Range(ip, [["81.90.144.0",20],["188.123.160.0",19],["82.205.0.0",16]])) return "ZAIN";
  
  // Umniah ranges
  if (inIPv4Range(ip, [["5.45.0.0",16],["46.23.112.0",20],["46.248.0.0",16],["92.241.32.0",19],["95.160.0.0",15],["109.107.0.0",16],["188.248.0.0",14]])) return "UMNIAH";
  
  // Batelco
  if (inIPv4Range(ip, [["91.186.0.0",16],["212.118.0.0",16],["37.220.0.0",16]])) return "BATELCO";
  
  // JT
  if (inIPv4Range(ip, [["78.139.0.0",16],["89.148.0.0",16],["213.186.160.0",19]])) return "JORDANTEL";
  
  return "UNKNOWN";
}

// ═══════════════════════════════════════════════════════════
// JORDAN IPv4 RANGES — Complete ISP Coverage
// ═══════════════════════════════════════════════════════════

var JORDAN_IPV4 = [
  // Orange JO (JDC) - Primary
  ["37.202.64.0",18], ["46.185.0.0",16], ["79.173.0.0",16], ["86.108.0.0",14],
  ["92.253.0.0",16], ["94.249.0.0",16], ["193.188.64.0",19], ["194.165.128.0",17],
  ["82.212.64.0",18], ["212.35.0.0",16], ["213.139.0.0",16], ["213.9.0.0",16],
  
  // Zain JO - Secondary
  ["81.90.144.0",20], ["188.123.160.0",19], ["82.205.0.0",16],
  
  // Umniah - Tertiary
  ["5.45.0.0",16], ["46.23.112.0",20], ["46.248.0.0",16], ["92.241.32.0",19],
  ["95.160.0.0",15], ["109.107.0.0",16], ["188.248.0.0",14],
  
  // Linkdotnet
  ["46.32.96.0",19], ["77.245.0.0",16], ["80.90.160.0",19], ["94.142.32.0",19],
  ["176.29.0.0",16], ["188.247.64.0",19],
  
  // Batelco
  ["91.186.0.0",16], ["212.118.0.0",16], ["37.220.0.0",16],
  
  // Jordan Telecom (JT)
  ["78.139.0.0",16], ["89.148.0.0",16], ["217.144.0.0",20],
  ["193.227.0.0",16], ["213.186.160.0",19],
  
  // VTEL
  ["62.72.160.0",19], ["81.21.0.0",20], ["109.237.192.0",20],
  ["176.57.0.0",16], ["62.215.0.0",16],
  
  // Al-Mouakhah
  ["37.123.0.0",16], ["95.141.208.0",20], ["178.77.0.0",16],
  
  // Data Centers & Hosting
  ["84.18.32.0",19], ["79.134.0.0",16], ["37.44.0.0",15],
  
  // Extended Ranges
  ["85.115.0.0",17], ["88.85.0.0",16], ["94.127.0.0",16],
  ["178.16.0.0",16], ["188.71.0.0",16], ["5.0.0.0",16],
  ["31.9.0.0",16], ["46.34.0.0",16], ["79.99.0.0",16],
  ["109.162.0.0",15], ["156.197.0.0",16], ["160.177.0.0",16],
  ["185.0.0.0",22], ["195.74.128.0",18], ["196.29.0.0",16]
];

// ═══════════════════════════════════════════════════════════
// PUBG MIDDLE EAST RANGES (For Reference)
// ═══════════════════════════════════════════════════════════

var PUBG_ME_RANGES = [
  ["13.228.0.0",14], ["18.136.0.0",15], ["47.252.0.0",16],
  ["47.246.0.0",16], ["52.76.0.0",15], ["138.1.0.0",16],
  ["149.130.0.0",15], ["20.174.0.0",16], ["40.120.0.0",15]
];

// ═══════════════════════════════════════════════════════════
// JORDAN IPv6 PREFIXES — Full ISP Support
// ═══════════════════════════════════════════════════════════

var JORDAN_IPV6_PREFIXES = [
  "2a00:18d0", "2a00:18d8",  // Zain JO
  "2a01:9700",               // Orange JO (all sub-ranges)
  "2a02:c040",               // Umniah
  "2a04:2e00",               // Jordan Telecom
  "2a05:74c0", "2a06:8ec0",
  "2001:41f0"                // JT IPv6
];

// **Orange JO Match Server IPv6** (Most Specific)
var MATCH_IPV6_PREFIXES = [
  "2a01:9700:4200:", "2a01:9700:4300:", "2a01:9700:3900:",
  "2a01:9700:4800:", "2a01:9700:4700:", "2a01:9700:4900:",
  "2a01:9700:4600:", "2a01:9700:4500:", "2a01:9700:4000:",
  "2a01:9700:4100:", "2a01:9700:4400:"
];

// ═══════════════════════════════════════════════════════════
// IP CLASSIFICATION FUNCTIONS
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

function inIPv6Prefixes(ip, prefixes) {
  var low = ip.toLowerCase();
  for (var i = 0; i < prefixes.length; i++) {
    if (low.indexOf(prefixes[i]) === 0) return true;
  }
  return false;
}

function isJordanIP(ip) {
  if (!ip) return false;
  if (isIPv6(ip)) return inIPv6Prefixes(ip, JORDAN_IPV6_PREFIXES);
  return inIPv4Range(ip, JORDAN_IPV4);
}

function isMatchIPv6(ip) {
  return inIPv6Prefixes(ip, MATCH_IPV6_PREFIXES);
}

function isMiddleEast(ip) {
  return !isIPv6(ip) && inIPv4Range(ip, PUBG_ME_RANGES);
}

// ═══════════════════════════════════════════════════════════
// DNS RESOLUTION — Multi-Method with Extended Cache
// ═══════════════════════════════════════════════════════════

function resolveAll(host) {
  var t = now();
  var cached = SESSION.dnsCache[host];
  if (cached && (t - cached.time) < CACHE_TTL) return cached.ips;

  var ips = [];
  try {
    if (typeof dnsResolveEx === "function") {
      var ex = dnsResolveEx(host);
      if (ex) ips = ex.split(";").filter(function(p) { return p.trim(); });
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
// RATE LIMITER — Aggressive Protection
// ═══════════════════════════════════════════════════════════

function checkRate(host) {
  var t = now();
  var arr = SESSION.rateTracker[host] || [];
  arr = arr.filter(function(time) { return t - time < RATE_WINDOW; });
  arr.push(t);
  SESSION.rateTracker[host] = arr;
  return arr.length <= RATE_LIMIT;
}

// ═══════════════════════════════════════════════════════════
// TRAFFIC CLASSIFICATION — Enhanced for All Modes
// ═══════════════════════════════════════════════════════════

var MODES = {
  ANTICHEAT:  /anticheat|security|verify|shield|ban|guard|protect|captcha|challenge|fair.?play|detection|report/i,
  MATCHMAKING:/matchmak|session.?create|session.?join|region.?select|player.?match|quickmatch|queue|ready|start.?match|spawn.?island|party.?join|roster|squad.?fill|pair|assign|recruit|dispatch|lobby.?create/i,
  RANKED:     /ranked|rank|tier|points?|rating|mmr|conqueror|ace|crown|diamond|platinum|gold|silver|bronze|leaderboard|season.?rank|classic.?season|rank.?push|competitive/i,
  UNRANKED:   /unranked|casual|normal|non.?ranked|fun.?match|event.?mode|arcade|training|practice|vs.?ai/i,
  COMBAT:     /match|battle|classic|arena|war|payload|zombie|metro|tdm|fpp|tpp|domination|assault|gun.?game|infect|relay|gs\d|msdk|msf|msfp|sync|realtime|tick|frame|physics|movement|shoot|fire|hit|damage|dtls|rtp|srtp|ingame|gamesvr|playzone|red.?zone/i,
  LOBBY:      /lobby|login|auth|region|gateway|session|profile|presence|voice|voip|turn|stun|signal|handshake|ping|heartbeat/i,
  INVENTORY:  /inventory|warehouse|vault|backpack|loadout|collection|showroom|outfit|wardrobe|gun.?skin|finish|material|item.?storage|customize/i,
  STORE:      /store|shop|\buc\b|\bag\b|crate|spin|draw|secret.?stash|mythic.?forge|royale.?pass|premium.?crate|redeem|bundle|coupon|purchase|payment|transaction/i,
  EVENTS:     /event|anniversary|card.?set|reward|mission|prize.?path|jujutsu|gojo|sukuna|ugc|world.?of.?wonder|\bwow\b|creator|map.?editor|wow.?dash|golden.?ticket|collaboration/i,
  SOCIAL:     /friend|invite|squad|party|clan|crew|social|chat|notify|push|broadcast|community|guild|looking.?for.?team|find.?teammate|message|mail/i,
  CDN:        /cdn|asset|patch|update|download|bundle|pak|obb|manifest|version|config|res|ota|static|media|content|akamai|cloudfront|fastly/i
};

function classify(url, host) {
  var input = (url + " " + host).toLowerCase();
  for (var key in MODES) {
    if (MODES[key].test(input)) return key;
  }
  return "UNKNOWN";
}

function isCritical(mode) {
  return mode === "MATCHMAKING" || mode === "RANKED" || mode === "UNRANKED" || mode === "COMBAT";
}

function isLobbyLike(mode) {
  return mode === "LOBBY" || mode === "INVENTORY" || mode === "STORE" || mode === "EVENTS" || mode === "SOCIAL";
}

// ═══════════════════════════════════════════════════════════
// PUBG HOST DETECTION — Comprehensive
// ═══════════════════════════════════════════════════════════

function isPUBG(host) {
  return /pubg|tencent|krafton|lightspeed|levelinfinite|proxima|tencentgames|battlegrounds|pubgmobile|igamecj|vnggames|garena|pubgpartner|pubgesports|pubgstudio|battlegrounds|midasbuy/i.test(host);
}

// ═══════════════════════════════════════════════════════════
// PROXY SELECTION — ISP-Aware & Load Balanced
// ═══════════════════════════════════════════════════════════

// **ISP-optimized match proxy selection**
function matchProxy(clientISP) {
  // If we know client's ISP, prefer same-ISP proxy
  if (clientISP === "ORANGE") return MATCH_PRIMARY;
  if (clientISP === "ZAIN") return MATCH_SECONDARY;
  if (clientISP === "UMNIAH") return MATCH_TERTIARY;
  
  // Fallback to health-based selection
  if (SESSION.matchFailCount >= 5) return MATCH_TERTIARY;
  if (SESSION.matchFailCount >= 3) return MATCH_SECONDARY;
  return MATCH_PRIMARY;
}

// **Enhanced match chain with triple failover**
function matchChain(clientISP) {
  var primary = matchProxy(clientISP);
  var chain = primary + "; " + MATCH_SECONDARY + "; " + MATCH_TERTIARY + "; " + DIRECT;
  return chain;
}

// **Consistent hashing for lobby distribution**
function lobbyProxy(host, clientISP) {
  // Simple hash for distribution
  var hash = 0;
  for (var i = 0; i < host.length; i++) {
    hash = ((hash << 5) - hash + host.charCodeAt(i)) | 0;
  }
  
  // If ISP is known, prefer same-ISP proxies from pool
  var ispPreferred = LOBBY_POOL.filter(function(proxy) {
    if (clientISP === "ORANGE" && proxy.indexOf("82.212.") === 0) return true;
    if (clientISP === "ZAIN" && proxy.indexOf("176.29.") === 0) return true;
    if (clientISP === "UMNIAH" && proxy.indexOf("46.185.") === 0) return true;
    return false;
  });
  
  var pool = (ispPreferred.length > 0) ? ispPreferred : LOBBY_POOL;
  return pool[Math.abs(hash) % pool.length];
}

// ═══════════════════════════════════════════════════════════
// SESSION & REGION LOCK MANAGEMENT
// ═══════════════════════════════════════════════════════════

function expireSession(t) {
  if (SESSION.matchTimestamp > 0 && (t - SESSION.matchTimestamp) > SESSION_TIMEOUT) {
    SESSION.matchIP = null;
    SESSION.matchHost = null;
    SESSION.matchMode = null;
    SESSION.matchNet = null;
    SESSION.matchTimestamp = 0;
    SESSION.matchFailCount = 0;
    SESSION.regionLocked = false;
    SESSION.regionProxy = null;
  }
  
  // Expire ISP lock
  if (SESSION.ispExpiry > 0 && t > SESSION.ispExpiry) {
    SESSION.ispDetected = null;
    SESSION.ispProxy = null;
    SESSION.ispExpiry = 0;
  }
}

function lockRegion(chain) {
  SESSION.regionLocked = true;
  SESSION.regionProxy = chain;
  SESSION.regionExpiry = now() + REGION_LOCK_TTL;
}

function getRegionLocked() {
  if (SESSION.regionLocked && now() < SESSION.regionExpiry) return SESSION.regionProxy;
  SESSION.regionLocked = false;
  SESSION.regionProxy = null;
  return null;
}

function getPooled(host) {
  var e = SESSION.connPool[host];
  if (e && (now() - e.time) < SESSION_TIMEOUT) return e.proxy;
  return null;
}

function setPooled(host, proxy) {
  SESSION.connPool[host] = { proxy: proxy, time: now() };
}

// ═══════════════════════════════════════════════════════════
// MAIN PROXY FUNCTION — Ultra-Dense Jordanian Matchmaking
// ═══════════════════════════════════════════════════════════

function FindProxyForURL(url, host) {
  try {
    host = host.toLowerCase().replace(/:\d+$/, ''); // Normalize host

    // ── 1. Non-PUBG traffic → DIRECT (Zero interference) ──
    if (!isPUBG(host)) return DIRECT;

    // ── 2. Rate limiting → Protect proxies ──
    if (!checkRate(host)) return DIRECT;

    // ── 3. CDN/Patches → DIRECT (Save bandwidth) ──
    var mode = classify(url, host);
    if (mode === "CDN") return DIRECT;

    // ── 4. Anti-cheat → DIRECT (Must reach Tencent directly) ──
    if (mode === "ANTICHEAT") return DIRECT;

    // ── 5. Region lock check ──
    var locked = getRegionLocked();
    if (locked) return locked;

    // ── 6. DNS Resolution ──
    var ips = resolveAll(host);
    var t = now();
    expireSession(t);

    // ── 7. Detect client ISP from first resolved IP ──
    var clientISP = "UNKNOWN";
    if (ips.length > 0) {
      clientISP = detectISP(ips[0]);
      if (clientISP !== "UNKNOWN" && (!SESSION.ispDetected || now() > SESSION.ispExpiry)) {
        SESSION.ispDetected = clientISP;
        SESSION.ispExpiry = t + ISP_LOCK_TTL;
      }
    }
    // Use cached ISP if detection failed
    if (clientISP === "UNKNOWN") clientISP = SESSION.ispDetected || "UNKNOWN";

    // ── 8. IPv6 Path (Orange JO primarily uses IPv6) ──
    var v6ip = null;
    for (var i = 0; i < ips.length; i++) {
      if (isIPv6(ips[i])) { v6ip = ips[i]; break; }
    }

    if (v6ip) {
      // **Critical modes on Orange IPv6 match servers**
      if (isCritical(mode) && isMatchIPv6(v6ip)) {
        SESSION.matchIP = v6ip;
        SESSION.matchHost = host;
        SESSION.matchMode = mode;
        SESSION.matchTimestamp = t;
        SESSION.matchFailCount = 0;
        var v6chain = matchChain(clientISP);
        lockRegion(v6chain);
        return v6chain;
      }
      
      // **Lobby traffic on Jordanian IPv6**
      if (isLobbyLike(mode) && inIPv6Prefixes(v6ip, JORDAN_IPV6_PREFIXES)) {
        var lobby = lobbyProxy(host, clientISP);
        setPooled(host, lobby);
        return lobby;
      }
      
      // **Block non-Jordanian IPv6 in critical modes**
      if (isCritical(mode) && !inIPv6Prefixes(v6ip, JORDAN_IPV6_PREFIXES)) {
        SESSION.matchFailCount++;
        return BLOCK;
      }
    }

    // ── 9. No IPs resolved → Pattern-based fallback ──
    if (!ips || ips.length === 0) {
      if (isCritical(mode)) {
        var fbChain = matchChain(clientISP);
        lockRegion(fbChain);
        return fbChain;
      }
      if (isLobbyLike(mode)) return lobbyProxy(host, clientISP);
      return BLOCK;
    }

    // ── 10. IPv4 Path — Jordanian IP Detection ──
    var jordanIP = null;
    for (var j = 0; j < ips.length; j++) {
      if (!isIPv6(ips[j]) && isJordanIP(ips[j])) { jordanIP = ips[j]; break; }
    }

    // **Ultra-Dense Policy: Only Jordanian IPs allowed for matchmaking**
    if (!jordanIP) {
      // In critical modes, block non-Jordanian IPs to force local matchmaking
      if (isCritical(mode)) {
        SESSION.matchFailCount++;
        return BLOCK;
      }
      // Lobby modes can use ME IPs but prefer Jordanian
      var meIP = null;
      for (var k = 0; k < ips.length; k++) {
        if (!isIPv6(ips[k]) && isMiddleEast(ips[k])) { meIP = ips[k]; break; }
      }
      if (!meIP) return BLOCK; // Block if no ME IP found
      
      // Use lobby proxy for non-Jordanian ME IPs
      var lobbyFallback = lobbyProxy(host, clientISP);
      setPooled(host, lobbyFallback);
      return lobbyFallback;
    }

    // **Validate IP**
    if (isPrivateIP(jordanIP)) return BLOCK;

    // ── 11. Critical/Ranked/Combat Modes ──
    if (isCritical(mode)) {
      var net = netPrefix(jordanIP);

      // **Initialize new match session**
      if (!SESSION.matchNet) {
        SESSION.matchNet = net;
        SESSION.matchHost = host;
        SESSION.matchIP = jordanIP;
        SESSION.matchMode = mode;
        SESSION.matchTimestamp = t;
        SESSION.matchFailCount = 0;
      } 
      // **Validate session consistency**
      else if (host !== SESSION.matchHost && net !== SESSION.matchNet) {
        SESSION.matchFailCount++;
        return BLOCK; // Prevent server hopping
      }

      SESSION.matchTimestamp = t;
      SESSION.matchFailCount = 0;
      
      // **ISP-optimized proxy chain**
      var critProxy = matchProxy(clientISP);
      var critChain = critProxy + "; " + MATCH_SECONDARY + "; " + MATCH_TERTIARY + "; " + DIRECT;
      lockRegion(critChain);
      setPooled(host, critProxy);
      return critChain;
    }

    // ── 12. Matchmaking Mode — Full region lock ──
    if (mode === "MATCHMAKING") {
      var mmChain = matchChain(clientISP);
      setPooled(host, mmChain);
      lockRegion(mmChain);
      return mmChain;
    }

    // ── 13. Lobby/Social/Store — Load balanced ──
    if (isLobbyLike(mode)) {
      var pl = getPooled(host);
      if (pl) return pl;
      var lp = lobbyProxy(host, clientISP);
      setPooled(host, lp);
      return lp;
    }

    // ── 14. Unknown traffic with Jordanian IP ──
    var pu = getPooled(host);
    if (pu) return pu;
    return lobbyProxy(host, clientISP);

  } catch(e) {
    // **Fail-safe: Never break connection**
    return DIRECT;
  }
}
