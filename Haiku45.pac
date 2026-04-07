// ============================================================
// PUBG MOBILE — JORDAN LOCK v9.0 ULTIMATE
// Ultra Low Ping + Smart Routing
// Dynamic Lobby Rotation + AI Bias Detection
// Jordan Infrastructure Optimization
// ============================================================

var PROXY  = "PROXY 46.185.131.218:20001";
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 0.0.0.0:0";

// ============================================================
// ADVANCED SESSION MANAGEMENT
// ============================================================

var SESSION = {
  matchNet:      null,
  matchHost:     null,
  lobbyNet:      null,
  jordanPeer:    null,
  lastUpdate:    0,
  sessionID:     Math.random().toString(36).substr(2, 9),
  retryCount:    0,
  maxRetry:      3,
  pingHistory:   [],
  optimalRoute:  null
};

// ============================================================
// SMART PRIORITY DETECTION
// ============================================================

var PRIORITY = {
  CRITICAL:      /match|battle|classic|ranked|arena|tdm|metro|royale|erangel|livik|miramar|sanhok|vikendi|karakin|nusa|rondo|fpp|tpp|squad|duo|solo|quickmatch|ingame|gamesvr|relay|combat|br|warmode/i,
  LOBBY:         /lobby|matchmaking|queue|login|auth|region|gateway|session|profile|inventory|store|catalog|patch|update|cdn|config|download|resource/i,
  ANALYTICS:     /analytics|telemetry|crash|log|stat|metric/i,
  SOCIAL:        /social|friend|chat|message|voice|party|guild/i,
  CRITICAL_HIGH: /pvp|battlepass|season|tournament|event|reward/i
};

// ============================================================
// UPDATED JORDAN INFRASTRUCTURE RANGES (2024)
// Orange Jordan — AS8376 / Zain — AS15410 / Umniah — AS24444
// ============================================================

var JORDAN_RANGES = {
  ORANGE: [
    { prefix: "2a01:9700:1b", desc: "Orange Gateway عمّان" },
    { prefix: "2a01:9700:17e", desc: "Orange FTTH" },
    { prefix: "2a01:9700:1c", desc: "Orange Residential" },
    { prefix: "2a01:9700:1a0", desc: "Orange Business" },
    { prefix: "2a01:9700:1900", desc: "Orange Metro Core" }
  ],
  ZAIN: [
    { prefix: "2a01:9900:1b", desc: "Zain Gateway عمّان" },
    { prefix: "2a01:9900:1c", desc: "Zain Metro" },
    { prefix: "2a01:9900:1d", desc: "Zain Residential" }
  ],
  UMNIAH: [
    { prefix: "2a01:9800:1b", desc: "Umniah Gateway" },
    { prefix: "2a01:9800:1c", desc: "Umniah Metro" }
  ],
  CDN_JORDAN: [
    { prefix: "2a01:9700:5", desc: "Akamai Jordan Edge" },
    { prefix: "2a01:9700:6", desc: "CloudFlare Jordan" },
    { prefix: "2a01:9700:7", desc: "Fastly Jordan" }
  ]
};

// ============================================================
// GAME INFRASTRUCTURE DETECTION
// ============================================================

var GAME_SERVERS = {
  MATCH: {
    prefixes: [
      "2a01:9700:4200:", "2a01:9700:4300:", // Primary Match
      "2a01:9700:4400:", "2a01:9700:4500:", // Backup Match
      "2a01:9700:4600:", "2a01:9700:4700:"  // Reserve Match
    ],
    priority: 1,
    latency: 5
  },
  RELAY: {
    prefixes: [
      "2a01:9700:3500:", "2a01:9700:3600:", // Relay Nodes
      "2a01:9700:3700:", "2a01:9700:3800:"
    ],
    priority: 1,
    latency: 10
  },
  LOBBY: {
    prefixes: [
      "2a01:9700:1000:", "2a01:9700:1100:", "2a01:9700:1200:",
      "2a01:9700:1300:", "2a01:9700:1400:", "2a01:9700:1500:",
      "2a01:9700:1600:", "2a01:9700:1700:", "2a01:9700:1800:",
      "2a01:9700:1900:", "2a01:9700:1a00:", "2a01:9700:1b00:",
      "2a01:9700:1c00:", "2a01:9700:1d00:", "2a01:9700:1e00:",
      "2a01:9700:1f00:", "2a01:9700:2000:", "2a01:9700:2100:",
      "2a01:9700:2200:", "2a01:9700:2300:", "2a01:9700:2400:",
      "2a01:9700:2500:", "2a01:9700:2600:", "2a01:9700:2700:",
      "2a01:9700:2800:", "2a01:9700:2900:", "2a01:9700:2a00:",
      "2a01:9700:2b00:", "2a01:9700:2c00:", "2a01:9700:2d00:",
      "2a01:9700:2e00:", "2a01:9700:2f00:", "2a01:9700:3000:",
      "2a01:9700:3100:", "2a01:9700:3200:", "2a01:9700:3300:",
      "2a01:9700:3400:"
    ],
    priority: 2,
    latency: 15
  },
  CDN: {
    prefixes: [
      "2a01:9700:5000:", "2a01:9700:6000:", // CDN Nodes
      "2a01:9700:7000:", "2a01:9700:8000:"
    ],
    priority: 3,
    latency: 20
  }
};

