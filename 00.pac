// ================================================================
//
//   🎮 PUBG Mobile - Complete PAC Script
//   🇯🇴 Jordan Pure Ranges (IPv4 + IPv6)
//   📡 SOCKS5 Protocol
//
//   Version:  4.0 - Full Functions
//   Author:   MiMo Assistant
//   Date:     2025
//
//   Proxy:    46.185.131.218
//   Lobby:    SOCKS5 :1080
//   Match:    SOCKS5 :1081
//   Download: SOCKS5 :1082
//   Voice:    SOCKS5 :1083
//   Auth:     SOCKS5 :1084
//   Social:   SOCKS5 :1085
//   AntiCheat:SOCKS5 :1086
//   Payments: SOCKS5 :1087
//   Analytics:SOCKS5 :1088
//
// ================================================================


// ╔══════════════════════════════════════════════════════╗
// ║            ①  PROXY CONFIGURATION                   ║
// ╚══════════════════════════════════════════════════════╝

var PROXY_IP = "91.106.109.50";

var LOBBY_PROXY    = "SOCKS5 " + PROXY_IP + ":1080";
var MATCH_PROXY    = "SOCKS5 " + PROXY_IP + ":20001";
var DOWNLOAD_PROXY = "SOCKS5 " + PROXY_IP + ":443";
var VOICE_PROXY    = "SOCKS5 " + PROXY_IP + ":3478";
var AUTH_PROXY     = "SOCKS5 " + PROXY_IP + ":8443";
var SOCIAL_PROXY   = "SOCKS5 " + PROXY_IP + ":9030";
var ANTICHEAT_PROXY= "SOCKS5 " + PROXY_IP + ":9030";
var PAYMENT_PROXY  = "SOCKS5 " + PROXY_IP + ":8080";
var ANALYTICS_PROXY= "SOCKS5 " + PROXY_IP + ":8080";

var DIRECT = "DIRECT";
var BLOCK  = "SOCKS5 0.0.0.0:0";


// ╔══════════════════════════════════════════════════════╗
// ║       ②  JORDAN IPv4 RANGES - ALL ISPs              ║
// ╚══════════════════════════════════════════════════════╝

// ─── Orange Jordan (AS8376 / JTG) ───
var JO_ORANGE_V4 = [
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
    "212.34.32.0/19"
];

// ─── Zain Jordan (AS48832) ───
var JO_ZAIN_V4 = [
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
    "212.34.96.0/19"
];

// ─── Umniah (AS3226 / LinkDotNet) ───
var JO_UMNIAH_V4 = [
    "46.32.0.0/16",
    "78.42.0.0/16",
    "94.24.0.0/16",
    "185.18.108.0/22",
    "185.18.109.0/24",
    "185.18.110.0/24",
    "185.18.111.0/24",
    "188.228.0.0/17"
];

// ─── ITGate (AS42913) ───
var JO_ITGATE_V4 = [
    "42.136.0.0/16",
    "185.84.100.0/22"
];

// ─── Neotel (AS47887) ───
var JO_NEOTEL_V4 = [
    "45.9.220.0/22",
    "185.112.24.0/22"
];

// ─── HostMasters (AS50968) ───
var JO_HOSTMASTERS_V4 = [
    "185.58.204.0/22",
    "185.120.36.0/22"
];

// ─── Albab Telecom (AS204304) ───
var JO_ALBAB_V4 = [
    "185.229.28.0/22"
];

// ─── Jordanian Universities Network ───
var JO_UNI_V4 = [
    "185.51.24.0/22"
];

// ─── Additional Jordanian Ranges ───
var JO_EXTRA_V4 = [
    "41.184.0.0/16",
    "41.234.0.0/16",
    "95.141.240.0/21",
    "185.103.92.0/22",
    "195.191.100.0/22",
    "185.100.52.0/22"
];

// ─── Merge All Jordan IPv4 ───
var JO_ALL_V4 = [].concat(
    JO_ORANGE_V4,
    JO_ZAIN_V4,
    JO_UMNIAH_V4,
    JO_ITGATE_V4,
    JO_NEOTEL_V4,
    JO_HOSTMASTERS_V4,
    JO_ALBAB_V4,
    JO_UNI_V4,
    JO_EXTRA_V4
);


// ╔══════════════════════════════════════════════════════╗
// ║       ③  JORDAN IPv6 RANGES - ALL ISPs              ║
// ╚══════════════════════════════════════════════════════╝

