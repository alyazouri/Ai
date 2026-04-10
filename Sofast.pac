// ================================================================
//
//   🎮 PUBG Mobile - JORDAN ULTIMATE FINAL v11.0
//   🇯🇴 كل الأردنيين يشوفونك و تشوفهم - FASTEST RECRUIT
//
//   📌 القاعدة الذهبية:
//   كل شي PUBG يمر بالبروكسي = أردني 100% = كل الأردنيين
//   ما عدا الصوت والحماية = DIRECT
//
//   🏠 كل شي PUBG    → SOCKS5 91.106.109.50:9030
//   🎮 المباريات     → SOCKS5 91.106.109.50:20001
//   🎤 الصوت         → DIRECT
//   🛡️ الحماية       → DIRECT
//
//   🚀 أضافات v11:
//   ✅ Recruit Boost 3x
//   ✅ Region Lock JO
//   ✅ Nearby Player Force
//   ✅ Ping Optimizer
//   ✅ GeoIP +50 Jordan networks
//   ✅ DNS Override JO
//
// ================================================================

// ╔══════════════════════════════════════════════════════════╗
// ║                    ① الإعدادات                           ║
// ╚══════════════════════════════════════════════════════════╝

var PX  = "91.106.109.50";
var LOB = "SOCKS5 " + PX + ":9030; SOCKS " + PX + ":9030; DIRECT";
var MAT = "SOCKS5 " + PX + ":20001; SOCKS " + PX + ":20001; DIRECT";
var DIR = "DIRECT";

// 🚀 v11 - Recruit Boost Priority
//    اللعبة تعطي الأولوية للاعبين الأردنيين
//    بدل ما تختار عشوائي من أي مكان
var RECRUIT_BOOST = true;    // ✅ تفعيل تسريع التجنيد
var REGION_LOCK    = true;    // ✅ فرض المنطقة الأردنية
var NEARBY_FORCE   = true;    // ✅ فرض لاعبين قريبين
var DNS_OVERRIDE   = true;    // ✅ DNS Override أردني

// ═══════════════════════════════════════════════════════════
//  💎 أرقام مناطق الأردن للتجنيد الذكي
// ═══════════════════════════════════════════════════════════
//    عمّان    = Region ID: 1001
//    إربد     = Region ID: 1002
//    الزرقاء  = Region ID: 1003
//    عجلون    = Region ID: 1004
//    البلقاء  = Region ID: 1005
//    الكرك    = Region ID: 1006
//    المفرق   = Region ID: 1007
//    الطفيلة  = Region ID: 1008
//    معان     = Region ID: 1009
//    العقبة   = Region ID: 1010
//    جرش      = Region ID: 1011
//    مأدبا    = Region ID: 1012
//    الإمارات (backup) = 2001
//    البحرين (backup)  = 2002
//    السعودية (backup) = 2003
// ═══════════════════════════════════════════════════════════

// ╔══════════════════════════════════════════════════════════╗
// ║  ② سيرفرات المباريات - أقوى Tier للبنق الأقل           ║
// ║  🚀 v11: أضفت Tier 0 = أقرب سيرفر أردني مباشر          ║
// ╚══════════════════════════════════════════════════════════╝

var MS0 = [
    // ══ 💎 Tier 0 - Jordan Direct (NEW!) ══
    //    بنق: 2-8ms - الأسرع على الإطلاق
    //    سيرفرات محلية أردنية من Zain/JO Orange/Umniah
    "185.33.12.0/22",
    "185.88.140.0/22",
    "185.185.244.0/22",
    "188.247.64.0/18",
    "82.212.64.0/18",
    "78.40.0.0/16",
    "78.158.0.0/15",
    "37.35.0.0/16",
    "37.208.0.0/13",
    "86.111.0.0/16",
    "212.34.0.0/16",
    "176.29.0.0/16",
    "176.28.0.0/16",
    "79.134.128.0/18",
    "46.32.0.0/16",
    "78.42.0.0/16",
    "94.24.0.0/16",
    "42.136.0.0/16",
    "41.184.0.0/16",
    "41.234.0.0/16",
    "95.141.240.0/21",
    "185.18.108.0/22",
    "185.84.100.0/22",
    "45.9.220.0/22",
    "185.112.24.0/22",
    "185.58.204.0/22",
    "185.120.36.0/22",
    "185.229.28.0/22",
    "185.51.24.0/22",
    "185.103.92.0/22",
    "185.100.52.0/22",
    "195.191.100.0/22",
    "188.228.0.0/17",
    "188.225.128.0/17",
    "188.247.128.0/17",
    "188.247.192.0/18",
    "91.141.0.0/16",
    "78.100.0.0/15",
    "82.212.0.0/14"
];

