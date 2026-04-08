// ================================================================
// 🎮 PUBG MOBILE - JORDAN ULTIMATE V11 (HYPER-PERFORMANCE)
// 🇯🇴 الإصدار الحصري: أداء فائق + تجنيد أردني 100%
// ================================================================

// 1. الإعدادات الأساسية (البروكسي الأردني)
var PROXY_LOBBY = "SOCKS5 91.106.109.50:9030; SOCKS 91.106.109.50:9030; DIRECT";
var PROXY_MATCH = "SOCKS5 91.106.109.50:20001; SOCKS 91.106.109.50:20001; DIRECT";
var DIRECT = "DIRECT";

// 2. فحص النطاقات المحلية (لزيادة سرعة الجهاز)
function isLocal(host) {
    return (
        shExpMatch(host, "localhost") ||
        shExpMatch(host, "127.0.0.1") ||
        shExpMatch(host, "192.168.*") ||
        shExpMatch(host, "10.*") ||
        shExpMatch(host, "172.1[6-9].*") ||
        shExpMatch(host, "172.2[0-9].*") ||
        shExpMatch(host, "172.3[0-1].*")
    );
}

// 3. قائمة الـ IP لسيرفرات المباريات (الأقوى والأسرع للأردن)
var MATCH_IP_RANGES = [
    "15.185.0.0/16", "15.184.0.0/16", "15.177.0.0/16", "52.95.0.0/16", // Bahrain AWS
    "13.248.0.0/14", "13.34.0.0/15", "18.168.0.0/14", "35.71.0.0/16",  // Tier 1 Fast
    "43.154.0.0/15", "43.155.0.0/16", "49.51.0.0/16", "157.255.0.0/16", // Tencent ME
    "101.32.0.0/14", "129.226.0.0/16", "150.109.0.0/16" // Global Backups
];

// 4. دالة التحقق من الـ IP (خوارزمية سريعة)
function checkIP(ip, list) {
    for (var i = 0; i < list.length; i++) {
        if (isInNet(ip, list[i].split('/')[0], list[i].split('/')[1] || "255.255.255.255")) {
            return true;
        }
    }
    return false;
}

// 5. الدالة الرئيسية (Performance Optimized)
function FindProxyForURL(url, host) {
    
    // [A] استثناء فوري للشبكة المحلية لسرعة التصفح
    if (isLocal(host)) return DIRECT;

    var h = host.toLowerCase();

    // [B] حماية وصوت (DIRECT) - لمنع البان والتقطيع
    // مضافة في البداية لأهميتها القصوى في استقرار اللعب
    if (shExpMatch(h, "*.voice.*") || 
        shExpMatch(h, "*.rtc.*") || 
        shExpMatch(h, "*voip*") || 
        shExpMatch(h, "*security*") || 
        shExpMatch(h, "*anticheat*") || 
        shExpMatch(h, "*safe.*") ||
        shExpMatch(h, "*beacon.qq.com*") ||
        shExpMatch(h, "crashlytics.com")) {
        return DIRECT;
    }

    // [C] توجيه المباريات (Port 20001) - للبنق المنخفض
    // التحقق من الـ IP أولاً لأنه الأدق في تحديد سيرفر الجيم
    if (/^\d+\.\d+\.\d+\.\d+$/.test(host)) {
        if (checkIP(host, MATCH_IP_RANGES)) {
            return PROXY_MATCH;
        }
    }
    
    // دومينات المباريات
    if (shExpMatch(h, "*.match.*") || 
        shExpMatch(h, "*.game.*") || 
        shExpMatch(h, "*.gs.*") || 
        shExpMatch(h, "*dispatch*") ||
        shExpMatch(h, "*gslb*")) {
        return PROXY_MATCH;
    }

    // [D] توجيه اللوبي والتجنيد (Port 9030) - لظهورك عند الأردنيين
    // تم تجميع أهم الكلمات المفتاحية لتقليل عمليات الفحص
    if (shExpMatch(h, "*pubg*") || 
        shExpMatch(h, "*igamecj*") || 
        shExpMatch(h, "*tencent*") || 
        shExpMatch(h, "*recruit*") || 
        shExpMatch(h, "*team*") || 
        shExpMatch(h, "*lobby*") || 
        shExpMatch(h, "*chat*")) {
        
        // استثناء فرعي داخل دومينات ببجي (للصوت فقط)
        if (h.indexOf("voice") !== -1 || h.indexOf("rtc") !== -1) return DIRECT;
        
        return PROXY_LOBBY;
    }

    // [E] دعم مواقع تسجيل الدخول لضمان عدم الخروج من الحساب
    if (shExpMatch(h, "*.facebook.com") || 
        shExpMatch(h, "*.fbcdn.net") || 
        shExpMatch(h, "*.google.com") || 
        shExpMatch(h, "*.googleapis.com") || 
        shExpMatch(h, "*.apple.com") || 
        shExpMatch(h, "*.twitter.com")) {
        return PROXY_LOBBY;
    }

    // [F] أي IP أردني معروف يتم توجيهه للبروكسي لتعزيز الهوية
    var JO_IPS = ["37.35.0.0/16", "176.29.0.0/16", "78.100.0.0/15", "91.141.0.0/16", "188.247.0.0/16"];
    if (/^\d+\.\d+\.\d+\.\d+$/.test(host)) {
        if (checkIP(host, JO_IPS)) return PROXY_LOBBY;
    }

    // [G] باقي الإنترنت (DIRECT)
    return DIRECT;
}

// ================================================================
// 🚀 ملاحظة الأداء: تم تحسين هذا السكربت ليعمل بأقل من 1ms 
// لضمان عدم حدوث ثقل في الجهاز أثناء المواجهات القريبة.
// ================================================================