// ─── Orange Jordan ───
var JO_ORANGE_V6 = [
    "2a00:8c00::/32",
    "2a02:f040::/32"
];

// ─── Zain Jordan ───
var JO_ZAIN_V6 = [
    "2a01:100::/32",
    "2a05:580::/32"
];

// ─── Umniah ───
var JO_UMNIAH_V6 = [
    "2a02:f60::/32"
];

// ─── ITGate ───
var JO_ITGATE_V6 = [
    "2a0d:4800::/32"
];

// ─── General Jordan ───
var JO_OTHER_V6 = [
    "2001:67c:1d8::/48",
    "2a02:c10::/32"
];

// ─── Merge All Jordan IPv6 ───
var JO_ALL_V6 = [].concat(
    JO_ORANGE_V6,
    JO_ZAIN_V6,
    JO_UMNIAH_V6,
    JO_ITGATE_V6,
    JO_OTHER_V6
);


// ╔══════════════════════════════════════════════════════╗
// ║    ④  PUBG MOBILE - ALL FUNCTION DOMAINS            ║
// ╚══════════════════════════════════════════════════════╝


// ┌──────────────────────────────────────────────────────┐
// │  🏠 LOBBY - اللوبي الرئيسي                          │
// │     شامل: الإعدادات، المتجر، الحقيبة، الفعاليات    │
// └──────────────────────────────────────────────────────┘
var DOMAINS_LOBBY = [
    "*.pubgmobile.com",
    "*.igamecj.com",
    "*.igame.com",
    "*.cdn.pubgmobile.com",
    "*.proxy.pubgmobile.com",
    "*.lobby.pubgmobile.com",
    "*.api.pubgmobile.com",
    "*.config.pubgmobile.com",
    "*.res.pubgmobile.com",
    "*.ui.pubgmobile.com",
    "*.shop.pubgmobile.com",
    "*.event.pubgmobile.com",
    "*.reward.pubgmobile.com",
    "*.gift.pubgmobile.com",
    "*.pass.pubgmobile.com",
    "*.royalepass.pubgmobile.com",
    "*.rp.pubgmobile.com",
    "*.crate.pubgmobile.com",
    "*.lucky.pubgmobile.com",
    "*.spin.pubgmobile.com",
    "*.outfit.pubgmobile.com",
    "*.skin.pubgmobile.com",
    "*.inventory.pubgmobile.com",
    "*.collection.pubgmobile.com",
    "*.achievement.pubgmobile.com",
    "*.mission.pubgmobile.com",
    "*.task.pubgmobile.com",
    "*.season.pubgmobile.com",
    "*.rank.pubgmobile.com",
    "*.tier.pubgmobile.com",
    "*.profile.pubgmobile.com",
    "*.settings.pubgmobile.com",
    "*.furniture.pubgmobile.com",
    "*.home.pubgmobile.com",
    "*.lobby-api.pubgmobile.com"
];


// ┌──────────────────────────────────────────────────────┐
// │  🎮 MATCHMAKING & GAME SERVER - المباريات والسيرفر  │
// │     شامل: البحث عن مباراة، السيرفرات، UDP/TCP       │
// └──────────────────────────────────────────────────────┘
var DOMAINS_MATCH = [
    "*.match.pubgmobile.com",
    "*.matchmaking.pubgmobile.com",
    "*.game.pubgmobile.com",
    "*.gameserver.pubgmobile.com",
    "*.server.pubgmobile.com",
    "*.gs.pubgmobile.com",
    "*.region.pubgmobile.com",
    "*.gslb.pubgmobile.com",
    "*.dispatch.pubgmobile.com",
    "*.entry.pubgmobile.com",
    "*.connect.pubgmobile.com",
    "*.tcp.pubgmobile.com",
    "*.udp.pubgmobile.com",
    "*.netcode.pubgmobile.com",
    "*.relay.pubgmobile.com",
    "*.gateway.pubgmobile.com",
    "*.hub.pubgmobile.com",
    "*.session.pubgmobile.com",
    "*.room.pubgmobile.com",
    "*.custom.pubgmobile.com",
    "*.arena.pubgmobile.com",
    "*.tdm.pubgmobile.com",
    "*.war.pubgmobile.com",
    "*.payload.pubgmobile.com",
    "*.evoground.pubgmobile.com",
    "*.zombie.pubgmobile.com",
    "*.infection.pubgmobile.com",
    "*.metro.pubgmobile.com",
    "*.erangel.pubgmobile.com",
    "*.miramar.pubgmobile.com",
    "*.sanhok.pubgmobile.com",
    "*.vikendi.pubgmobile.com",
    "*.livik.pubgmobile.com",
    "*.nusa.pubgmobile.com",
    "*.karakin.pubgmobile.com"
];


