// ================================================================
//
//   🎮 PUBG Mobile - Jordan Players Boost
//   🇯🇴 كل اللاعبين من الأردن
//
//   Version:  6.0 - Final
//
//   🏠 اللوبي     → SOCKS5 91.106.109.50:9030
//   🎮 المباريات  → SOCKS5 91.106.109.50:20001
//   🎤 الصوت      → DIRECT
//   🛡️ الحماية    → DIRECT
//
// ================================================================


// ╔══════════════════════════════════════════════╗
// ║          ①  الإعدادات                       ║
// ╚══════════════════════════════════════════════╝

var P    = "91.106.109.50";
var LOB  = "SOCKS5 " + P + ":9030";
var MAT  = "SOCKS5 " + P + ":20001";
var DIR  = "DIRECT";
var BLK  = "SOCKS5 0.0.0.0:0";


// ╔══════════════════════════════════════════════╗
// ║  ②  نطاقات أردنية IPv4                      ║
// ╚══════════════════════════════════════════════╝

var JO4 = [
    // ── Orange Jordan ──
    "37.35.0.0/16",
    "78.40.0.0/16",
    "78.158.0.0/15",
    "82.212.0.0/14",
    "86.111.0.0/16",
    "91.141.0.0/16",
    "176.29.0.0/16",
    "185.33.12.0/22",
    "185.88.140.0/22",
    "185.185.244.0/22",
    "188.247.64.0/18",
    "188.247.128.0/17",
    "188.247.192.0/18",
    "212.34.0.0/19",
    "212.34.32.0/19",
    // ── Zain Jordan ──
    "37.208.0.0/13",
    "78.100.0.0/15",
    "79.134.128.0/18",
    "82.212.64.0/18",
    "176.28.0.0/16",
    "185.45.36.0/22",
    "185.45.37.0/24",
    "185.45.38.0/24",
    "185.45.39.0/24",
    "188.225.128.0/17",
    "212.34.64.0/18",
    "212.34.96.0/19",
    // ── Umniah ──
    "46.32.0.0/16",
    "78.42.0.0/16",
    "94.24.0.0/16",
    "185.18.108.0/22",
    "185.18.109.0/24",
    "185.18.110.0/24",
    "185.18.111.0/24",
    "188.228.0.0/17",
    // ── ITGate ──
    "42.136.0.0/16",
    "185.84.100.0/22",
    // ── Neotel ──
    "45.9.220.0/22",
    "185.112.24.0/22",
    // ── HostMasters ──
    "185.58.204.0/22",
    "185.120.36.0/22",
    // ── Albab ──
    "185.229.28.0/22",
    // ── إضافية ──
    "41.184.0.0/16",
    "41.234.0.0/16",
    "95.141.240.0/21",
    "185.51.24.0/22",
    "185.103.92.0/22",
    "185.100.52.0/22",
    "195.191.100.0/22"
];


// ╔══════════════════════════════════════════════╗
// ║  ③  نطاقات أردنية IPv6                      ║
// ╚══════════════════════════════════════════════╝

var JO6 = [
    "2a00:8c00::/32",
    "2a02:f040::/32",
    "2a01:100::/32",
    "2a05:580::/32",
    "2a02:f60::/32",
    "2a0d:4800::/32",
    "2001:67c:1d8::/48",
    "2a02:c10::/32"
];


// ╔══════════════════════════════════════════════╗
// ║  ⑤  دومينات المباريات ← 20001              ║
// ╚══════════════════════════════════════════════╝