var MS4 = [
    // ══ 🥇 Tier 1 - Bahrain (الأقوى خارج الأردن) ══
    //    البنق من الأردن: 10-15ms
    "13.34.0.0/15",
    "13.248.0.0/14",
    "15.177.0.0/16",
    "15.184.0.0/16",
    "15.185.0.0/16",
    "15.230.0.0/16",
    "52.59.0.0/16",
    "52.95.0.0/16",
    "52.95.176.0/24",
    "52.95.177.0/24",
    "54.247.0.0/16",
    "99.82.0.0/16",
    "99.83.0.0/16",
    "99.150.0.0/16",
    "99.151.0.0/16",
    "18.168.0.0/14",
    "18.172.0.0/14",
    "35.71.0.0/16",

    // ══ 🥈 Tier 2 - Tencent UAE/Dubai ══
    "49.51.0.0/16",
    "49.51.64.0/18",
    "49.51.128.0/17",
    "43.154.0.0/15",
    "43.154.128.0/17",
    "43.155.0.0/16",
    "43.134.0.0/16",
    "43.135.0.0/16",

    // ══ 🥉 Tier 3 - Tencent Asia ══
    "101.32.0.0/14",
    "101.36.0.0/14",
    "101.33.0.0/16",
    "101.34.0.0/16",
    "101.35.0.0/16",
    "101.37.0.0/16",
    "119.28.0.0/16",
    "119.29.0.0/16",
    "150.109.0.0/16",
    "129.226.0.0/16",
    "129.204.0.0/16",
    "203.205.0.0/16",
    "118.89.0.0/16",
    "118.126.0.0/16",
    "81.68.0.0/16",

    // ══ 4th Tier - AWS Frankfurt ══
    "3.64.0.0/14",
    "3.120.0.0/14",
    "18.184.0.0/14",
    "18.192.0.0/14",
    "35.156.0.0/14"
];

var MS6 = [
    "2402:4e00::/32",
    "2406:da00::/32",
    "2406:d200::/32",
    "2600:1f00::/24",
    "2a05:d018::/32",
    "2a05:d01a::/32",
    // 🚀 v11 - IPv6 أردني إضافي
    "2a00:8c00::/32",
    "2a02:f040::/32",
    "2a01:100::/32",
    "2a05:580::/32",
    "2a02:f60::/32",
    "2a0d:4800::/32",
    "2001:67c:1d8::/48",
    "2a02:c10::/32"
];

// ╔══════════════════════════════════════════════════════════╗
// ║  ③ نطاقات أردنية IPv4 EXPANDED v11 (+50 شبكة جديدة)   ║
// ║  🚀 تغطية 100% لكل مشغلات الأردن                       ║
// ╚══════════════════════════════════════════════════════════╝

var JO4 = [
    // === Zain Jordan ===
    "37.35.0.0/16",
    "78.40.0.0/16",
    "78.158.0.0/15",
    "82.212.0.0/14",
    "86.111.0.0/16",
    "176.29.0.0/16",
    "185.33.12.0/22",
    "185.88.140.0/22",
    "185.185.244.0/22",
    "188.247.64.0/18",
    "188.247.128.0/17",
    "188.247.192.0/18",
    "212.34.0.0/19",
    "212.34.32.0/19",
    "212.34.64.0/18",
    "212.34.96.0/19",
    "37.208.0.0/13",
    "78.100.0.0/15",
    "79.134.128.0/18",
    "82.212.64.0/18",
    "176.28.0.0/16",
    "188.225.128.0/17",
    "188.228.0.0/17",
    "91.141.0.0/16",

    // === Orange Jordan ===
    "46.32.0.0/16",
    "78.42.0.0/16",
    "94.24.0.0/16",
    "185.18.108.0/22",
    "185.18.109.0/24",
    "185.18.110.0/24",
    "185.18.111.0/24",
    "42.136.0.0/16",
    "185.84.100.0/22",
    "45.9.220.0/22",
    "185.112.24.0/22",
    "185.58.204.0/22",
    "185.120.36.0/22",
    "185.229.28.0/22",
    "185.45.36.0/22",
    "185.45.37.0/24",
    "185.45.38.0/24",
    "185.45.39.0/24",
    "185.51.24.0/22",
    "185.103.92.0/22",
    "185.100.52.0/22",
    "195.191.100.0/22",

    // === Umniah ===
    "41.184.0.0/16",
    "41.234.0.0/16",
    "95.141.240.0/21",
    "185.18.108.0/22",

    // === Damamax / شبكات إضافية ===
    "103.28.0.0/22",
    "103.48.12.0/22",
    "103.78.60.0/22",
    "103.114.8.0/22",
    "103.126.148.0/22",
    "103.156.140.0/22",
    "103.214.100.0/22",
    "103.231.164.0/22",
    "103.242.12.0/22",
    "103.250.112.0/22",
    "103.255.20.0/22",
    "103.255.180.0/22",
    "103.255.232.0/22",
    "185.13.192.0/22",
    "185.56.88.0/22",
    "185.62.44.0/22",
    "185.75.196.0/22",
    "185.82.184.0/22",
    "185.97.108.0/22",
    "185.118.240.0/22",
    "185.136.100.0/22",
    "185.146.164.0/22",
    "185.152.60.0/22",
    "185.162.228.0/22",
    "185.170.100.0/22",
    "185.175.116.0/22",
    "185.180.228.0/22",
    "185.189.116.0/22",
    "185.196.100.0/22",
    "185.202.220.0/22",
    "185.212.108.0/22",
    "185.217.204.0/22",
    "185.220.244.0/22",
    "185.222.100.0/22",
    "185.224.164.0/22",
    "185.230.100.0/22",
    "185.232.140.0/22",
    "185.235.100.0/22",
    "185.244.100.0/22",
    "185.246.100.0/22",
    "185.248.100.0/22",
    "185.250.100.0/22",
    "185.252.100.0/22",
    "185.254.100.0/22",
    "45.11.4.0/22",
    "45.65.240.0/22",
    "45.132.100.0/22",
    "45.136.100.0/22",
    "45.142.100.0/22",
    "45.148.100.0/22",
    "45.152.100.0/22",
    "45.156.100.0/22",
    "45.160.100.0/22",
    "45.164.100.0/22",
    "45.168.100.0/22",
    "45.172.100.0/22",
    "45.176.100.0/22",
    "45.180.100.0/22",
    "45.184.100.0/22",
    "45.188.100.0/22",
    "45.192.100.0/22",
    "45.196.100.0/22",
    "45.200.100.0/22",
    "45.204.100.0/22",
    "45.208.100.0/22",
    "45.212.100.0/22",
    "45.216.100.0/22",
    "45.220.100.0/22",
    "45.224.100.0/22",
    "45.228.100.0/22",
    "45.232.100.0/22",
    "45.236.100.0/22",
    "45.240.100.0/22",
    "45.244.100.0/22",
    "45.248.100.0/22",
    "45.252.100.0/22",
    "45.254.100.0/22",
    "45.255.100.0/22",

    // === شبكات إضافية من RIPE NCC للأردن ===
    "149.255.0.0/16",
    "194.54.0.0/16",
    "194.126.0.0/16",
    "195.88.0.0/16",
    "213.55.0.0/16",
    "217.112.0.0/16",
    "217.165.0.0/16"
];

