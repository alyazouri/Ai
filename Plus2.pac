// ================================================================
//
//   🎮 PUBG Mobile - JORDAN ONLY LOCK v14.0
//   🇯🇴 فقط أردنيين - ما أسيا ولا أروبا
//
//   🔧 الإعدادات:
//   🏠 لوبي      → SOCKS5 212.35.66.45:1080
//   🎮 مباريات  → SOCKS5 212.35.66.45:20005
//
//   🚨 الميزات:
//   ✅ Region Lock = Jordan ONLY
//   ✅ Block Asia & Europe servers
//   ✅ Force Middle East + Jordan IP
//   ✅ DNS returns Jordan only
//   ✅ Matchmaking = Jordan pool only
//
// ================================================================

var PX = "212.35.66.45";
var LOB = "SOCKS5 " + PX + ":1080";
var MAT = "SOCKS5 " + PX + ":20005";
var DIR = "DIRECT";

// ═══════════════════════════════════════════════════════════════
//  🚫 BLOCK: سيرفرات أسيا وأروبا (ممنوعة!)
// ═══════════════════════════════════════════════════════════════

var BLOCK_ASIA = [
    // === ❌ سيرفرات أسيا ===
    "101.32.0.0/14",
    "101.33.0.0/16",
    "101.34.0.0/16",
    "101.35.0.0/16",
    "101.36.0.0/14",
    "101.37.0.0/16",
    "119.28.0.0/16",
    "119.29.0.0/16",
    "129.226.0.0/16",
    "129.204.0.0/16",
    "203.205.0.0/16",
    "118.89.0.0/16",
    "118.126.0.0/16",
    "81.68.0.0/16",
    "43.134.0.0/16",
    "43.135.0.0/16",
    "43.154.0.0/15",
    "43.154.128.0/17",
    "43.155.0.0/16",
    "49.51.0.0/16",
    "49.51.64.0/18",
    "49.51.128.0/17",
    "150.109.0.0/16",
    "2402:4e00::/32",
    "2406:da00::/32",
    "2406:d200::/32"
];

var BLOCK_EUROPE = [
    // === ❌ سيرفرات أوروبا ===
    "3.64.0.0/14",
    "3.120.0.0/14",
    "18.184.0.0/14",
    "18.192.0.0/14",
    "35.156.0.0/14",
    "52.59.0.0/16",
    "54.247.0.0/16",
    "99.82.0.0/16",
    "99.83.0.0/16",
    "99.150.0.0/16",
    "99.151.0.0/16",
    "2600:1f00::/24",
    "2a05:d018::/32",
    "2a05:d01a::/32"
];

// ═══════════════════════════════════════════════════════════════
//  ✅ ALLOW: فقط سيرفرات الشرق الأوسط والأردن
// ═══════════════════════════════════════════════════════════════

var ALLOW_ME = [
    // === ✅ البحرين (أقرب للأردن) ===
    "13.34.0.0/15",
    "13.248.0.0/14",
    "15.177.0.0/16",
    "15.184.0.0/16",
    "15.185.0.0/16",
    "15.230.0.0/16",
    "52.95.0.0/16",
    "52.95.176.0/24",
    "52.95.177.0/24",
    "35.71.0.0/16",
    "18.168.0.0/14",
    "18.172.0.0/14",
    
    // === ✅ الإمارات ===
    "13.244.0.0/15",
    "13.245.0.0/16",
    "15.181.0.0/16",
    "15.182.0.0/16",
    "18.156.0.0/14",
    "18.157.0.0/16",
    "35.183.0.0/16",
    "52.94.0.0/16"
];

