// ============================================================
// PUBG MOBILE — JO Hybrid Ultra Lock PAC (v2.0 UPDATED)
// فريقك: Lobby + Match بنطاقات خاصة + IP أردني
// خصم: كل IP أردني غير نطاقات فريقك = BLOCK
// ============================================================

// === إعدادات البروكسي ===
var PX = "46.185.131.218";
var LOBBY_PROXY  = "SOCKS5 " + PX + ":443; SOCKS " + PX + ":8443; DIRECT";
var MATCH_PROXY  = "SOCKS5 " + PX + ":20001; SOCKS " + PX + ":20002; DIRECT";
var DIRECT_CONN  = "DIRECT";
var BLOCK        = "PROXY 127.0.0.1:9";

// === Session ===
var SESSION = {
  matchHost: null, matchNet24: null, matchIP: null,
  locked: false, startedAt: 0, lastSeen: 0
};
var MATCH_LOCK_TTL  = 60 * 60 * 1000;   // 60 دقيقة
var RESET_IDLE_TTL  = 120 * 1000;        // 120 ثانية idle

// === Helpers ===
function isPlainIPv4(h){return /^\d+\.\d+\.\d+\.\d+$/.test(h);}
function dnsSafe(h){try{return dnsResolve(h);}catch(e){return null;}}
function toNum(ip){var p=ip.split(".");if(p.length!==4)return 0;
  return (((+p[0])<<24)>>>0)+(((+p[1])<<16)>>>0)+(((+p[2])<<8)>>>0)+((+p[3])>>>0);}
function ipInList(ip,lst){if(!ip||!isPlainIPv4(ip))return false;
  var n=toNum(ip);for(var i=0;i<lst.length;i++){
    var b=toNum(lst[i][0]),m=toNum(lst[i][1]);
    if((n&m)===(b&m))return true;}return false;}
function getNet24(ip){var p=ip.split(".");return p[0]+"."+p[1]+"."+p[2];}
function nowMs(){return new Date().getTime();}
function resetSession(){
  SESSION.matchHost=SESSION.matchNet24=SESSION.matchIP=null;
  SESSION.locked=false;SESSION.startedAt=SESSION.lastSeen=0;
}
function shouldExpireSession(){
  var n=nowMs();
  if(!SESSION.locked)return false;
  if((n-SESSION.startedAt)>MATCH_LOCK_TTL)return true;
  if((n-SESSION.lastSeen)>RESET_IDLE_TTL)return true;
  return false;
}

// ================================================================
// 🔵 نطاقات فريقك (Lobby + Match) — هذه تمرّ دائمًا
// ================================================================
var TEAM_LOBBY_HOSTS = [
  "*.cdn.pubgmobile.com",
  "*.dlied1.qq.com",
  "*.download.pubgmobile.com",
  "*.webpubgmobile.com",
  "*.account.pubgmobile.com",
  "*.service.pubgmobile.com",
  "*.social.pubgmobile.com",
  "*.friends.pubgmobile.com",
  "*.profile.pubgmobile.com",
  "*.cdn.tencent.com",
  "*.res.pubgmobile.com",
  "*.config.pubgmobile.com",
  "*.api.pubgmobile.com",
  "*.login.pubgmobile.com",
  "*.store.pubgmobile.com",
  "*.event.pubgmobile.com"
];

var TEAM_MATCH_HOSTS = [
  "*.igamecj.com",
  "*.tencent.com",
  "*.pubgmobile.com",
  "*.proximabeta.com",
  "*.gcloudcs.com",
  "*.gsgames.qq.com",
  "*.wxqlog.qq.com",
  "*.cloud.tc.qq.com",
  "*.game.qq.com",
  "*.speedtest.gcloud.qq.com",
  "*.battle.pubgmobile.com",
  "*.match.pubgmobile.com",
  "*.room.pubgmobile.com",
  "*.arena.pubgmobile.com",
  "*.ranked.pubgmobile.com"
];

// ================================================================
// 🟢 Direct للصوت والحماية — لا تأخير أبدًا
// ================================================================
var DIRECT_HOSTS = [
  "*.voice.pubgmobile.com","*.voip.pubgmobile.com",
  "*.rtc.pubgmobile.com","*.audio.pubgmobile.com",
  "*.sound.pubgmobile.com","*.mic.pubgmobile.com",
  "*.rtp.pubgmobile.com","*.media.pubgmobile.com",
  "*.live.pubgmobile.com","*.streaming.pubgmobile.com",
  "*.trrtc.tencentcloud.com","*.trtc.tencentcloud.com",
  "*.tim.qq.com","*.ims.qq.com",
  "*.security.pubgmobile.com","*.anticheat.pubgmobile.com",
  "*.protect.pubgmobile.com","*.shield.pubgmobile.com",
  "*.wss.pubgmobile.com","*.signal.pubgmobile.com"
];

// ================================================================
// 🔴 IPs الأردن — الخصم (BLOCK أثناء المباراة إذا لم يكن فريقك)
// ================================================================
var JORDAN_MATCH_IPV4 = [
  ["92.253.0.0",    "255.255.128.0"],   // Zain JO
  ["46.185.128.0",  "255.255.128.0"],   // Orange JO
  ["149.200.128.0", "255.255.128.0"],   // Orange JO-2
  ["94.249.0.0",    "255.255.128.0"],   // Umniah
  ["86.108.0.0",    "255.255.128.0"]    // x
];