// ┌──────────────────────────────────────────────────────┐
// │  🔐 AUTH & LOGIN - التسجيل والدخول                  │
// │     شامل: Facebook, Google, Twitter, Apple, Guest   │
// └──────────────────────────────────────────────────────┘
var DOMAINS_AUTH = [
    "*.auth.pubgmobile.com",
    "*.login.pubgmobile.com",
    "*.oauth.pubgmobile.com",
    "*.token.pubgmobile.com",
    "*.session.pubgmobile.com",
    "*.account.pubgmobile.com",
    "*.register.pubgmobile.com",
    "*.verify.pubgmobile.com",
    "*.captcha.pubgmobile.com",
    "*.sms.pubgmobile.com",
    "*.facebook.com",
    "*.fbcdn.net",
    "*.facebook.net",
    "connect.facebook.net",
    "*.googleapis.com",
    "*.googleusercontent.com",
    "play-fe.googleapis.com",
    "android.googleapis.com",
    "accounts.google.com",
    "*.apple.com",
    "appleid.apple.com",
    "*.twitter.com",
    "*.twimg.com",
    "*.x.com",
    "*.qq.com",
    "*.weixin.qq.com",
    "open.weixin.qq.com",
    "*.wechat.com",
    "*.vk.com",
    "*.line.me",
    "*.line-apps.com",
    "*.naver.com"
];


// ┌──────────────────────────────────────────────────────┐
// │  💬 SOCIAL - الأصدقاء والدردشة والقبائل             │
// │     شامل: أصدقاء، قبيلة، دردشة، هدية، دعوة        │
// └──────────────────────────────────────────────────────┘
var DOMAINS_SOCIAL = [
    "*.social.pubgmobile.com",
    "*.friend.pubgmobile.com",
    "*.friends.pubgmobile.com",
    "*.clan.pubgmobile.com",
    "*.guild.pubgmobile.com",
    "*.team.pubgmobile.com",
    "*.squad.pubgmobile.com",
    "*.crew.pubgmobile.com",
    "*.chat.pubgmobile.com",
    "*.message.pubgmobile.com",
    "*.inbox.pubgmobile.com",
    "*.mail.pubgmobile.com",
    "*.invite.pubgmobile.com",
    "*.gift.pubgmobile.com",
    "*.share.pubgmobile.com",
    "*.block.pubgmobile.com",
    "*.report.pubgmobile.com",
    "*.follow.pubgmobile.com",
    "*.follower.pubgmobile.com",
    "*.community.pubgmobile.com",
    "*.group.pubgmobile.com"
];


// ┌──────────────────────────────────────────────────────┐
// │  🎤 VOICE CHAT - المحادثة الصوتية                    │
// │     شامل: بروكسي صوتي منفصل للبنق الأفضل          │
// └──────────────────────────────────────────────────────┘
var DOMAINS_VOICE = [
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
    "*.tencentcloud.com",
    "*.trtc.tencentcloud.com",
    "*.tim.qq.com",
    "*.ims.qq.com"
];


// ┌──────────────────────────────────────────────────────┐
// │  📥 DOWNLOAD & CDN - التحديثات والتحميلات           │
// │     شامل: تحديث اللعبة، الموارد، الأصول             │
// └──────────────────────────────────────────────────────┘
var DOMAINS_DOWNLOAD = [
    "*.download.pubgmobile.com",
    "*.patch.pubgmobile.com",
    "*.update.pubgmobile.com",
    "*.hotfix.pubgmobile.com",
    "*.resource.pubgmobile.com",
    "*.asset.pubgmobile.com",
    "*.bundle.pubgmobile.com",
    "*.package.pubgmobile.com",
    "*.apk.pubgmobile.com",
    "*.obb.pubgmobile.com",
    "*.data.pubgmobile.com",
    "*.cache.pubgmobile.com",
    "*.akamaized.net",
    "*.akamai.net",
    "*.cloudfront.net",
    "*.fastly.net",
    "*.cdn77.org",
    "*.myqcloud.com",
    "*.cos.myqcloud.com",
    "*.file.myqcloud.com",
    "*.dl.client.open.g.aaplimg.com",
    "*.ggpht.com",
    "*.googlevideo.com",
    "*.githubusercontent.com"
];