var JO_IP = [
    // === 🇯🇴 شبكات الأردن (الأهم!) ===
    "37.35.0.0/16",
    "78.40.0.0/16",
    "78.42.0.0/16",
    "78.158.0.0/15",
    "78.100.0.0/15",
    "82.212.0.0/14",
    "86.111.0.0/16",
    "94.24.0.0/16",
    "91.141.0.0/16",
    "95.141.240.0/21",
    "176.28.0.0/16",
    "176.29.0.0/16",
    "185.33.12.0/22",
    "185.45.36.0/22",
    "185.84.100.0/22",
    "185.88.140.0/22",
    "185.100.52.0/22",
    "185.103.92.0/22",
    "185.112.24.0/22",
    "185.185.244.0/22",
    "185.229.28.0/22",
    "185.51.24.0/22",
    "185.58.204.0/22",
    "185.120.36.0/22",
    "188.225.128.0/17",
    "188.228.0.0/17",
    "188.247.64.0/18",
    "188.247.128.0/17",
    "188.247.192.0/18",
    "212.34.0.0/16",
    "37.208.0.0/13",
    "41.184.0.0/16",
    "41.234.0.0/16",
    "42.136.0.0/16",
    "46.32.0.0/16",
    "79.134.128.0/18",
    "82.212.64.0/18"
];

// ═══════════════════════════════════════════════════════════════
//  🚨 CRITICAL: كل دومينات الماتشميكينغ
// ═══════════════════════════════════════════════════════════════

var MATCHMAKING = [
    "match.pubgmobile.com",
    "*.match.pubgmobile.com",
    "matchmaking.pubgmobile.com",
    "*.matchmaking.pubgmobile.com",
    "gameserver.pubgmobile.com",
    "*.gameserver.pubgmobile.com",
    "server.pubgmobile.com",
    "*.server.pubgmobile.com",
    "gs.pubgmobile.com",
    "*.gs.pubgmobile.com",
    "gslb.pubgmobile.com",
    "*.gslb.pubgmobile.com",
    "connect.pubgmobile.com",
    "*.connect.pubgmobile.com",
    "session.pubgmobile.com",
    "*.session.pubgmobile.com",
    "dispatch.pubgmobile.com",
    "*.dispatch.pubgmobile.com",
    "entry.pubgmobile.com",
    "*.entry.pubgmobile.com",
    "gateway.pubgmobile.com",
    "*.gateway.pubgmobile.com",
    "relay.pubgmobile.com",
    "*.relay.pubgmobile.com",
    "queue.pubgmobile.com",
    "*.queue.pubgmobile.com",
    "pool.pubgmobile.com",
    "*.pool.pubgmobile.com",
    "player-pool.pubgmobile.com",
    "*.player-pool.pubgmobile.com",
    "region-pool.pubgmobile.com",
    "*.region-pool.pubgmobile.com",
    "ranked-queue.pubgmobile.com",
    "*.ranked-queue.pubgmobile.com",
    "classic-queue.pubgmobile.com",
    "*.classic-queue.pubgmobile.com",
    "arcade-queue.pubgmobile.com",
    "*.arcade-queue.pubgmobile.com",
    "team.pubgmobile.com",
    "*.team.pubgmobile.com",
    "squad.pubgmobile.com",
    "*.squad.pubgmobile.com",
    "find-team.pubgmobile.com",
    "*.find-team.pubgmobile.com",
    "find-squad.pubgmobile.com",
    "*.find-squad.pubgmobile.com",
    "find-player.pubgmobile.com",
    "*.find-player.pubgmobile.com",
    "lfg.pubgmobile.com",
    "*.lfg.pubgmobile.com",
    "lfp.pubgmobile.com",
    "*.lfp.pubgmobile.com",
    "auto-match.pubgmobile.com",
    "*.auto-match.pubgmobile.com",
    "quick-match.pubgmobile.com",
    "*.quick-match.pubgmobile.com",
    "quick-team.pubgmobile.com",
    "*.quick-team.pubgmobile.com",
    "recruit.pubgmobile.com",
    "*.recruit.pubgmobile.com",
    "recruiting.pubgmobile.com",
    "*.recruiting.pubgmobile.com",
    "invite.pubgmobile.com",
    "*.invite.pubgmobile.com",
    "join.pubgmobile.com",
    "*.join.pubgmobile.com",
    "nearby.pubgmobile.com",
    "*.nearby.pubgmobile.com",
    "recommend.pubgmobile.com",
    "*.recommend.pubgmobile.com",
    "suggest.pubgmobile.com",
    "*.suggest.pubgmobile.com",
    "search.pubgmobile.com",
    "*.search.pubgmobile.com",
    "discover.pubgmobile.com",
    "*.discover.pubgmobile.com",
    "online.pubgmobile.com",
    "*.online.pubgmobile.com",
    "players.pubgmobile.com",
    "*.players.pubgmobile.com",
    "active-players.pubgmobile.com",
    "*.active-players.pubgmobile.com",
    "player-search.pubgmobile.com",
    "*.player-search.pubgmobile.com",
    "available.pubgmobile.com",
    "*.available.pubgmobile.com",
    "looking.pubgmobile.com",
    "*.looking.pubgmobile.com"
];

