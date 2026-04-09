/* =========================================================
   🏆 JORDAN TITANIUM V4 – ZERO PING STABLE
   FAST LOBBY + MATCH PRIORITY + ANTI-JITTER
   ========================================================= */

var PROXY_A = "PROXY 46.185.131.218:20001"; // الأردن الأساسي - 0ms
var PROXY_B = "PROXY 91.106.109.12:20001"; // احتياطي 1
var PROXY_C = "PROXY 176.29.153.95:20001"; // احتياطي 2
var BLOCK = "PROXY 127.0.0.1:9";

// ✅ كاش DNS - اهم نقطة لتقليل البنق
var DNS_CACHE = {};
function getIP(host){
    if(DNS_CACHE[host]) return DNS_CACHE[host];
    var ip = dnsResolve(host);
    DNS_CACHE[host] = ip;
    return ip;
}

/* ==============================
   ⚡ ULTRA HASH
   ============================== */
function ultraHash(str){
  var h = 2166136261;
  for (var i=0;i<str.length;i++){ h ^= str.charCodeAt(i); h += (h<<1)+(h<<4)+(h<<7)+(h<<8)+(h<<24); }
  return (h >>> 0);
}

/* ==============================
   🇯🇴 JORDAN + GULF CORRECTED
   ============================== */
function isJordan(ip){
  return isInNet(ip,"46.185.128.0","255.255.128.0") || isInNet(ip,"188.123.176.0","255.255.240.0") || isInNet(ip,"212.35.64.0","255.255.192.0") || isInNet(ip,"176.28.0.0","255.255.0.0");
}
function isGulf(ip){
  return isInNet(ip,"15.185.0.0","255.255.0.0") || // AWS Bahrain
         isInNet(ip,"188.48.0.0","255.255.0.0") || // STC
         isInNet(ip,"94.200.0.0","255.255.0.0") || // UAE
         isInNet(ip,"37.210.0.0","255.255.0.0");   // Kuwait
}
function regionTier(ip){
  if(isJordan(ip)) return 3;
  if(isGulf(ip)) return 2;
  return 1;
}

/* ==============================
   🎮 PUBG DETECTION V4
   ============================== */
function isPUBG(host, url){
  var s = (host+" "+url).toLowerCase();
  return /pubg|pubgm|igamecj|gcloudpubg|tencent|proximabeta|battle|match|tdm|erangel|miramar|livik/.test(s);
}
// 🔥 لوبي سريع
function isLobby(s){ return /lobby|login|matchmaking|teamup|find|mm|qd|profile/.test(s); }
// 💥 داخل الجيم
function isGamePlay(s){ return /game|battle|fight|core|udp|session|1000[0-9]|14[0-9]{3}|17000|17500/.test(s); }

/* ==============================
   🔒 SESSION LOCK V4 - /24 FIX
   ============================== */
var SESSION = { ip:null, net24:null, host:null, time:0 };
function resetSession(){ SESSION = { ip:null, net24:null, host:null, time:0 }; }

function enforceUltraSession(host, url){
  var ip = getIP(host); if(!ip) return PROXY_A;
  var now = Date.now();
  var net24 = ip.split('.').slice(0,3).join('.'); // ✅ تصحيح /24
  var s = (host+url).toLowerCase();

  // اعادة تعيين بعد 4 دقايق
  if(SESSION.time && (now - SESSION.time > 240000)) resetSession();

  if(!SESSION.ip){
    SESSION.ip = ip; SESSION.net24 = net24; SESSION.host = host; SESSION.time = now;
    return PROXY_A + "; " + PROXY_B; // أفضلية مطلقة
  }

  // داخل المباراة - اقفل كل شي
  if(isGamePlay(s)){
    if(net24 !== SESSION.net24) return BLOCK; // منع القفز بين سيرفرات
    if(host !== SESSION.host && !isLobby(host)) return BLOCK; // اقتل الترافيك الزايد = بنق ثابت
    return PROXY_A; // اجباري على الأردن
  }
  return PROXY_A + "; " + PROXY_B;
}

/* ==============================
   🚀 MAIN ENGINE
   ============================== */
function FindProxyForURL(url, host){
  var h = host.toLowerCase();
  var ip = getIP(host);
  var s = h + " " + url;

  // DIRECT مسموح فقط
  if(shExpMatch(h,"*github*") || shExpMatch(h,"*youtube*") || shExpMatch(h,"*google*")) return "DIRECT";

  // حظر سوريا + اوروبا
  if(isInNet(ip,"5.0.0.0","255.0.0.0") || isInNet(ip,"31.9.0.0","255.255.0.0") || shExpMatch(h,"*.sy")) return BLOCK;

  if(isPUBG(h, url)){
    // 1. لوبي = ادخل اول واحد
    if(isLobby(s)){
      resetSession(); // فك القفل القديم
      return PROXY_A; // لا failover في اللوبي عشان السرعة
    }
    // 2. داخل الجيم = ثبات صفر
    if(isGamePlay(s) || regionTier(ip) >= 2){
      return enforceUltraSession(host, url);
    }
    // 3. الباقي
    return PROXY_A + "; " + PROXY_B + "; " + PROXY_C;
  }

  return PROXY_A + "; " + PROXY_B; // Zero DIRECT Policy
}
