// ================================================================
//
//   PUBG Mobile PAC Script - Jordan Pure
//   Version: 3.0 (IPv4 + IPv6 + SOCKS5)
//   Author:  MiMo Assistant
//   Date:    2025
//
//   Lobby  → SOCKS5 46.185.131.218:443
//   Match  → SOCKS5 46.185.131.218:20001
//
// ================================================================


// ╔══════════════════════════════════════════════════╗
// ║              ①  CONFIGURATION                   ║
// ╚══════════════════════════════════════════════════╝

var LOBBY_PROXY = "SOCKS5 46.185.131.218:443; SOCKS 46.185.131.218:8443; DIRECT";
var MATCH_PROXY = "SOCKS5 46.185.131.218:20001; SOCKS 46.185.131.218:20003; DIRECT";
var DIRECT      = "DIRECT";
var BLOCK       = "SOCKS5 0.0.0.0:0";


// ╔══════════════════════════════════════════════════╗
// ║     ②  JORDAN IPv4 RANGES (حسب ASN)            ║
// ╚══════════════════════════════════════════════════╝

// ─── Orange Jordan / Jordan Telecom (AS8376) ───
var JO_ORANGE_IPV4 = [
    "37.35.0.0/16",
    "78.40.0.0/16",
    "78.158.0.0/15",
    "82.212.0.0/14",
    "91.141.0.0/16",
    "185.33.12.0/22",
    "185.88.140.0/22",
    "188.247.64.0/18",
    "188.247.128.0/17",
    "212.34.0.0/19",
    "212.34.32.0/19",
    "86.111.0.0/16",
    "176.29.0.0/16"
];

// ─── Zain Jordan (AS48832) ───
var JO_ZAIN_IPV4 = [
    "37.208.0.0/13",
    "78.100.0.0/15",
    "79.134.128.0/18",
    "176.28.0.0/16",
    "185.45.36.0/22",
    "188.225.128.0/17",
    "212.34.64.0/18",
    "82.212.64.0/18"
];

// ─── Umniah (AS3226) ───
var JO_UMNIAH_IPV4 = [
    "46.32.0.0/16",
    "78.42.0.0/16",
    "94.24.0.0/16",
    "185.18.108.0/22",
    "188.228.0.0/17"
];

// ─── ITGate (AS42913) ───
var JO_ITGATE_IPV4 = [
    "42.136.0.0/16",
    "185.84.100.0/22"
];

// ─── Neotel (AS47887) ───
var JO_NEOTEL_IPV4 = [
    "185.112.24.0/22",
    "45.9.220.0/22"
];

// ─── HostMasters (AS50968) ───
var JO_HOSTMASTERS_IPV4 = [
    "185.58.204.0/22",
    "185.120.36.0/22"
];

// ─── Albab (AS204304) ───
var JO_ALBAB_IPV4 = [
    "185.229.28.0/22"
];

// ─── أي نطاقات أردنية إضافية ───
var JO_OTHER_IPV4 = [
    "41.184.0.0/16",
    "41.234.0.0/16",
    "95.141.240.0/21",
    "185.103.92.0/22",
    "195.191.100.0/22"
];

// ─── دمج كل IPv4 أردني ───
var JO_ALL_IPV4 = [].concat(
    JO_ORANGE_IPV4,
    JO_ZAIN_IPV4,
    JO_UMNIAH_IPV4,
    JO_ITGATE_IPV4,
    JO_NEOTEL_IPV4,
    JO_HOSTMASTERS_IPV4,
    JO_ALBAB_IPV4,
    JO_OTHER_IPV4
);


// ╔══════════════════════════════════════════════════╗
// ║     ③  JORDAN IPv6 RANGES (حسب ASN)            ║
// ╚══════════════════════════════════════════════════╝

// ─── Orange Jordan ───
var JO_ORANGE_IPV6 = [
    "2a00:8c00::/32",
    "2a02:f040::/32"
];

// ─── Zain Jordan ───
var JO_ZAIN_IPV6 = [
    "2a01:100::/32",
    "2a05:580::/32"
];

// ─── Umniah ───
var JO_UMNIAH_IPV6 = [
    "2a02:f60::/32"
];

// ─── ITGate ───
var JO_ITGATE_IPV6 = [
    "2a0d:4800::/32"
];

// ─── Jordan Telecom General ───
var JO_OTHER_IPV6 = [
    "2001:67c:1d8::/48",
    "2a02:c10::/32"
];

// ─── دمج كل IPv6 أردني ───
var JO_ALL_IPV6 = [].concat(
    JO_ORANGE_IPV6,
    JO_ZAIN_IPV6,
    JO_UMNIAH_IPV6,
    JO_ITGATE_IPV6,
    JO_OTHER_IPV6
);


// ╔══════════════════════════════════════════════════╗
// ║    ④  PUBG MOBILE DOMAIN LISTS                  ║
// ╚══════════════════════════════════════════════════╝