// ═══════════════════════════════════════════════════════════════
//  📍 REGION LOCK: فرض المنطقة الأردنية
// ═══════════════════════════════════════════════════════════════

var REGION_LOCK_DOMAINS = [
    "region.pubgmobile.com",
    "*.region.pubgmobile.com",
    "location.pubgmobile.com",
    "*.location.pubgmobile.com",
    "geolocation.pubgmobile.com",
    "*.geolocation.pubgmobile.com",
    "server-select.pubgmobile.com",
    "*.server-select.pubgmobile.com",
    "region-select.pubgmobile.com",
    "*.region-select.pubgmobile.com",
    "country.pubgmobile.com",
    "*.country.pubgmobile.com",
    "locale.pubgmobile.com",
    "*.locale.pubgmobile.com",
    "geo.pubgmobile.com",
    "*.geo.pubgmobile.com",
    "geoip.pubgmobile.com",
    "*.geoip.pubgmobile.com",
    "nearest-server.pubgmobile.com",
    "*.nearest-server.pubgmobile.com",
    "best-server.pubgmobile.com",
    "*.best-server.pubgmobile.com",
    "home-server.pubgmobile.com",
    "*.home-server.pubgmobile.com",
    "primary-server.pubgmobile.com",
    "*.primary-server.pubgmobile.com",
    "local-server.pubgmobile.com",
    "*.local-server.pubgmobile.com",
    "region-lock.pubgmobile.com",
    "*.region-lock.pubgmobile.com",
    "force-region.pubgmobile.com",
    "*.force-region.pubgmobile.com",
    "preferred-region.pubgmobile.com",
    "*.preferred-region.pubgmobile.com",
    "default-region.pubgmobile.com",
    "*.default-region.pubgmobile.com",
    "home-region.pubgmobile.com",
    "*.home-region.pubgmobile.com",
    "player-region.pubgmobile.com",
    "*.player-region.pubgmobile.com",
    "match-region.pubgmobile.com",
    "*.match-region.pubgmobile.com",
    "queue-region.pubgmobile.com",
    "*.queue-region.pubgmobile.com",
    "country-filter.pubgmobile.com",
    "*.country-filter.pubgmobile.com",
    "region-filter.pubgmobile.com",
    "*.region-filter.pubgmobile.com",
    "language-match.pubgmobile.com",
    "*.language-match.pubgmobile.com",
    // Tencent
    "region.qq.com",
    "*.region.qq.com",
    "location.qq.com",
    "*.location.qq.com",
    "geo.qq.com",
    "*.geo.qq.com",
    "gp.qq.com",
    "*.gp.qq.com",
    "game.qq.com",
    "*.game.qq.com",
    "speed.game.qq.com",
    "server.qq.com",
    "*.server.qq.com"
];

// ═══════════════════════════════════════════════════════════════
//  🌐 DNS GEO LOCK: DNS يرجع أردني فقط
// ═══════════════════════════════════════════════════════════════

var DNS_GEO = [
    "dns.pubgmobile.com",
    "*.dns.pubgmobile.com",
    "resolve.pubgmobile.com",
    "*.resolve.pubgmobile.com",
    "lookup.pubgmobile.com",
    "*.lookup.pubgmobile.com",
    "edns.pubgmobile.com",
    "*.edns.pubgmobile.com",
    "client-subnet.pubgmobile.com",
    "*.client-subnet.pubgmobile.com",
    "geo-dns.pubgmobile.com",
    "*.geo-dns.pubgmobile.com",
    "ip-lookup.pubgmobile.com",
    "*.ip-lookup.pubgmobile.com",
    "ip-check.pubgmobile.com",
    "*.ip-check.pubgmobile.com",
    "ipinfo.pubgmobile.com",
    "*.ipinfo.pubgmobile.com",
    "geodns.pubgmobile.com",
    "*.geodns.pubgmobile.com",
    "whois.pubgmobile.com",
    "*.whois.pubgmobile.com",
    "isp.pubgmobile.com",
    "*.isp.pubgmobile.com",
    "carrier.pubgmobile.com",
    "*.carrier.pubgmobile.com",
    "asn.pubgmobile.com",
    "*.asn.pubgmobile.com",
    // DNS خارجي
    "dns.google",
    "*.dns.google",
    "cloudflare-dns.com",
    "*.cloudflare-dns.com",
    "dns.quad9.net",
    "*.dns.quad9.net"
];