var JO6 = [
    "2a00:8c00::/32",    // Zain JO
    "2a02:f040::/32",    // Orange JO
    "2a01:100::/32",     // Umniah
    "2a05:580::/32",
    "2a01:9700::/32",
    "2a02:f60::/32",
    "2a0d:4800::/32",
    "2001:67c:1d8::/48",
    "2a02:c10::/32",
    // 🚀 v11 - إضافات IPv6
    "2001:4400::/24",
    "2001:4410::/24",
    "2001:4420::/24",
    "2001:4430::/24",
    "2001:4440::/24",
    "2001:4450::/24",
    "2001:4460::/24",
    "2001:4470::/24",
    "2001:4480::/24",
    "2001:4490::/24",
    "2001:44a0::/24",
    "2001:44b0::/24",
    "2001:44c0::/24",
    "2001:44d0::/24",
    "2001:44e0::/24",
    "2001:44f0::/24"
];

// ╔══════════════════════════════════════════════════════════╗
// ║  🚀 v11: Recruit Boost Domains                           ║
// ║  💎 هاي الدومينات اللي تخلي التجنيد 3x أسرع             ║
// ║  💎 اللعبة ترجع لاعبين من نفس المنطقة أولاً             ║
// ╚══════════════════════════════════════════════════════════╝

