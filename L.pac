// ================================================================
//
//   🎮 PUBG Mobile - JORDAN ULTIMATE FINAL PRO
//   🇯🇴 كل الأردنيين يشوفونك و تشوفهم
//
//   Version:  10.1 - PERFORMANCE OPTIMIZED
//
//   📌 التحسينات الجديدة:
//   1. نظام Smart DNS: يفحص الـ IP الحقيقي خلف الدومين لضمان التوجيه الصحيح.
//   2. LAN Bypass: تجاوز الشبكة المحلية لزيادة السرعة.
//   3. تحسين الكود: تقليل استهلاك المعالج والرام لأداء أسرع.
//
//   🏠 كل شي PUBG  → SOCKS5 91.106.109.50:9030
//   🎮 المباريات   → SOCKS5 91.106.109.50:20001
//   🎤 الصوت       → DIRECT
//   🛡️ الحماية     → DIRECT
//
// ================================================================


// ╔══════════════════════════════════════════════════════════╗
// ║                    ① الإعدادات                           ║
// ╚══════════════════════════════════════════════════════════╝

var PX  = "91.106.109.50";
// تم إضافة FALLBACK للسوكس القديم (SOCKS4) كدعم إضافي
var LOB = "SOCKS5 " + PX + ":9030; SOCKS " + PX + ":9030; DIRECT";
var MAT = "SOCKS5 " + PX + ":20001; SOCKS " + PX + ":20001; DIRECT";
var DIR = "DIRECT";


// ╔══════════════════════════════════════════════════════════╗
// ║  ② سيرفرات المباريات (CIDR) - التوجيه الذكي           ║
// ╚══════════════════════════════════════════════════════════╝

var MS4 = [
    // ══ 🥇 Tier 1 - AWS Bahrain (الأفضل) ══
    "13.34.0.0/15", "13.248.0.0/14", "15.177.0.0/16", "15.184.0.0/16",
    "15.185.0.0/16", "15.230.0.0/16", "52.59.0.0/16", "52.95.0.0/16",
    "52.95.176.0/24", "52.95.177.0/24", "54.247.0.0/16", "99.82.0.0/16",
    "99.83.0.0/16", "99.150.0.0/16", "99.151.0.0/16", "18.168.0.0/14",
    "18.172.0.0/14", "35.71.0.0/16",

    // ══ 🥈 Tier 2 - Tencent UAE/Dubai ══
    "49.51.0.0/16", "49.51.64.0/18", "49.51.128.0/17", "43.154.0.0/15",
    "43.154.128.0/17", "43.155.0.0/16", "43.134.0.0/16", "43.135.0.0/16",

    // ══ 🥉 Tier 3 - Tencent Asia/Global ══
    "101.32.0.0/14", "101.36.0.0/14", "101.33.0.0/16", "101.34.0.0/16",
    "101.35.0.0/16", "101.37.0.0/16", "119.28.0.0/16", "119.29.0.0/16",
    "150.109.0.0/16", "129.226.0.0/16", "129.204.0.0/16", "203.205.0.0/16",
    "118.89.0.0/16", "118.126.0.0/16", "81.68.0.0/16",

    // ══ 4th Tier - AWS Frankfurt (Backup) ══
    "3.64.0.0/14", "3.120.0.0/14", "18.184.0.0/14", "18.192.0.0/14",
    "35.156.0.0/14"
];

var MS6 = [
    "2402:4e00::/32", "2406:da00::/32", "2406:d200::/32",
    "2600:1f00::/24", "2a05:d018::/32", "2a05:d01a::/32"
];


// ╔══════════════════════════════════════════════════════════╗
// ║  ③ نطاقات أردنية IPv4 (للتأكد من IP اللعب المحلي)     ║
// ╚══════════════════════════════════════════════════════════╝

var JO4 = [
    "37.35.0.0/16", "78.40.0.0/16", "78.158.0.0/15", "82.212.0.0/14",
    "86.111.0.0/16", "91.141.0.0/16", "176.29.0.0/16", "185.33.12.0/22",
    "185.88.140.0/22", "185.185.244.0/22", "188.247.64.0/18",
    "188.247.128.0/17", "188.247.192.0/18", "212.34.0.0/19",
    "212.34.32.0/19", "37.208.0.0/13", "78.100.0.0/15",
    "79.134.128.0/18", "82.212.64.0/18", "176.28.0.0/16",
    "185.45.36.0/22", "188.225.128.0/17", "212.34.64.0/18",
    "46.32.0.0/16", "78.42.0.0/16", "94.24.0.0/16"
];