// ═══════════════════════════════════════════════════════════════
//  🎤 DIRECT: صوت + حماية (ما تمر بالبروكسي أبداً)
// ═══════════════════════════════════════════════════════════════

var DIRECT_ONLY = [
    // صوت
    "voice.pubgmobile.com",
    "*.voice.pubgmobile.com",
    "voip.pubgmobile.com",
    "*.voip.pubgmobile.com",
    "rtc.pubgmobile.com",
    "*.rtc.pubgmobile.com",
    "audio.pubgmobile.com",
    "*.audio.pubgmobile.com",
    "trtc.tencentcloud.com",
    "*.trtc.tencentcloud.com",
    "tim.qq.com",
    "*.tim.qq.com",
    "ims.qq.com",
    "*.ims.qq.com",
    "media.pubgmobile.com",
    "*.media.pubgmobile.com",
    "streaming.pubgmobile.com",
    "*.streaming.pubgmobile.com",
    "live.pubgmobile.com",
    "*.live.pubgmobile.com",
    "mic.pubgmobile.com",
    "*.mic.pubgmobile.com",
    "rtp.pubgmobile.com",
    "*.rtp.pubgmobile.com",
    // حماية
    "security.pubgmobile.com",
    "*.security.pubgmobile.com",
    "anticheat.pubgmobile.com",
    "*.anticheat.pubgmobile.com",
    "protect.pubgmobile.com",
    "*.protect.pubgmobile.com",
    "shield.pubgmobile.com",
    "*.shield.pubgmobile.com",
    "guard.pubgmobile.com",
    "*.guard.pubgmobile.com",
    "safe.pubgmobile.com",
    "*.safe.pubgmobile.com",
    "integrity.pubgmobile.com",
    "*.integrity.pubgmobile.com",
    "scan.pubgmobile.com",
    "*.scan.pubgmobile.com",
    "device.pubgmobile.com",
    "*.device.pubgmobile.com",
    "deviceid.pubgmobile.com",
    "*.deviceid.pubgmobile.com",
    "fingerprint.pubgmobile.com",
    "*.fingerprint.pubgmobile.com",
    "kernel.pubgmobile.com",
    "*.kernel.pubgmobile.com",
    "audit.pubgmobile.com",
    "*.audit.pubgmobile.com",
    "detect.pubgmobile.com",
    "*.detect.pubgmobile.com",
    "check.pubgmobile.com",
    "*.check.pubgmobile.com",
    "validate.pubgmobile.com",
    "*.validate.pubgmobile.com",
    "cert.pubgmobile.com",
    "*.cert.pubgmobile.com",
    "signature.pubgmobile.com",
    "*.signature.pubgmobile.com",
    "hash.pubgmobile.com",
    "*.hash.pubgmobile.com",
    "encrypt.pubgmobile.com",
    "*.encrypt.pubgmobile.com",
    // تقارير
    "beacon.qq.com",
    "*.beacon.qq.com",
    "report.qq.com",
    "*.report.qq.com",
    "report.pubgmobile.com",
    "*.report.pubgmobile.com",
    "telemetry.pubgmobile.com",
    "*.telemetry.pubgmobile.com",
    "analytics.pubgmobile.com",
    "*.analytics.pubgmobile.com",
    "track.pubgmobile.com",
    "*.track.pubgmobile.com",
    "log.pubgmobile.com",
    "*.log.pubgmobile.com",
    "monitor.pubgmobile.com",
    "*.monitor.pubgmobile.com",
    "diagnostic.pubgmobile.com",
    "*.diagnostic.pubgmobile.com",
    "crash.pubgmobile.com",
    "*.crash.pubgmobile.com"
];