var D_MATCH = [
    // ── سيرفرات ──
    "*.match.pubgmobile.com",
    "*.game.pubgmobile.com",
    "*.gameserver.pubgmobile.com",
    "*.server.pubgmobile.com",
    "*.gs.pubgmobile.com",
    "*.gslb.pubgmobile.com",
    "*.dispatch.pubgmobile.com",
    "*.entry.pubgmobile.com",
    "*.connect.pubgmobile.com",
    "*.gateway.pubgmobile.com",
    "*.relay.pubgmobile.com",
    "*.session.pubgmobile.com",
    "*.region.pubgmobile.com",
    "*.netcode.pubgmobile.com",
    "*.tcp.pubgmobile.com",
    "*.udp.pubgmobile.com",
    // ── أنواع لعب ──
    "*.room.pubgmobile.com",
    "*.custom.pubgmobile.com",
    "*.arena.pubgmobile.com",
    "*.tdm.pubgmobile.com",
    "*.war.pubgmobile.com",
    "*.payload.pubgmobile.com",
    "*.evoground.pubgmobile.com",
    "*.zombie.pubgmobile.com",
    "*.metro.pubgmobile.com",
    "*.infection.pubgmobile.com",
    // ── خرائط ──
    "*.erangel.pubgmobile.com",
    "*.miramar.pubgmobile.com",
    "*.sanhok.pubgmobile.com",
    "*.vikendi.pubgmobile.com",
    "*.livik.pubgmobile.com",
    "*.nusa.pubgmobile.com",
    "*.karakin.pubgmobile.com",
    // ── مشاهدة ──
    "*.spectate.pubgmobile.com",
    "*.watch.pubgmobile.com",
    "*.replay.pubgmobile.com",
    "*.stream.pubgmobile.com",
    "*.broadcast.pubgmobile.com",
    // ── بطولات ──
    "*.tournament.pubgmobile.com",
    "*.esports.pubgmobile.com",
    "*.competitive.pubgmobile.com",
    "*.leaderboard.pubgmobile.com",
    // ── تحميل ──
    "*.download.pubgmobile.com",
    "*.patch.pubgmobile.com",
    "*.update.pubgmobile.com",
    "*.resource.pubgmobile.com",
    "*.asset.pubgmobile.com",
    "*.bundle.pubgmobile.com",
    "*.package.pubgmobile.com",
    "*.hotfix.pubgmobile.com",
    // ── Tencent Cloud ──
    "*.qcloud.com",
    "*.qcloudcdn.com",
    "*.tencentcloud.com",
    "*.cos.myqcloud.com",
    "*.cdn.dnsv1.com"
];


// ╔══════════════════════════════════════════════╗
// ║  ⑥  دومينات اللوبي ← 9030                  ║
// ╚══════════════════════════════════════════════╝

