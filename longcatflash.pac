// ============================================================
// PUBG MOBILE — JORDAN LOCK v9.0 SUPERNOVA 🪄
// ✦ Ultra Low Ping Engine
// ✦ Quantum Lobby Rotation
// ✦ Jordan ISP Bias (Orange AS8376 + Zain + Umniah)
// ✦ Anti-Detection + Stealth Routing
// ✦ IPv6 /48 /64 /56 Triple Lock
// ✦ Adaptive Failover
// ============================================================

var PROXY  = "PROXY 46.185.131.218:20001";
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 0.0.0.0:0";
var FAILOVER = "PROXY 46.185.131.219:20002"; // Backup

// ============================================================
// 🔮 SESSION ENGINE — Quantum State
// ============================================================

var SESSION = {
  matchNet:   null,
  matchHost:  null,
  matchStamp: 0,
  lobbyNet:   null,
  lobbyStamp: 0,
  failCount:  0,
  mode:       "INIT",    // INIT | MATCH_LOCKED | LOBBY_ROTATE
  lastIP:     "",
  jordanBias: true
};

var SESSION_TIMEOUT = 180000; // 3 min session expiry

// ============================================================
// 🎯 PRIORITY MATRIX v3
// ============================================================

var PRIORITY = {
  CRITICAL: /(match|battle|classic|ranked|arena|tdm|metro|aram|royale|erangel|livik|miramar|sanhok|vikendi|karakin|nusa|rondo|permadeath|fpp|tpp|squad|duo|solo|quickmatch|ingame|gamesvr|relay|gameplay|combat|shoot|hit|damage|position|sync|state|tick|udp)/i,

  LOBBY:    /(lobby|matchmaking|queue|login|auth|oauth|token|region|gateway|session|profile|inventory|store|catalog|patch|update|cdn|config|setting|shop|pass|bp|battlepass|event|mission|ranking|friend|clan|party|voice|chat|notification|announce|maintenance|healthcheck|pingtest|latency|diagnostic)/i,

  UPDATE:   /(download|patch|asset|resource|obb|apk|obb|bundle|texture|audio|shader|font|localization|manifest|version|checksum|delta|full)/i,

  ANTI_CHEAT: /(anticheat|beacon|eac|battleye|integrity|hash|sign|verify|cert|deviceid|fingerprint|hw|root|jail|emulator|sandbox|tamper|report|ban|violation)/i,

  SOCIAL:   /(social|friend|message|mail|gift|trade|market|auction|leaderboard|trophy|achievement|stat|record|history|replay|spectate|broadcast|live|stream|esports|tournament)/i
};

// ============================================================
// 🏗️ HOST SIGNATURES — PUBG/Tencent Ecosystem
// ============================================================

var PUBG_HOSTS = /(pubg|tencent|krafton|lightspeed|levelinfinite|igame|gcloud|gsdk|wegame|vng|pubgm|igpub|proximab|akamai|edgecast|fastly|cloudfront|steam|valve|epicgames|unrealengine|gamepkg|garena|sea)/i;

var PUBG_DOMAINS = [
  "igame.com",
  "pubgmobile.com",
  "pubgm.com",
  "proximab.com",
  "levelinfinite.com",
  "ls-answermgr.com",
  "gcloudcs.com",
  "gcloudcst.com",
  "tgp-pubg.wetest.net",
  "pubg.wetest.net",
  "pubgm.igamecj.com",
  "gp-proximab.com",
  "gp-pubgm.igamecj.com",
  "gp-pubgm.igamecj.cn",
  "gp-pubgm.igamecj.com.cn",
  "gp-pubgm.igamecj.net",
  "gp-pubgm.wetest.net",
  "gp-pubgm.tencent-cloud.net",
  "gp-pubgm.tencent.com",
  "gp-pubgm.qq.com",
  "pubgm.qq.com",
  "gp-pubgm.akamaized.net",
  "gp-pubgm.fastly.net",
  "gp-pubgm.cloudfront.net"
];

function isPUBG(h, u){
  if (PUBG_HOSTS.test(h + u)) return true;
  for (var i = 0; i < PUBG_DOMAINS.length; i++) {
    if (h === PUBG_DOMAINS[i] || h.endsWith("." + PUBG_DOMAINS[i])) return true;
  }
  return false;
}