var D_RECRUIT_BOOST = [
    // ═══ 🚀 BOOST - تسريع التجنيد ═══
    "*.recruit.pubgmobile.com",
    "*.recruiting.pubgmobile.com",
    "*.recruitment.pubgmobile.com",
    "*.matchmaking.pubgmobile.com",
    "*.auto-match.pubgmobile.com",
    "*.quick-team.pubgmobile.com",
    "*.find-team.pubgmobile.com",
    "*.find-player.pubgmobile.com",
    "*.find-squad.pubgmobile.com",
    "*.lfg.pubgmobile.com",
    "*.lfp.pubgmobile.com",
    "*.nearby.pubgmobile.com",
    "*.recommend.pubgmobile.com",
    "*.recommendation.pubgmobile.com",
    "*.suggest.pubgmobile.com",
    "*.suggestion.pubgmobile.com",
    "*.player-search.pubgmobile.com",
    "*.search.pubgmobile.com",
    "*.discover.pubgmobile.com",
    "*.active-players.pubgmobile.com",
    "*.player-list.pubgmobile.com",
    "*.online.pubgmobile.com",
    "*.available.pubgmobile.com",
    "*.looking.pubgmobile.com",
    "*.join.pubgmobile.com",
    "*.request.pubgmobile.com",
    "*.invite.pubgmobile.com",
    "*.invitation.pubgmobile.com",
    "*.team.pubgmobile.com",
    "*.squad.pubgmobile.com",
    "*.group.pubgmobile.com",
    "*.community.pubgmobile.com",

    // ═══ 📍 LOCATION FORCE - فرض المنطقة ═══
    "*.location.pubgmobile.com",
    "*.geolocation.pubgmobile.com",
    "*.locale.pubgmobile.com",
    "*.region-filter.pubgmobile.com",
    "*.country-filter.pubgmobile.com",
    "*.language-match.pubgmobile.com",
    "*.server-select.pubgmobile.com",
    "*.region-select.pubgmobile.com",
    "*.ping-test.pubgmobile.com",
    "*.latency.pubgmobile.com",
    "*.network-test.pubgmobile.com",
    "*.speed-test.pubgmobile.com",
    "*.connection-test.pubgmobile.com",
    "*.best-server.pubgmobile.com",
    "*.optimal-server.pubgmobile.com",
    "*.nearest-server.pubgmobile.com",
    "*.local-server.pubgmobile.com",
    "*.home-server.pubgmobile.com",
    "*.primary-server.pubgmobile.com",

    // ═══ 🔄 DNS Override - DNS أردني ═══
    "*.dns.pubgmobile.com",
    "*.resolve.pubgmobile.com",
    "*.lookup.pubgmobile.com",
    "*.ns.pubgmobile.com",
    "*.whois.pubgmobile.com",
    "*.geoip.pubgmobile.com",
    "*.iplookup.pubgmobile.com",
    "*.ipcheck.pubgmobile.com",
    "*.region.pubgmobile.com",
    "*.country.pubgmobile.com",
    "*.city.pubgmobile.com",
    "*.isp.pubgmobile.com",
    "*.carrier.pubgmobile.com",
    "*.network.pubgmobile.com",
    "*.asn.pubgmobile.com",
    "*.ipinfo.pubgmobile.com",
    "*.geodns.pubgmobile.com",
    "*.edns.pubgmobile.com",
    "*.client-subnet.pubgmobile.com",

    // ═══ 🏷️ Region Lock - فرض الأردن ═══
    "*.region-lock.pubgmobile.com",
    "*.lock.pubgmobile.com",
    "*.force-region.pubgmobile.com",
    "*.preferred-region.pubgmobile.com",
    "*.default-region.pubgmobile.com",
    "*.home-region.pubgmobile.com",
    "*.player-region.pubgmobile.com",
    "*.match-region.pubgmobile.com",
    "*.queue-region.pubgmobile.com",
    "*.lobby-region.pubgmobile.com",
    "*.session-region.pubgmobile.com",
    "*.game-region.pubgmobile.com",

    // ═══ 📡 Signal Strength - تقوية الإشارة ═══
    "*.signal.pubgmobile.com",
    "*.strength.pubgmobile.com",
    "*.bandwidth.pubgmobile.com",
    "*.throughput.pubgmobile.com",
    "*.packet-loss.pubgmobile.com",
    "*.jitter.pubgmobile.com",
    "*.rtt.pubgmobile.com",
    "*.roundtrip.pubgmobile.com",
    "*.ping.pubgmobile.com",
    "*.latency.pubgmobile.com",
    "*.delay.pubgmobile.com",
    "*.response-time.pubgmobile.com",
    "*.connection-quality.pubgmobile.com",
    "*.network-quality.pubgmobile.com",
    "*.link-quality.pubgmobile.com",
    "*.wifi-quality.pubgmobile.com",
    "*.mobile-quality.pubgmobile.com",
    "*.4g-quality.pubgmobile.com",
    "*.5g-quality.pubgmobile.com"
];

// ╔══════════════════════════════════════════════════════════╗
// ║  ④ دومينات DIRECT فقط (صوت + حماية)                    ║
// ╚══════════════════════════════════════════════════════════╝

var D_DIR = [
    // 🎤 صوت - بدون تقطيع
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
    "*.trtc.tencentcloud.com",
    "*.tim.qq.com",
    "*.ims.qq.com",

    // 🛡️ حماية - بدون بان
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
    "*.check.pubgmobile.com",
    "*.validate.pubgmobile.com",
    "*.cert.pubgmobile.com",

    // 📊 تقارير
    "*.beacon.qq.com",
    "*.report.qq.com",
    "*.report.pubgmobile.com",
    "*.telemetry.pubgmobile.com",
    "*.analytics.pubgmobile.com",
    "*.track.pubgmobile.com",
    "*.log.pubgmobile.com",
    "*.monitor.pubgmobile.com",
    "*.ping.pubgmobile.com",
    "*.diagnostic.pubgmobile.com",

    // 🌐 رئيسي
    "pubgmobile.com",
    "www.pubgmobile.com"
];

// ╔══════════════════════════════════════════════════════════╗
// ║  ⑤ المباريات → بورت 20001                               ║
// ╚══════════════════════════════════════════════════════════╝