var D_LOBBY = [
    // ── لوبي أساسي ──
    "*.pubgmobile.com",
    "*.igamecj.com",
    "*.igame.com",
    "*.cdn.pubgmobile.com",
    "*.res.pubgmobile.com",
    "*.config.pubgmobile.com",
    "*.ui.pubgmobile.com",
    "*.api.pubgmobile.com",
    "*.proxy.pubgmobile.com",

    // ── تجنيد وبحث لاعبين (مهم!) ──
    "*.recruit.pubgmobile.com",
    "*.matchmaking.pubgmobile.com",
    "*.team.pubgmobile.com",
    "*.squad.pubgmobile.com",
    "*.invite.pubgmobile.com",
    "*.friend.pubgmobile.com",
    "*.friends.pubgmobile.com",
    "*.social.pubgmobile.com",
    "*.clan.pubgmobile.com",
    "*.guild.pubgmobile.com",
    "*.crew.pubgmobile.com",
    "*.group.pubgmobile.com",
    "*.community.pubgmobile.com",
    "*.block.pubgmobile.com",
    "*.follow.pubgmobile.com",
    "*.follower.pubgmobile.com",
    "*.inbox.pubgmobile.com",
    "*.mail.pubgmobile.com",
    "*.message.pubgmobile.com",
    "*.chat.pubgmobile.com",
    "*.share.pubgmobile.com",

    // ── بروفايل وترتيب ──
    "*.profile.pubgmobile.com",
    "*.rank.pubgmobile.com",
    "*.season.pubgmobile.com",
    "*.tier.pubgmobile.com",
    "*.badge.pubgmobile.com",
    "*.title.pubgmobile.com",
    "*.achievement.pubgmobile.com",
    "*.milestone.pubgmobile.com",
    "*.progress.pubgmobile.com",
    "*.trophy.pubgmobile.com",
    "*.mission.pubgmobile.com",
    "*.task.pubgmobile.com",

    // ── متجر ومدفوعات ──
    "*.shop.pubgmobile.com",
    "*.store.pubgmobile.com",
    "*.pay.pubgmobile.com",
    "*.payment.pubgmobile.com",
    "*.purchase.pubgmobile.com",
    "*.billing.pubgmobile.com",
    "*.uc.pubgmobile.com",
    "*.coin.pubgmobile.com",
    "*.diamond.pubgmobile.com",
    "*.redeem.pubgmobile.com",
    "*.coupon.pubgmobile.com",
    "*.voucher.pubgmobile.com",
    "*.promo.pubgmobile.com",
    "*.offer.pubgmobile.com",
    "*.iap.pubgmobile.com",
    "*.receipt.pubgmobile.com",
    "*.order.pubgmobile.com",
    "*.transaction.pubgmobile.com",
    "*.subscribe.pubgmobile.com",

    // ── رويال باس ──
    "*.royalepass.pubgmobile.com",
    "*.rp.pubgmobile.com",
    "*.prime.pubgmobile.com",
    "*.battlepass.pubgmobile.com",

    // ── فعاليات ──
    "*.event.pubgmobile.com",
    "*.reward.pubgmobile.com",
    "*.crate.pubgmobile.com",
    "*.lucky.pubgmobile.com",
    "*.spin.pubgmobile.com",
    "*.gift.pubgmobile.com",

    // ── منزل وديكور ──
    "*.home.pubgmobile.com",
    "*.house.pubgmobile.com",
    "*.furniture.pubgmobile.com",
    "*.decoration.pubgmobile.com",
    "*.camp.pubgmobile.com",
    "*.visit.pubgmobile.com",

    // ── إعدادات ──
    "*.settings.pubgmobile.com",
    "*.lobby.pubgmobile.com",
    "*.lobby-api.pubgmobile.com",

    // ── تسجيل دخول ──
    "*.auth.pubgmobile.com",
    "*.login.pubgmobile.com",
    "*.account.pubgmobile.com",
    "*.oauth.pubgmobile.com",
    "*.token.pubgmobile.com",
    "*.register.pubgmobile.com",
    "*.verify.pubgmobile.com",
    "*.captcha.pubgmobile.com",

    // ── فيسبوك ──
    "*.facebook.com",
    "*.fbcdn.net",
    "*.facebook.net",
    "connect.facebook.net",

    // ── قوقل ──
    "*.googleapis.com",
    "*.googleusercontent.com",
    "play-fe.googleapis.com",
    "accounts.google.com",
    "*.gstatic.com",

    // ── آبل ──
    "*.apple.com",
    "appleid.apple.com",
    "buy.itunes.apple.com",

    // ── إشعارات ──
    "mtalk.google.com",
    "android.clients.google.com",
    "*.fcm.googleapis.com",
    "*.gcm.googleapis.com",
    "*.push.pubgmobile.com",
    "*.notify.pubgmobile.com",
    "*.notification.pubgmobile.com",
    "*.alert.pubgmobile.com",
    "*.announce.pubgmobile.com",
    "*.news.pubgmobile.com",

    // ── متجر تطبيقات ──
    "apps.apple.com",
    "play.google.com",
    "*.dl.client.open.g.aaplimg.com",
    "*.ggpht.com",

    // ── Tencent ──
    "*.tencent.com",
    "*.tencentyun.com",
    "*.cloud.tencent.com",
    "*.qpic.cn",
    "*.gp.qq.com",
    "*.game.qq.com",
    "speed.game.qq.com",
    "*.gpod.qq.com",
    "*.xiaojukeji.com",
    "*.wegame.com",

    // ── CDN ──
    "*.akamaized.net",
    "*.akamai.net",
    "*.cloudfront.net",
    "*.fastly.net",
    "*.myqcloud.com",
    "*.dnspod.net",
    "*.dnspod.com",

    // ── تحليلات خفيفة ──
    "*.timber.tencent.com",
    "*.crashlytics.com",
    "*.firebaseio.com",
    "*.firebase.com",
    "*.app-measurement.com"
];