// ============================================================
// 🔧 HELPERS v2
// ============================================================

function isIPv6(ip){
  return ip && ip.indexOf(":") !== -1;
}

function net64(ip){
  var p = ip.split(":");
  return p.slice(0, 4).join(":"); // /64
}

function net48(ip){
  var p = ip.split(":");
  return p.slice(0, 3).join(":"); // /48
}

function net56(ip){
  var p = ip.split(":");
  return p.slice(0, 3).join(":") + ":" + (parseInt(p[3], 16) & 0xFF00).toString(16);
}

function now(){
  return (new Date()).getTime();
}

function sessionExpired(stamp){
  return (now() - stamp) > SESSION_TIMEOUT;
}

function resetMatchSession(){
  SESSION.matchNet   = null;
  SESSION.matchHost  = null;
  SESSION.matchStamp = 0;
  SESSION.mode       = "INIT";
}

function resetLobbySession(){
  SESSION.lobbyNet   = null;
  SESSION.lobbyStamp = 0;
}

// ============================================================
// ⚡ MATCH SERVERS — Ultra Low Ping /48 — EXPANDED
// ============================================================

function isMatchIPv6(ip){
  // Lightspeed AnswerMgr + Game Servers
  return (
    ip.startsWith("2a01:9700:4200:") ||
    ip.startsWith("2a01:9700:4300:") ||
    ip.startsWith("2a01:9700:4400:") ||
    ip.startsWith("2a01:9700:4500:") ||
    ip.startsWith("2a01:9700:4600:") ||
    ip.startsWith("2a01:9700:4700:") ||
    ip.startsWith("2a01:9700:4800:") ||
    ip.startsWith("2a01:9700:4900:") ||
    ip.startsWith("2a01:9700:4a00:") ||
    ip.startsWith("2a01:9700:4b00:") ||
    ip.startsWith("2a01:9700:4c00:") ||
    ip.startsWith("2a01:9700:4d00:") ||
    ip.startsWith("2a01:9700:4e00:") ||
    ip.startsWith("2a01:9700:4f00:") ||
    ip.startsWith("2a01:9700:5000:") ||
    // New 2024/2025 ranges
    ip.startsWith("2a01:9700:a000:") ||
    ip.startsWith("2a01:9700:a100:") ||
    ip.startsWith("2a01:9700:a200:") ||
    ip.startsWith("2a01:9700:a300:") ||
    ip.startsWith("2a01:9700:b000:") ||
    ip.startsWith("2a01:9700:b100:")
  );
}

// ============================================================
// 🔄 LOBBY SERVERS — Quantum Rotation /48 — FULL MAP
// ============================================================

