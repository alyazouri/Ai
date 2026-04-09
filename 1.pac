/* =========================================================
   🏆 JORDAN TOURNAMENT TITANIUM – ULTRA FINAL V2.0
   IP + NET16 + HOST + PORT LOCK | ZERO LAG | FAST LOBBY
   LOWEST PING | NEAR-ZERO DROPS | MATCH STICKY ADVANTAGE
   FIXED RESOLVE | LOBBY/MATCH SEPARATION | GULF BIAS
   ========================================================= */

var IP_CACHE = {};  // 🗄️ IP Resolution Cache for Speed
var LOCKED_CORE = null;  // 🔒 Global Core Lock
var SESSION = {
  matchNet16: null,
  matchPort: null
};

var PROXY_A = "PROXY 46.185.131.218:20001";  // ⚡ Fastest Jordan Bias
var PROXY_B = "PROXY 91.106.109.12:20001";
var PROXY_C = "PROXY 176.29.153.95:20001";

var BLOCK = "PROXY 0.0.0.0:0";  // 🚫 Block

/* ==============================
   🔍 RESOLVE CACHE (LOW PING BOOST)
   ============================== */
function resolve(host) {
  var h = host.toLowerCase();
  if (!IP_CACHE[h]) {
    IP_CACHE[h] = dnsResolve(host) || '';
  }
  return IP_CACHE[h];
}

/* ==============================
   ⚡ ULTRA HASH ENGINE (IMPROVED)
   ============================== */
function ultraHash(str) {
  var h = 2166136261;
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    h ^= c;
    h = (h * 16777619) >>> 0;  // FNV-1a PRIME for better distribution
  }
  return (h >>> 0);
}

/* ==============================
   🇯🇴 JORDAN RANGES (EXPANDED)
   ============================== */
function isJordan(ip) {
  return (
    isInNet(ip, "46.185.128.0", "255.255.0.0") ||
    isInNet(ip, "188.123.0.0", "255.255.0.0") ||
    isInNet(ip, "212.35.0.0", "255.255.0.0") ||
    isInNet(ip, "94.249.0.0", "255.255.0.0") ||
    isInNet(ip, "176.28.0.0", "255.255.0.0") ||
    isInNet(ip, "82.212.0.0", "255.255.0.0") ||
    isInNet(ip, "5.29.192.0", "255.255.192.0") ||  // Added Umniah/Orange
    isInNet(ip, "78.100.0.0", "255.252.0.0")      // Added Zain Jordan
  );
}

/* ==============================
   🇸🇾 SYRIA BLOCK (EXPANDED)
   ============================== */
function isSyria(ip) {
  return (
    isInNet(ip, "5.0.0.0", "255.0.0.0") ||
    isInNet(ip, "31.9.0.0", "255.255.0.0") ||
    isInNet(ip, "37.48.0.0", "255.240.0.0") ||
    isInNet(ip, "82.137.192.0", "255.255.192.0") ||
    isInNet(ip, "91.144.0.0", "255.252.0.0") ||
    isInNet(ip, "176.29.0.0", "255.255.0.0") ||
    isInNet(ip, "185.79.128.0", "255.255.192.0")  // Added more Syria
  );
}

/* ==============================
   🌍 GULF RANGES (OPTIMIZED)
   ============================== */
function isGulf(ip) {
  return (
    isInNet(ip, "188.123.0.0", "255.255.0.0") ||
    isInNet(ip, "212.35.0.0", "255.255.0.0") ||
    isInNet(ip, "94.249.0.0", "255.255.0.0") ||
    isInNet(ip, "176.28.0.0", "255.255.0.0") ||
    isInNet(ip, "82.212.0.0", "255.255.0.0") ||
    isInNet(ip, "15.185.0.0", "255.255.0.0")     // Added Gulf AWS
  );
}

/* ==============================
   🛡 REGION TIER (IP-BASED)
   ============================== */
function regionTier_ip(ip) {
  if (isJordan(ip)) return 3;
  if (isGulf(ip)) return 2;
  return 1;
}

/* 🎮 PUBG DETECTION - ENHANCED ALL MODES
====================================== */
function isPUBG(host, url) {
  var s = (host + " " + url).toLowerCase();
  return (
    /* Official / Publishers */
    /pubg|pubgm|pubgmobile|bgmi|krafton|lightspeed|proximabeta/.test(s) ||

    /* Tencent / Cloud */
    /tencent|qcloud|myqcloud|tencentcs/.test(s) ||

    /* Cloud Providers */
    /amazonaws|aliyun|gcloud|me-south-1|ap-southeast-1/.test(s) ||  // Added SEA for fallback

    /* Core Game Systems */
    /battle|match|arena|allocation|session|dispatcher|lobby|gamecore|metric/.test(s) ||

    /* Classic Maps */
    /erangel|miramar|sanhok|vikendi|karakin|livik|paramo|deston|nusa|rogaland/.test(s) ||

    /* Arcade & Quick */
    /tdm|teamdeathmatch|arena_training|gun_game|quick_match|arcade|tdm_map/.test(s) ||

    /* Ranked / Competitive */
    /rank|ranked|season|leaderboard|tier|conqueror|ace|squadcup/.test(s) ||

    /* Payload / Special */
    /payload|metro|metro_royale|infection|zombie|survive_till_dawn/.test(s) ||

    /* Event / Evo */
    /evo|wow|worldofwonder|event|specialmode|dragonball|spiderman|them|.tournament/.test(s) ||

    /* Training / Other */
    /training|cheerpark|warehouse|hangar|playground/.test(s)
  );
}