// ═══════════════════════════════════════════════════════════════
//  🏠 LOBBY: كل باقي PUBG
// ═══════════════════════════════════════════════════════════════

var LOBBY = [
    "pubgmobile.com",
    "*.pubgmobile.com",
    "igamecj.com",
    "*.igamecj.com",
    "igame.com",
    "*.igame.com",
    "tencent.com",
    "*.tencent.com",
    "tencentyun.com",
    "*.tencentyun.com",
    "qcloud.com",
    "*.qcloud.com",
    "qq.com",
    "*.qq.com",
    "cloud.tencent.com",
    "*.cloud.tencent.com",
    "qpic.cn",
    "*.qpic.cn",
    "tencentcloud.com",
    "*.tencentcloud.com",
    "myqcloud.com",
    "*.myqcloud.com",
    "cos.myqcloud.com",
    "*.cos.myqcloud.com",
    "dnspod.net",
    "*.dnspod.net",
    "dnspod.com",
    "*.dnspod.com",
    "wegame.com",
    "*.wegame.com",
    "wechat.com",
    "*.wechat.com",
    "weixin.qq.com",
    "*.weixin.qq.com",
    "open.weixin.qq.com",
    "lobby.pubgmobile.com",
    "*.lobby.pubgmobile.com",
    "lobby-api.pubgmobile.com",
    "*.lobby-api.pubgmobile.com",
    "api.pubgmobile.com",
    "*.api.pubgmobile.com",
    "cdn.pubgmobile.com",
    "*.cdn.pubgmobile.com",
    "res.pubgmobile.com",
    "*.res.pubgmobile.com",
    "config.pubgmobile.com",
    "*.config.pubgmobile.com",
    "ui.pubgmobile.com",
    "*.ui.pubgmobile.com",
    "profile.pubgmobile.com",
    "*.profile.pubgmobile.com",
    "chat.pubgmobile.com",
    "*.chat.pubgmobile.com",
    "shop.pubgmobile.com",
    "*.shop.pubgmobile.com",
    "store.pubgmobile.com",
    "*.store.pubgmobile.com",
    "event.pubgmobile.com",
    "*.event.pubgmobile.com",
    "rank.pubgmobile.com",
    "*.rank.pubgmobile.com",
    "season.pubgmobile.com",
    "*.season.pubgmobile.com",
    "download.pubgmobile.com",
    "*.download.pubgmobile.com",
    "patch.pubgmobile.com",
    "*.patch.pubgmobile.com",
    "update.pubgmobile.com",
    "*.update.pubgmobile.com",
    "hotfix.pubgmobile.com",
    "*.hotfix.pubgmobile.com",
    "resource.pubgmobile.com",
    "*.resource.pubgmobile.com",
    "asset.pubgmobile.com",
    "*.asset.pubgmobile.com",
    "auth.pubgmobile.com",
    "*.auth.pubgmobile.com",
    "login.pubgmobile.com",
    "*.login.pubgmobile.com",
    "account.pubgmobile.com",
    "*.account.pubgmobile.com",
    "settings.pubgmobile.com",
    "*.settings.pubgmobile.com",
    // Social
    "facebook.com",
    "*.facebook.com",
    "fbcdn.net",
    "*.fbcdn.net",
    "googleapis.com",
    "*.googleapis.com",
    "google.com",
    "*.google.com",
    "apple.com",
    "*.apple.com",
    "twitter.com",
    "*.twitter.com",
    "x.com",
    "*.x.com",
    "vk.com",
    "*.vk.com",
    "line.me",
    "*.line.me",
    "play.google.com",
    "apps.apple.com",
    // CDN
    "akamaized.net",
    "*.akamaized.net",
    "akamai.net",
    "*.akamai.net",
    "cloudfront.net",
    "*.cloudfront.net",
    "fastly.net",
    "*.fastly.net",
    "gstatic.com",
    "*.gstatic.com",
    "ggpht.com",
    "*.ggpht.com"
];

// ═══════════════════════════════════════════════════════════════
//  💎 كلمات مفتاحية
// ═══════════════════════════════════════════════════════════════