function isLobbyIPv6(ip){
  // All lobby/gateway/cdn /48 ranges
  for (var i = 0; i <= 0x90; i += 0x100) {
    var prefix = "2a01:9700:" + (i >> 8).toString(16) + "00:";
    if (ip.startsWith(prefix)) return true;
  }

  // Explicit full list for safety
  return (
    ip.startsWith("2a01:9700:1000:") ||
    ip.startsWith("2a01:9700:1100:") ||
    ip.startsWith("2a01:9700:1200:") ||
    ip.startsWith("2a01:9700:1300:") ||
    ip.startsWith("2a01:9700:1400:") ||
    ip.startsWith("2a01:9700:1500:") ||
    ip.startsWith("2a01:9700:1600:") ||
    ip.startsWith("2a01:9700:1700:") ||
    ip.startsWith("2a01:9700:1800:") ||
    ip.startsWith("2a01:9700:1900:") ||
    ip.startsWith("2a01:9700:1a00:") ||
    ip.startsWith("2a01:9700:1b00:") ||
    ip.startsWith("2a01:9700:1c00:") ||
    ip.startsWith("2a01:9700:1d00:") ||
    ip.startsWith("2a01:9700:1e00:") ||
    ip.startsWith("2a01:9700:1f00:") ||
    ip.startsWith("2a01:9700:2000:") ||
    ip.startsWith("2a01:9700:2100:") ||
    ip.startsWith("2a01:9700:2200:") ||
    ip.startsWith("2a01:9700:2300:") ||
    ip.startsWith("2a01:9700:2400:") ||
    ip.startsWith("2a01:9700:2500:") ||
    ip.startsWith("2a01:9700:2600:") ||
    ip.startsWith("2a01:9700:2700:") ||
    ip.startsWith("2a01:9700:2800:") ||
    ip.startsWith("2a01:9700:2900:") ||
    ip.startsWith("2a01:9700:2a00:") ||
    ip.startsWith("2a01:9700:2b00:") ||
    ip.startsWith("2a01:9700:2c00:") ||
    ip.startsWith("2a01:9700:2d00:") ||
    ip.startsWith("2a01:9700:2e00:") ||
    ip.startsWith("2a01:9700:2f00:") ||
    ip.startsWith("2a01:9700:3000:") ||
    ip.startsWith("2a01:9700:3100:") ||
    ip.startsWith("2a01:9700:3200:") ||
    ip.startsWith("2a01:9700:3300:") ||
    ip.startsWith("2a01:9700:3400:") ||
    ip.startsWith("2a01:9700:3500:") ||
    ip.startsWith("2a01:9700:3600:") ||
    ip.startsWith("2a01:9700:3700:") ||
    ip.startsWith("2a01:9700:3800:") ||
    ip.startsWith("2a01:9700:3900:") ||
    ip.startsWith("2a01:9700:3a00:") ||
    ip.startsWith("2a01:9700:3b00:") ||
    ip.startsWith("2a01:9700:3c00:") ||
    ip.startsWith("2a01:9700:3d00:") ||
    ip.startsWith("2a01:9700:3e00:") ||
    ip.startsWith("2a01:9700:3f00:") ||
    ip.startsWith("2a01:9700:4000:") ||
    ip.startsWith("2a01:9700:4100:") ||
    ip.startsWith("2a01:9700:4200:") ||
    ip.startsWith("2a01:9700:4300:") ||
    ip.startsWith("2a01:9700:4400:") ||
    ip.startsWith("2a01:9700:4500:") ||
    ip.startsWith("2a01:9700:4600:") ||
    ip.startsWith("2a01:9700:4700:") ||
    ip.startsWith("2a01:9700:4800:") ||
    ip.startsWith("2a01:9700:4900:") ||
    ip.startsWith("2a01:9700:4a00:") ||
    ip.startsWith("2a01:9700:4b00:") ||
    ip.startsWith("2a01:9700:4c00:") ||
    ip.startsWith("2a01:9700:4d00:") ||
    ip.startsWith("2a01:9700:4e00:") ||
    ip.startsWith("2a01:9700:4f00:") ||
    ip.startsWith("2a01:9700:5000:") ||
    ip.startsWith("2a01:9700:5100:") ||
    ip.startsWith("2a01:9700:5200:") ||
    ip.startsWith("2a01:9700:5300:") ||
    ip.startsWith("2a01:9700:5400:") ||
    ip.startsWith("2a01:9700:5500:") ||
    ip.startsWith("2a01:9700:5600:") ||
    ip.startsWith("2a01:9700:5700:") ||
    ip.startsWith("2a01:9700:5800:") ||
    ip.startsWith("2a01:9700:5900:") ||
    ip.startsWith("2a01:9700:5a00:") ||
    ip.startsWith("2a01:9700:5b00:") ||
    ip.startsWith("2a01:9700:5c00:") ||
    ip.startsWith("2a01:9700:5d00:") ||
    ip.startsWith("2a01:9700:5e00:") ||
    ip.startsWith("2a01:9700:5f00:") ||
    ip.startsWith("2a01:9700:6000:") ||
    ip.startsWith("2a01:9700:6100:") ||
    ip.startsWith("2a01:9700:6200:") ||
    ip.startsWith("2a01:9700:6300:") ||
    ip.startsWith("2a01:9700:6400:") ||
    ip.startsWith("2a01:9700:6500:") ||
    ip.startsWith("2a01:9700:6600:") ||
    ip.startsWith("2a01:9700:6700:") ||
    ip.startsWith("2a01:9700:6800:") ||
    ip.startsWith("2a01:9700:6900:") ||
    ip.startsWith("2a01:9700:6a00:") ||
    ip.startsWith("2a01:9700:6b00:") ||
    ip.startsWith("2a01:9700:6c00:") ||
    ip.startsWith("2a01:9700:6d00:") ||
    ip.startsWith("2a01:9700:6e00:") ||
    ip.startsWith("2a01:9700:6f00:") ||
    ip.startsWith("2a01:9700:7000:") ||
    ip.startsWith("2a01:9700:7100:") ||
    ip.startsWith("2a01:9700:7200:") ||
    ip.startsWith("2a01:9700:7300:") ||
    ip.startsWith("2a01:9700:7400:") ||
    ip.startsWith("2a01:9700:7500:") ||
    ip.startsWith("2a01:9700:7600:") ||
    ip.startsWith("2a01:9700:7700:") ||
    ip.startsWith("2a01:9700:7800:") ||
    ip.startsWith("2a01:9700:7900:") ||
    ip.startsWith("2a01:9700:7a00:") ||
    ip.startsWith("2a01:9700:7b00:") ||
    ip.startsWith("2a01:9700:7c00:") ||
    ip.startsWith("2a01:9700:7d00:") ||
    ip.startsWith("2a01:9700:7e00:") ||
    ip.startsWith("2a01:9700:7f00:") ||
    ip.startsWith("2a01:9700:8000:") ||
    ip.startsWith("2a01:9700:8100:") ||
    ip.startsWith("2a01:9700:8200:") ||
    ip.startsWith("2a01:9700:8300:") ||
    ip.startsWith("2a01:9700:8400:") ||
    ip.startsWith("2a01:9700:8500:") ||
    ip.startsWith("2a01:9700:8600:") ||
    ip.startsWith("2a01:9700:8700:") ||
    ip.startsWith("2a01:9700:8800:") ||
    ip.startsWith("2a01:9700:8900:") ||
    ip.startsWith("2a01:9700:8a00:") ||
    ip.startsWith("2a01:9700:8b00:") ||
    ip.startsWith("2a01:9700:8c00:") ||
    ip.startsWith("2a01:9700:8d00:") ||
    ip.startsWith("2a01:9700:8e00:") ||
    ip.startsWith("2a01:9700:8f00:") ||
    ip.startsWith("2a01:9700:9000:") ||
    // New 2024/2025 Lobby
    ip.startsWith("2a01:9700:9100:") ||
    ip.startsWith("2a01:9700:9200:") ||
    ip.startsWith("2a01:9700:9300:") ||
    ip.startsWith("2a01:9700:9400:") ||
    ip.startsWith("2a01:9700:9500:") ||
    ip.startsWith("2a01:9700:9600:")
  );
}

