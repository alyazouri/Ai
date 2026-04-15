// ============================================================
// PUBG MOBILE — JORDAN ONLY COMPLETE PAC (v4.0 FINAL)
// 🇯🇴 فقط لاعبين أردنيين — كامل ومتكامل
// ============================================================

// =====================
// 🔧 إعدادات النظام
// =====================
var CONFIG = {
  DEBUG: true,              // true = تسجيل كل شيء
  BLOCK_NON_JO: true,       // true = حظر غير أردني
  LOCK_MATCH: true,         // true = تثبيت المباراة
  MATCH_TTL: 60 * 60 * 1000, // 60 دقيقة
  IDLE_TTL: 120 * 1000,      // 120 ثانية
  LOG_MAX: 500,              // أقصى عدد سجلات
  COUNTER_KEY: "_jo_user_count",
  LOG_KEY: "_jo_connection_log"
};

// =====================
// 🚦 الاتصالات
// =====================
var DIRECT_CONN = "DIRECT";
var BLOCK = "PROXY 127.0.0.1:9";

// =====================
// 🇯🇴 IPs الأردن — كاملة ومحدثة 2025
// =====================
var JORDAN_ALL_IPV4 = [
  // === Zain Jordan ===
  ["92.253.0.0",    "255.255.0.0"],
  ["92.253.128.0",  "255.255.128.0"],
  ["92.254.0.0",    "255.254.0.0"],

  // === Orange Jordan ===
  ["46.185.0.0",    "255.255.0.0"],
  ["149.200.0.0",   "255.255.0.0"],
  ["149.200.128.0", "255.255.128.0"],
  ["149.201.0.0",   "255.255.0.0"],

  // === Umniah ===
  ["94.249.0.0",    "255.255.0.0"],
  ["86.108.0.0",    "255.255.0.0"],
  ["86.109.0.0",    "255.255.0.0"],

  // === Jordan Broadband (ASE/JCS) ===
  ["176.29.0.0",    "255.255.0.0"],
  ["176.30.0.0",    "255.254.0.0"],
  ["5.44.0.0",      "255.252.0.0"],
  ["5.48.0.0",      "255.252.0.0"],
  ["5.52.0.0",      "255.252.0.0"],

  // === إضافات حديثة 2025 ===
  ["31.22.0.0",     "255.254.0.0"],
  ["37.29.0.0",     "255.255.0.0"],
  ["185.120.0.0",   "255.255.252.0"],
  ["185.123.0.0",   "255.255.252.0"],
  ["185.124.0.0",   "255.255.252.0"],
  ["46.21.0.0",     "255.254.0.0"],
  ["46.20.0.0",     "255.254.0.0"],

  // === Data Centers الأردن ===
  ["194.170.18.0",  "255.255.255.0"],
  ["194.170.19.0",  "255.255.255.0"],
  ["194.170.20.0",  "255.255.255.0"],

  // === Fixed IPs ===
  ["46.185.131.218","255.255.255.255"],
  ["92.253.1.1",    "255.255.255.255"],
  ["94.249.1.1",    "255.255.255.255"]
];

// =====================
// 🎮 نطاقات PUBG — كاملة
// =====================
var PUBG_HOSTS = {
  // === Core ===
  core: [
    "*.pubgmobile.com", "*.tencent.com", "*.qq.com",
    "*.igamecj.com", "*.proximabeta.com", "*.gcloudcs.com",
    "*.gsgames.qq.com", "*.cloud.tc.qq.com", "*.wxqlog.qq.com",
    "*.game.qq.com", "*.speedtest.gcloud.qq.com"
  ],

  // === Lobby ===
  lobby: [
    "*.cdn.pubgmobile.com", "*.dlied1.qq.com",
    "*.download.pubgmobile.com", "*.webpubgmobile.com",
    "*.account.pubgmobile.com", "*.service.pubgmobile.com",
    "*.social.pubgmobile.com", "*.friends.pubgmobile.com",
    "*.profile.pubgmobile.com", "*.cdn.tencent.com",
    "*.res.pubgmobile.com", "*.config.pubgmobile.com",
    "*.api.pubgmobile.com", "*.login.pubgmobile.com",
    "*.store.pubgmobile.com", "*.event.pubgmobile.com",
    "*.lobby.pubgmobile.com", "*.shop.pubgmobile.com"
  ],

  // === Match ===
  match: [
    "*.battle.pubgmobile.com", "*.match.pubgmobile.com",
    "*.room.pubgmobile.com", "*.arena.pubgmobile.com",
    "*.ranked.pubgmobile.com", "*.classic.pubgmobile.com",
    "*.arcade.pubgmobile.com", "*.training.pubgmobile.com"
  ],

  // === Voice ===
  voice: [
    "*.voice.pubgmobile.com", "*.voip.pubgmobile.com",
    "*.rtc.pubgmobile.com", "*.audio.pubgmobile.com",
    "*.sound.pubgmobile.com", "*.mic.pubgmobile.com",
    "*.rtp.pubgmobile.com", "*.media.pubgmobile.com",
    "*.trtc.tencentcloud.com", "*.trrtc.tencentcloud.com",
    "*.tim.qq.com", "*.ims.qq.com",
    "*.wss.pubgmobile.com", "*.signal.pubgmobile.com"
  ],

  // === Anti-Cheat ===
  security: [
    "*.security.pubgmobile.com", "*.anticheat.pubgmobile.com",
    "*.protect.pubgmobile.com", "*.shield.pubgmobile.com",
    "*.detect.pubgmobile.com", "*.verify.pubgmobile.com"
  ],

  // === Wildcards ===
  wildcard: [
    "*-match*", "*battle*", "*room*", "*arena*",
    "*lobby*", "*login*", "*social*", "*friend*",
    "*ranked*", "*classic*", "*arcade*", "*training*"
  ]
};