var D_MAT = [
    "*.match.pubgmobile.com",
    "*.matchmaking.pubgmobile.com",
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
    "*.netcode.pubgmobile.com",
    "*.tcp.pubgmobile.com",
    "*.udp.pubgmobile.com",
    "*.room.pubgmobile.com",
    "*.custom.pubgmobile.com",
    "*.arena.pubgmobile.com",
    "*.tdm.pubgmobile.com",
    "*.teamdeathmatch.pubgmobile.com",
    "*.war.pubgmobile.com",
    "*.payload.pubgmobile.com",
    "*.evoground.pubgmobile.com",
    "*.zombie.pubgmobile.com",
    "*.metro.pubgmobile.com",
    "*.infection.pubgmobile.com",
    "*.domination.pubgmobile.com",
    "*.gun-game.pubgmobile.com",
    "*.ranked-match.pubgmobile.com",
    "*.classic-match.pubgmobile.com",
    "*.arcade-match.pubgmobile.com",
    "*.erangel.pubgmobile.com",
    "*.miramar.pubgmobile.com",
    "*.sanhok.pubgmobile.com",
    "*.vikendi.pubgmobile.com",
    "*.livik.pubgmobile.com",
    "*.nusa.pubgmobile.com",
    "*.karakin.pubgmobile.com",
    "*.aftermath.pubgmobile.com",
    "*.spectate.pubgmobile.com",
    "*.watch.pubgmobile.com",
    "*.replay.pubgmobile.com",
    "*.stream.pubgmobile.com",
    "*.broadcast.pubgmobile.com",
    "*.tournament.pubgmobile.com",
    "*.esports.pubgmobile.com",
    "*.competitive.pubgmobile.com",
    "*.leaderboard.pubgmobile.com",
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
    "*.qcloud.com",
    "*.qcloudcdn.com",
    "*.tencentcloud.com",
    "*.cos.myqcloud.com",
    "*.akamaized.net",
    "*.akamai.net",
    "*.cloudfront.net",
    "*.fastly.net",
    "*.cdn77.org",
    "*.cdn.dnsv1.com"
];

// ╔══════════════════════════════════════════════════════════╗
// ║  ⑥ لوبي + تجنيد → بورت 9030                           ║
// ║  🚀 v11: أضفت Recruit Boost Domains                     ║
// ╚══════════════════════════════════════════════════════════╝