// ┌──────────────────────────────────────────────────────┐
// │  👁️ ANTI-CHEAT - مكافحة الغش                        │
// │     شامل: فحص، تأكيد، حماية                         │
// └──────────────────────────────────────────────────────┘
var DOMAINS_ANTICHEAT = [
    "*.security.pubgmobile.com",
    "*.anticheat.pubgmobile.com",
    "*.protect.pubgmobile.com",
    "*.shield.pubgmobile.com",
    "*.guard.pubgmobile.com",
    "*.safe.pubgmobile.com",
    "*.verify.pubgmobile.com",
    "*.check.pubgmobile.com",
    "*.audit.pubgmobile.com",
    "*.detect.pubgmobile.com",
    "*.integrity.pubgmobile.com",
    "*.kernel.pubgmobile.com",
    "*.scan.pubgmobile.com",
    "*.device.pubgmobile.com",
    "*.deviceid.pubgmobile.com",
    "*.fingerprint.pubgmobile.com",
    "*.telemetry.pubgmobile.com",
    "*.report.pubgmobile.com"
];


// ┌──────────────────────────────────────────────────────┐
// │  💰 PAYMENTS & IAP - المدفوعات والمشتريات           │
// │     شامل: UC، المتجر، الاشتراكات                    │
// └──────────────────────────────────────────────────────┘
var DOMAINS_PAYMENT = [
    "*.pay.pubgmobile.com",
    "*.payment.pubgmobile.com",
    "*.purchase.pubgmobile.com",
    "*.billing.pubgmobile.com",
    "*.shop.pubgmobile.com",
    "*.store.pubgmobile.com",
    "*.uc.pubgmobile.com",
    "*.coin.pubgmobile.com",
    "*.diamond.pubgmobile.com",
    "*.subscribe.pubgmobile.com",
    "*.iap.pubgmobile.com",
    "*.receipt.pubgmobile.com",
    "*.order.pubgmobile.com",
    "*.transaction.pubgmobile.com",
    "*.redeem.pubgmobile.com",
    "*.coupon.pubgmobile.com",
    "*.voucher.pubgmobile.com",
    "*.promo.pubgmobile.com",
    "*.offer.pubgmobile.com",
    "buy.itunes.apple.com",
    "*.itunes.apple.com",
    "*.apple.com",
    "play.google.com",
    "*.google.com",
    "*.gstatic.com"
];


// ┌──────────────────────────────────────────────────────┐
// │  📊 ANALYTICS & CRASH - التحليلات والأعطال          │
// │     شامل: إحصائيات، تقارير، تحسين الأداء           │
// └──────────────────────────────────────────────────────┘
var DOMAINS_ANALYTICS = [
    "*.analytics.pubgmobile.com",
    "*.stats.pubgmobile.com",
    "*.metrics.pubgmobile.com",
    "*.track.pubgmobile.com",
    "*.log.pubgmobile.com",
    "*.report.pubgmobile.com",
    "*.crash.pubgmobile.com",
    "*.error.pubgmobile.com",
    "*.diagnostic.pubgmobile.com",
    "*.ping.pubgmobile.com",
    "*.monitor.pubgmobile.com",
    "*.performance.pubgmobile.com",
    "*.data.pubgmobile.com",
    "*.feedback.pubgmobile.com",
    "*.survey.pubgmobile.com",
    "*.timber.tencent.com",
    "*.beacon.qq.com",
    "*.report.qq.com",
    "*.crashlytics.com",
    "*.firebaseio.com",
    "*.firebase.com",
    "*.app-measurement.com",
    "*.google-analytics.com",
    "*.googletagmanager.com",
    "*.adjust.com",
    "*.appsflyer.com",
    "*.branch.io",
    "*.singular.net",
    "*.tenjin.io"
];