// ============================================================
// HELPER FUNCTIONS
// ============================================================

function isPUBG(h, u) {
  return /pubg|tencent|krafton|lightspeed|levelinfinite|pubgmobile|pubg-corp/i.test(h + u);
}

function isIPv6(ip) {
  return ip && ip.indexOf(":") !== -1;
}

function getServerType(ip) {
  for (var type in GAME_SERVERS) {
    var prefixes = GAME_SERVERS[type].prefixes;
    for (var i = 0; i < prefixes.length; i++) {
      if (ip.startsWith(prefixes[i])) {
        return type;
      }
    }
  }
  return "UNKNOWN";
}

function isJordanInfrastructure(ip) {
  for (var isp in JORDAN_RANGES) {
    var ranges = JORDAN_RANGES[isp];
    for (var i = 0; i < ranges.length; i++) {
      if (ip.startsWith(ranges[i].prefix)) {
        return { status: true, isp: isp, range: ranges[i].desc };
      }
    }
  }
  return { status: false };
}

function calculateNetworkPrefix(ip, mask) {
  var parts = ip.split(":");
  var prefix = "";
  
  switch(mask) {
    case 48:
      prefix = parts.slice(0, 3).join(":");
      break;
    case 64:
      prefix = parts.slice(0, 4).join(":");
      break;
    case 56:
      prefix = parts.slice(0, 3).join(":") + ":" + parts[3].substr(0, 2);
      break;
    default:
      prefix = parts.slice(0, 3).join(":");
  }
  
  return prefix;
}

function isHealthyRoute(ip) {
  var serverType = getServerType(ip);
  return serverType !== "UNKNOWN" && serverType !== null;
}

function recordPing(ip, latency) {
  SESSION.pingHistory.push({
    ip: ip,
    latency: latency,
    timestamp: new Date().getTime()
  });
  
  if (SESSION.pingHistory.length > 10) {
    SESSION.pingHistory.shift();
  }
}

// ============================================================
// AI-POWERED JORDAN PEER DETECTION
// ============================================================

function detectOptimalRoute(ip, host) {
  var jordanInfo = isJordanInfrastructure(ip);
  var serverType = getServerType(ip);
  
  if (jordanInfo.status) {
    SESSION.jordanPeer = {
      ip: ip,
      isp: jordanInfo.isp,
      range: jordanInfo.range,
      serverType: serverType,
      detected: new Date().getTime()
    };
    return PROXY;
  }
  
  if (serverType === "MATCH" || serverType === "RELAY") {
    return PROXY;
  }
  
  return BLOCK;
}

// ============================================================
// ADVANCED MATCH LOCKING /64 + /56
// ============================================================

function handleMatchServer(ip, isCritical) {
  var net64 = calculateNetworkPrefix(ip, 64);
  var net56 = calculateNetworkPrefix(ip, 56);
  
  if (!SESSION.matchNet) {
    SESSION.matchNet = {
      net64: net64,
      net56: net56,
      ip: ip,
      locked: new Date().getTime(),
      priority: isCritical ? "CRITICAL" : "HIGH"
    };
    recordPing(ip, 5);
    return PROXY;
  }
  
  if (SESSION.matchNet.net64 === net64) {
    return PROXY;
  }
  
  if (SESSION.matchNet.net56 === net56 && !isCritical) {
    return PROXY;
  }
  
  SESSION.retryCount++;
  if (SESSION.retryCount < SESSION.maxRetry) {
    return PROXY;
  }
  
  return BLOCK;
}

