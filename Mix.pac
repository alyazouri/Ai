// ============================================================
// PUBG MOBILE — JO Hybrid Ultra Lock PAC
// دمج ميزات: Fast + Q + VIP
// الهدف: Lobby سريع + Match ثابت + Lock أثناء المباراة + Direct للصوت/الحماية
// ============================================================

var PX = "46.185.131.218";

// فصل اللّوبي عن الماتش
var LOBBY_PROXY = "SOCKS5 " + PX + ":443; SOCKS " + PX + ":8443; DIRECT";
var MATCH_PROXY = "SOCKS5 " + PX + ":20001; SOCKS " + PX + ":20002; DIRECT";

var DIRECT_CONN = "DIRECT";
var BLOCK = "PROXY 127.0.0.1:9";

// ================= SESSION =================
var SESSION = {
  matchHost: null,
  matchNet24: null,
  matchIP: null,
  locked: false,
  startedAt: 0,
  lastSeen: 0
};

var MATCH_LOCK_TTL = 45 * 60 * 1000; // 45 min
var RESET_IDLE_TTL = 90 * 1000;      // reset after 90 sec idle

// ================= HELPERS =================
function isPlainIPv4(host) {
  return /^\d+\.\d+\.\d+\.\d+$/.test(host);
}

function dnsSafe(host) {
  try { return dnsResolve(host); } catch (e) { return null; }
}

function toNum(ip) {
  var p = ip.split(".");
  if (p.length !== 4) return 0;
  return (((+p[0]) << 24) >>> 0) + (((+p[1]) << 16) >>> 0) + (((+p[2]) << 8) >>> 0) + ((+p[3]) >>> 0);
}

function maskNum(mask) {
  return toNum(mask);
}

function ipInList(ip, list) {
  if (!ip || !isPlainIPv4(ip)) return false;
  var n = toNum(ip);
  for (var i = 0; i < list.length; i++) {
    var base = toNum(list[i][0]);
    var mask = maskNum(list[i][1]);
    if ((n & mask) === (base & mask)) return true;
  }
  return false;
}

function getNet24(ip) {
  var p = ip.split(".");
  if (p.length !== 4) return "";
  return p[0] + "." + p[1] + "." + p[2];
}

function nowMs() {
  return new Date().getTime();
}

function resetSession() {
  SESSION.matchHost = null;
  SESSION.matchNet24 = null;
  SESSION.matchIP = null;
  SESSION.locked = false;
  SESSION.startedAt = 0;
  SESSION.lastSeen = 0;
}

function shouldExpireSession() {
  var now = nowMs();
  if (!SESSION.locked) return false;
  if ((now - SESSION.startedAt) > MATCH_LOCK_TTL) return true;
  if ((now - SESSION.lastSeen) > RESET_IDLE_TTL) return true;
  return false;
}

// ================= DOMAINS =================

// Direct للصوت والحماية حتى ما يصير تأخير إضافي
var DIRECT_HOSTS = [
  "*.voice.pubgmobile.com",
  "*.voip.pubgmobile.com",
  "*.rtc.pubgmobile.com",
  "*.audio.pubgmobile.com",
  "*.sound.pubgmobile.com",
  "*.mic.pubgmobile.com",
  "*.rtp.pubgmobile.com",
  "*.media.pubgmobile.com",
  "*.live.pubgmobile.com",
  "*.streaming.pubgmobile.com",
  "*.trtc.tencentcloud.com",
  "*.tim.qq.com",
  "*.ims.qq.com",
  "*.security.pubgmobile.com",
  "*.anticheat.pubgmobile.com",
  "*.protect.pubgmobile.com",
  "*.shield.pubgmobile.com"
];

// Hosts للماتش
var MATCH_HOSTS = [
  "*.igamecj.com",
  "*.tencent.com",
  "*.pubgmobile.com",
  "*.proximabeta.com",
  "*.gcloudcs.com",
  "*.gsgames.qq.com",
  "*.wxqlog.qq.com",
  "*.cloud.tc.qq.com"
];

// Hosts للّوبي/الخدمات العامة
var LOBBY_HOSTS = [
  "*.cdn.pubgmobile.com",
  "*.dlied1.qq.com",
  "*.download.pubgmobile.com",
  "*.webpubgmobile.com",
  "*.account.pubgmobile.com",
  "*.service.pubgmobile.com",
  "*.social.pubgmobile.com",
  "*.friends.pubgmobile.com",
  "*.profile.pubgmobile.com",
  "*.cdn.tencent.com"
];

// ================= JORDAN IPV4 =================
// دمج ضيق للماتش + أوسع شوي للّوبي
var JORDAN_MATCH_IPV4 = [
  ["92.253.0.0",   "255.255.128.0"],
  ["46.185.128.0", "255.255.128.0"],
  ["149.200.128.0","255.255.128.0"],
  ["94.249.0.0",   "255.255.128.0"],
  ["86.108.0.0",   "255.255.128.0"]
];