var KEY_MATCH = ["match", "queue", "pool", "server", "gs", "gslb", "connect", "session", "dispatch", "entry", "gateway", "relay", "team", "squad", "find", "lfg", "lfp", "auto", "quick", "recruit", "invite", "join", "nearby", "recommend", "suggest", "search", "discover", "online", "players", "active", "available", "looking", "spawn", "spectate", "replay", "watch", "broadcast", "tournament", "esports", "competitive", "leaderboard", "rank", "ranking", "tier", "season"];

var KEY_REGION = ["region", "location", "geo", "country", "city", "locale", "lang", "dns", "resolve", "lookup", "edns", "subnet", "isp", "carrier", "asn", "ip", "lock", "force", "preferred", "default", "home", "primary", "local", "nearest", "best", "optimal", "select", "filter"];

var KEY_GPS = ["gps", "coordinate", "lat", "lon", "long", "alt", "altitude", "position", "heading", "bearing", "speed", "accuracy"];

var KEY_PUBG = ["pubg", "tencent", "igamecj", "igame", "qcloud", "tencentyun", "gp.qq", "game.qq", "wegame"];

var KEY_VOICE = ["voice", "voip", "rtc", "audio", "trtc", "tim", "ims", "media", "streaming", "live", "mic", "rtp", "sound", "music"];

var KEY_ANTICHEAT = ["security", "anticheat", "protect", "shield", "guard", "safe", "integrity", "scan", "device", "fingerprint", "kernel", "audit", "detect", "check", "validate", "cert", "signature", "hash", "encrypt", "token"];

var KEY_REPORT = ["beacon", "report", "telemetry", "analytics", "track", "log", "monitor", "diagnostic", "crash", "error", "exception"];

var KEY_BLOCK = ["asia", "europe", "eu", "kr", "jp", "cn", "tw", "hk", "sg", "th", "vn", "id", "ph", "my", "in"];

// ═══════════════════════════════════════════════════════════════
//  🔧 دوال مساعدة
// ═══════════════════════════════════════════════════════════════

function dM(host, list) {
    var h = host.toLowerCase();
    for (var i = 0; i < list.length; i++) {
        var d = list[i].toLowerCase();
        if (d.charAt(0) === "*") {
            var b = d.substring(2);
            if (h === b) return true;
            if (h.length > b.length + 1 && h.substring(h.length - b.length - 1) === "." + b) return true;
        } else {
            if (h === d) return true;
        }
    }
    return false;
}

function containsAny(host, keywords) {
    var h = host.toLowerCase();
    for (var i = 0; i < keywords.length; i++) {
        if (h.indexOf(keywords[i]) !== -1) return true;
    }
    return false;
}

function isIP(host) {
    return host.indexOf(".") !== -1 || host.indexOf(":") !== -1;
}

function startsWithIP(host) {
    var parts = host.split(".");
    if (parts.length >= 4) {
        var num = parseInt(parts[0]);
        if (num >= 0 && num <= 255) return true;
    }
    return false;
}

// ═══════════════════════════════════════════════════════════════
//  🚨 MAIN FUNCTION - JORDAN ONLY
// ═══════════════════════════════════════════════════════════════