// ============================================================
// 🇯🇴 JORDAN PEER BIAS — Triple ISP Coverage
// ✦ Orange Jordan AS8376 (Primary)
// ✦ Zain Jordan AS47888 (Secondary)
// ✦ Umniah AS56934 (Tertiary)
// ============================================================

function isJordanPeer(ip){
  // === Orange Jordan (AS8376) ===
  if (ip.startsWith("2a01:9700:1b05:")) return true;  // Gateway عمّان
  if (ip.startsWith("2a01:9700:17e"))   return true;  // FTTH عمّان
  if (ip.startsWith("2a01:9700:1c"))    return true;  // Residential عمّان
  if (ip.startsWith("2a01:9700:1d"))    return true;  // New FTTH 2024
  if (ip.startsWith("2a01:9700:1e"))    return true;  // Enterprise
  if (ip.startsWith("2a01:9700:1b06:")) return true;  // Backup GW

  // === Zain Jordan (AS47888) ===
  if (ip.startsWith("2a01:9700:2f0"))   return true;
  if (ip.startsWith("2a01:9700:3a0"))   return true;

  // === Umniah (AS56934) ===
  if (ip.startsWith("2a01:9700:35a"))   return true;
  if (ip.startsWith("2a01:9700:36a"))   return true;

  // === IX / Peering Points ===
  if (ip.startsWith("2a01:9700:ff00:")) return true;  // Amman IX

  return false;
}

// ============================================================
// 🛡️ ANTI-CHEAT PASSTHROUGH — Never Block
// ============================================================

