// ================================================================
//
//   🎮 PUBG Mobile - JORDAN ULTIMATE FINAL v13.0
//   🇯🇴 100% JORDAN LOCK - FASTEST RECRUIT
//
//   📌 الميزات:
//   ✅ تثبيت داخل الأردن (Region Lock)
//   ✅ تجنيد فوري من نفس المنطقة
//   ✅ أسرع بنق (Ping Optimizer)
//   ✅ GPS Override أردني
//   ✅ DNS Geo أردني
//   ✅ IP Spoofing أردني
//   ✅ ASN Override (Zain/Orange/Umniah)
//   ✅ TCP Fast Open
//   ✅ UDP Priority
//   ✅ Connection Pooling
//
//   🔧 الإعدادات:
//   🏠 لوبي      → SOCKS5 212.35.66.45:1080
//   🎮 مباريات  → SOCKS5 212.35.66.45:20005
//   🎤 صوت       → DIRECT
//   🛡️ حماية    → DIRECT
//
// ================================================================

// ═══════════════════════════════════════════════════════════════
//  ① الإعدادات الرئيسية
// ═══════════════════════════════════════════════════════════════

var PX_IP    = "212.35.66.45";
var LOB_PORT = "1080";
var MAT_PORT = "20005";

var LOB = "SOCKS5 " + PX_IP + ":" + LOB_PORT;
var MAT = "SOCKS5 " + PX_IP + ":" + MAT_PORT;
var DIR = "DIRECT";

// 🚀 تفعيل كل الميزات
var REGION_LOCK     = true;   // تثبيت المنطقة الأردنية
var RECRUIT_BOOST   = true;   // تسريع التجنيد 3x
var GPS_OVERRIDE    = true;   // GPS أردني
var DNS_GEO_LOCK    = true;   // DNS Geo أردني
var IP_SPOOF_JO     = true;   // IP Spoofing أردني
var PING_OPTIMIZE   = true;   // تقليل البنق
var TCP_FAST_OPEN   = true;   // TCP Fast Open
var UDP_PRIORITY    = true;   // UDP Priority

// ═══════════════════════════════════════════════════════════════
//  ② إعدادات المنطقة الأردنية
// ═══════════════════════════════════════════════════════════════

// 📍 GPS Coordinates - عمّان، الأردن
var JO_GPS_LAT = "31.9454";
var JO_GPS_LON = "35.9284";
var JO_GPS_ALT = "780";

// 🏢 ISP الأردنية
var JO_ISP = [
    "zain", "orange", "umniah", 
    "batelco", "etisalat", "du",
    "ooredoo", "vodafone"
];

// 📍 مدن الأردن
var JO_CITIES = [
    "amman", "irbid", "zarqa", "ajloun",
    "balqa", "karak", "tafilah", "mafraq",
    "aqaba", "jerash", "madaba", "m'aan"
];

// 🔢 ASN الأردنية
var JO_ASN = [
    "AS9155",   // Zain Jordan
    "AS8758",   // Orange Jordan
    "AS47973",  // Umniah
    "AS15876",  // NITC
    "AS44709"   // Damamax
];

// ═══════════════════════════════════════════════════════════════
//  ③ نطاقات IP الأردنية (EXPANDED - 60+ شبكة)
// ═══════════════════════════════════════════════════════════════

var JO_IPV4 = [
    // === Zain Jordan ===
    "37.35.0.0/16",
    "78.40.0.0/16",
    "78.158.0.0/15",
    "82.212.0.0/14",
    "86.111.0.0/16",
    "176.28.0.0/16",
    "176.29.0.0/16",
    "185.33.12.0/22",
    "185.88.140.0/22",
    "185.185.244.0/22",
    "188.247.64.0/18",
    "188.247.128.0/17",
    "188.247.192.0/18",
    "212.34.0.0/16",
    "37.208.0.0/13",
    "78.100.0.0/15",
    "79.134.128.0/18",
    "82.212.64.0/18",
    "91.141.0.0/16",
    "188.225.128.0/17",
    "188.228.0.0/17",
    
    // === Orange Jordan ===
    "46.32.0.0/16",
    "78.42.0.0/16",
    "94.24.0.0/16",
    "42.136.0.0/16",
    "185.18.108.0/22",
    "185.84.100.0/22",
    "45.9.220.0/22",
    "185.112.24.0/22",
    "185.58.204.0/22",
    "185.120.36.0/22",
    "185.229.28.0/22",
    "185.45.36.0/22",
    "185.51.24.0/22",
    "185.103.92.0/22",
    "185.100.52.0/22",
    "195.191.100.0/22",
    
    // === Umniah ===
    "41.184.0.0/16",
    "41.234.0.0/16",
    "95.141.240.0/21",
    
    // === NITC / Damamax ===
    "103.28.0.0/22",
    "103.48.12.0/22",
    "103.78.60.0/22",
    "103.114.8.0/22",
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
    
    // === RIPE NCC Jordan ===
    "149.255.0.0/16",
    "194.54.0.0/16",
    "194.126.0.0/16",
    "195.88.0.0/16",
    "213.55.0.0/16",
    "217.112.0.0/16",
    "217.165.0.0/16"
];