var JO6 = [
    "2a00:8c00::/32", "2a02:f040::/32", "2a01:100::/32",
    "2a05:580::/32", "2a02:f60::/32", "2a0d:4800::/32"
];


// ╔══════════════════════════════════════════════════════════╗
// ║  ④ قوائم الدومينات (مجمعة لسرعة الأداء)                ║
// ╚══════════════════════════════════════════════════════════╝

// 🎤 الصوت والحماية (DIRECT)
var D_DIR = [
    // Voice
    "voice.pubgmobile.com", "voip.pubgmobile.com", "rtc.pubgmobile.com",
    "audio.pubgmobile.com", "trtc.tencentcloud.com", "tim.qq.com",
    // Security
    "security.pubgmobile.com", "anticheat.pubgmobile.com",
    "protect.pubgmobile.com", "shield.pubgmobile.com",
    "guard.pubgmobile.com", "device.pubgmobile.com",
    "fingerprint.pubgmobile.com", "kernel.pubgmobile.com",
    // Main Domain (for login safety)
    "pubgmobile.com", "www.pubgmobile.com"
];

// 🎮 المباريات (MAT - Port 20001)
var D_MAT = [
    "match.pubgmobile.com", "matchmaking.pubgmobile.com",
    "game.pubgmobile.com", "gameserver.pubgmobile.com",
    "gslb.pubgmobile.com", "dispatch.pubgmobile.com",
    "server.pubgmobile.com", "gs.pubgmobile.com",
    "region.pubgmobile.com", "qcloud.com",
    "myqcloud.com", "akamaized.net"
];

// 🏠 اللوبي والتجنيد (LOB - Port 9030)
var D_LOB = [
    // Recruitment & Social (Critical for Jordan Matching)
    "recruit.pubgmobile.com", "team.pubgmobile.com",
    "squad.pubgmobile.com", "friend.pubgmobile.com",
    "social.pubgmobile.com", "clan.pubgmobile.com",
    "nearby.pubgmobile.com", "recommend.pubgmobile.com",
    "geolocation.pubgmobile.com",
    // Lobby & Assets
    "lobby.pubgmobile.com", "api.pubgmobile.com",
    "config.pubgmobile.com", "cdn.pubgmobile.com",
    "res.pubgmobile.com", "igamecj.com",
    // Login & External
    "account.pubgmobile.com", "login.pubgmobile.com",
    "facebook.com", "fbcdn.net", "googleapis.com",
    "googleusercontent.com", "apple.com", "twitter.com",
    "tencent.com", "wechat.com", "qq.com"
];


// ╔══════════════════════════════════════════════════════════╗
// ║  ⑤ دواد مساعدة محسنة (Helper Functions)                ║
// ╚══════════════════════════════════════════════════════════╝

// تحويل IPv4 إلى رقم صحيح
function ipToInt(ip) {
    if (!ip) return 0;
    var parts = ip.split('.');
    if (parts.length !== 4) return 0;
    // استخدام bitwise operators للسرعة
    return ((parseInt(parts[0]) << 24) | (parseInt(parts[1]) << 16) | (parseInt(parts[2]) << 8) | parseInt(parts[3])) >>> 0;
}

// فحص تطابق الـ IP مع الـ CIDR
function matchCIDR(ip, cidr) {
    if (!ip || !cidr) return false;
    var parts = cidr.split('/');
    if (parts.length !== 2) return false;
    
    var cidrIp = parts[0];
    var prefix = parseInt(parts[1]);
    
    // دعم بسيط ل IPv6
    if (ip.indexOf(":") !== -1) {
         // للمبسطية: إذا كان CIDR هو /32 أو أقل نفحص البداية
         // السكربتات الحديثة تدعم isInNet بشكل أسرع، لكن هنا نعتمد الـ Native JS
         if (prefix <= 64 && ip.indexOf(cidrIp.substring(0, 10)) !== -1) return true; 
         return false;
    }

    var ipVal = ipToInt(ip);
    var cidrVal = ipToInt(cidrIp);
    
    // حساب الـ Mask
    var mask = (0xFFFFFFFF << (32 - prefix)) >>> 0;
    
    return (ipVal & mask) === (cidrVal & mask);
}