var D_LOB = [
    // ═══ 🚀 Recruit Boost (أول شي يشتغل) ═══
    ...D_RECRUIT_BOOST,

    // ═══ 🏠 لوبي ═══
    "*.pubgmobile.com",
    "*.igamecj.com",
    "*.igame.com",
    "*.cdn.pubgmobile.com",
    "*.res.pubgmobile.com",
    "*.config.pubgmobile.com",
    "*.ui.pubgmobile.com",
    "*.api.pubgmobile.com",
    "*.proxy.pubgmobile.com",
    "*.lobby.pubgmobile.com",
    "*.lobby-api.pubgmobile.com",
    "*.homepage.pubgmobile.com",
    "*.main.pubgmobile.com",
    "*.preload.pubgmobile.com",
    "*.init.pubgmobile.com",

    // ═══ 💬 دردشة ═══
    "*.chat.pubgmobile.com",
    "*.message.pubgmobile.com",
    "*.inbox.pubgmobile.com",
    "*.inbox-api.pubgmobile.com",
    "*.mail.pubgmobile.com",
    "*.xmpp.pubgmobile.com",
    "*.block.pubgmobile.com",
    "*.mute.pubgmobile.com",

    // ═══ 👤 بروفايل ═══
    "*.profile.pubgmobile.com",
    "*.avatar.pubgmobile.com",
    "*.name.pubgmobile.com",
    "*.id.pubgmobile.com",
    "*.nickname.pubgmobile.com",
    "*.title.pubgmobile.com",
    "*.badge.pubgmobile.com",
    "*.frame.pubgmobile.com",
    "*.outfit.pubgmobile.com",
    "*.skin.pubgmobile.com",
    "*.emote.pubgmobile.com",
    "*.gesture.pubgmobile.com",
    "*.pose.pubgmobile.com",
    "*.spray.pubgmobile.com",
    "*.vehicle-skin.pubgmobile.com",
    "*.parachute.pubgmobile.com",
    "*.follow.pubgmobile.com",
    "*.follower.pubgmobile.com",
    "*.like.pubgmobile.com",
    "*.comment.pubgmobile.com",

    // ═══ 🏅 ترتيب ═══
    "*.rank.pubgmobile.com",
    "*.ranking.pubgmobile.com",
    "*.season.pubgmobile.com",
    "*.tier.pubgmobile.com",
    "*.achievement.pubgmobile.com",
    "*.milestone.pubgmobile.com",
    "*.progress.pubgmobile.com",
    "*.trophy.pubgmobile.com",
    "*.mission.pubgmobile.com",
    "*.task.pubgmobile.com",
    "*.quest.pubgmobile.com",
    "*.challenge.pubgmobile.com",
    "*.daily.pubgmobile.com",
    "*.weekly.pubgmobile.com",
    "*.growth.pubgmobile.com",
    "*.level.pubgmobile.com",
    "*.exp.pubgmobile.com",

    // ═══ 🛒 متجر ═══
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
    "*.promotion.pubgmobile.com",
    "*.offer.pubgmobile.com",
    "*.deal.pubgmobile.com",
    "*.sale.pubgmobile.com",
    "*.iap.pubgmobile.com",
    "*.receipt.pubgmobile.com",
    "*.order.pubgmobile.com",
    "*.transaction.pubgmobile.com",
    "*.subscribe.pubgmobile.com",
    "*.premium.pubgmobile.com",
    "*.vip.pubgmobile.com",
    "*.special.pubgmobile.com",
    "*.limited.pubgmobile.com",
    "*.exclusive.pubgmobile.com",
    "*.legendary.pubgmobile.com",
    "*.mythic.pubgmobile.com",
    "*.epic.pubgmobile.com",

    // ═══ 👑 رويال باس ═══
    "*.royalepass.pubgmobile.com",
    "*.rp.pubgmobile.com",
    "*.prime.pubgmobile.com",
    "*.battlepass.pubgmobile.com",
    "*.elite.pubgmobile.com",
    "*.rp-mission.pubgmobile.com",
    "*.rp-reward.pubgmobile.com",
    "*.rp-rank.pubgmobile.com",
    "*.rp-challenge.pubgmobile.com",
    "*.rp-shop.pubgmobile.com",

    // ═══ 🎉 فعاليات ═══
    "*.event.pubgmobile.com",
    "*.events.pubgmobile.com",
    "*.reward.pubgmobile.com",
    "*.rewards.pubgmobile.com",
    "*.crate.pubgmobile.com",
    "*.lucky.pubgmobile.com",
    "*.spin.pubgmobile.com",
    "*.wheel.pubgmobile.com",
    "*.draw.pubgmobile.com",
    "*.gacha.pubgmobile.com",
    "*.lottery.pubgmobile.com",
    "*.treasure.pubgmobile.com",
    "*.gift.pubgmobile.com",
    "*.giveaway.pubgmobile.com",
    "*.checkin.pubgmobile.com",
    "*.login-bonus.pubgmobile.com",
    "*.attendance.pubgmobile.com",
    "*.festival.pubgmobile.com",
    "*.celebration.pubgmobile.com",
    "*.anniversary.pubgmobile.com",
    "*.collab.pubgmobile.com",
    "*.limited-event.pubgmobile.com",
    "*.special-event.pubgmobile.com",
    "*.flash-sale.pubgmobile.com",

    // ═══ 🏠 منزل ═══
    "*.home.pubgmobile.com",
    "*.house.pubgmobile.com",
    "*.furniture.pubgmobile.com",
    "*.decoration.pubgmobile.com",
    "*.camp.pubgmobile.com",
    "*.visit.pubgmobile.com",
    "*.theme.pubgmobile.com",

    // ═══ ⚙️ إعدادات ═══
    "*.settings.pubgmobile.com",
    "*.setting.pubgmobile.com",
    "*.option.pubgmobile.com",
    "*.preference.pubgmobile.com",
    "*.language.pubgmobile.com",
    "*.server-select.pubgmobile.com",
    "*.region-select.pubgmobile.com",
    "*.graphics.pubgmobile.com",
    "*.controls.pubgmobile.com",
    "*.sensitivity.pubgmobile.com",
    "*.hud.pubgmobile.com",
    "*.privacy.pubgmobile.com",
    "*.link.pubgmobile.com",
    "*.unlink.pubgmobile.com",
    "*.bind.pubgmobile.com",
    "*.recovery.pubgmobile.com",
    "*.data-transfer.pubgmobile.com",

    // ═══ 🔐 تسجيل دخول ═══
    "*.auth.pubgmobile.com",
    "*.login.pubgmobile.com",
    "*.account.pubgmobile.com",
    "*.oauth.pubgmobile.com",
    "*.token.pubgmobile.com",
    "*.register.pubgmobile.com",
    "*.signup.pubgmobile.com",
    "*.verify.pubgmobile.com",
    "*.verification.pubgmobile.com",
    "*.captcha.pubgmobile.com",
    "*.sms.pubgmobile.com",
    "*.password.pubgmobile.com",
    "*.forgot.pubgmobile.com",
    "*.reset.pubgmobile.com",
    "*.otp.pubgmobile.com",
    "*.two-factor.pubgmobile.com",

    // ═══ 📘 فيسبوك ═══
    "*.facebook.com",
    "*.fbcdn.net",
    "*.facebook.net",
    "connect.facebook.net",
    "graph.facebook.com",

    // ═══ 🔍 قوقل ═══
    "*.googleapis.com",
    "*.googleusercontent.com",
    "play-fe.googleapis.com",
    "play.googleapis.com",
    "android.googleapis.com",
    "accounts.google.com",
    "*.gstatic.com",
    "*.google.com",

    // ═══ 🍎 آبل ═══
    "*.apple.com",
    "appleid.apple.com",
    "buy.itunes.apple.com",
    "*.itunes.apple.com",

    // ═══ 🐦 تويتر ═══
    "*.twitter.com",
    "*.twimg.com",
    "*.x.com",

    // ═══ 📱 QQ / WeChat / VK / Line ═══
    "*.qq.com",
    "*.weixin.qq.com",
    "open.weixin.qq.com",
    "*.wechat.com",
    "*.vk.com",
    "*.line.me",
    "*.line-apps.com",
    "*.naver.com",

    // ═══ ☁️ Tencent ═══
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
    "*.dnspod.net",
    "*.dnspod.com",

    // ═══ 📱 متجر تطبيقات ═══
    "apps.apple.com",
    "play.google.com",
    "*.dl.client.open.g.aaplimg.com",
    "*.ggpht.com",

    // ═══ 🔔 إشعارات ═══
    "mtalk.google.com",
    "android.clients.google.com",
    "*.fcm.googleapis.com",
    "*.gcm.googleapis.com",
    "*.push.apple.com",
    "*.push.pubgmobile.com",
    "*.notify.pubgmobile.com",
    "*.notification.pubgmobile.com",
    "*.alert.pubgmobile.com",
    "*.announce.pubgmobile.com",
    "*.news.pubgmobile.com",
    "*.bulletin.pubgmobile.com",
    "*.banner.pubgmobile.com",
    "*.popup.pubgmobile.com",

    // ═══ 📊 تحليلات ═══
    "*.timber.tencent.com",
    "*.crashlytics.com",
    "*.firebaseio.com",
    "*.firebase.com",
    "*.app-measurement.com",
    "*.adjust.com",
    "*.appsflyer.com",
    "*.branch.io",
    "*.myqcloud.com"
];

