// ============================================================
// PUBG MOBILE — JORDAN LOCK v8.1
// Ultra Low Ping
// Dynamic Lobby Rotation
// Jordan Player Bias + Infrastructure Detection
// ============================================================

var PROXY = "PROXY 46.185.131.218:20001";
var DIRECT = "DIRECT";
var BLOCK = "PROXY 0.0.0.0:0";

// ============================================================
// SESSION
// ============================================================

var SESSION = {
    matchNet: null,
    matchHost: null,
    lobbyNet: null
};

// ============================================================
// PRIORITY
// ============================================================

var PRIORITY = {
    CRITICAL: /match|battle|classic|ranked|arena|tdm|metro|royale|erangel|livik|miramar|sanhok|vikendi|karakin|nusa|rondo|fpp|tpp|squad|duo|solo|quickmatch|ingame|gamesvr|relay/i,
    LOBBY: /lobby|matchmaking|queue|login|auth|region|gateway|session|profile|inventory|store|catalog|patch|update|cdn|config/i
};

// ============================================================
// HELPERS
// ============================================================

function isPUBG(h, u) {
    return /pubg|tencent|krafton|lightspeed|levelinfinite/i.test(h + u);
}

function isIPv6(ip) {
    return ip && ip.indexOf(":") !== -1;
}

function ip2long(ip) {
    var parts = ip.split(".");
    if (parts.length !== 4) return -1;
    return ((parseInt(parts[0], 10) << 24) |
            (parseInt(parts[1], 10) << 16) |
            (parseInt(parts[2], 10) << 8)  |
             parseInt(parts[3], 10)) >>> 0;
}

function cidrMatch(ip, base, prefixLen) {
    var ipLong = ip2long(ip);
    var baseLong = ip2long(base);
    if (ipLong === -1 || baseLong === -1) return false;
    var mask = ~(0xFFFFFFFF >>> prefixLen) >>> 0;
    return (ipLong & mask) === (baseLong & mask);
}

// ============================================================
// MATCH SERVERS — Ultra Low Ping /48
// ============================================================

function isMatchIPv6(ip) {
    return (
        ip.startsWith("2a01:9700:4200:") ||
        ip.startsWith("2a01:9700:4300:")
    );
}

// ============================================================
// LOBBY SERVERS — Dynamic Rotation /48
// ============================================================

function isLobbyIPv6(ip) {
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
        ip.startsWith("2a01:9700:9000:")
    );
}

// ============================================================
// JORDAN PEER / INFRASTRUCTURE BIAS — EXPANDED
// Orange Jordan    — AS8376  — Jordan Telecom Group
// Zain Jordan      — AS48832
// Umniah/Batelco   — AS35426 / AS9038
// Royal Jordanian  — AS43017
// Government/Other — متعدّدون
// ============================================================

// ─────────────────────────────────────────
// ORANGE JORDAN — AS8376 — IPv4
// ─────────────────────────────────────────
var ORANGE_IPV4 = [
    ["46.185.0.0",   16],  // التخصيص الرئيسي الأردني
    ["82.212.64.0",  18],  // عمان
    ["82.212.128.0", 18],  // شمال الأردن
    ["88.84.0.0",    17],  // خدمات ADSL/VDSL
    ["88.84.128.0",  17],  // خدمات إضافية
    ["188.68.0.0",   17],  // FTTH ألياف ضوئية
    ["188.68.128.0", 17],  // أجهزة محمولة LTE
    ["46.185.128.0", 17],  // بروكسي / مضاد DDoS
    ["185.57.0.0",   22],  // خدمات سحابية
    ["185.129.8.0",  22]   // بيانات / CDN
];

// ─────────────────────────────────────────
// ZAIN JORDAN — AS48832 — IPv4
// ─────────────────────────────────────────
var ZAIN_IPV4 = [
    ["176.28.0.0",   16],  // الشبكة الرئيسية
    ["37.35.0.0",    16],  // خدمات لاسلكية
    ["46.36.0.0",    18],  // LTE / 4G
    ["87.236.0.0",   17],  // تجاري / مؤسسي
    ["176.29.0.0",   16],  // نطاقات إضافية
    ["185.103.24.0", 22]   // بيانات مركزية
];

// ─────────────────────────────────────────
// UMNIAH (Batelco Jordan) — AS35426 / AS9038 — IPv4
// ─────────────────────────────────────────
var UMNIAH_IPV4 = [
    ["178.152.0.0",  14],  // الشبكة الرئيسية
    ["185.34.0.0",   17],  // خدمات لاسلكية
    ["185.34.128.0", 17],  // نطاقات إضافية
    ["185.110.44.0", 22],  // بيانات / سحابة
    ["82.212.0.0",   18]   // شراكة / ترحيل
];

// ─────────────────────────────────────────
// ROYAL JORDANIAN AIRLINES — AS43017 — IPv4
// ─────────────────────────────────────────
var RJ_IPV4 = [
    ["193.188.96.0", 24]
];

// ─────────────────────────────────────────
// GOVERNMENT / اتصالات الأردن — IPv4
// ─────────────────────────────────────────
var GOV_IPV4 = [
    ["212.34.0.0",   19],  // حكومي / مؤسسي
    ["213.181.0.0",  19],  // حكومي إضافي
    ["195.28.0.0",   19],  // مؤسسي
    ["193.188.64.0", 19],  // PAIX / أكاديمي
    ["194.126.0.0",  19]   // عام
];