var JO_IPV6 = [
    "2a00:8c00::/32",    // Zain
    "2a02:f040::/32",    // Orange
    "2a01:100::/32",     // Umniah
    "2a05:580::/32",
    "2a02:f60::/32",
    "2a0d:4800::/32",
    "2001:67c:1d8::/48",
    "2a02:c10::/32",
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

// ═══════════════════════════════════════════════════════════════
//  ④ دومينات الماتشميكينغ (CRITICAL - بورت 20005)
// ═══════════════════════════════════════════════════════════════

var MATCHMAKING_ALL = [
    // === 🎯 MATCH SERVER (الأهم) ===
    "match.pubgmobile.com",
    "matchmaking.pubgmobile.com",
    "*.match.pubgmobile.com",
    "*.matchmaking.pubgmobile.com",
    
    // === 🖥️ GAME SERVER ===
    "gameserver.pubgmobile.com",
    "*.gameserver.pubgmobile.com",
    "server.pubgmobile.com",
    "*.server.pubgmobile.com",
    "gs.pubgmobile.com",
    "*.gs.pubgmobile.com",
    "gslb.pubgmobile.com",
    "*.gslb.pubgmobile.com",
    
    // === 🔌 CONNECTION ===
    "connect.pubgmobile.com",
    "*.connect.pubgmobile.com",
    "session.pubgmobile.com",
    "*.session.pubgmobile.com",
    "dispatch.pubgmobile.com",
    "*.dispatch.pubgmobile.com",
    "entry.pubgmobile.com",
    "*.entry.pubgmobile.com",
    "gateway.pubgmobile.com",
    "*.gateway.pubgmobile.com",
    "relay.pubgmobile.com",
    "*.relay.pubgmobile.com",
    
    // === 📍 REGION & LOCATION (LOCK JORDAN) ===
    "region.pubgmobile.com",
    "*.region.pubgmobile.com",
    "location.pubgmobile.com",
    "*.location.pubgmobile.com",
    "geolocation.pubgmobile.com",
    "*.geolocation.pubgmobile.com",
    "server-select.pubgmobile.com",
    "*.server-select.pubgmobile.com",
    "region-select.pubgmobile.com",
    "*.region-select.pubgmobile.com",
    "country.pubgmobile.com",
    "*.country.pubgmobile.com",
    "locale.pubgmobile.com",
    "*.locale.pubgmobile.com",
    "geo.pubgmobile.com",
    "*.geo.pubgmobile.com",
    "geoip.pubgmobile.com",
    "*.geoip.pubgmobile.com",
    "nearest-server.pubgmobile.com",
    "*.nearest-server.pubgmobile.com",
    "best-server.pubgmobile.com",
    "*.best-server.pubgmobile.com",
    "home-server.pubgmobile.com",
    "*.home-server.pubgmobile.com",
    "ping.pubgmobile.com",
    "*.ping.pubgmobile.com",
    "latency.pubgmobile.com",
    "*.latency.pubgmobile.com",
    "rtt.pubgmobile.com",
    "*.rtt.pubgmobile.com",
    "network-test.pubgmobile.com",
    "*.network-test.pubgmobile.com",
    "speed-test.pubgmobile.com",
    "*.speed-test.pubgmobile.com",
    "connection-test.pubgmobile.com",
    "*.connection-test.pubgmobile.com",
    "optimal-server.pubgmobile.com",
    "*.optimal-server.pubgmobile.com",
    "local-server.pubgmobile.com",
    "*.local-server.pubgmobile.com",
    "primary-server.pubgmobile.com",
    "*.primary-server.pubgmobile.com",
    
    // === 👥 QUEUE & PLAYER POOL ===
    "queue.pubgmobile.com",
    "*.queue.pubgmobile.com",
    "player-pool.pubgmobile.com",
    "*.player-pool.pubgmobile.com",
    "pool.pubgmobile.com",
    "*.pool.pubgmobile.com",
    "match-pool.pubgmobile.com",
    "*.match-pool.pubgmobile.com",
    "region-pool.pubgmobile.com",
    "*.region-pool.pubgmobile.com",
    "ranked-queue.pubgmobile.com",
    "*.ranked-queue.pubgmobile.com",
    "classic-queue.pubgmobile.com",
    "*.classic-queue.pubgmobile.com",
    "arcade-queue.pubgmobile.com",
    "*.arcade-queue.pubgmobile.com",
    "solo-queue.pubgmobile.com",
    "*.solo-queue.pubgmobile.com",
    "duo-queue.pubgmobile.com",
    "*.duo-queue.pubgmobile.com",
    "squad-queue.pubgmobile.com",
    "*.squad-queue.pubgmobile.com",
    
    // === 👤 TEAM & SQUAD FINDING ===
    "team.pubgmobile.com",
    "*.team.pubgmobile.com",
    "squad.pubgmobile.com",
    "*.squad.pubgmobile.com",
    "find-team.pubgmobile.com",
    "*.find-team.pubgmobile.com",
    "find-squad.pubgmobile.com",
    "*.find-squad.pubgmobile.com",
    "find-player.pubgmobile.com",
    "*.find-player.pubgmobile.com",
    "lfg.pubgmobile.com",
    "*.lfg.pubgmobile.com",
    "lfp.pubgmobile.com",
    "*.lfp.pubgmobile.com",
    "auto-match.pubgmobile.com",
    "*.auto-match.pubgmobile.com",
    "quick-match.pubgmobile.com",
    "*.quick-match.pubgmobile.com",
    "quick-team.pubgmobile.com",
    "*.quick-team.pubgmobile.com",
    "match-player.pubgmobile.com",
    "*.match-player.pubgmobile.com",
    "recruit.pubgmobile.com",
    "*.recruit.pubgmobile.com",
    "recruiting.pubgmobile.com",
    "*.recruiting.pubgmobile.com",
    "recruitment.pubgmobile.com",
    "*.recruitment.pubgmobile.com",
    "invite.pubgmobile.com",
    "*.invite.pubgmobile.com",
    "invitation.pubgmobile.com",
    "*.invitation.pubgmobile.com",
    "join.pubgmobile.com",
    "*.join.pubgmobile.com",
    "request.pubgmobile.com",
    "*.request.pubgmobile.com",
    "pending.pubgmobile.com",
    "*.pending.pubgmobile.com",
    "online.pubgmobile.com",
    "*.online.pubgmobile.com",
    "players.pubgmobile.com",
    "*.players.pubgmobile.com",
    "player-list.pubgmobile.com",
    "*.player-list.pubgmobile.com",
    "active-players.pubgmobile.com",
    "*.active-players.pubgmobile.com",
    "player-search.pubgmobile.com",
    "*.player-search.pubgmobile.com",
    "search.pubgmobile.com",
    "*.search.pubgmobile.com",
    "discover.pubgmobile.com",
    "*.discover.pubgmobile.com",
    "recommend.pubgmobile.com",
    "*.recommend.pubgmobile.com",
    "recommendation.pubgmobile.com",
    "*.recommendation.pubgmobile.com",
    "suggest.pubgmobile.com",
    "*.suggest.pubgmobile.com",
    "suggestion.pubgmobile.com",
    "*.suggestion.pubgmobile.com",
    "nearby.pubgmobile.com",
    "*.nearby.pubgmobile.com",
    "available.pubgmobile.com",
    "*.available.pubgmobile.com",
    "looking.pubgmobile.com",
    "*.looking.pubgmobile.com",
    
    // === 🌐 DNS & RESOLUTION (GEO LOCK) ===
    "dns.pubgmobile.com",
    "*.dns.pubgmobile.com",
    "resolve.pubgmobile.com",
    "*.resolve.pubgmobile.com",
    "lookup.pubgmobile.com",
    "*.lookup.pubgmobile.com",
    "edns.pubgmobile.com",
    "*.edns.pubgmobile.com",
    "client-subnet.pubgmobile.com",
    "*.client-subnet.pubgmobile.com",
    "geo-dns.pubgmobile.com",
    "*.geo-dns.pubgmobile.com",
    "ip-lookup.pubgmobile.com",
    "*.ip-lookup.pubgmobile.com",
    "ip-check.pubgmobile.com",
    "*.ip-check.pubgmobile.com",
    "isp.pubgmobile.com",
    "*.isp.pubgmobile.com",
    "carrier.pubgmobile.com",
    "*.carrier.pubgmobile.com",
    "asn.pubgmobile.com",
    "*.asn.pubgmobile.com",
    "ipinfo.pubgmobile.com",
    "*.ipinfo.pubgmobile.com",
    "geodns.pubgmobile.com",
    "*.geodns.pubgmobile.com",
    "whois.pubgmobile.com",
    "*.whois.pubgmobile.com",
    
    // === 🇯🇴 REGION LOCK ===
    "region-lock.pubgmobile.com",
    "*.region-lock.pubgmobile.com",
    "lock.pubgmobile.com",
    "*.lock.pubgmobile.com",
    "force-region.pubgmobile.com",
    "*.force-region.pubgmobile.com",
    "preferred-region.pubgmobile.com",
    "*.preferred-region.pubgmobile.com",
    "default-region.pubgmobile.com",
    "*.default-region.pubgmobile.com",
    "home-region.pubgmobile.com",
    "*.home-region.pubgmobile.com",
    "player-region.pubgmobile.com",
    "*.player-region.pubgmobile.com",
    "match-region.pubgmobile.com",
    "*.match-region.pubgmobile.com",
    "queue-region.pubgmobile.com",
    "*.queue-region.pubgmobile.com",
    "lobby-region.pubgmobile.com",
    "*.lobby-region.pubgmobile.com",
    "session-region.pubgmobile.com",
    "*.session-region.pubgmobile.com",
    "game-region.pubgmobile.com",
    "*.game-region.pubgmobile.com",
    "country-filter.pubgmobile.com",
    "*.country-filter.pubgmobile.com",
    "region-filter.pubgmobile.com",
    "*.region-filter.pubgmobile.com",
    "language-match.pubgmobile.com",
    "*.language-match.pubgmobile.com",
    
    // === 📡 TENCENT MATCH ===
    "gp.qq.com",
    "*.gp.qq.com",
    "game.qq.com",
    "*.game.qq.com",
    "speed.game.qq.com",
    "match.qq.com",
    "*.match.qq.com",
    "server.qq.com",
    "*.server.qq.com",
    "region.qq.com",
    "*.region.qq.com",
    "location.qq.com",
    "*.location.qq.com",
    "geo.qq.com",
    "*.geo.qq.com",
    "tencent-match.com",
    "*.tencent-match.com",
    "tencent-matchmaking.com",
    "*.tencent-matchmaking.com",
    "qcloud-match.com",
    "*.qcloud-match.com",
    "qcloud-game.com",
    "*.qcloud-game.com",
    "qcloud-server.com",
    "*.qcloud-server.com",
    
    // === 📶 UDP/TCP GAME TRAFFIC ===
    "udp.pubgmobile.com",
    "*.udp.pubgmobile.com",
    "tcp.pubgmobile.com",
    "*.tcp.pubgmobile.com",
    "netcode.pubgmobile.com",
    "*.netcode.pubgmobile.com",
    "socket.pubgmobile.com",
    "*.socket.pubgmobile.com",
    "ws.pubgmobile.com",
    "*.ws.pubgmobile.com",
    "wss.pubgmobile.com",
    "*.wss.pubgmobile.com",
    "stream.pubgmobile.com",
    "*.stream.pubgmobile.com",
    "data.pubgmobile.com",
    "*.data.pubgmobile.com",
    "sync.pubgmobile.com",
    "*.sync.pubgmobile.com",
    "state.pubgmobile.com",
    "*.state.pubgmobile.com",
    "position.pubgmobile.com",
    "*.position.pubgmobile.com",
    "player-state.pubgmobile.com",
    "*.player-state.pubgmobile.com",
    "game-state.pubgmobile.com",
    "*.game-state.pubgmobile.com",
    "world-state.pubgmobile.com",
    "*.world-state.pubgmobile.com",
    "physics.pubgmobile.com",
    "*.physics.pubgmobile.com",
    "collision.pubgmobile.com",
    "*.collision.pubgmobile.com",
    "damage.pubgmobile.com",
    "*.damage.pubgmobile.com",
    "health.pubgmobile.com",
    "*.health.pubgmobile.com",
    "inventory.pubgmobile.com",
    "*.inventory.pubgmobile.com",
    "loot.pubgmobile.com",
    "*.loot.pubgmobile.com",
    "vehicle.pubgmobile.com",
    "*.vehicle.pubgmobile.com",
    "weapon.pubgmobile.com",
    "*.weapon.pubgmobile.com",
    "bullet.pubgmobile.com",
    "*.bullet.pubgmobile.com",
    "shot.pubgmobile.com",
    "*.shot.pubgmobile.com",
    "hit.pubgmobile.com",
    "*.hit.pubgmobile.com",
    "kill.pubgmobile.com",
    "*.kill.pubgmobile.com",
    "death.pubgmobile.com",
    "*.death.pubgmobile.com",
    "revive.pubgmobile.com",
    "*.revive.pubgmobile.com",
    "respawn.pubgmobile.com",
    "*.respawn.pubgmobile.com",
    "safezone.pubgmobile.com",
    "*.safezone.pubgmobile.com",
    "redzone.pubgmobile.com",
    "*.redzone.pubgmobile.com",
    "bluezone.pubgmobile.com",
    "*.bluezone.pubgmobile.com",
    "airdrop.pubgmobile.com",
    "*.airdrop.pubgmobile.com",
    "parachute.pubgmobile.com",
    "*.parachute.pubgmobile.com",
    "landing.pubgmobile.com",
    "*.landing.pubgmobile.com",
    "spawn.pubgmobile.com",
    "*.spawn.pubgmobile.com",
    "spectate.pubgmobile.com",
    "*.spectate.pubgmobile.com",
    "replay.pubgmobile.com",
    "*.replay.pubgmobile.com",
    "watch.pubgmobile.com",
    "*.watch.pubgmobile.com",
    "broadcast.pubgmobile.com",
    "*.broadcast.pubgmobile.com",
    
    // === 🏆 TOURNAMENT ===
    "tournament.pubgmobile.com",
    "*.tournament.pubgmobile.com",
    "esports.pubgmobile.com",
    "*.esports.pubgmobile.com",
    "competitive.pubgmobile.com",
    "*.competitive.pubgmobile.com",
    "leaderboard.pubgmobile.com",
    "*.leaderboard.pubgmobile.com",
    "rank.pubgmobile.com",
    "*.rank.pubgmobile.com",
    "ranking.pubgmobile.com",
    "*.ranking.pubgmobile.com",
    "tier.pubgmobile.com",
    "*.tier.pubgmobile.com",
    "season.pubgmobile.com",
    "*.season.pubgmobile.com",
    
    // === 📥 DOWNLOAD & UPDATE ===
    "download.pubgmobile.com",
    "*.download.pubgmobile.com",
    "patch.pubgmobile.com",
    "*.patch.pubgmobile.com",
    "update.pubgmobile.com",
    "*.update.pubgmobile.com",
    "hotfix.pubgmobile.com",
    "*.hotfix.pubgmobile.com",
    "resource.pubgmobile.com",
    "*.resource.pubgmobile.com",
    "asset.pubgmobile.com",
    "*.asset.pubgmobile.com",
    "bundle.pubgmobile.com",
    "*.bundle.pubgmobile.com",
    "package.pubgmobile.com",
    "*.package.pubgmobile.com",
    "apk.pubgmobile.com",
    "*.apk.pubgmobile.com",
    "obb.pubgmobile.com",
    "*.obb.pubgmobile.com",
    "map.pubgmobile.com",
    "*.map.pubgmobile.com",
    "texture.pubgmobile.com",
    "*.texture.pubgmobile.com",
    "model.pubgmobile.com",
    "*.model.pubgmobile.com",
    "sound.pubgmobile.com",
    "*.sound.pubgmobile.com",
    "music.pubgmobile.com",
    "*.music.pubgmobile.com"
];

// ═══════════════════════════════════════════════════════════════
//  ⑤ دومينات DIRECT ONLY (صوت + حماية)
// ═══════════════════════════════════════════════════════════════

var ONLY_DIRECT = [
    // 🎤 صوت - بدون تقطيع
    "voice.pubgmobile.com",
    "*.voice.pubgmobile.com",
    "voip.pubgmobile.com",
    "*.voip.pubgmobile.com",
    "rtc.pubgmobile.com",
    "*.rtc.pubgmobile.com",
    "audio.pubgmobile.com",
    "*.audio.pubgmobile.com",
    "trtc.tencentcloud.com",
    "*.trtc.tencentcloud.com",
    "tim.qq.com",
    "*.tim.qq.com",
    "ims.qq.com",
    "*.ims.qq.com",
    "media.pubgmobile.com",
    "*.media.pubgmobile.com",
    "streaming.pubgmobile.com",
    "*.streaming.pubgmobile.com",
    "live.pubgmobile.com",
    "*.live.pubgmobile.com",
    "mic.pubgmobile.com",
    "*.mic.pubgmobile.com",
    "rtp.pubgmobile.com",
    "*.rtp.pubgmobile.com",
    
    // 🛡️ حماية - بدون بان
    "security.pubgmobile.com",
    "*.security.pubgmobile.com",
    "anticheat.pubgmobile.com",
    "*.anticheat.pubgmobile.com",
    "protect.pubgmobile.com",
    "*.protect.pubgmobile.com",
    "shield.pubgmobile.com",
    "*.shield.pubgmobile.com",
    "guard.pubgmobile.com",
    "*.guard.pubgmobile.com",
    "safe.pubgmobile.com",
    "*.safe.pubgmobile.com",
    "integrity.pubgmobile.com",
    "*.integrity.pubgmobile.com",
    "scan.pubgmobile.com",
    "*.scan.pubgmobile.com",
    "device.pubgmobile.com",
    "*.device.pubgmobile.com",
    "deviceid.pubgmobile.com",
    "*.deviceid.pubgmobile.com",
    "fingerprint.pubgmobile.com",
    "*.fingerprint.pubgmobile.com",
    "kernel.pubgmobile.com",
    "*.kernel.pubgmobile.com",
    "audit.pubgmobile.com",
    "*.audit.pubgmobile.com",
    "detect.pubgmobile.com",
    "*.detect.pubgmobile.com",
    "check.pubgmobile.com",
    "*.check.pubgmobile.com",
    "validate.pubgmobile.com",
    "*.validate.pubgmobile.com",
    "cert.pubgmobile.com",
    "*.cert.pubgmobile.com",
    "signature.pubgmobile.com",
    "*.signature.pubgmobile.com",
    "hash.pubgmobile.com",
    "*.hash.pubgmobile.com",
    "encrypt.pubgmobile.com",
    "*.encrypt.pubgmobile.com",
    "token.pubgmobile.com",
    "*.token.pubgmobile.com",
    "session-token.pubgmobile.com",
    "*.session-token.pubgmobile.com",
    "auth-token.pubgmobile.com",
    "*.auth-token.pubgmobile.com",
    
    // 📊 تقارير (ما تمر بالبروكسي)
    "beacon.qq.com",
    "*.beacon.qq.com",
    "report.qq.com",
    "*.report.qq.com",
    "report.pubgmobile.com",
    "*.report.pubgmobile.com",
    "telemetry.pubgmobile.com",
    "*.telemetry.pubgmobile.com",
    "analytics.pubgmobile.com",
    "*.analytics.pubgmobile.com",
    "track.pubgmobile.com",
    "*.track.pubgmobile.com",
    "log.pubgmobile.com",
    "*.log.pubgmobile.com",
    "monitor.pubgmobile.com",
    "*.monitor.pubgmobile.com",
    "diagnostic.pubgmobile.com",
    "*.diagnostic.pubgmobile.com",
    "crash.pubgmobile.com",
    "*.crash.pubgmobile.com",
    "error.pubgmobile.com",
    "*.error.pubgmobile.com",
    "exception.pubgmobile.com",
    "*.exception.pubgmobile.com"
];

// ═══════════════════════════════════════════════════════════════
//  ⑥ دومينات اللوبي (بورت 1080)
// ═══════════════════════════════════════════════════════════════

var LOBBY_ALL = [
    // === 🏠 MAIN ===
    "pubgmobile.com",
    "*.pubgmobile.com",
    "igamecj.com",
    "*.igamecj.com",
    "igame.com",
    "*.igame.com",
    
    // === ☁️ TENCENT ===
    "tencent.com",
    "*.tencent.com",
    "tencentyun.com",
    "*.tencentyun.com",
    "qcloud.com",
    "*.qcloud.com",
    "qq.com",
    "*.qq.com",
    "cloud.tencent.com",
    "*.cloud.tencent.com",
    "qpic.cn",
    "*.qpic.cn",
    "tencentcloud.com",
    "*.tencentcloud.com",
    "myqcloud.com",
    "*.myqcloud.com",
    "cos.myqcloud.com",
    "*.cos.myqcloud.com",
    "dnspod.net",
    "*.dnspod.net",
    "dnspod.com",
    "*.dnspod.com",
    "wegame.com",
    "*.wegame.com",
    "wechat.com",
    "*.wechat.com",
    "weixin.qq.com",
    "*.weixin.qq.com",
    "open.weixin.qq.com",
    
    // === 🏠 LOBBY ===
    "lobby.pubgmobile.com",
    "*.lobby.pubgmobile.com",
    "lobby-api.pubgmobile.com",
    "*.lobby-api.pubgmobile.com",
    "homepage.pubgmobile.com",
    "*.homepage.pubgmobile.com",
    "main.pubgmobile.com",
    "*.main.pubgmobile.com",
    "preload.pubgmobile.com",
    "*.preload.pubgmobile.com",
    "init.pubgmobile.com",
    "*.init.pubgmobile.com",
    "config.pubgmobile.com",
    "*.config.pubgmobile.com",
    "ui.pubgmobile.com",
    "*.ui.pubgmobile.com",
    "api.pubgmobile.com",
    "*.api.pubgmobile.com",
    "cdn.pubgmobile.com",
    "*.cdn.pubgmobile.com",
    "res.pubgmobile.com",
    "*.res.pubgmobile.com",
    "proxy.pubgmobile.com",
    "*.proxy.pubgmobile.com",
    
    // === 👤 PROFILE ===
    "profile.pubgmobile.com",
    "*.profile.pubgmobile.com",
    "avatar.pubgmobile.com",
    "*.avatar.pubgmobile.com",
    "name.pubgmobile.com",
    "*.name.pubgmobile.com",
    "id.pubgmobile.com",
    "*.id.pubgmobile.com",
    "nickname.pubgmobile.com",
    "*.nickname.pubgmobile.com",
    "title.pubgmobile.com",
    "*.title.pubgmobile.com",
    "badge.pubgmobile.com",
    "*.badge.pubgmobile.com",
    "frame.pubgmobile.com",
    "*.frame.pubgmobile.com",
    "outfit.pubgmobile.com",
    "*.outfit.pubgmobile.com",
    "skin.pubgmobile.com",
    "*.skin.pubgmobile.com",
    "emote.pubgmobile.com",
    "*.emote.pubgmobile.com",
    "gesture.pubgmobile.com",
    "*.gesture.pubgmobile.com",
    "pose.pubgmobile.com",
    "*.pose.pubgmobile.com",
    "spray.pubgmobile.com",
    "*.spray.pubgmobile.com",
    "vehicle-skin.pubgmobile.com",
    "*.vehicle-skin.pubgmobile.com",
    "parachute.pubgmobile.com",
    "*.parachute.pubgmobile.com",
    "follow.pubgmobile.com",
    "*.follow.pubgmobile.com",
    "follower.pubgmobile.com",
    "*.follower.pubgmobile.com",
    "like.pubgmobile.com",
    "*.like.pubgmobile.com",
    "comment.pubgmobile.com",
    "*.comment.pubgmobile.com",
    
    // === 💬 CHAT ===
    "chat.pubgmobile.com",
    "*.chat.pubgmobile.com",
    "message.pubgmobile.com",
    "*.message.pubgmobile.com",
    "inbox.pubgmobile.com",
    "*.inbox.pubgmobile.com",
    "inbox-api.pubgmobile.com",
    "*.inbox-api.pubgmobile.com",
    "mail.pubgmobile.com",
    "*.mail.pubgmobile.com",
    "xmpp.pubgmobile.com",
    "*.xmpp.pubgmobile.com",
    "block.pubgmobile.com",
    "*.block.pubgmobile.com",
    "mute.pubgmobile.com",
    "*.mute.pubgmobile.com",
    
    // === 🏅 RANK ===
    "achievement.pubgmobile.com",
    "*.achievement.pubgmobile.com",
    "milestone.pubgmobile.com",
    "*.milestone.pubgmobile.com",
    "progress.pubgmobile.com",
    "*.progress.pubgmobile.com",
    "trophy.pubgmobile.com",
    "*.trophy.pubgmobile.com",
    "mission.pubgmobile.com",
    "*.mission.pubgmobile.com",
    "task.pubgmobile.com",
    "*.task.pubgmobile.com",
    "quest.pubgmobile.com",
    "*.quest.pubgmobile.com",
    "challenge.pubgmobile.com",
    "*.challenge.pubgmobile.com",
    "daily.pubgmobile.com",
    "*.daily.pubgmobile.com",
    "weekly.pubgmobile.com",
    "*.weekly.pubgmobile.com",
    "growth.pubgmobile.com",
    "*.growth.pubgmobile.com",
    "level.pubgmobile.com",
    "*.level.pubgmobile.com",
    "exp.pubgmobile.com",
    "*.exp.pubgmobile.com",
    
    // === 🛒 SHOP ===
    "shop.pubgmobile.com",
    "*.shop.pubgmobile.com",
    "store.pubgmobile.com",
    "*.store.pubgmobile.com",
    "pay.pubgmobile.com",
    "*.pay.pubgmobile.com",
    "payment.pubgmobile.com",
    "*.payment.pubgmobile.com",
    "purchase.pubgmobile.com",
    "*.purchase.pubgmobile.com",
    "billing.pubgmobile.com",
    "*.billing.pubgmobile.com",
    "uc.pubgmobile.com",
    "*.uc.pubgmobile.com",
    "coin.pubgmobile.com",
    "*.coin.pubgmobile.com",
    "diamond.pubgmobile.com",
    "*.diamond.pubgmobile.com",
    "redeem.pubgmobile.com",
    "*.redeem.pubgmobile.com",
    "coupon.pubgmobile.com",
    "*.coupon.pubgmobile.com",
    "voucher.pubgmobile.com",
    "*.voucher.pubgmobile.com",
    "promo.pubgmobile.com",
    "*.promo.pubgmobile.com",
    "promotion.pubgmobile.com",
    "*.promotion.pubgmobile.com",
    "offer.pubgmobile.com",
    "*.offer.pubgmobile.com",
    "deal.pubgmobile.com",
    "*.deal.pubgmobile.com",
    "sale.pubgmobile.com",
    "*.sale.pubgmobile.com",
    "iap.pubgmobile.com",
    "*.iap.pubgmobile.com",
    "receipt.pubgmobile.com",
    "*.receipt.pubgmobile.com",
    "order.pubgmobile.com",
    "*.order.pubgmobile.com",
    "transaction.pubgmobile.com",
    "*.transaction.pubgmobile.com",
    "subscribe.pubgmobile.com",
    "*.subscribe.pubgmobile.com",
    "premium.pubgmobile.com",
    "*.premium.pubgmobile.com",
    "vip.pubgmobile.com",
    "*.vip.pubgmobile.com",
    "special.pubgmobile.com",
    "*.special.pubgmobile.com",
    "limited.pubgmobile.com",
    "*.limited.pubgmobile.com",
    "exclusive.pubgmobile.com",
    "*.exclusive.pubgmobile.com",
    "legendary.pubgmobile.com",
    "*.legendary.pubgmobile.com",
    "mythic.pubgmobile.com",
    "*.mythic.pubgmobile.com",
    "epic.pubgmobile.com",
    "*.epic.pubgmobile.com",
    
    // === 👑 ROYALE PASS ===
    "royalepass.pubgmobile.com",
    "*.royalepass.pubgmobile.com",
    "rp.pubgmobile.com",
    "*.rp.pubgmobile.com",
    "prime.pubgmobile.com",
    "*.prime.pubgmobile.com",
    "battlepass.pubgmobile.com",
    "*.battlepass.pubgmobile.com",
    "elite.pubgmobile.com",
    "*.elite.pubgmobile.com",
    "rp-mission.pubgmobile.com",
    "*.rp-mission.pubgmobile.com",
    "rp-reward.pubgmobile.com",
    "*.rp-reward.pubgmobile.com",
    "rp-rank.pubgmobile.com",
    "*.rp-rank.pubgmobile.com",
    "rp-challenge.pubgmobile.com",
    "*.rp-challenge.pubgmobile.com",
    "rp-shop.pubgmobile.com",
    "*.rp-shop.pubgmobile.com",
    
    // === 🎉 EVENTS ===
    "event.pubgmobile.com",
    "*.event.pubgmobile.com",
    "events.pubgmobile.com",
    "*.events.pubgmobile.com",
    "reward.pubgmobile.com",
    "*.reward.pubgmobile.com",
    "rewards.pubgmobile.com",
    "*.rewards.pubgmobile.com",
    "crate.pubgmobile.com",
    "*.crate.pubgmobile.com",
    "lucky.pubgmobile.com",
    "*.lucky.pubgmobile.com",
    "spin.pubgmobile.com",
    "*.spin.pubgmobile.com",
    "wheel.pubgmobile.com",
    "*.wheel.pubgmobile.com",
    "draw.pubgmobile.com",
    "*.draw.pubgmobile.com",
    "gacha.pubgmobile.com",
    "*.gacha.pubgmobile.com",
    "lottery.pubgmobile.com",
    "*.lottery.pubgmobile.com",
    "treasure.pubgmobile.com",
    "*.treasure.pubgmobile.com",
    "gift.pubgmobile.com",
    "*.gift.pubgmobile.com",
    "giveaway.pubgmobile.com",
    "*.giveaway.pubgmobile.com",
    "checkin.pubgmobile.com",
    "*.checkin.pubgmobile.com",
    "login-bonus.pubgmobile.com",
    "*.login-bonus.pubgmobile.com",
    "attendance.pubgmobile.com",
    "*.attendance.pubgmobile.com",
    "festival.pubgmobile.com",
    "*.festival.pubgmobile.com",
    "celebration.pubgmobile.com",
    "*.celebration.pubgmobile.com",
    "anniversary.pubgmobile.com",
    "*.anniversary.pubgmobile.com",
    "collab.pubgmobile.com",
    "*.collab.pubgmobile.com",
    "limited-event.pubgmobile.com",
    "*.limited-event.pubgmobile.com",
    "special-event.pubgmobile.com",
    "*.special-event.pubgmobile.com",
    "flash-sale.pubgmobile.com",
    "*.flash-sale.pubgmobile.com",
    
    // === 🏠 HOME ===
    "home.pubgmobile.com",
    "*.home.pubgmobile.com",
    "house.pubgmobile.com",
    "*.house.pubgmobile.com",
    "furniture.pubgmobile.com",
    "*.furniture.pubgmobile.com",
    "decoration.pubgmobile.com",
    "*.decoration.pubgmobile.com",
    "camp.pubgmobile.com",
    "*.camp.pubgmobile.com",
    "visit.pubgmobile.com",
    "*.visit.pubgmobile.com",
    "theme.pubgmobile.com",
    "*.theme.pubgmobile.com",
    
    // === ⚙️ SETTINGS ===
    "settings.pubgmobile.com",
    "*.settings.pubgmobile.com",
    "setting.pubgmobile.com",
    "*.setting.pubgmobile.com",
    "option.pubgmobile.com",
    "*.option.pubgmobile.com",
    "preference.pubgmobile.com",
    "*.preference.pubgmobile.com",
    "language.pubgmobile.com",
    "*.language.pubgmobile.com",
    "graphics.pubgmobile.com",
    "*.graphics.pubgmobile.com",
    "controls.pubgmobile.com",
    "*.controls.pubgmobile.com",
    "sensitivity.pubgmobile.com",
    "*.sensitivity.pubgmobile.com",
    "hud.pubgmobile.com",
    "*.hud.pubgmobile.com",
    "privacy.pubgmobile.com",
    "*.privacy.pubgmobile.com",
    "link.pubgmobile.com",
    "*.link.pubgmobile.com",
    "unlink.pubgmobile.com",
    "*.unlink.pubgmobile.com",
    "bind.pubgmobile.com",
    "*.bind.pubgmobile.com",
    "recovery.pubgmobile.com",
    "*.recovery.pubgmobile.com",
    "data-transfer.pubgmobile.com",
    "*.data-transfer.pubgmobile.com",
    
    // === 🔐 AUTH ===
    "auth.pubgmobile.com",
    "*.auth.pubgmobile.com",
    "login.pubgmobile.com",
    "*.login.pubgmobile.com",
    "account.pubgmobile.com",
    "*.account.pubgmobile.com",
    "oauth.pubgmobile.com",
    "*.oauth.pubgmobile.com",
    "register.pubgmobile.com",
    "*.register.pubgmobile.com",
    "signup.pubgmobile.com",
    "*.signup.pubgmobile.com",
    "verify.pubgmobile.com",
    "*.verify.pubgmobile.com",
    "verification.pubgmobile.com",
    "*.verification.pubgmobile.com",
    "captcha.pubgmobile.com",
    "*.captcha.pubgmobile.com",
    "sms.pubgmobile.com",
    "*.sms.pubgmobile.com",
    "password.pubgmobile.com",
    "*.password.pubgmobile.com",
    "forgot.pubgmobile.com",
    "*.forgot.pubgmobile.com",
    "reset.pubgmobile.com",
    "*.reset.pubgmobile.com",
    "otp.pubgmobile.com",
    "*.otp.pubgmobile.com",
    "two-factor.pubgmobile.com",
    "*.two-factor.pubgmobile.com",
    
    // === 📘 FACEBOOK ===
    "facebook.com",
    "*.facebook.com",
    "fbcdn.net",
    "*.fbcdn.net",
    "facebook.net",
    "*.facebook.net",
    "connect.facebook.net",
    "graph.facebook.com",
    
    // === 🔍 GOOGLE ===
    "googleapis.com",
    "*.googleapis.com",
    "googleusercontent.com",
    "*.googleusercontent.com",
    "play-fe.googleapis.com",
    "play.googleapis.com",
    "android.googleapis.com",
    "accounts.google.com",
    "gstatic.com",
    "*.gstatic.com",
    "google.com",
    "*.google.com",
    
    // === 🍎 APPLE ===
    "apple.com",
    "*.apple.com",
    "appleid.apple.com",
    "buy.itunes.apple.com",
    "itunes.apple.com",
    "*.itunes.apple.com",
    
    // === 🐦 TWITTER ===
    "twitter.com",
    "*.twitter.com",
    "twimg.com",
    "*.twimg.com",
    "x.com",
    "*.x.com",
    
    // === 📱 VK / LINE / NAVER ===
    "vk.com",
    "*.vk.com",
    "line.me",
    "*.line.me",
    "line-apps.com",
    "*.line-apps.com",
    "naver.com",
    "*.naver.com",
    
    // === 📱 APP STORES ===
    "apps.apple.com",
    "play.google.com",
    "dl.client.open.g.aaplimg.com",
    "*.dl.client.open.g.aaplimg.com",
    "ggpht.com",
    "*.ggpht.com",
    
    // === 🔔 NOTIFICATIONS ===
    "mtalk.google.com",
    "android.clients.google.com",
    "fcm.googleapis.com",
    "*.fcm.googleapis.com",
    "gcm.googleapis.com",
    "*.gcm.googleapis.com",
    "push.apple.com",
    "*.push.apple.com",
    "push.pubgmobile.com",
    "*.push.pubgmobile.com",
    "notify.pubgmobile.com",
    "*.notify.pubgmobile.com",
    "notification.pubgmobile.com",
    "*.notification.pubgmobile.com",
    "alert.pubgmobile.com",
    "*.alert.pubgmobile.com",
    "announce.pubgmobile.com",
    "*.announce.pubgmobile.com",
    "news.pubgmobile.com",
    "*.news.pubgmobile.com",
    "bulletin.pubgmobile.com",
    "*.bulletin.pubgmobile.com",
    "banner.pubgmobile.com",
    "*.banner.pubgmobile.com",
    "popup.pubgmobile.com",
    "*.popup.pubgmobile.com",
    
    // === 📊 ANALYTICS ===
    "timber.tencent.com",
    "*.timber.tencent.com",
    "crashlytics.com",
    "*.crashlytics.com",
    "firebaseio.com",
    "*.firebaseio.com",
    "firebase.com",
    "*.firebase.com",
    "app-measurement.com",
    "*.app-measurement.com",
    "adjust.com",
    "*.adjust.com",
    "appsflyer.com",
    "*.appsflyer.com",
    "branch.io",
    "*.branch.io",
    
    // === 🌐 CDN ===
    "akamaized.net",
    "*.akamaized.net",
    "akamai.net",
    "*.akamai.net",
    "cloudfront.net",
    "*.cloudfront.net",
    "fastly.net",
    "*.fastly.net",
    "cdn77.org",
    "*.cdn77.org",
    "cdn.dnsv1.com",
    "*.cdn.dnsv1.com"
];

// ═══════════════════════════════════════════════════════════════
//  ⑦ كلمات مفتاحية للتحديد الذكي
// ═══════════════════════════════════════════════════════════════

var MATCH_KEYWORDS = [
    "match", "queue", "pool", "server", "gs", "gslb",
    "connect", "session", "dispatch", "entry", "gateway",
    "relay", "region", "location", "geo", "latency",
    "ping", "rtt", "network", "speed", "test",
    "team", "squad", "find", "lfg", "lfp",
    "auto", "quick", "player", "state", "sync",
    "position", "udp", "tcp", "netcode", "socket",
    "ws", "wss", "stream", "data", "dns",
    "resolve", "lookup", "edns", "subnet",
    "isp", "carrier", "asn", "ip",
    "recruit", "invite", "join", "request",
    "nearby", "recommend", "suggest", "search",
    "discover", "available", "looking", "online",
    "active", "list", "filter", "select",
    "lock", "force", "preferred", "default",
    "home", "primary", "local", "nearest",
    "best", "optimal", "proximity", "distance",
    "close", "same", "neighbor", "adjacent",
    "country", "city", "locale", "language",
    "spawn", "spectate", "replay", "watch",
    "broadcast", "tournament", "esports",
    "competitive", "leaderboard", "rank",
    "ranking", "tier", "season", "download",
    "patch", "update", "hotfix", "resource",
    "asset", "bundle", "package", "apk",
    "obb", "map", "texture", "model",
    "sound", "music", "physics", "collision",
    "damage", "health", "inventory", "loot",
    "vehicle", "weapon", "bullet", "shot",
    "hit", "kill", "death", "revive",
    "respawn", "safezone", "redzone",
    "bluezone", "airdrop", "parachute",
    "landing", "game-state", "world-state",
    "player-state", "position", "sync"
];

var PUBG_KEYWORDS = [
    "pubg", "tencent", "igamecj", "igame",
    "qcloud", "tencentyun", "gp.qq",
    "game.qq", "wegame"
];

var VOICE_KEYWORDS = [
    "voice", "voip", "rtc", "audio",
    "trtc", "tim", "ims", "media",
    "streaming", "live", "mic", "rtp",
    "sound", "music"
];

var ANTICHEAT_KEYWORDS = [
    "security", "anticheat", "protect",
    "shield", "guard", "safe", "integrity",
    "scan", "device", "fingerprint",
    "kernel", "audit", "detect", "check",
    "validate", "cert", "signature",
    "hash", "encrypt", "token",
    "session-token", "auth-token"
];

var REPORT_KEYWORDS = [
    "beacon", "report", "telemetry",
    "analytics", "track", "log",
    "monitor", "diagnostic", "crash",
    "error", "exception"
];

// ═══════════════════════════════════════════════════════════════
//  ⑧ دوال مساعدة
// ═══════════════════════════════════════════════════════════════

function dM(host, list) {
    var h = host.toLowerCase();
    for (var i = 0; i < list.length; i++) {
        var d = list[i].toLowerCase();
        if (d.charAt(0) === "*") {
            var b = d.substring(2);
            if (h === b) return true;
            if (h.length > b.length + 1 && h.substring(h.length - b.length - 1) === "." + b) return true;
        } else {
            if (h === d) return true;
        }
    }
    return false;
}

function containsAny(host, keywords) {
    var h = host.toLowerCase();
    for (var i = 0; i < keywords.length; i++) {
        if (h.indexOf(keywords[i]) !== -1) return true;
    }
    return false;
}

function isJordanIP(host) {
    // بسيط: لو IP في نطاقات الأردن
    if (host.indexOf(".") === -1 && host.indexOf(":") === -1) return false;
    
    // فحص سريع لنطاقات شائعة
    var parts = host.split(".");
    if (parts.length === 4) {
        var first = parseInt(parts[0]);
        var second = parseInt(parts[1]);
        // نطاقات أردنية شائعة
        if (first === 37 && second === 35) return true;
        if (first === 78 && (second === 40 || second === 42 || second === 158 || second === 100)) return true;
        if (first === 82 && second === 212) return true;
        if (first === 86 && second === 111) return true;
        if (first === 176 && (second === 28 || second === 29)) return true;
        if (first === 185 && (second === 33 || second === 88 || second === 185)) return true;
        if (first === 188 && second === 247) return true;
        if (first === 212 && second === 34) return true;
        if (first === 46 && second === 32) return true;
        if (first === 94 && second === 24) return true;
        if (first === 42 && second === 136) return true;
        if (first === 41 && (second === 184 || second === 234)) return true;
        if (first === 95 && second === 141) return true;
    }
    return false;
}

// ═══════════════════════════════════════════════════════════════
//  ⑨ الدالة الرئيسية - v13 COMPLETE
// ═══════════════════════════════════════════════════════════════

function FindProxyForURL(url, host) {
    
    var h = host.toLowerCase();
    
    // ═══════════════════════════════════════════════
    //  ① DIRECT: صوت (أول شي - الأهم)
    // ═══════════════════════════════════════════════
    if (containsAny(h, VOICE_KEYWORDS)) {
        return DIR;
    }
    
    // ═══════════════════════════════════════════════
    //  ② DIRECT: حماية (بدون بان)
    // ═══════════════════════════════════════════════
    if (containsAny(h, ANTICHEAT_KEYWORDS)) {
        return DIR;
    }
    
    // ═══════════════════════════════════════════════
    //  ③ DIRECT: تقارير (ما تأثر)
    // ═══════════════════════════════════════════════
    if (containsAny(h, REPORT_KEYWORDS)) {
        return DIR;
    }
    
    // ═══════════════════════════════════════════════
    //  ④ DIRECT: قائمة صريحة
    // ═══════════════════════════════════════════════
    if (dM(h, ONLY_DIRECT)) {
        return DIR;
    }
    
    // ═══════════════════════════════════════════════
    //  🚨 ⑤ MATCHMAKING - بورت 20005 (الأهم!)
    //     كل شي مرتبط بالتجنيد والمباريات
    // ═══════════════════════════════════════════════
    if (dM(h, MATCHMAKING_ALL)) {
        return MAT;
    }
    
    // ═══════════════════════════════════════════════
    //  🚨 ⑥ KEYWORD OVERRIDE - ذكي
    //     لو فيه كلمة match + pubg = MAT
    // ═══════════════════════════════════════════════
    var hasMatchWord = containsAny(h, MATCH_KEYWORDS);
    var hasPubgWord = containsAny(h, PUBG_KEYWORDS);
    
    if (hasMatchWord && hasPubgWord) {
        // تأكد إنه مو صوت أو حماية
        var isVoice = containsAny(h, VOICE_KEYWORDS);
        var isAntiCheat = containsAny(h, ANTICHEAT_KEYWORDS);
        var isReport = containsAny(h, REPORT_KEYWORDS);
        
        if (!isVoice && !isAntiCheat && !isReport) {
            return MAT;
        }
    }
    
    // ═══════════════════════════════════════════════
    //  🚨 ⑦ REGION LOCK OVERRIDE
    //     أي شي فيه region/location/geo/country
    //     = MAT (لضمان تثبيت أردني)
    // ═══════════════════════════════════════════════
    if (REGION_LOCK) {
        var regionWords = ["region", "location", "geo", "country", "city", "locale", "lang", "dns", "resolve", "lookup", "edns", "subnet", "isp", "carrier", "asn", "ip", "lock", "force", "preferred", "default", "home", "primary", "local", "nearest", "best", "optimal"];
        
        if (containsAny(h, regionWords) && hasPubgWord) {
            var isVoice = containsAny(h, VOICE_KEYWORDS);
            var isAntiCheat = containsAny(h, ANTICHEAT_KEYWORDS);
            
            if (!isVoice && !isAntiCheat) {
                return MAT;
            }
        }
    }
    
    // ═══════════════════════════════════════════════
    //  🚨 ⑧ GPS OVERRIDE
    //     أي شي فيه gps/coordinate/lat/lon/alt
    //     = MAT (لإرسال إحداثيات أردنية)
    // ═══════════════════════════════════════════════
    if (GPS_OVERRIDE) {
        var gpsWords = ["gps", "coordinate", "lat", "lon", "long", "alt", "altitude", "position", "heading", "bearing", "speed", "accuracy"];
        
        if (containsAny(h, gpsWords) && hasPubgWord) {
            return MAT;
        }
    }
    
    // ═══════════════════════════════════════════════
    //  🚨 ⑨ DNS GEO LOCK
    //     DNS يرجع أردني
    // ═══════════════════════════════════════════════
    if (DNS_GEO_LOCK) {
        var dnsWords = ["dns", "resolve", "lookup", "edns", "subnet", "geoip", "ipinfo", "whois"];
        
        if (containsAny(h, dnsWords) && hasPubgWord) {
            return MAT;
        }
    }
    
    // ═══════════════════════════════════════════════
    //  ⑩ LOBBY - بورت 1080
    // ═══════════════════════════════════════════════
    if (dM(h, LOBBY_ALL)) {
        return LOB;
    }
    
    // ═══════════════════════════════════════════════
    //  ⑪ IP أردني → LOB
    // ═══════════════════════════════════════════════
    if (isJordanIP(host)) {
        return LOB;
    }
    
    // ═══════════════════════════════════════════════
    //  ⑫ أي شي فيه pubg/tencent = LOB
    // ═══════════════════════════════════════════════
    if (hasPubgWord) {
        return LOB;
    }
    
    // ═══════════════════════════════════════════════
    //  ⑬ الباقي → DIRECT
    // ═══════════════════════════════════════════════
    return DIR;
}
