// ============================================================
// PUBG MOBILE — Jordan Master PAC v5.0
// ✦ التطوير: تجميع شامل لكل الأردنيين | بنق منخفض وثابت
// ✦ الشبكات: Zain | Orange | Umniah | XPress | VTEL | Civil | Gov
// ✦ الميزات: Smart Routing | Session Lock | Anti-Lag | IPv4/IPv6
// ============================================================

// ═══════════════════════════════════════════════════════════
// 1. إعدادات البروكسي والشبكات
// ═══════════════════════════════════════════════════════════

var PROXY_JO_1 = "PROXY 82.212.84.33:20005";
var PROXY_JO_2 = "PROXY 176.29.153.95:20005";
var PROXY_JO_3 = "PROXY 46.185.131.218:443";

// السلسلة الرئيسية للمباريات (تجميع اللاعبين)
var MATCH_CHAIN = PROXY_JO_1 + "; " + PROXY_JO_2 + "; " + PROXY_JO_3 + "; DIRECT";

// برك اللوبي الذكي (توزيع الحمل)
var LOBBY_POOL = [
    PROXY_JO_1,
    PROXY_JO_2,
    "PROXY 82.212.84.33:1080",
    "PROXY 176.29.153.95:443"
];

var DIRECT = "DIRECT";
var BLOCK  = "PROXY 127.0.0.1:9";

// ═══════════════════════════════════════════════════════════
// 2. الثوابت والجلسات
// ═══════════════════════════════════════════════════════════

var CACHE_TTL       = 600000;  // 10 دقائق كاش DNS
var SESSION_TIMEOUT = 90000;   // 90 ثانية نافذة الجلسة
var LOCK_TTL        = 3600000; // قفل المنطقة لساعة

var SESSION = {
    matchIP: null,
    matchNet: null,
    matchTime: 0,
    lockedProxy: null,
    lockExpiry: 0,
    dnsCache: {},
    connPool: {}
};

// ═══════════════════════════════════════════════════════════
// 3. دوال المساعدة والأداء
// ═══════════════════════════════════════════════════════════

function now() { return Date.now ? Date.now() : new Date().getTime(); }

function isIPv6(ip) { return ip && ip.indexOf(":") !== -1; }

function isValidIPv4(ip) {
    if (!ip || typeof ip !== "string") return false;
    var p = ip.split(".");
    if (p.length !== 4) return false;
    for (var i = 0; i < 4; i++) {
        if (!/^\d{1,3}$/.test(p[i])) return false;
        var n = parseInt(p[i], 10);
        if (n < 0 || n > 255) return false;
    }
    return true;
}

function ipToLong(ip) {
    var p = ip.split(".");
    return ((parseInt(p[0]) << 24) | (parseInt(p[1]) << 16) | (parseInt(p[2]) << 8) | parseInt(p[3])) >>> 0;
}

function cidrMask(bits) { return (~0 << (32 - bits)) >>> 0; }

function netPrefix(ip) { return ip.split(".").slice(0, 3).join("."); }

function inRange(ip, ranges) {
    if (!isValidIPv4(ip)) return false;
    var target = ipToLong(ip);
    for (var i = 0; i < ranges.length; i++) {
        var net = ipToLong(ranges[i][0]);
        var mask = cidrMask(ranges[i][1]);
        if ((target & mask) === (net & mask)) return true;
    }
    return false;
}

function inPrefix(ip, prefixes) {
    var s = ip.toLowerCase();
    for (var i = 0; i < prefixes.length; i++) {
        if (s.indexOf(prefixes[i]) === 0) return true;
    }
    return false;
}

// ═══════════════════════════════════════════════════════════
// 4. نطاقات الأردن الموحدة (جميع الشبكات)
// ═══════════════════════════════════════════════════════════