var JORDAN_WIDE_IPV4 = [
  ["94.249.0.0",   "255.255.128.0"],
  ["86.108.0.0",   "255.255.128.0"],
  ["176.29.0.0",   "255.255.0.0"],
  ["92.253.0.0",   "255.255.128.0"],
  ["46.185.128.0", "255.255.128.0"],
  ["149.200.128.0","255.255.128.0"],
  ["5.44.0.0",     "255.252.0.0"],
  ["5.48.0.0",     "255.252.0.0"],
  ["5.52.0.0",     "255.252.0.0"]
];

// ================= MATCHERS =================
function hostMatchesAny(host, arr) {
  for (var i = 0; i < arr.length; i++) {
    if (shExpMatch(host, arr[i])) return true;
  }
  return false;
}

function isDirectHost(host) {
  return hostMatchesAny(host, DIRECT_HOSTS);
}

function isMatchHost(host) {
  return hostMatchesAny(host, MATCH_HOSTS)
    || shExpMatch(host, "*-match*")
    || shExpMatch(host, "*game*.qq.com")
    || shExpMatch(host, "*battle*");
}

function isLobbyHost(host) {
  return hostMatchesAny(host, LOBBY_HOSTS)
    || shExpMatch(host, "*lobby*")
    || shExpMatch(host, "*login*")
    || shExpMatch(host, "*social*")
    || shExpMatch(host, "*friend*");
}

// ================= MAIN =================
function FindProxyForURL(url, host) {
  if (shouldExpireSession()) resetSession();

  // Local / safe direct
  if (isPlainHostName(host) ||
      shExpMatch(host, "localhost") ||
      isInNet(host, "127.0.0.0", "255.0.0.0") ||
      isInNet(host, "10.0.0.0", "255.0.0.0") ||
      isInNet(host, "172.16.0.0", "255.240.0.0") ||
      isInNet(host, "192.168.0.0", "255.255.0.0")) {
    return DIRECT_CONN;
  }

  // Direct للصوت والحماية
  if (isDirectHost(host)) {
    return DIRECT_CONN;
  }

  var ip = isPlainIPv4(host) ? host : dnsSafe(host);

  // أثناء المباراة: تثبيت كامل على نفس host + net24
  if (SESSION.locked) {
    if (!ip) return BLOCK;

    var currentNet24 = getNet24(ip);

    // اسم المضيف تغيّر = بلوك
    if (SESSION.matchHost && host !== SESSION.matchHost) {
      // اسم مختلف لكن نفس السيرفر أحيانًا يحصل عبر CNAME
      // نسمح فقط إذا نفس IP ونفس net24
      if (!(SESSION.matchIP === ip && SESSION.matchNet24 === currentNet24)) {
        return BLOCK;
      }
    }

    // الخروج من نفس الشبكة المقفلة = بلوك
    if (SESSION.matchNet24 && currentNet24 !== SESSION.matchNet24) {
      return BLOCK;
    }

    SESSION.lastSeen = nowMs();
    return MATCH_PROXY;
  }

  // Match detection
  if (isMatchHost(host)) {
    if (!ip) return BLOCK;

    // لو IP ليس أردنيًا من الرينجات المخصصة للماتش، امنعه
    if (!ipInList(ip, JORDAN_MATCH_IPV4) && !ipInList(ip, JORDAN_WIDE_IPV4)) {
      return BLOCK;
    }

    SESSION.matchHost = host;
    SESSION.matchIP = ip;
    SESSION.matchNet24 = getNet24(ip);
    SESSION.locked = true;
    SESSION.startedAt = nowMs();
    SESSION.lastSeen = SESSION.startedAt;

    return MATCH_PROXY;
  }

  // Lobby / social / CDN
  if (isLobbyHost(host)) {
    // إذا عرفنا الـ IP وكان ضمن الأردن، استخدم لّوبي
    if (ip && ipInList(ip, JORDAN_WIDE_IPV4)) {
      return LOBBY_PROXY;
    }
    // لو غير معروف، نبقيه لّوبي بدل بلوك حتى ما ينكسر تسجيل الدخول
    return LOBBY_PROXY;
  }

  // PUBG/Tencent عام
  if (shExpMatch(host, "*.pubgmobile.com") ||
      shExpMatch(host, "*.qq.com") ||
      shExpMatch(host, "*.tencent.com") ||
      shExpMatch(host, "*.proximabeta.com")) {
    if (ip && ipInList(ip, JORDAN_WIDE_IPV4)) return LOBBY_PROXY;
    return DIRECT_CONN;
  }

  // أي شيء خارج اللعبة: مباشر
  return DIRECT_CONN;
}