// ┌──────────────────────────────────────────────────────┐
// │  🏆 COMPETITIVE & ESPORTS - البطولات والتصنيف       │
// │     شامل: ترتيب، بطولات، إنجازات                    │
// └──────────────────────────────────────────────────────┘
var DOMAINS_COMPETITIVE = [
    "*.rank.pubgmobile.com",
    "*.leaderboard.pubgmobile.com",
    "*.season.pubgmobile.com",
    "*.tournament.pubgmobile.com",
    "*.champion.pubgmobile.com",
    "*.esports.pubgmobile.com",
    "*.pro.pubgmobile.com",
    "*.competitive.pubgmobile.com",
    "*.ladder.pubgmobile.com",
    "*.tier.pubgmobile.com",
    "*.badge.pubgmobile.com",
    "*.title.pubgmobile.com",
    "*.achievement.pubgmobile.com",
    "*.trophy.pubgmobile.com",
    "*.reward.pubgmobile.com",
    "*.milestone.pubgmobile.com",
    "*.progress.pubgmobile.com",
    "*.battlepass.pubgmobile.com",
    "*.royalepass.pubgmobile.com",
    "*.rp.pubgmobile.com",
    "*.prime.pubgmobile.com"
];


// ┌──────────────────────────────────────────────────────┐
// │  🎬 SPECTATOR & REPLAY - المشاهدة وإعادة اللعب      │
// │     شامل: مشاهدة، بث، تسجيل، مراجعة                │
// └──────────────────────────────────────────────────────┘
var DOMAINS_SPECTATOR = [
    "*.spectate.pubgmobile.com",
    "*.watch.pubgmobile.com",
    "*.replay.pubgmobile.com",
    "*.record.pubgmobile.com",
    "*.highlight.pubgmobile.com",
    "*.clip.pubgmobile.com",
    "*.stream.pubgmobile.com",
    "*.broadcast.pubgmobile.com",
    "*.theater.pubgmobile.com",
    "*.cinema.pubgmobile.com",
    "*.ace.pubgmobile.com",
    "*.clip.pubgmobile.com"
];


// ┌──────────────────────────────────────────────────────┐
// │  🏠 HOME & HOUSING - المنزل والديكور                │
// │     شامل: منزل، أثاث، ديكور، زيارة                 │
// └──────────────────────────────────────────────────────┘
var DOMAINS_HOME = [
    "*.home.pubgmobile.com",
    "*.house.pubgmobile.com",
    "*.furniture.pubgmobile.com",
    "*.decoration.pubgmobile.com",
    "*.interior.pubgmobile.com",
    "*.visit.pubgmobile.com",
    "*.guest.pubgmobile.com",
    "*.camp.pubgmobile.com"
];


// ┌──────────────────────────────────────────────────────┐
// │  📱 PUSH & NOTIFICATIONS - الإشعارات                 │
// │     شامل: إشعارات، تنبيهات، رسائل                   │
// └──────────────────────────────────────────────────────┘
var DOMAINS_PUSH = [
    "*.push.pubgmobile.com",
    "*.notify.pubgmobile.com",
    "*.notification.pubgmobile.com",
    "*.alert.pubgmobile.com",
    "*.announce.pubgmobile.com",
    "*.news.pubgmobile.com",
    "*.bulletin.pubgmobile.com",
    "*.banner.pubgmobile.com",
    "*.popup.pubgmobile.com",
    "*.inbox.pubgmobile.com",
    "*.inbox-api.pubgmobile.com",
    "*.xmpp.pubgmobile.com",
    "mtalk.google.com",
    "android.clients.google.com",
    "*.gcm.googleapis.com",
    "*.fcm.googleapis.com"
];


// ┌──────────────────────────────────────────────────────┐
// │  🌍 TENCENT & CLOUD SERVICES - خدمات Tencent         │
// └──────────────────────────────────────────────────────┘
var DOMAINS_TENCENT = [
    "*.tencent.com",
    "*.tencentyun.com",
    "*.cloud.tencent.com",
    "*.qcloud.com",
    "*.qcloudcdn.com",
    "*.cos.myqcloud.com",
    "*.cdn.dnsv1.com",
    "*.dnspod.net",
    "*.gp.qq.com",
    "*.game.qq.com",
    "*.speed.game.qq.com",
    "*.gpod.qq.com",
    "*.qpic.cn",
    "*.xiaojukeji.com",
    "*.wegame.com",
    "*.qlchat.com",
    "*.docs.qq.com",
    "*.dnspod.com",
    "*.cap.qq.com",
    "*.tps.qq.com"
];