// =====================
// ✅ جميع النطاقات مدمجة
// =====================
var ALL_PUBG_HOSTS = []
  .concat(PUBG_HOSTS.core)
  .concat(PUBG_HOSTS.lobby)
  .concat(PUBG_HOSTS.match)
  .concat(PUBG_HOSTS.voice)
  .concat(PUBG_HOSTS.security)
  .concat(PUBG_HOSTS.wildcard);

// =====================
// 📊 نظام العدّاد والتسجيل
// =====================
var Stats = {
  totalConnections: 0,
  joConnections: 0,
  blockedConnections: 0,
  uniqueIPs: {},
  log: [],

  increment(key) {
    if (key === "jo") this.joConnections++;
    if (key === "blocked") this.blockedConnections++;
    this.totalConnections++;
  },

  addIP(ip) {
    if (!ip) return;
    this.uniqueIPs[ip] = (this.uniqueIPs[ip] || 0) + 1;
  },

  addLog(host, ip, action) {
    if (!CONFIG.DEBUG) return;
    var entry = {
      time: new Date().toISOString(),
      host: host,
      ip: ip || "unknown",
      action: action
    };
    this.log.unshift(entry);
    if (this.log.length > CONFIG.LOG_MAX) this.log.pop();
  },

  getSummary() {
    return {
      total: this.totalConnections,
      jo: this.joConnections,
      blocked: this.blockedConnections,
      uniqueUsers: Object.keys(this.uniqueIPs).length,
      topIPs: Object.entries(this.uniqueIPs)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
    };
  },

  // حفظ في localStorage (لو متوفر)
  save() {
    try {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(CONFIG.COUNTER_KEY, JSON.stringify({
          total: this.totalConnections,
          jo: this.joConnections,
          blocked: this.blockedConnections,
          uniqueIPs: this.uniqueIPs,
          lastUpdated: new Date().toISOString()
        }));
        localStorage.setItem(CONFIG.LOG_KEY, JSON.stringify(this.log.slice(0, 50)));
      }
    } catch (e) { /* ignore */ }
  },

  load() {
    try {
      if (typeof localStorage !== "undefined") {
        var data = localStorage.getItem(CONFIG.COUNTER_KEY);
        if (data) {
          var parsed = JSON.parse(data);
          this.totalConnections = parsed.total || 0;
          this.joConnections = parsed.jo || 0;
          this.blockedConnections = parsed.blocked || 0;
          this.uniqueIPs = parsed.uniqueIPs || {};
        }
      }
    } catch (e) { /* ignore */ }
  }
};

// Load previous stats
Stats.load();

// =====================
// 🔧 Helper Functions
// =====================
function isPlainIPv4(h) {
  return /^\d+\.\d+\.\d+\.\d+$/.test(h);
}

function dnsSafe(h) {
  try {
    return dnsResolve(h);
  } catch (e) {
    return null;
  }
}

function toNum(ip) {
  var p = ip.split(".");
  if (p.length !== 4) return 0;
  return (((+p[0]) << 24) >>> 0) +
         (((+p[1]) << 16) >>> 0) +
         (((+p[2]) << 8) >>> 0) +
         ((+p[3]) >>> 0);
}

function ipInList(ip, lst) {
  if (!ip || !isPlainIPv4(ip)) return false;
  var n = toNum(ip);
  for (var i = 0; i < lst.length; i++) {
    var b = toNum(lst[i][0]);
    var m = toNum(lst[i][1]);
    if ((n & m) === (b & m)) return true;
  }
  return false;
}