var JORDAN_WIDE_IPV4 = [
  ["94.249.0.0",    "255.255.128.0"],   // Umniah
  ["86.108.0.0",    "255.255.128.0"],
  ["176.29.0.0",    "255.255.0.0"],     // Jordan Broadband
  ["92.253.0.0",    "255.255.128.0"],   // Zain
  ["46.185.128.0",  "255.255.128.0"],   // Orange
  ["149.200.128.0", "255.255.128.0"],
  ["5.44.0.0",      "255.252.0.0"],     // JO ASN 8697
  ["5.48.0.0",      "255.252.0.0"],
  ["5.52.0.0",      "255.252.0.0"],
  ["31.22.0.0",     "255.254.0.0"],     // إضافة حديثة JO
  ["37.29.0.0",     "255.255.0.0"],     // إضافة حديثة
  ["185.120.0.0",   "255.255.252.0"]    // JO Cloud / Datacenter
];

// ================================================================
// 🔵 نطاقات فريقك الحماية — تمرّ حتى لو IP أردني
// ================================================================
function isTeamLobbyHost(h){
  for(var i=0;i<TEAM_LOBBY_HOSTS.length;i++)
    if(shExpMatch(h,TEAM_LOBBY_HOSTS[i]))return true;
  if(shExpMatch(h,"*lobby*")||shExpMatch(h,"*login*")
    ||shExpMatch(h,"*social*")||shExpMatch(h,"*friend*")
    ||shExpMatch(h,"*store*")||shExpMatch(h,"*event*"))
    return true;
  return false;
}
function isTeamMatchHost(h){
  for(var i=0;i<TEAM_MATCH_HOSTS.length;i++)
    if(shExpMatch(h,TEAM_MATCH_HOSTS[i]))return true;
  if(shExpMatch(h,"*-match*")||shExpMatch(h,"*game*.qq.com")
    ||shExpMatch(h,"*battle*")||shExpMatch(h,"*room*")
    ||shExpMatch(h,"*arena*")||shExpMatch(h,"*ranked*"))
    return true;
  return false;
}
function isDirectHost2(h){
  for(var i=0;i<DIRECT_HOSTS.length;i++)
    if(shExpMatch(h,DIRECT_HOSTS[i]))return true;
  return false;
}

// ================================================================
// 🔴 خصم: IP أردني + ليس نطاق فريقك = BLOCK
// ================================================================
function isJordanIP(ip){
  return ipInList(ip,JORDAN_WIDE_IPV4);
}
function isJordanMatchIP(ip){
  return ipInList(ip,JORDAN_MATCH_IPV4);
}

// ================================================================
// ✅ MAIN PAC
// ================================================================
function FindProxyForURL(url, host){

  // --- تجاهل Local ---
  if(isPlainHostName(host)||
    shExpMatch(host,"localhost")||
    isInNet(host,"127.0.0.0","255.0.0.0")||
    isInNet(host,"10.0.0.0","255.0.0.0")||
    isInNet(host,"172.16.0.0","255.240.0.0")||
    isInNet(host,"192.168.0.0","255.255.0.0")){
    return DIRECT_CONN;
  }

  // --- صوت وحماية دائمًا Direct ---
  if(isDirectHost2(host)) return DIRECT_CONN;

  // --- تجديد Session ---
  if(shouldExpireSession()) resetSession();

  var ip = isPlainIPv4(host) ? host : dnsSafe(host);

  // ============================================================
  // 🔒 أثناء المباراة (LOCKED)
  // ============================================================
  if(SESSION.locked){
    if(!ip) return BLOCK;

    var curNet24 = getNet24(ip);

    // ✅ نطاق فريقك أثناء المباراة = يمر
    if(isTeamMatchHost(host) || isTeamLobbyHost(host)){
      SESSION.lastSeen = nowMs();
      return MATCH_PROXY;
    }

    // ✅ نفس الـ host + IP + net24 = يمر
    if(SESSION.matchHost && host === SESSION.matchHost){
      SESSION.lastSeen = nowMs();
      return MATCH_PROXY;
    }
    if(SESSION.matchIP === ip && SESSION.matchNet24 === curNet24){
      SESSION.lastSeen = nowMs();
      return MATCH_PROXY;
    }

    // 🔴 خصم: IP أردني وليس نطاق فريقك = BLOCK
    if(isJordanIP(ip) && !isTeamMatchHost(host) && !isTeamLobbyHost(host)){
      return BLOCK;
    }

    // 🚫 net24 مختلف = BLOCK
    if(SESSION.matchNet24 && curNet24 !== SESSION.matchNet24){
      return BLOCK;
    }

    SESSION.lastSeen = nowMs();
    return MATCH_PROXY;
  }

  // ============================================================
  // 🟢 بداية مباراة جديدة
  // ============================================================
  if(isTeamMatchHost(host)){
    if(!ip) return BLOCK;

    // فقط IP أردني يبدأ مباراة
    if(!isJordanIP(ip)) return BLOCK;

    SESSION.matchHost  = host;
    SESSION.matchIP    = ip;
    SESSION.matchNet24 = getNet24(ip);
    SESSION.locked     = true;
    SESSION.startedAt  = nowMs();
    SESSION.lastSeen   = SESSION.startedAt;

    return MATCH_PROXY;
  }

  // ============================================================
  // 🟡 لوبي فريقك
  // ============================================================
  if(isTeamLobbyHost(host)){
    if(ip && isJordanIP(ip)) return LOBBY_PROXY;
    return LOBBY_PROXY; // حتى غير معروف = لوبي
  }

  // ============================================================
  // 🟠 PUBG عام (تينسنت)
  // ============================================================
  if(shExpMatch(host,"*.pubgmobile.com")||
     shExpMatch(host,"*.qq.com")||
     shExpMatch(host,"*.tencent.com")||
     shExpMatch(host,"*.proximabeta.com")){
    if(ip && isJordanIP(ip)) return LOBBY_PROXY;
    return DIRECT_CONN;
  }

  // ============================================================
  // ⬛ كل شيء آخر = Direct
  // ============================================================
  return DIRECT_CONN;
}