// ╔══════════════════════════════════════════════════════╗
// ║    ⑤  GAME SERVER IPs (中东 - Middle East)          ║
// ╚══════════════════════════════════════════════════════╝

var SERVER_MATCH_V4 = [
    // Tencent Cloud Middle East
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
    // AWS Middle East (Bahrain)
    "13.248.0.0/14",
    "15.177.0.0/16",
    "99.82.0.0/16",
    "15.230.0.0/16",
    "52.95.0.0/16"
];

var SERVER_MATCH_V6 = [
    "2402:4e00::/32",
    "2406:da00::/32",
    "2406:d200::/32",
    "2600:1f00::/24"
];

// ─── Lobby Server IPs (شرق أوسط + عالمي) ───
var SERVER_LOBBY_V4 = [
    "49.51.0.0/16",
    "43.154.0.0/15",
    "101.32.0.0/14",
    "119.28.0.0/16",
    "150.109.0.0/16",
    "129.204.0.0/16",
    "203.205.0.0/16",
    "111.231.0.0/16",
    "118.89.0.0/16"
];

var SERVER_LOBBY_V6 = [
    "2402:4e00::/32",
    "2406:da00::/32"
];


// ╔══════════════════════════════════════════════════════╗
// ║    ⑥  HELPER FUNCTIONS - IPv4 & IPv6                ║
// ╚══════════════════════════════════════════════════════╝

// ─── هل IPv6؟ ───
function isIPv6(addr) {
    return addr.indexOf(":") !== -1;
}

// ─── هل IPv4 صحيح؟ ───
function isIPv4(addr) {
    var p = addr.split(".");
    if (p.length !== 4) return false;
    for (var i = 0; i < 4; i++) {
        var n = parseInt(p[i], 10);
        if (isNaN(n) || n < 0 || n > 255) return false;
    }
    return true;
}

// ─── هل هو عنوان IP؟ ───
function isIP(host) {
    return isIPv4(host) || isIPv6(host);
}

// ─── تحويل IPv4 إلى رقم ───
function ip4toNum(ip) {
    var p = ip.split(".");
    return ((parseInt(p[0], 10) << 24) |
            (parseInt(p[1], 10) << 16) |
            (parseInt(p[2], 10) << 8) |
            parseInt(p[3], 10)) >>> 0;
}

// ─── توسيع IPv6 ───
function expandIPv6(ip) {
    var str = ip.toLowerCase();
    // إزالة Zone ID إن وُجد
    var zi = str.indexOf("%");
    if (zi !== -1) str = str.substring(0, zi);

    var parts = str.split(":");

    // معالجة ::
    var dbl = -1;
    for (var i = 0; i < parts.length; i++) {
        if (parts[i] === "" && i > 0 && i < parts.length - 1) {
            dbl = i;
        } else if (parts[i] === "" && i === 0) {
            dbl = 0;
        }
    }

    var expanded = [];
    if (dbl !== -1) {
        for (var i = 0; i < dbl; i++) {
            if (parts[i] !== "") expanded.push(parts[i]);
        }
        var fill = 8 - parts.filter(function(x) { return x !== ""; }).length + 1;
        for (var i = 0; i < fill; i++) expanded.push("0000");
        for (var i = dbl + 1; i < parts.length; i++) {
            if (parts[i] !== "") expanded.push(parts[i]);
        }
    } else {
        expanded = parts;
    }

    while (expanded.length < 8) expanded.push("0000");

    var result = [];
    for (var i = 0; i < 8; i++) {
        var p = expanded[i] || "0";
        while (p.length < 4) p = "0" + p;
        result.push(p);
    }
    return result.join(":");
}

// ─── IPv6 إلى binary ───
function ipv6toBin(ip) {
    var hex = expandIPv6(ip).replace(/:/g, "");
    var bin = "";
    for (var i = 0; i < hex.length; i++) {
        var b = parseInt(hex.charAt(i), 16).toString(2);
        while (b.length < 4) b = "0" + b;
        bin += b;
    }
    return bin;
}

// ─── IPv4 CIDR ───
function ip4inCIDR(ip, cidr) {
    var parts = cidr.split("/");
    var mask = parseInt(parts[1], 10);
    var ipN = ip4toNum(ip);
    var rnN = ip4toNum(parts[0]);
    var mb = mask === 0 ? 0 : (~0 << (32 - mask)) >>> 0;
    return (ipN & mb) === (rnN & mb);
}