function isJordanIP(ip) {
  if (!ip) return false;
  return ipInList(ip, JORDAN_ALL_IPV4);
}

function hostMatches(host, patterns) {
  for (var i = 0; i < patterns.length; i++) {
    if (shExpMatch(host, patterns[i])) return true;
  }
  return false;
}

function isPUBGHost(host) {
  return hostMatches(host, ALL_PUBG_HOSTS);
}

function isVoiceHost(host) {
  return hostMatches(host, PUBG_HOSTS.voice);
}

function isSecurityHost(host) {
  return hostMatches(host, PUBG_HOSTS.security);
}

function isMatchHost(host) {
  return hostMatches(host, PUBG_HOSTS.match) ||
         hostMatches(host, ["*-match*", "*battle*", "*room*", "*arena*"]);
}

function isLobbyHost(host) {
  return hostMatches(host, PUBG_HOSTS.lobby) ||
         hostMatches(host, ["*lobby*", "*login*", "*social*"]);
}

function getNet24(ip) {
  var p = ip.split(".");
  return p[0] + "." + p[1] + "." + p[2];
}

function nowMs() {
  return new Date().getTime();
}

// =====================
// 🔒 Session Management
// =====================
var SESSION = {
  matchHost: null,
  matchIP: null,
  matchNet24: null,
  locked: false,
  startedAt: 0,
  lastSeen: 0,

  lock(host, ip) {
    this.matchHost = host;
    this.matchIP = ip;
    this.matchNet24 = getNet24(ip);
    this.locked = true;
    this.startedAt = nowMs();
    this.lastSeen = nowMs();
    Stats.addLog(host, ip, "🔒 MATCH LOCKED");
    Stats.save();
  },

  unlock() {
    Stats.addLog(this.matchHost, this.matchIP, "🔓 MATCH UNLOCKED");
    this.matchHost = null;
    this.matchIP = null;
    this.matchNet24 = null;
    this.locked = false;
    this.startedAt = 0;
    this.lastSeen = 0;
    Stats.save();
  },

  isExpired() {
    if (!this.locked) return false;
    var now = nowMs();
    if ((now - this.startedAt) > CONFIG.MATCH_TTL) return true;
    if ((now - this.lastSeen) > CONFIG.IDLE_TTL) return true;
    return false;
  },

  touch() {
    this.lastSeen = nowMs();
  }
};