// ─── دومينات اللوبي ───
var LOBBY_DOMAINS = [
    "*.pubgmobile.com",
    "*.igamecj.com",
    "*.igame.com",
    "*.cdn.pubgmobile.com",
    "*.tencent.com",
    "*.tencentyun.com",
    "*.qpic.cn",
    "*.cloud.tencent.com",
    "*.gpod.qq.com",
    "*.timber.tencent.com",
    "*.xiaojukeji.com",
    "speed.game.qq.com",
    "*.akamaized.net",
    "*.googleapis.com",
    "*.googleusercontent.com",
    "play-fe.googleapis.com",
    "*.app-measurement.com",
    "*.crashlytics.com",
    "*.firebaseio.com",
    "*.googleadservices.com",
    "*.gstatic.com"
];

// ─── دومينات المباريات ───
var MATCH_DOMAINS = [
    "*.pubgmobile.com",
    "*.igamecj.com",
    "*.lobby.pubgmobile.com",
    "*.gpnewapi.pubgmobile.com",
    "*.match.pubgmobile.com",
    "*.auth.pubgmobile.com",
    "*.proxy.pubgmobile.com",
    "*.gslb.pubgmobile.com",
    "*.qcloud.com",
    "*.qcloudcdn.com",
    "*.cos.myqcloud.com",
    "*.api.pubgmobile.com"
];


// ╔══════════════════════════════════════════════════╗
// ║    ⑤  MATCH SERVER IPs (מזרח الأوسط)          ║
// ╚══════════════════════════════════════════════════╝

var MATCH_SERVER_IPV4 = [
    // Tencent Cloud ME
    "49.51.0.0/16",
    "43.154.0.0/15",
    "43.134.0.0/16",
    "101.32.0.0/14",
    "101.36.0.0/14",
    "101.33.0.0/16",
    "119.28.0.0/16",
    "119.29.0.0/16",
    "150.109.0.0/16",
    "129.226.0.0/16",
    "129.204.0.0/16",
    "203.205.0.0/16",
    // AWS ME-South-1 (Bahrain)
    "13.248.0.0/14",
    "15.177.0.0/16",
    "99.82.0.0/16"
];

var MATCH_SERVER_IPV6 = [
    "2402:4e00::/32",
    "2406:da00::/32",
    "2406:d200::/32",
    "2600:1f00::/24"
];


// ╔══════════════════════════════════════════════════╗
// ║    ⑥  HELPER FUNCTIONS                          ║
// ╚══════════════════════════════════════════════════╝

// ─── هل العنوان IPv6؟ ───
function isIPv6(addr) {
    return (addr.indexOf(":") !== -1);
}

// ─── هل العنوان IPv4؟ ───
function isIPv4(addr) {
    var parts = addr.split(".");
    if (parts.length !== 4) return false;
    for (var i = 0; i < 4; i++) {
        var n = parseInt(parts[i], 10);
        if (isNaN(n) || n < 0 || n > 255) return false;
    }
    return true;
}

// ─── هل هو عنوان IP وليس دومين؟ ───
function isIPAddress(host) {
    if (isIPv6(host)) return true;
    if (isIPv4(host)) return true;
    return false;
}

// ─── تحويل IPv4 إلى رقم ───
function ipv4ToNumber(ip) {
    var p = ip.split(".");
    return ((parseInt(p[0], 10) << 24) |
            (parseInt(p[1], 10) << 16) |
            (parseInt(p[2], 10) << 8) |
            parseInt(p[3], 10)) >>> 0;
}

// ─── توسيع IPv6 إلى صيغة كاملة ───
function expandIPv6(ip) {
    var parts = ip.toLowerCase().split(":");

    // معالجة ::
    var dblIdx = -1;
    for (var i = 0; i < parts.length; i++) {
        if (parts[i] === "" && i > 0 && i < parts.length - 1) {
            dblIdx = i;
        }
    }

    if (dblIdx !== -1) {
        var before = [];
        var after = [];
        for (var i = 0; i < dblIdx; i++) {
            if (parts[i] !== "") before.push(parts[i]);
        }
        for (var i = dblIdx + 1; i < parts.length; i++) {
            if (parts[i] !== "") after.push(parts[i]);
        }
        var fill = 8 - before.length - after.length;
        parts = before;
        for (var i = 0; i < fill; i++) parts.push("0000");
        parts = parts.concat(after);
    }

    // Padding كل جزء إلى 4 خانات
    var result = [];
    for (var i = 0; i < 8; i++) {
        var p = parts[i] || "0";
        while (p.length < 4) p = "0" + p;
        result.push(p);
    }
    return result.join(":");
}

// ─── IPv6 إلى binary string (للمقارنة) ───
function ipv6ToBinary(ip) {
    var expanded = expandIPv6(ip);
    var hex = expanded.replace(/:/g, "");
    var bin = "";
    for (var i = 0; i < hex.length; i++) {
        var b = parseInt(hex.charAt(i), 16).toString(2);
        while (b.length < 4) b = "0" + b;
        bin += b;
    }
    return bin;
}