// فحص الـ IP ضد قائمة (تم تحسينها للتوقف عند أول تطابق)
function checkIPList(ip, list) {
    if (!ip || ip.indexOf(":") !== -1) return false; // تجاهل IPv6 في القوائم IPv4 هنا لتبسيط الكود
    for (var i = 0; i < list.length; i++) {
        if (matchCIDR(ip, list[i])) return true;
    }
    return false;
}

// فحص الدومين (باستخدام EndsWith المحسن)
function checkDomain(host, list) {
    var h = host.toLowerCase();
    for (var i = 0; i < list.length; i++) {
        var d = list[i];
        // التحقق من Wildcard *.domain.com
        // نتحقق إذا كان الدومين ينتهي باسم النطاق
        // مثال: host = a.b.com, domain = b.com
        if (h === d || h.endsWith("." + d)) return true;
        // التحقق من النطاقات المباشرة
        if (h === d) return true;
    }
    return false;
}

// دالة لاستخراج الـ IP من الدومين بسرعة (DNS Resolution)
// تستخدم dnsResolve المتاحة في بيئة PAC
function getIp(host) {
    // إذا كان الـ host أصلاً IP
    if (/^(\d{1,3}\.){3}\d{1,3}$/.test(host)) return host;
    
    // محاولة حل الـ DNS
    try {
        var ip = dnsResolve(host);
        return ip;
    } catch (e) {
        return null;
    }
}


// ╔══════════════════════════════════════════════════════════╗
// ║           ⑥ الدالة الرئيسية (Main Logic)                ║
// ╚══════════════════════════════════════════════════════════╝

function FindProxyForURL(url, host) {
    // تحويل للأحرف الصغيرة لتسريع المقارنة
    var h = host.toLowerCase();

    // ════════════════════════════════════════════
    // 1. تجاوز الشبكات المحلية (LAN Bypass)
    // يمنع تطبيق البروكسي على شبكة البيت أو الواي فاي المحلية
    // ════════════════════════════════════════════
    if (isPlainHostName(h) || 
        h.indexOf("192.168.") === 0 || 
        h.indexOf("10.") === 0 || 
        h.indexOf("127.") === 0 ||
        h.indexOf("localhost") === 0 ||
        h.indexOf("172.16.") === 0) {
        return DIR;
    }

    // ════════════════════════════════════════════
    // 2. الصوت والحماية → DIRECT
    // الأولوية القصوى لضمان عدم التقطيع
    // ════════════════════════════════════════════
    if (checkDomain(h, D_DIR)) return DIR;

    // ════════════════════════════════════════════
    // 3. دومينات المباريات المباشرة → MAT
    // ════════════════════════════════════════════
    if (checkDomain(h, D_MAT)) return MAT;

    // ════════════════════════════════════════════
    // 4. اللوبي والتجنيد → LOB
    // ════════════════════════════════════════════
    if (checkDomain(h, D_LOB)) return LOB;

    // ════════════════════════════════════════════
    // 5. Smart DNS Check (الأداء الذكي)
    // حل الـ IP للدومينات غير المعروفة للتأكد
    // ════════════════════════════════════════════
    
    // نحصل على الـ IP الحقيقي
    var resolvedIP = getIp(h);

    if (resolvedIP) {
        // فحص هل الـ IP يتبع سيرفرات المباريات
        if (checkIPList(resolvedIP, MS4)) return MAT;
        
        // فحص هل الـ IP يتبع الأردن (لضمان التجنيد المحلي)
        if (checkIPList(resolvedIP, JO4)) return LOB;
    }

    // ════════════════════════════════════════════
    // 6. كلمات مفتاحية احتياطية → LOB
    // ════════════════════════════════════════════
    if (h.indexOf("pubg") !== -1 || 
        h.indexOf("tencent") !== -1 || 
        h.indexOf("igame") !== -1) {
        return LOB;
    }

    // ════════════════════════════════════════════
    // 7. الباقي → مباشر
    // ════════════════════════════════════════════
    return DIR;
}