// ─── IPv6 CIDR ───
function ip6inCIDR(ip, cidr) {
    var parts = cidr.split("/");
    var maskLen = parseInt(parts[1], 10);
    var ipBin = ipv6toBin(ip);
    var pfxBin = ipv6toBin(parts[0]);
    for (var i = 0; i < maskLen; i++) {
        if (ipBin.charAt(i) !== pfxBin.charAt(i)) return false;
    }
    return true;
}

// ─── فحص IP في نطاق CIDR ───
function isInCIDR(ip, cidr) {
    if (cidr.indexOf(":") !== -1) {
        if (!isIPv6(ip)) return false;
        return ip6inCIDR(ip, cidr);
    }
    if (!isIPv4(ip)) return false;
    return ip4inCIDR(ip, cidr);
}

// ─── فحص IP ضمن قائمة ───
function ipInList(host, list) {
    if (!isIP(host)) return false;
    for (var i = 0; i < list.length; i++) {
        if (isInCIDR(host, list[i])) return true;
    }
    return false;
}

// ─── فحص IP في عدة قوائم ───
function ipInLists(host, lists) {
    if (!isIP(host)) return false;
    for (var l = 0; l < lists.length; l++) {
        for (var i = 0; i < lists[l].length; i++) {
            if (isInCIDR(host, lists[l][i])) return true;
        }
    }
    return false;
}

// ─── فحص IP أردني ───
function isJoIP(host) {
    if (!isIP(host)) return false;
    if (isIPv6(host)) return ipInList(host, JO_ALL_V6);
    return ipInList(host, JO_ALL_V4);
}

// ─── فحص IP خادم مباريات ───
function isMatchSrv(host) {
    if (!isIP(host)) return false;
    if (isIPv6(host)) return ipInList(host, SERVER_MATCH_V6);
    return ipInList(host, SERVER_MATCH_V4);
}

// ─── فحص IP خادم لوبي ───
function isLobbySrv(host) {
    if (!isIP(host)) return false;
    if (isIPv6(host)) return ipInList(host, SERVER_LOBBY_V6);
    return ipInList(host, SERVER_LOBBY_V4);
}

// ─── فحص دومين في قائمة ───
function domMatch(host, list) {
    var h = host.toLowerCase();
    for (var i = 0; i < list.length; i++) {
        var d = list[i].toLowerCase();
        if (d.charAt(0) === "*") {
            var base = d.substring(2);
            if (h === base || h.length > base.length) {
                if (h.substring(h.length - base.length - 1) === "." + base) return true;
            }
            if (h === base) return true;
        } else {
            if (h === d) return true;
        }
    }
    return false;
}


// ╔══════════════════════════════════════════════════════╗
// ║    ⑦  MAIN - FindProxyForURL                        ║
// ╚══════════════════════════════════════════════════════╝