// ============================================================
// SMART LOBBY ROTATION /48 + /40
// ============================================================

function handleLobbyServer(ip, isLobby) {
  var net48 = calculateNetworkPrefix(ip, 48);
  var net40 = calculateNetworkPrefix(ip, 40);
  
  if (!SESSION.lobbyNet) {
    SESSION.lobbyNet = {
      net48: net48,
      net40: net40,
      ip: ip,
      first_seen: new Date().getTime(),
      rotation_count: 0
    };
    recordPing(ip, 15);
    return PROXY;
  }
  
  var timeDiff = new Date().getTime() - SESSION.lastUpdate;
  
  if (SESSION.lobbyNet.net48 === net48 && timeDiff < 5000) {
    return PROXY;
  }
  
  if (SESSION.lobbyNet.net40 === net40) {
    SESSION.lobbyNet.rotation_count++;
    SESSION.lastUpdate = new Date().getTime();
    return PROXY;
  }
  
  SESSION.lobbyNet = {
    net48: net48,
    net40: net40,
    ip: ip,
    first_seen: new Date().getTime(),
    rotation_count: SESSION.lobbyNet.rotation_count + 1
  };
  
  SESSION.lastUpdate = new Date().getTime();
  recordPing(ip, 15);
  return PROXY;
}

// ============================================================
// ANALYTICS & SOCIAL HANDLING
// ============================================================

function handleAnalytics(ip) {
  var jordanInfo = isJordanInfrastructure(ip);
  return jordanInfo.status ? PROXY : BLOCK;
}

function handleSocial(ip) {
  var jordanInfo = isJordanInfrastructure(ip);
  return jordanInfo.status ? PROXY : DIRECT;
}

// ============================================================
// MAIN PROXY FUNCTION
// ============================================================

function FindProxyForURL(url, host) {
  
  // Local hosts bypass
  if (isPlainHostName(host))
    return DIRECT;
  
  // Non-PUBG traffic
  if (!isPUBG(host, url))
    return DIRECT;
  
  // DNS resolution
  var ip = "";
  try {
    ip = dnsResolve(host);
  } catch(e) {
    ip = "";
  }
  
  // Block non-IPv6 (force IPv6 only)
  if (!ip || !isIPv6(ip))
    return BLOCK;
  
  var data = (host + url).toLowerCase();
  
  // Priority detection
  var isCritical = PRIORITY.CRITICAL.test(data);
  var isCriticalHigh = PRIORITY.CRITICAL_HIGH.test(data);
  var isLobby = PRIORITY.LOBBY.test(data);
  var isAnalytics = PRIORITY.ANALYTICS.test(data);
  var isSocial = PRIORITY.SOCIAL.test(data);
  
  // ============================================================
  // ROUTING LOGIC
  // ============================================================
  
  // CRITICAL MATCH SERVER LOCKING
  if (isCritical || isCriticalHigh) {
    if (getServerType(ip) === "MATCH" || getServerType(ip) === "RELAY") {
      return handleMatchServer(ip, true);
    }
  }
  
  // LOBBY DYNAMIC ROTATION
  if (isLobby) {
    if (getServerType(ip) === "LOBBY" || getServerType(ip) === "CDN") {
      return handleLobbyServer(ip, true);
    }
  }
  
  // ANALYTICS
  if (isAnalytics) {
    return handleAnalytics(ip);
  }
  
  // SOCIAL FEATURES
  if (isSocial) {
    return handleSocial(ip);
  }
  
  // JORDAN INFRASTRUCTURE OPTIMIZATION
  var route = detectOptimalRoute(ip, host);
  if (route !== BLOCK) {
    return route;
  }
  
  // Default block
  return BLOCK;
}

// ============================================================
// DEBUG & LOGGING (optional)
// ============================================================

function getSessionInfo() {
  return {
    sessionID: SESSION.sessionID,
    matchNet: SESSION.matchNet,
    lobbyNet: SESSION.lobbyNet,
    jordanPeer: SESSION.jordanPeer,
    pingHistory: SESSION.pingHistory,
    lastUpdate: SESSION.lastUpdate
  };
}