// =====================
// 🚀 MAIN FUNCTION
// =====================
function FindProxyForURL(url, host) {

  // ============================================
  // 1️⃣ Local / Private IPs = DIRECT
  // ============================================
  if (isPlainHostName(host) ||
      shExpMatch(host, "localhost") ||
      isInNet(host, "127.0.0.0", "255.0.0.0") ||
      isInNet(host, "10.0.0.0", "255.0.0.0") ||
      isInNet(host, "172.16.0.0", "255.240.0.0") ||
      isInNet(host, "192.168.0.0", "255.255.0.0")) {
    return DIRECT_CONN;
  }

  // ============================================
  // 2️⃣ ليس PUBG = DIRECT
  // ============================================
  if (!isPUBGHost(host)) {
    return DIRECT_CONN;
  }

  // ============================================
  // 3️⃣ صوت = DIRECT دائماً (لا تأخير)
  // ============================================
  if (isVoiceHost(host)) {
    Stats.addLog(host, "voice", "🔊 VOICE DIRECT");
    return DIRECT_CONN;
  }

  // ============================================
  // 4️⃣ حماية = DIRECT دائماً
  // ============================================
  if (isSecurityHost(host)) {
    Stats.addLog(host, "security", "🛡️ SECURITY DIRECT");
    return DIRECT_CONN;
  }

  // ============================================
  // 5️⃣ DNS Lookup
  // ============================================
  var ip = isPlainIPv4(host) ? host : dnsSafe(host);

  // ============================================
  // 6️⃣ Session Lock Check
  // ============================================
  if (SESSION.isExpired()) {
    SESSION.unlock();
  }

  if (SESSION.locked) {
    var curNet24 = ip ? getNet24(ip) : "";

    // ✅ نفس الـ host المقفل = يمر
    if (SESSION.matchHost && host === SESSION.matchHost) {
      SESSION.touch();
      Stats.addLog(host, ip, "✅ LOCKED SAME HOST");
      return DIRECT_CONN;
    }

    // ✅ نفس IP = يمر
    if (SESSION.matchIP && ip === SESSION.matchIP) {
      SESSION.touch();
      Stats.addLog(host, ip, "✅ LOCKED SAME IP");
      return DIRECT_CONN;
    }

    // ✅ نفس net24 = يمر
    if (SESSION.matchNet24 && curNet24 === SESSION.matchNet24) {
      SESSION.touch();
      Stats.addLog(host, ip, "✅ LOCKED SAME NET24");
      return DIRECT_CONN;
    }

    // ✅ نطاق فريقك (lobby/match) = يمر
    if (isMatchHost(host) || isLobbyHost(host)) {
      if (ip && isJordanIP(ip)) {
        SESSION.touch();
        Stats.addLog(host, ip, "✅ TEAM HOST JO");
        Stats.addIP(ip);
        Stats.increment("jo");
        Stats.save();
        return DIRECT_CONN;
      }
    }

    // 🔴 غير أردني = BLOCK
    if (CONFIG.BLOCK_NON_JO && ip && !isJordanIP(ip)) {
      Stats.addLog(host, ip, "🚫 BLOCKED NON-JO (LOCKED)");
      Stats.increment("blocked");
      Stats.save();
      return BLOCK;
    }

    SESSION.touch();
    return DIRECT_CONN;
  }

  // ============================================
  // 7️⃣ بداية مباراة جديدة
  // ============================================
  if (isMatchHost(host)) {
    if (!ip) {
      Stats.addLog(host, "no-ip", "🚫 BLOCKED NO IP");
      return BLOCK;
    }

    // فقط أردني يبدأ مباراة
    if (!isJordanIP(ip)) {
      Stats.addLog(host, ip, "🚫 BLOCKED NON-JO MATCH");
      Stats.increment("blocked");
      Stats.save();
      return BLOCK;
    }

    // ✅ بداية مباراة أردنية
    SESSION.lock(host, ip);
    Stats.addIP(ip);
    Stats.increment("jo");
    Stats.save();
    return DIRECT_CONN;
  }

  // ============================================
  // 8️⃣ Lobby
  // ============================================
  if (isLobbyHost(host)) {
    if (ip) {
      if (isJordanIP(ip)) {
        Stats.addLog(host, ip, "🟡 LOBBY JO");
        Stats.addIP(ip);
        Stats.increment("jo");
        Stats.save();
        return DIRECT_CONN;
      } else {
        if (CONFIG.BLOCK_NON_JO) {
          Stats.addLog(host, ip, "🚫 BLOCKED NON-JO LOBBY");
          Stats.increment("blocked");
          Stats.save();
          return BLOCK;
        }
      }
    }
    // لو DNS فشل = حظر
    return BLOCK;
  }

  // ============================================
  // 9️⃣ PUBG عام
  // ============================================
  if (isPUBGHost(host)) {
    if (ip) {
      if (isJordanIP(ip)) {
        Stats.addLog(host, ip, "🟢 PUBG JO");
        Stats.addIP(ip);
        Stats.increment("jo");
        Stats.save();
        return DIRECT_CONN;
      } else {
        if (CONFIG.BLOCK_NON_JO) {
          Stats.addLog(host, ip, "🚫 BLOCKED NON-JO PUBG");
          Stats.increment("blocked");
          Stats.save();
          return BLOCK;
        }
      }
    }
    return DIRECT_CONN;
  }

  // ============================================
  // 🔟 أي شيء آخر = DIRECT
  // ============================================
  return DIRECT_CONN;
}

// ============================================================
// 📊 دالة عرض الإحصائيات (للاستخدام في Console)
// ============================================================
function showStats() {
  var s = Stats.getSummary();
  var msg = "\n" +
    "╔══════════════════════════════════════╗\n" +
    "║  🇯🇴 JORDAN LOBBY STATS            ║\n" +
    "╠══════════════════════════════════════╣\n" +
    "║  Total Connections: " + pad(s.total, 10) + " ║\n" +
    "║  ✅ Jordan:         " + pad(s.jo, 10) + " ║\n" +
    "║  🚫 Blocked:        " + pad(s.blocked, 10) + " ║\n" +
    "║  👥 Unique Users:   " + pad(s.uniqueUsers, 10) + " ║\n" +
    "╠══════════════════════════════════════╣\n" +
    "║  Top 5 IPs:                        ║\n";
  s.topIPs.forEach(function(pair) {
    msg += "║    " + pad(pair[0], 15) + " ×" + pad(pair[1], 4) + "        ║\n";
  });
  msg += "╚══════════════════════════════════════╝\n";
  return msg;
}

function pad(str, len) {
  str = String(str);
  while (str.length < len) str += " ";
  return str;
}