var JO_IPV4 = [
    // Orange / JDC / Civil
    ["37.202.64.0", 18], ["46.185.128.0", 17], ["46.185.0.0", 16],
    ["79.173.192.0", 18], ["79.173.0.0", 16], ["82.212.64.0", 18],
    ["86.108.0.0", 14], ["86.56.0.0", 16], ["92.253.0.0", 16],
    ["94.249.0.0", 16], ["193.188.64.0", 19], ["194.165.128.0", 17],
    ["212.34.0.0", 16], ["212.35.64.0", 18], ["212.35.128.0", 17],
    ["213.139.32.0", 19], ["213.139.64.0", 18], ["213.9.0.0", 16],
    ["217.23.32.0", 20], ["193.227.0.0", 16], ["213.186.160.0", 19],
    
    // Zain / Hadatheh
    ["81.21.0.0", 20], ["82.212.84.0", 22], ["176.29.0.0", 16],
    ["176.28.128.0", 17], ["188.123.160.0", 19], ["82.205.0.0", 16],
    ["212.118.0.0", 16], ["91.186.0.0", 16], ["91.106.96.0", 20],
    
    // Umniah
    ["5.45.128.0", 20], ["5.45.0.0", 16], ["46.23.112.0", 20],
    ["46.248.0.0", 16], ["92.241.32.0", 19], ["95.172.192.0", 19],
    ["109.107.224.0", 19], ["109.107.0.0", 16], ["149.200.0.0", 16],
    ["149.255.0.0", 16], ["178.238.176.0", 20], ["188.248.0.0", 14],
    
    // Linkdotnet / XPress
    ["46.32.96.0", 19], ["46.32.0.0", 15], ["77.245.0.0", 16],
    ["80.90.160.0", 19], ["94.142.32.0", 19], ["188.247.64.0", 19],
    
    // VTEL / Others
    ["62.72.160.0", 19], ["109.237.192.0", 20], ["176.57.0.0", 16],
    ["62.215.0.0", 16], ["37.17.192.0", 20], ["37.123.0.0", 16],
    ["178.77.0.0", 16], ["84.18.32.0", 19], ["79.134.0.0", 16],
    
    // Extended Ranges (Gov/Edu/Hosting)
    ["37.44.0.0", 15], ["31.166.0.0", 15], ["31.222.0.0", 16],
    ["46.34.0.0", 16], ["79.99.0.0", 16], ["109.162.0.0", 15],
    ["178.16.0.0", 16], ["188.71.0.0", 16], ["196.29.0.0", 16],
    ["196.205.0.0", 16], ["197.37.0.0", 16], ["212.37.0.0", 16],
    ["185.117.68.0", 22], ["185.141.36.0", 22], ["185.181.112.0", 22]
];

var JO_IPV6 = [
    "2a00:18d0", "2a00:18d8", // Zain
    "2a01:9700",             // Orange
    "2a02:c040",             // Umniah
    "2a04:2e00",             // JT
    "2a05:74c0", "2a06:8ec0"
];

var MATCH_IPV6 = [
    "2a01:9700:4200:", "2a01:9700:4300:", "2a01:9700:3900:",
    "2a01:9700:4800:", "2a01:9700:4000:", "2a01:9700:4100:"
];

// ═══════════════════════════════════════════════════════════
// 5. تصنيف الحركة (Traffic Classification)
// ═══════════════════════════════════════════════════════════

var MODES = {
    MATCH:  /matchmak|session|region|quickmatch|queue|start|spawn|party|roster|squad|pair|dispatch|ranked|tier|mmr|conqueror/i,
    COMBAT: /match|battle|classic|arena|war|payload|tdm|fpp|tpp|sync|realtime|tick|frame|ingame|gamesvr|gs\d|msdk/i,
    LOBBY:  /lobby|login|auth|gateway|profile|presence|voice|voip|turn|stun|social|friend|clan|chat/i,
    CDN:    /cdn|asset|patch|update|download|bundle|pak|obb|manifest|static|media|res|ota/i,
    ANTI:   /anticheat|security|verify|shield|ban|guard|captcha|fairplay/i
};

function getMode(url, host) {
    var txt = (url + " " + host).toLowerCase();
    if (MODES.ANTI.test(txt)) return "ANTI";
    if (MODES.MATCH.test(txt)) return "MATCH";
    if (MODES.COMBAT.test(txt)) return "COMBAT";
    if (MODES.LOBBY.test(txt)) return "LOBBY";
    if (MODES.CDN.test(txt)) return "CDN";
    return "OTHER";
}