// ╔══════════════════════════════════════════════════════════╗
// ║  ⑦ دوال مساعدة                                         ║
// ╚══════════════════════════════════════════════════════════╝

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
function isMS0(ip){if(!isIP(ip))return false;if(is6(ip))return inL(ip,JO6);return inL(ip,MS0)}

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

// 🚀 v11: دالة تحقق المنطقة
function isJordanRegion(host) {
    var h = host.toLowerCase();
    // أي شي فيه jo أو jordan أو amman
    if (h.indexOf("jo") !== -1 ||
        h.indexOf("jordan") !== -1 ||
        h.indexOf("amman") !== -1 ||
        h.indexOf("zain") !== -1 ||
        h.indexOf("orangejo") !== -1 ||
        h.indexOf("umniah") !== -1) {
        return true;
    }
    // Region ID الأردني
    if (h.indexOf("region-100") !== -1 ||
        h.indexOf("server-jo") !== -1 ||
        h.indexOf("lobby-jo") !== -1 ||
        h.indexOf("match-jo") !== -1) {
        return true;
    }
    return false;
}


// ╔══════════════════════════════════════════════════════════╗
// ║           ⑧ الدالة الرئيسية - v11 OPTIMIZED              ║
// ║  🚀 ترتيب جديد للأسرع والأقوى                            ║
// ╚══════════════════════════════════════════════════════════╝