// ─────────────────────────────────────────
// JORDAN IPv6 — جميع المزودين
// ─────────────────────────────────────────

function isJordanIPv4(ip) {
    var all = ORANGE_IPV4.concat(ZAIN_IPV4, UMNIAH_IPV4, RJ_IPV4, GOV_IPV4);
    for (var i = 0; i < all.length; i++) {
        if (cidrMatch(ip, all[i][0], all[i][1])) return true;
    }
    return false;
}

function isJordanIPv6(ip) {
    var p = ip.toLowerCase();

    // Orange Jordan — AS8376
    // بنيات تحتية / بوابات عمان
    if (p.indexOf("2a01:9700:1b05:") === 0) return true;
    if (p.indexOf("2a01:9700:1b06:") === 0) return true;
    // FTTH ألياف ضوئية — إربد / الزرقاء
    if (p.indexOf("2a01:9700:17e") === 0)  return true;
    if (p.indexOf("2a01:9700:180") === 0)  return true;
    // مجموعات سكنية عمان
    if (p.indexOf("2a01:9700:1c")  === 0)  return true;
    if (p.indexOf("2a01:9700:1d")  === 0)  return true;
    if (p.indexOf("2a01:9700:1e")  === 0)  return true;
    if (p.indexOf("2a01:9700:1f")  === 0)  return true;
    // محمول / LTE
    if (p.indexOf("2a01:9700:200") === 0)  return true;
    if (p.indexOf("2a01:9700:210") === 0)  return true;
    if (p.indexOf("2a01:9700:220") === 0)  return true;
    if (p.indexOf("2a01:9700:230") === 0)  return true;
    // نطاقات أردنية عامة للبروكسي
    if (p.indexOf("2a01:9700:10")  === 0)  return true;
    if (p.indexOf("2a01:9700:11")  === 0)  return true;
    if (p.indexOf("2a01:9700:12")  === 0)  return true;
    if (p.indexOf("2a01:9700:13")  === 0)  return true;
    if (p.indexOf("2a01:9700:14")  === 0)  return true;
    if (p.indexOf("2a01:9700:15")  === 0)  return true;
    if (p.indexOf("2a01:9700:16")  === 0)  return true;
    if (p.indexOf("2a01:9700:17")  === 0)  return true;

    // Zain Jordan — AS48832
    if (p.indexOf("2a01:9700:44")  === 0)  return true;
    if (p.indexOf("2a01:9700:45")  === 0)  return true;
    if (p.indexOf("2a01:9700:46")  === 0)  return true;
    if (p.indexOf("2a01:9700:47")  === 0)  return true;

    // Umniah / Batelco Jordan — AS35426
    if (p.indexOf("2a01:9700:50")  === 0)  return true;
    if (p.indexOf("2a01:9700:51")  === 0)  return true;
    if (p.indexOf("2a01:9700:52")  === 0)  return true;
    if (p.indexOf("2a01:9700:53")  === 0)  return true;

    // حكومي / مؤسسي أردني
    if (p.indexOf("2001:67c:27c")  === 0)  return true;
    if (p.indexOf("2001:67c:28c")  === 0)  return true;

    return false;
}

// ─────────────────────────────────────────
// JORDAN PEER — الوظيفة الرئيسية
// ─────────────────────────────────────────

function isJordanPeer(ip) {
    if (isIPv6(ip)) {
        return isJordanIPv6(ip);
    } else {
        return isJordanIPv4(ip);
    }
}

// ============================================================
// MAIN
// ============================================================

function FindProxyForURL(url, host) {

    var ip = "";
    try {
        ip = dnsResolve(host);
    } catch (e) {
        ip = "";
    }

    if (isPlainHostName(host))
        return DIRECT;

    if (!isPUBG(host, url))
        return DIRECT;

    if (!ip || !isIPv6(ip))
        BLOCK;

    var data = (host + url).toLowerCase();
    var parts = ip.split(":");

    var isCritical = PRIORITY.CRITICAL.test(data);
    var isLobby = PRIORITY.LOBBY.test(data);

    // ============================================================
    // MATCH LOCK /64
    // ============================================================

    if (isCritical && isMatchIPv6(ip)) {

        var net64 = parts.slice(0, 4).join(":");

        if (!SESSION.matchNet) {
            SESSION.matchNet = net64;
            SESSION.matchHost = host;
            return PROXY;
        }

        if (net64 !== SESSION.matchNet)
            return BLOCK;

        return PROXY;
    }

    // ============================================================
    // DYNAMIC LOBBY /48
    // ============================================================

    if (isLobby && isLobbyIPv6(ip)) {

        var net48 = parts.slice(0, 3).join(":");

        if (!SESSION.lobbyNet) {
            SESSION.lobbyNet = net48;
            return PROXY;
        }

        if (SESSION.lobbyNet !== net48) {
            SESSION.lobbyNet = net48;
            return PROXY;
        }

        return PROXY;
    }

    // ============================================================
    // JORDAN PEER BIAS — IPv4 + IPv6
    // ============================================================

    if (isJordanPeer(ip))
        return PROXY;

    return BLOCK;
}