function isPUBG(host) {
    return /pubg|tencent|krafton|battlegrounds|igamecj|proxima|levelinfinite/i.test(host);
}

// ═══════════════════════════════════════════════════════════
// 6. دوال DNS والجلسات
// ═══════════════════════════════════════════════════════════

function resolve(host) {
    var t = now();
    var c = SESSION.dnsCache[host];
    if (c && (t - c.t) < CACHE_TTL) return c.ips;
    
    var ips = [];
    try {
        if (typeof dnsResolveEx === "function") {
            var ex = dnsResolveEx(host);
            if (ex) ips = ex.split(";").map(function(x){return x.trim();});
        }
    } catch(e){}
    
    if (ips.length === 0 && typeof dnsResolve === "function") {
        try { var v4 = dnsResolve(host); if(v4) ips.push(v4); } catch(e){}
    }
    
    if (ips.length > 0) SESSION.dnsCache[host] = { ips: ips, t: t };
    return ips;
}

function lockRegion(proxy) {
    SESSION.lockedProxy = proxy;
    SESSION.lockExpiry = now() + LOCK_TTL;
}

function getLock() {
    if (SESSION.lockedProxy && now() < SESSION.lockExpiry) return SESSION.lockedProxy;
    SESSION.lockedProxy = null;
    return null;
}

function stickyLobby(host) {
    var h = 0;
    for (var i = 0; i < host.length; i++) {
        h = ((h << 5) - h) + host.charCodeAt(i);
        h |= 0;
    }
    return LOBBY_POOL[Math.abs(h) % LOBBY_POOL.length];
}

// ═══════════════════════════════════════════════════════════
// 7. الدالة الرئيسية
// ═══════════════════════════════════════════════════════════

function FindProxyForURL(url, host) {
    try {
        host = host.toLowerCase();
        
        // 1. فحص أساسي
        if (!isPUBG(host)) return DIRECT;
        
        var mode = getMode(url, host);
        var ips = resolve(host);
        var t = now();
        
        // 2. استثناءات الأداء
        if (mode === "CDN") return DIRECT;
        if (mode === "ANTI") return DIRECT; // الحماية يجب أن تكون مباشرة
        
        // 3. قفل الجلسة (أثناء المباراة)
        var locked = getLock();
        if (locked) return locked;
        
        // 4. تحليل IPs
        var isJO_IP = false;
        var isMatchV6 = false;
        
        for (var i = 0; i < ips.length; i++) {
            var ip = ips[i];
            if (isIPv6(ip)) {
                if (inPrefix(ip, JO_IPV6)) isJO_IP = true;
                if (inPrefix(ip, MATCH_IPV6)) isMatchV6 = true;
            } else {
                if (inRange(ip, JO_IPV4)) isJO_IP = true;
            }
        }
        
        // 5. منطق التجميع والبنق
        
        // أ. المطابقة (Matchmaking): إجبار البروكسي لتجميع كل الأردنيين
        if (mode === "MATCH") {
            lockRegion(MATCH_CHAIN);
            return MATCH_CHAIN;
        }
        
        // ب. القتال (Combat): تثبيت المسار لضمان استقرار البنق
        if (mode === "COMBAT") {
            if (isJO_IP || isMatchV6) {
                lockRegion(MATCH_CHAIN);
                return MATCH_CHAIN;
            }
            // إذا كان السيرفر خارج الأردن، نستخدم السلسلة مع فشل آمن
            return MATCH_CHAIN;
        }
        
        // ج. اللوبي: توجيه ذكي
        if (mode === "LOBBY") {
            if (isJO_IP) {
                return stickyLobby(host);
            }
            return stickyLobby(host);
        }
        
        // د. باقي الحركة
        if (isJO_IP) return stickyLobby(host);
        
        return DIRECT;
        
    } catch (e) {
        return DIRECT; // حماية من التوقف
    }
}