// ─── فحص IPv6 في نطاق CIDR ───
function ipv6InCIDR(ip, cidr) {
    var parts = cidr.split("/");
    var prefix = parts[0];
    var maskLen = parseInt(parts[1], 10);

    var ipBin = ipv6ToBinary(ip);
    var pfxBin = ipv6ToBinary(prefix);

    for (var i = 0; i < maskLen; i++) {
        if (ipBin.charAt(i) !== pfxBin.charAt(i)) return false;
    }
    return true;
}

// ─── فحص IPv4 في نطاق CIDR ───
function ipv4InCIDR(ip, cidr) {
    var parts = cidr.split("/");
    var rangeIP = parts[0];
    var mask = parseInt(parts[1], 10);
    var ipNum = ipv4ToNumber(ip);
    var rangeNum = ipv4ToNumber(rangeIP);
    var maskBits = mask === 0 ? 0 : (~0 << (32 - mask)) >>> 0;
    return (ipNum & maskBits) === (rangeNum & maskBits);
}

// ─── فحص IP في نطاق CIDR (يدعم IPv4 و IPv6) ───
function isInCIDR(ip, cidr) {
    if (cidr.indexOf(":") !== -1) {
        // IPv6 CIDR
        if (!isIPv6(ip)) return false;
        return ipv6InCIDR(ip, cidr);
    } else {
        // IPv4 CIDR
        if (!isIPv4(ip)) return false;
        return ipv4InCIDR(ip, cidr);
    }
}

// ─── فحص IP ضمن قائمة نطاقات ───
function ipInRange(host, ranges) {
    if (!isIPAddress(host)) return false;
    for (var i = 0; i < ranges.length; i++) {
        if (isInCIDR(host, ranges[i])) return true;
    }
    return false;
}

// ─── فحص دومين ضمن قائمة دومينات ───
function domainMatches(host, domains) {
    var h = host.toLowerCase();
    for (var i = 0; i < domains.length; i++) {
        var d = domains[i].toLowerCase();
        if (d.indexOf("*.") === 0) {
            var base = d.substring(2);
            if (h === base || h.length > base.length + 1) {
                var suffix = h.substring(h.length - base.length - 1);
                if (suffix === "." + base) return true;
            }
            if (h === base) return true;
        } else {
            if (h === d) return true;
        }
    }
    return false;
}

// ─── فحص IP أردني (IPv4 أو IPv6) ───
function isJordanIP(host) {
    if (!isIPAddress(host)) return false;
    if (isIPv6(host)) {
        return ipInRange(host, JO_ALL_IPV6);
    }
    return ipInRange(host, JO_ALL_IPV4);
}

// ─── فحص IP خوادم المباريات ───
function isMatchServerIP(host) {
    if (!isIPAddress(host)) return false;
    if (isIPv6(host)) {
        return ipInRange(host, MATCH_SERVER_IPV6);
    }
    return ipInRange(host, MATCH_SERVER_IPV4);
}

// ─── فحص IP خوادم اللوبي ───
function isLobbyServerIP(host) {
    // أي IP مصري/خليجي/عراقي... عدّل حسب حاجتك
    // مؤقتاً: كل شي مش أردني + مش match server = لوبي
    if (!isIPAddress(host)) return false;
    return !isMatchServerIP(host) && !isJordanIP(host);
}


// ╔══════════════════════════════════════════════════╗
// ║    ⑦  MAIN FUNCTION                             ║
// ╚══════════════════════════════════════════════════╝

function FindProxyForURL(url, host) {

    var h = host.toLowerCase();

    // ════════════════════════════════════════════
    //  ① المباريات (MATCH) → أعلى أولوية
    //     البورت 1081 - أقل بنق = أفضل
    // ════════════════════════════════════════════

    // إذا هو IP خادم مباريات مباشر
    if (isMatchServerIP(host)) {
        return MATCH_PROXY;
    }

    // إذا هو دومين مباريات PUBG
    if (domainMatches(h, MATCH_DOMAINS)) {
        return MATCH_PROXY;
    }

    // ════════════════════════════════════════════
    //  ② اللوبي (LOBBY) → البورت 1080
    // ════════════════════════════════════════════

    // إذا هو IP أردني (IPv4 أو IPv6)
    if (isJordanIP(host)) {
        return LOBBY_PROXY;
    }

    // إذا هو دومين لوبي PUBG
    if (domainMatches(h, LOBBY_DOMAINS)) {
        return LOBBY_PROXY;
    }

    // ════════════════════════════════════════════
    //  ③ أي شيء متعلق بـ PUBG / Tencent
    // ════════════════════════════════════════════

    if (h.indexOf("pubg") !== -1 ||
        h.indexOf("tencent") !== -1 ||
        h.indexOf("igamecj") !== -1 ||
        h.indexOf("qcloud") !== -1) {
        return LOBBY_PROXY;
    }

    // ════════════════════════════════════════════
    //  ④ أي IP أردني عام
    // ════════════════════════════════════════════

    if (isJordanIP(host)) {
        return LOBBY_PROXY;
    }

    // ════════════════════════════════════════════
    //  ⑤ الباقي → مباشر
    // ════════════════════════════════════════════

    return DIRECT;
}