/* ==============================
   🚀 LOBBY vs MATCH DETECTOR (FAST LOBBY KEY)
   ============================== */
function getMatchType(host, url) {
  var s = (host + " " + url).toLowerCase();
  if (/lobby|dispatcher|allocation|session|cheerpark|training/.test(s)) return "LOBBY";
  if (/match|arena|battle|gamecore|ranked|payload|tdm|gun_game|eventmode/.test(s)) return "MATCH";
  return "GAME";  // Other game traffic (stick to session)
}

/* ==============================
   🔐 STICKY CORE SELECTOR
   ============================== */
function selectCore(host, url) {
  if (LOCKED_CORE !== null) return LOCKED_CORE;

  var ip = resolve(host);
  var tier = ip ? regionTier_ip(ip) : 1;
  var hash = ultraHash(host + url);

  if (tier === 3) {
    LOCKED_CORE = PROXY_A;  // Jordan: Always A (Lowest Ping)
    return LOCKED_CORE;
  }

  if (tier === 2) {
    var mod = hash % 3;
    LOCKED_CORE = (mod === 0) ? PROXY_A :
                  (mod === 1) ? PROXY_B :
                  PROXY_C;
    return LOCKED_CORE;
  }

  // Tier 1: Balanced
  LOCKED_CORE = (hash % 2 === 0) ? PROXY_A : PROXY_B;
  return LOCKED_CORE;
}

/* ==============================
   🔒 ULTRA SESSION LOCK (NET16 + PORT | LOBBY SAFE)
   ============================== */
function enforceUltraSession(net16, port, mtype) {
  if (SESSION.matchNet16 === null) {
    if (mtype === "MATCH" || mtype === "GAME") {  // Lock only on match/game start
      SESSION.matchNet16 = net16;
      SESSION.matchPort = port;
    }
    return PROXY_A;  // Lobby/First: Fast A (No Lock)
  }

  // Strict stick: Same /16 Net + Port = Zero Drops
  if (net16 !== SESSION.matchNet16 || port !== SESSION.matchPort) {
    return BLOCK;
  }

  return PROXY_A;
}

/* ==============================
   📡 PORT EXTRACTOR
   ============================== */
function extractPort(url) {
  if (!url) return "80";
  var parts = url.split(":");
  if (parts.length > 2) {
    return parts[2].split("/")[0];
  }
  return (url.substring(0, 5) === "https") ? "443" : "80";
}

/* ==============================
   🚀 MAIN ENGINE (ULTRA OPTIMIZED)
   ============================== */
function FindProxyForURL(url, host) {
  var h = host.toLowerCase();

  /* ✅ Exceptions: GitHub, YouTube, Google (Login Fast) */
  if (dnsDomainIs(h, "github.com") || shExpMatch(h, "*.github.com") ||
      dnsDomainIs(h, "youtube.com") || shExpMatch(h, "*.youtube.com") ||
      dnsDomainIs(h, "google.com") || shExpMatch(h, "*.google.com")) {
    return "DIRECT";
  }

  /* 🚫 Syria Block (Domains + IPs) */
  if (shExpMatch(h, "*.sy") || shExpMatch(h, "*.syr") ) {
    return BLOCK;
  }
  var ip = resolve(host);
  if (ip && isSyria(ip)) {
    return BLOCK;
  }

  /* 🎮 PUBG Traffic: Low Ping Heaven */
  if (isPUBG(host, url)) {
    var ip = resolve(host);
    var tier = ip ? regionTier_ip(ip) : 1;
    var net16 = ip ? ip.split('.').slice(0, 2).join('.') : '';
    var port = extractPort(url);
    var mtype = getMatchType(host, url);

    if (tier === 3) {
      /* 🏆 JORDAN: Ultra Lock (Lobby Free, Match Sticky) */
      return enforceUltraSession(net16, port, mtype);
    } else {
      /* 🌍 Gulf/Other: Core Sticky */
      return selectCore(host, url);
    }
  }

  /* 📡 Default: Fast Proxy */
  return PROXY_A;
}