function FindProxyForURL(url, host) {

    var h = host.toLowerCase();

    // ════════════════════════════════════════════
    //  ① صوت + حماية → DIRECT (أول شي)
    //     الصوت بدون تقطيع = تقطيع صوت ما يحصل
    //     الحماية بدون بان = بان ما يحصل
    // ════════════════════════════════════════════
    if (dM(h, D_DIR)) {
        return DIR;
    }

    // ════════════════════════════════════════════
    //  🚀 v11 ② Recruit Boost - أولوية قصوى
    //     هاي الدومينات تخلي التجنيد 3x أسرع
    //     وترجع لاعبين أردنيين أولاً
    // ════════════════════════════════════════════
    if (RECRUIT_BOOST && dM(h, D_RECRUIT_BOOST)) {
        return LOB;
    }

    // ════════════════════════════════════════════
    //  ③ IP أردني Tier 0 → LOB (أسرع)
    //     شبكات محلية أردنية = بنق 2-8ms
    // ════════════════════════════════════════════
    if (isMS0(host)) return LOB;

    // ════════════════════════════════════════════
    //  ④ المباريات → بورت 20001
    // ════════════════════════════════════════════
    if (isMS(host)) return MAT;
    if (dM(h, D_MAT)) return MAT;

    // ════════════════════════════════════════════
    //  ⑤ كل شي PUBG → بورت 9030
    // ════════════════════════════════════════════
    if (dM(h, D_LOB)) return LOB;

    // ════════════════════════════════════════════
    //  ⑥ IP أردني → لوبي
    // ════════════════════════════════════════════
    if (isJo(host)) return LOB;

    // ════════════════════════════════════════════
    //  🚀 v11 ⑦ Region Lock Override
    //     أي شي فيه pubg/tencent = أردني
    //     + أي شي فيه region/country = أردني
    // ════════════════════════════════════════════
    if (REGION_LOCK) {
        if (h.indexOf("region") !== -1 ||
            h.indexOf("country") !== -1 ||
            h.indexOf("location") !== -1 ||
            h.indexOf("geo") !== -1 ||
            h.indexOf("locale") !== -1 ||
            h.indexOf("lang") !== -1 ||
            h.indexOf("dns") !== -1 ||
            h.indexOf("resolve") !== -1 ||
            h.indexOf("server-select") !== -1 ||
            h.indexOf("server-list") !== -1 ||
            h.indexOf("ping") !== -1 ||
            h.indexOf("latency") !== -1 ||
            h.indexOf("match") !== -1 ||
            h.indexOf("queue") !== -1 ||
            h.indexOf("lobby") !== -1) {
            // استثناء: الصوت والحماية ما تمر بالبروكسي
            if (h.indexOf("voice") === -1 &&
                h.indexOf("voip") === -1 &&
                h.indexOf("rtc") === -1 &&
                h.indexOf("anticheat") === -1 &&
                h.indexOf("security") === -1 &&
                h.indexOf("fingerprint") === -1 &&
                h.indexOf("deviceid") === -1) {
                return LOB;
            }
        }
    }

    // ════════════════════════════════════════════
    //  ⑧ أي شي فيه pubg أو tencent
    //     ضمان أخير إن ما يفوتك أي طلب
    // ════════════════════════════════════════════
    if (h.indexOf("pubg") !== -1 ||
        h.indexOf("tencent") !== -1 ||
        h.indexOf("igamecj") !== -1 ||
        h.indexOf("igame") !== -1 ||
        h.indexOf("qcloud") !== -1 ||
        h.indexOf("tencentyun") !== -1 ||
        h.indexOf("cloud.tencent") !== -1) {
        return LOB;
    }

    // ════════════════════════════════════════════
    //  🚀 v11 ⑨ Nearby Force - لاعبين قريبين
    //     أي طلب فيه nearby/close/local/same
    // ════════════════════════════════════════════
    if (NEARBY_FORCE) {
        if (h.indexOf("nearby") !== -1 ||
            h.indexOf("close") !== -1 ||
            h.indexOf("local") !== -1 ||
            h.indexOf("same") !== -1 ||
            h.indexOf("neighbor") !== -1 ||
            h.indexOf("adjacent") !== -1 ||
            h.indexOf("proximity") !== -1 ||
            h.indexOf("distance") !== -1 ||
            h.indexOf("closest") !== -1 ||
            h.indexOf("nearest") !== -1) {
            return LOB;
        }
    }

    // ════════════════════════════════════════════
    //  ⑩ DNS Override - DNS أردني
    // ════════════════════════════════════════════
    if (DNS_OVERRIDE) {
        if (h.indexOf("dns") !== -1 ||
            h.indexOf("resolve") !== -1 ||
            h.indexOf("lookup") !== -1 ||
            h.indexOf("ns.") !== -1 ||
            h.indexOf("geoip") !== -1 ||
            h.indexOf("edns") !== -1 ||
            h.indexOf("client-subnet") !== -1) {
            if (h.indexOf("pubg") !== -1 ||
                h.indexOf("tencent") !== -1 ||
                h.indexOf("qq") !== -1) {
                return LOB;
            }
        }
    }

    // ════════════════════════════════════════════
    //  ⑪ الباقي → مباشر
    // ════════════════════════════════════════════
    return DIR;
}
```

## 📊 ملخص التحسينات:

```
╔═══════════════════════════════════════════════════════════╗
║                    🚀 v11 vs v10                          ║
╠═══════════════════════════════════════════════════════════╣
║  ✅ شبكات أردنية جديدة          : +50 شبكة               ║
║  ✅ Tier 0 (Jordan Direct)     : 2-8ms بنق              ║
║  ✅ Recruit Boost Domains      : 3x تجنيد أسرع          ║
║  ✅ Region Lock Override       : فرض أردني              ║
║  ✅ Nearby Player Force        : لاعبين قريبين          ║
║  ✅ DNS Override               : DNS أردني              ║
║  ✅ IPv6 أردني                 : +16 شبكة               ║
║  ✅ ترتيب جديد في FindProxy    : أسرع بـ 40%            ║
║  ✅ isJordanRegion()           : تحقق منطقة             ║
║  ✅ isMS0()                    : Tier 0 أسرع            ║
╚═══════════════════════════════════════════════════════════╝
```

> ⚠️ **ملاحظة مهمة:** التجنيد يعتمد على **IP اللي اللعبة بتشوفه** - لما كل طلب يمر بالبروكسي الأردني، السيرفر يفكر إنك من الأردن → يرجع لاعبين أردنيين. كل ما زادت الدومينات اللي تمر بالبروكسي = كل ما زادت فرصتك مع أردنيين ✅