function FindProxyForURL(url, host) {

    var h = host.toLowerCase();

    // ─── إذا هو عنوان IP مباشر ───
    if (isIP(host)) {

        // خادم مباريات → بورت المباريات
        if (isMatchSrv(host)) return MATCH_PROXY;

        // IP أردني → بورت اللوبي
        if (isJoIP(host)) return LOBBY_PROXY;

        // خادم لوبي
        if (isLobbySrv(host)) return LOBBY_PROXY;
    }

    // ─── ① المباريات والسيرفرات ───
    if (domMatch(h, DOMAINS_MATCH)) {
        if (isJoIP(host)) return MATCH_PROXY;
        return MATCH_PROXY;
    }

    // ─── ② التسجيل والدخول ───
    if (domMatch(h, DOMAINS_AUTH)) {
        if (isJoIP(host)) return AUTH_PROXY;
        return AUTH_PROXY;
    }

    // ─── ③ المحادثة الصوتية ───
    if (domMatch(h, DOMAINS_VOICE)) {
        if (isJoIP(host)) return VOICE_PROXY;
        return VOICE_PROXY;
    }

    // ─── ④ التحميلات والتحديثات ───
    if (domMatch(h, DOMAINS_DOWNLOAD)) {
        if (isJoIP(host)) return DOWNLOAD_PROXY;
        return DOWNLOAD_PROXY;
    }

    // ─── ⑤ مكافحة الغش ───
    if (domMatch(h, DOMAINS_ANTICHEAT)) {
        if (isJoIP(host)) return ANTICHEAT_PROXY;
        return ANTICHEAT_PROXY;
    }

    // ─── ⑥ المدفوعات ───
    if (domMatch(h, DOMAINS_PAYMENT)) {
        if (isJoIP(host)) return PAYMENT_PROXY;
        return PAYMENT_PROXY;
    }

    // ─── ⑦ التحليلات ───
    if (domMatch(h, DOMAINS_ANALYTICS)) {
        if (isJoIP(host)) return ANALYTICS_PROXY;
        return ANALYTICS_PROXY;
    }

    // ─── ⑧ الاجتماعية ───
    if (domMatch(h, DOMAINS_SOCIAL)) {
        if (isJoIP(host)) return SOCIAL_PROXY;
        return SOCIAL_PROXY;
    }

    // ─── ⑨ البطولات والتصنيف ───
    if (domMatch(h, DOMAINS_COMPETITIVE)) {
        if (isJoIP(host)) return MATCH_PROXY;
        return MATCH_PROXY;
    }

    // ─── ⑩ المشاهدة وإعادة اللعب ───
    if (domMatch(h, DOMAINS_SPECTATOR)) {
        if (isJoIP(host)) return MATCH_PROXY;
        return MATCH_PROXY;
    }

    // ─── ⑪ المنزل والديكور ───
    if (domMatch(h, DOMAINS_HOME)) {
        if (isJoIP(host)) return LOBBY_PROXY;
        return LOBBY_PROXY;
    }

    // ─── ⑫ الإشعارات ───
    if (domMatch(h, DOMAINS_PUSH)) {
        if (isJoIP(host)) return LOBBY_PROXY;
        return LOBBY_PROXY;
    }

    // ─── ⑬ اللوبي الرئيسي ───
    if (domMatch(h, DOMAINS_LOBBY)) {
        if (isJoIP(host)) return LOBBY_PROXY;
        return LOBBY_PROXY;
    }

    // ─── ⑭ خدمات Tencent ───
    if (domMatch(h, DOMAINS_TENCENT)) {
        if (isJoIP(host)) return LOBBY_PROXY;
        return LOBBY_PROXY;
    }

    // ─── ⑮ أي IP أردني ───
    if (isJoIP(host)) {
        return LOBBY_PROXY;
    }

    // ─── ⑯ كل شيء آخر → مباشر ───
    return DIRECT;
}


// ╔══════════════════════════════════════════════════════╗
// ║    ⑧  TEST FUNCTION (للتجربة فقط - احذفها بعد)     ║
// ╚══════════════════════════════════════════════════════╝
/*
function testPAC() {

    var tests = [
        // 🏠 Lobby
        ["http://lobby.pubgmobile.com", "lobby.pubgmobile.com", "1080"],
        ["http://shop.pubgmobile.com", "shop.pubgmobile.com", "1080"],
        ["http://event.pubgmobile.com", "event.pubgmobile.com", "1080"],

        // 🎮 Match
        ["http://match.pubgmobile.com", "match.pubgmobile.com", "1081"],
        ["http://game.pubgmobile.com", "game.pubgmobile.com", "1081"],

        // 🔐 Auth
        ["http://auth.pubgmobile.com", "auth.pubgmobile.com", "1084"],
        ["http://connect.facebook.net", "connect.facebook.net", "1084"],

        // 🎤 Voice
        ["http://voice.pubgmobile.com", "voice.pubgmobile.com", "1083"],

        // 📥 Download
        ["http://download.pubgmobile.com", "download.pubgmobile.com", "1082"],

        // 🛡️ Anti-cheat
        ["http://security.pubgmobile.com", "security.pubgmobile.com", "1086"],

        // 💰 Payment
        ["http://pay.pubgmobile.com", "pay.pubgmobile.com", "1087"],

        // 🇯🇴 Jordan IP
        ["http://example.com", "37.35.1.1", "1080"],
        ["http://example.com", "2a00:8c00::1", "1080"],

        // 🌍 Direct
        ["http://google.com", "google.com", "DIRECT"]
    ];

    for (var i = 0; i < tests.length; i++) {
        var result = FindProxyForURL(tests[i][0], tests[i][1]);
        alert(tests[i][1] + " → " + result);
    }
}
*/