// ╔══════════════════════════════════════════════╗
// ║  ⑦  دومينات DIRECT (بدون بروكسي)           ║
// ╚══════════════════════════════════════════════╝

var D_DIR = [
    // ── صوت (بدون تقطيع) ──
    "*.voice.pubgmobile.com",
    "*.voip.pubgmobile.com",
    "*.rtc.pubgmobile.com",
    "*.audio.pubgmobile.com",
    "*.rtp.pubgmobile.com",
    "*.media.pubgmobile.com",
    "*.live.pubgmobile.com",
    "*.streaming.pubgmobile.com",
    "*.trtc.tencentcloud.com",
    "*.tim.qq.com",
    "*.ims.qq.com",

    // ── حماية (بدون بان) ──
    "*.security.pubgmobile.com",
    "*.anticheat.pubgmobile.com",
    "*.protect.pubgmobile.com",
    "*.shield.pubgmobile.com",
    "*.guard.pubgmobile.com",
    "*.safe.pubgmobile.com",
    "*.integrity.pubgmobile.com",
    "*.scan.pubgmobile.com",
    "*.device.pubgmobile.com",
    "*.deviceid.pubgmobile.com",
    "*.fingerprint.pubgmobile.com",
    "*.kernel.pubgmobile.com",
    "*.audit.pubgmobile.com",
    "*.detect.pubgmobile.com",

    // ── تقارير ──
    "*.beacon.qq.com",
    "*.report.qq.com",
    "*.report.pubgmobile.com",
    "*.telemetry.pubgmobile.com",
    "*.analytics.pubgmobile.com",
    "*.stats.pubgmobile.com",
    "*.metrics.pubgmobile.com",
    "*.track.pubgmobile.com",
    "*.log.pubgmobile.com",
    "*.monitor.pubgmobile.com",
    "*.ping.pubgmobile.com",
    "*.feedback.pubgmobile.com",
    "*.survey.pubgmobile.com",

    // ── دومين رئيسي ──
    "pubgmobile.com",
    "www.pubgmobile.com"
];


// ╔══════════════════════════════════════════════╗
// ║  ⑧  IPs سيرفرات المباريات                   ║
// ╚══════════════════════════════════════════════╝

var MS4 = [
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
    "118.89.0.0/16",
    "118.126.0.0/16",
    "81.68.0.0/16",
    "13.248.0.0/14",
    "15.177.0.0/16",
    "99.82.0.0/16",
    "15.230.0.0/16",
    "52.95.0.0/16"
];

var MS6 = [
    "2402:4e00::/32",
    "2406:da00::/32",
    "2406:d200::/32",
    "2600:1f00::/24"
];


// ╔══════════════════════════════════════════════╗
// ║  ⑨  دوال مساعدة                             ║
// ╚══════════════════════════════════════════════╝

function is6(a){return a.indexOf(":")!==-1}
function is4(a){var p=a.split(".");if(p.length!==4)return false;for(var i=0;i<4;i++){var n=parseInt(p[i],10);if(isNaN(n)||n<0||n>255)return false}return true}
function isIP(h){return is4(h)||is6(h)}

function n4(ip){var p=ip.split(".");return((parseInt(p[0],10)<<24)|(parseInt(p[1],10)<<16)|(parseInt(p[2],10)<<8)|parseInt(p[3],10))>>>0}