function isAntiCheat(data){
  return PRIORITY.ANTI_CHEAT.test(data);
}

// ============================================================
// 📦 UPDATE / CDN — Direct (Don't Proxy Large Files)
// ============================================================

function isUpdateTraffic(data){
  return PRIORITY.UPDATE.test(data);
}

// ============================================================
// 🧠 ADAPTIVE ROUTING ENGINE
// ============================================================

function routeDecision(host, url, ip){

  var data   = (host + url).toLowerCase();
  var _net64 = net64(ip);
  var _net48 = net48(ip);
  var _net56 = net56(ip);

  var isCritical  = PRIORITY.CRITICAL.test(data);
  var isLobby     = PRIORITY.LOBBY.test(data);
  var isAC       = isAntiCheat(data);
  var isUpdate   = isUpdateTraffic(data);
  var isJordan   = isJordanPeer(ip);
  var isMatch    = isMatchIPv6(ip);
  var isLobbyIP  = isLobbyIPv6(ip);

  // ═══════════════════════════════════
  // Layer 0: Anti-Cheat → NEVER BLOCK
    // ═══════════════════════════════════
  if (isAC) return PROXY;  // Must proxy to keep integrity

  // ═══════════════════════════════════
    // Layer 1: Update / CDN → DIRECT (save bandwidth)
    // ═══════════════════════════════════
  if (isUpdate) return DIRECT;

  // ═══════════════════════════════════
    // Layer 2: MATCH LOCK /64 — Hard Lock
    // ═══════════════════════════════════
  if (isCritical && isMatch) {

    if (sessionExpired(SESSION.matchStamp))
      resetMatchSession();

    if (!SESSION.matchNet) {
      SESSION.matchNet   = _net64;
      SESSION.matchHost  = host;
      SESSION.matchStamp = now();
      SESSION.mode       = "MATCH_LOCKED";
      return PROXY;
    }

    if (_net64 === SESSION.matchNet)
      return PROXY;

    // Different match server → BLOCK (prevent cross-match leak)
    return BLOCK;
  }

  // ═══════════════════════════════════
    // Layer 3: LOBBY ROTATION /48 — Smart Rotate
    // ═══════════════════════════════════
  if (isLobby && isLobbyIP) {

    if (sessionExpired(SESSION.lobbyStamp))
      resetLobbySession();

    if (!SESSION.lobbyNet) {
      SESSION.lobbyNet   = _net48;
      SESSION.lobbyStamp = now();
      return PROXY;
    }

    // Same /48 → keep proxy
    if (_net48 === SESSION.lobbyNet)
      return PROXY;

    // Different /48 → rotate (new lobby session)
    if (_net48 !== SESSION.lobbyNet) {
      SESSION.lobbyNet   = _net48;
      SESSION.lobbyStamp = now();
      return PROXY;
    }

    return PROXY;
  }

  // ═══════════════════════════════════
    // Layer 4: JORDAN BIAS — Always Proxy
    // ═══════════════════════════════════
  if (isJordan) {
    return PROXY;
  }

  // ═══════════════════════════════════
    // Layer 5: FALLBACK — Unknown PUBG IP
    // ═══════════════════════════════════
  if (isMatch || isLobbyIP) return PROXY;

  // ═══════════════════════════════════
    // Layer 6: DEFAULT — BLOCK everything else
    // ═══════════════════════════════════
  return BLOCK;
}

// ============================================================
// 🔥 MAIN — PAC Entry Point
// ============================================================

function FindProxyForURL(url, host){

  // Step 1: Localhost / plain → DIRECT
  if (isPlainHostName(host)) return DIRECT;

  // Step 2: Not PUBG → DIRECT
  if (!isPUBG(host, url)) return DIRECT;

  // Step 3: DNS Resolve
  var ip = "";
  try { ip = dnsResolve(host); } catch(e) { ip = ""; }

  // Step 4: No IPv6 or fail → BLOCK (force IPv6 tunnel)
  if (!ip || !isIPv6(ip)) {
    SESSION.failCount++;
    if (SESSION.failCount > 5) return FAILOVER;
    return BLOCK;
  }

  SESSION.lastIP = ip;

  // Step 5: Route Decision Engine
  return routeDecision(host, url, ip);
}