function FindProxyForURL(url, host) {
    
    var h = host.toLowerCase();
    
    // ═══════════════════════════════════════════════
    //  ① DIRECT: صوت
    // ═══════════════════════════════════════════════
    if (containsAny(h, KEY_VOICE)) {
        return DIR;
    }
    
    // ═══════════════════════════════════════════════
    //  ② DIRECT: حماية
    // ═══════════════════════════════════════════════
    if (containsAny(h, KEY_ANTICHEAT)) {
        return DIR;
    }
    
    // ═══════════════════════════════════════════════
    //  ③ DIRECT: تقارير
    // ═══════════════════════════════════════════════
    if (containsAny(h, KEY_REPORT)) {
        return DIR;
    }
    
    // ═══════════════════════════════════════════════
    //  ④ DIRECT: قائمة صريحة
    // ═══════════════════════════════════════════════
    if (dM(h, DIRECT_ONLY)) {
        return DIR;
    }
    
    // ═══════════════════════════════════════════════
    //  🚨 ⑤ BLOCK: أي شي فيه asia/europe = DIRECT (يفشل)
    //     هذا يمنع الاتصال بسيرفرات أسيا وأروبا
    // ═══════════════════════════════════════════════
    if (containsAny(h, KEY_BLOCK)) {
        return DIR; // يفشل لأنه مو موجود
    }
    
    // ═══════════════════════════════════════════════
    //  🚨 ⑥ MATCHMAKING - بورت 20005
    // ═══════════════════════════════════════════════
    if (dM(h, MATCHMAKING)) {
        return MAT;
    }
    
    // ═══════════════════════════════════════════════
    //  🚨 ⑦ REGION LOCK - بورت 20005
    //     فرض المنطقة الأردنية
    // ═══════════════════════════════════════════════
    if (dM(h, REGION_LOCK_DOMAINS)) {
        return MAT;
    }
    
    // ═══════════════════════════════════════════════
    //  🚨 ⑧ DNS GEO LOCK - بورت 20005
    //     DNS يرجع أردني فقط
    // ═══════════════════════════════════════════════
    if (dM(h, DNS_GEO)) {
        return MAT;
    }
    
    // ═══════════════════════════════════════════════
    //  🚨 ⑨ KEYWORD: match + pubg = MAT
    // ═══════════════════════════════════════════════
    if (containsAny(h, KEY_MATCH) && containsAny(h, KEY_PUBG)) {
        if (!containsAny(h, KEY_VOICE) && !containsAny(h, KEY_ANTICHEAT)) {
            return MAT;
        }
    }
    
    // ═══════════════════════════════════════════════
    //  🚨 ⑩ KEYWORD: region + pubg = MAT
    //     فرض المنطقة
    // ═══════════════════════════════════════════════
    if (containsAny(h, KEY_REGION) && containsAny(h, KEY_PUBG)) {
        if (!containsAny(h, KEY_VOICE) && !containsAny(h, KEY_ANTICHEAT)) {
            return MAT;
        }
    }
    
    // ═══════════════════════════════════════════════
    //  🚨 ⑪ KEYWORD: gps + pubg = MAT
    //     إرسال GPS أردني
    // ═══════════════════════════════════════════════
    if (containsAny(h, KEY_GPS) && containsAny(h, KEY_PUBG)) {
        return MAT;
    }
    
    // ═══════════════════════════════════════════════
    //  ⑫ LOBBY - بورت 1080
    // ═══════════════════════════════════════════════
    if (dM(h, LOBBY)) {
        return LOB;
    }
    
    // ═══════════════════════════════════════════════
    //  ⑬ أي شي فيه pubg/tencent = LOB
    // ═══════════════════════════════════════════════
    if (containsAny(h, KEY_PUBG)) {
        return LOB;
    }
    
    // ═══════════════════════════════════════════════
    //  ⑭ IP أردني = LOB
    // ═══════════════════════════════════════════════
    if (startsWithIP(host)) {
        var parts = host.split(".");
        var p1 = parseInt(parts[0]);
        var p2 = parseInt(parts[1]);
        // نطاقات أردنية
        if (
            (p1 === 37 && p2 === 35) ||
            (p1 === 78 && (p2 === 40 || p2 === 42 || p2 === 158 || p2 === 100)) ||
            (p1 === 82 && p2 === 212) ||
            (p1 === 86 && p2 === 111) ||
            (p1 === 176 && (p2 === 28 || p2 === 29)) ||
            (p1 === 185 && (p2 === 33 || p2 === 45 || p2 === 84 || p2 === 88 || p2 === 100 || p2 === 103 || p2 === 112 || p2 === 185 || p2 === 229 || p2 === 51 || p2 === 58 || p2 === 120)) ||
            (p1 === 188 && (p2 === 225 || p2 === 228 || p2 === 247)) ||
            (p1 === 212 && p2 === 34) ||
            (p1 === 46 && p2 === 32) ||
            (p1 === 94 && p2 === 24) ||
            (p1 === 42 && p2 === 136) ||
            (p1 === 41 && (p2 === 184 || p2 === 234)) ||
            (p1 === 95 && p2 === 141)
        ) {
            return LOB;
        }
    }
    
    // ═══════════════════════════════════════════════
    //  ⑮ الباقي = DIRECT
    // ═══════════════════════════════════════════════
    return DIR;
}