function exp6(ip){
    var s=ip.toLowerCase(),zi=s.indexOf("%");
    if(zi!==-1)s=s.substring(0,zi);
    var pts=s.split(":"),db=-1;
    for(var i=0;i<pts.length;i++){if(pts[i]===""&&i>0&&i<pts.length-1)db=i}
    var e=[];
    if(db!==-1){
        for(var i=0;i<db;i++){if(pts[i]!=="")e.push(pts[i])}
        var c=0;for(var i=0;i<pts.length;i++){if(pts[i]!=="")c++}
        var f=8-c;for(var i=0;i<f;i++)e.push("0000");
        for(var i=db+1;i<pts.length;i++){if(pts[i]!=="")e.push(pts[i])}
    }else{e=pts}
    while(e.length<8)e.push("0000");
    var r=[];for(var i=0;i<8;i++){var p=e[i]||"0";while(p.length<4)p="0"+p;r.push(p)}
    return r.join(":")
}

function b6(ip){var h=exp6(ip).replace(/:/g,""),b="";for(var i=0;i<h.length;i++){var v=parseInt(h.charAt(i),16).toString(2);while(v.length<4)v="0"+v;b+=v}return b}

function c4(ip,cidr){var p=cidr.split("/"),m=parseInt(p[1],10),mb=m===0?0:(~0<<(32-m))>>>0;return(n4(ip)&mb)===(n4(p[0])&mb)}
function c6(ip,cidr){var p=cidr.split("/"),ml=parseInt(p[1],10),ib=b6(ip),pb=b6(p[0]);for(var i=0;i<ml;i++){if(ib.charAt(i)!==pb.charAt(i))return false}return true}

function inC(ip,cidr){if(cidr.indexOf(":")!==-1){if(!is6(ip))return false;return c6(ip,cidr)}if(!is4(ip))return false;return c4(ip,cidr)}
function inL(ip,list){if(!isIP(ip))return false;for(var i=0;i<list.length;i++){if(inC(ip,list[i]))return true}return false}

function isJo(ip){if(!isIP(ip))return false;if(is6(ip))return inL(ip,JO6);return inL(ip,JO4)}
function isMS(ip){if(!isIP(ip))return false;if(is6(ip))return inL(ip,MS6);return inL(ip,MS4)}

function dM(host,list){
    var h=host.toLowerCase();
    for(var i=0;i<list.length;i++){
        var d=list[i].toLowerCase();
        if(d.charAt(0)==="*"){
            var b=d.substring(2);
            if(h===b)return true;
            if(h.length>b.length+1&&h.substring(h.length-b.length-1)==="."+b)return true;
        }else{if(h===d)return true}
    }
    return false
}


// ╔══════════════════════════════════════════════╗
// ║  ⑩  الدالة الرئيسية                         ║
// ╚══════════════════════════════════════════════╝

function FindProxyForURL(url, host) {

    var h = host.toLowerCase();

    // ══════════════════════════════════════
    //  ① الصوت والحماية → DIRECT
    // ══════════════════════════════════════
    if (dM(h, D_DIR)) return DIR;

    // ══════════════════════════════════════
    //  ③ المباريات → 20001
    //     اللاعبين الأردنيين يجونك
    // ══════════════════════════════════════
    if (isMS(host)) return MAT;
    if (dM(h, D_MATCH)) return MAT;

    // ══════════════════════════════════════
    //  ④ اللوبي والتجنيد → 9030
    //     بحث سريع = لاعبين أردنيين
    // ══════════════════════════════════════
    if (dM(h, D_LOBBY)) return LOB;

    // ══════════════════════════════════════
    //  ⑤ IP أردني → لوبي
    // ══════════════════════════════════════
    if (isJo(host)) return LOB;

    // ══════════════════════════════════════
    //  ⑥ أي IP خادم مباراة
    // ══════════════════════════════════════
    if (isMS(host)) return MAT;

    // ══════════════════════════════════════
    //  ⑦ الباقي → مباشر
    // ══════════════════════════════════════
    return DIR;
}
