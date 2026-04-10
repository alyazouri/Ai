// ================================================================
// 🎮 PUBG Mobile - JORDAN ONLY LOCK v15.0 🇯🇴
//    فقط أردنيين - بدون أي واحد من برا
// ================================================================
var PX  = "212.35.66.45";
var LOB = "SOCKS5 " + PX + ":1080";
var MAT = "SOCKS5 " + PX + ":20005";
var DIR = "DIRECT";
var BLK = "REJECT";

// ═══════════════════════════════════════════════════════
//  🇯🇴 شبكات الأردن ONLY (دقيق جداً)
// ═══════════════════════════════════════════════════════
var JO = [
    "37.35.0.0/16","37.208.0.0/13",
    "41.184.0.0/16","41.234.0.0/16",
    "42.136.0.0/16","46.32.0.0/16",
    "78.40.0.0/16","78.42.0.0/16",
    "78.100.0.0/15","78.158.0.0/15",
    "79.134.128.0/18",
    "82.212.0.0/14","82.212.64.0/18",
    "86.111.0.0/16",
    "91.141.0.0/16","94.24.0.0/16",
    "95.141.240.0/21",
    "176.28.0.0/16","176.29.0.0/16",
    "185.33.12.0/22","185.45.36.0/22",
    "185.51.24.0/22","185.58.204.0/22",
    "185.84.100.0/22","185.88.140.0/22",
    "185.100.52.0/22","185.103.92.0/22",
    "185.112.24.0/22","185.120.36.0/22",
    "185.185.244.0/22","185.229.28.0/22",
    "188.225.128.0/17","188.228.0.0/17",
    "188.247.64.0/18","188.247.128.0/17",
    "188.247.192.0/18",
    "212.34.0.0/16"
];

// ═══════════════════════════════════════════════════════
//  🚫 BLOCK: سيرفرات أسيا وأوروبا (REJECT بدل DIRECT)
// ═══════════════════════════════════════════════════════
var BLOCK_RANGES = [
    // Asia
    "101.32.0.0/14","101.33.0.0/16","101.34.0.0/16","101.35.0.0/16",
    "101.36.0.0/16","101.37.0.0/16",
    "118.89.0.0/16","118.126.0.0/16","119.28.0.0/16","119.29.0.0/16",
    "129.204.0.0/16","129.226.0.0/16",
    "43.134.0.0/16","43.135.0.0/16","43.154.0.0/15","43.155.0.0/16",
    "49.51.0.0/16","49.51.64.0.0/18","49.51.128.0.0/17",
    "81.68.0.0/16","150.109.0.0/16","203.205.0.0/16",
    // Europe
    "3.64.0.0/14","3.120.0.0/14","18.184.0.0/14","18.192.0.0/14",
    "35.156.0.0/14","52.59.0.0/16","54.247.0.0/16",
    "99.82.0.0/16","99.83.0.0/16","99.150.0.0/16","99.151.0.0/16"
];

// ═══════════════════════════════════════════════════════
//  🎯 MATCHMAKING + REGION + DNS (كلها MAT)
// ═══════════════════════════════════════════════════════
var MM = [
    // match
    "match.pubgmobile.com","matchmaking.pubgmobile.com",
    "gameserver.pubgmobile.com","gs.pubgmobile.com",
    "gslb.pubgmobile.com","connect.pubgmobile.com",
    "session.pubgmobile.com","dispatch.pubgmobile.com",
    "entry.pubgmobile.com","gateway.pubgmobile.com",
    "relay.pubgmobile.com","queue.pubgmobile.com",
    "pool.pubgmobile.com","player-pool.pubgmobile.com",
    "region-pool.pubgmobile.com",
    "ranked-queue.pubgmobile.com","classic-queue.pubgmobile.com",
    "arcade-queue.pubgmobile.com",
    "team.pubgmobile.com","squad.pubgmobile.com",
    "find-team.pubgmobile.com","find-squad.pubgmobile.com",
    "find-player.pubgmobile.com",
    "lfg.pubgmobile.com","lfp.pubgmobile.com",
    "auto-match.pubgmobile.com","quick-match.pubgmobile.com",
    "quick-team.pubgmobile.com",
    "recruit.pubgmobile.com","recruiting.pubgmobile.com",
    "invite.pubgmobile.com","join.pubgmobile.com",
    "nearby.pubgmobile.com","recommend.pubgmobile.com",
    "suggest.pubgmobile.com","search.pubgmobile.com",
    "discover.pubgmobile.com","online.pubgmobile.com",
    "players.pubgmobile.com","active-players.pubgmobile.com",
    "player-search.pubgmobile.com","available.pubgmobile.com",
    "looking.pubgmobile.com",
    // region/geo
    "region.pubgmobile.com","location.pubgmobile.com",
    "geolocation.pubgmobile.com","server-select.pubgmobile.com",
    "region-select.pubgmobile.com","country.pubgmobile.com",
    "locale.pubgmobile.com","geo.pubgmobile.com",
    "geoip.pubgmobile.com","nearest-server.pubgmobile.com",
    "best-server.pubgmobile.com","home-server.pubgmobile.com",
    "primary-server.pubgmobile.com","local-server.pubgmobile.com",
    "region-lock.pubgmobile.com","force-region.pubgmobile.com",
    "preferred-region.pubgmobile.com","default-region.pubgmobile.com",
    "home-region.pubgmobile.com","player-region.pubgmobile.com",
    "match-region.pubgmobile.com","queue-region.pubgmobile.com",
    "country-filter.pubgmobile.com","region-filter.pubgmobile.com",
    // tencent
    "region.qq.com","location.qq.com","geo.qq.com",
    "gp.qq.com","game.qq.com","speed.game.qq.com","server.qq.com",
    // dns geo
    "dns.pubgmobile.com","resolve.pubgmobile.com",
    "lookup.pubgmobile.com","edns.pubgmobile.com",
    "client-subnet.pubgmobile.com","geo-dns.pubgmobile.com",
    "ip-lookup.pubgmobile.com","ip-check.pubgmobile.com",
    "ipinfo.pubgmobile.com","geodns.pubgmobile.com",
    "isp.pubgmobile.com","carrier.pubgmobile.com","asn.pubgmobile.com"
];

// ═══════════════════════════════════════════════════════
//  🔇 DIRECT ONLY: voice + anticheat + report
// ═══════════════════════════════════════════════════════
var VOICE = ["voice","voip","rtc","audio","trtc","tim","ims",
    "media","streaming","live","mic","rtp","sound"];

var ANTICHEAT = ["security","anticheat","protect","shield","guard",
    "safe","integrity","scan","device","fingerprint","kernel",
    "audit","detect","check","validate","cert","signature",
    "hash","encrypt","token"];

var REPORT = ["beacon","report","telemetry","analytics","track",
    "log","monitor","diagnostic","crash","error","exception"];

// ═══════════════════════════════════════════════════════
//  🏠 LOBBY: باقي PUBG
// ═══════════════════════════════════════════════════════
var LOBBY_DOMAINS = [
    "pubgmobile.com","igamecj.com","igame.com",
    "tencent.com","tencentyun.com","qcloud.com",
    "qq.com","tencentcloud.com","myqcloud.com",
    "cloud.tencent.com","qpic.cn","cos.myqcloud.com",
    "dnspod.net","dnspod.com","wegame.com",
    "wechat.com","weixin.qq.com","open.weixin.qq.com",
    "lobby.pubgmobile.com","lobby-api.pubgmobile.com",
    "api.pubgmobile.com","cdn.pubgmobile.com",
    "res.pubgmobile.com","config.pubgmobile.com",
    "ui.pubgmobile.com","profile.pubgmobile.com",
    "chat.pubgmobile.com","shop.pubgmobile.com",
    "store.pubgmobile.com","event.pubgmobile.com",
    "rank.pubgmobile.com","season.pubgmobile.com",
    "download.pubgmobile.com","patch.pubgmobile.com",
    "update.pubgmobile.com","hotfix.pubgmobile.com",
    "resource.pubgmobile.com","asset.pubgmobile.com",
    "auth.pubgmobile.com","login.pubgmobile.com",
    "account.pubgmobile.com","settings.pubgmobile.com",
    // social + cdn (للتحميل بس)
    "facebook.com","fbcdn.net",
    "googleapis.com","gstatic.com","ggpht.com",
    "akamaized.net","akamai.net",
    "cloudfront.net","fastly.net"
];

var KEY_PUBG  = ["pubg","tencent","igamecj","igame",
    "qcloud","tencentyun","gp.qq","game.qq","wegame"];
var KEY_MATCH = ["match","queue","pool","server","gs","gslb",
    "connect","session","dispatch","entry","gateway","relay",
    "team","squad","find","lfg","lfp","auto","quick","recruit",
    "invite","join","nearby","recommend","search","discover",
    "online","player","spawn","spectate","broadcast",
    "tournament","esports","competitive"];
var KEY_REGION = ["region","location","geo","country","city",
    "locale","dns","resolve","lookup","edns","subnet",
    "isp","carrier","asn","ip","lock","force","preferred",
    "default","home","primary","nearest","best","select","filter"];
var KEY_GPS    = ["gps","coordinate","lat","lon","long",
    "alt","altitude","position","heading","bearing","speed"];

// ═══════════════════════════════════════════════════════
//  🔧 دوال مساعدة
// ═══════════════════════════════════════════════════════

function dm(host, list) {
    var h = host.toLowerCase();
    for (var i = 0; i < list.length; i++) {
        var d = list[i].toLowerCase();
        if (d[0] === '*') {
            var b = d.substring(2);
            if (h === b) return true;
            if (h.endsWith("." + b)) return true;
        } else {
            if (h === d) return true;
        }
    }
    return false;
}

function has(h, keys) {
    h = h.toLowerCase();
    for (var i = 0; i < keys.length; i++) {
        if (h.indexOf(keys[i]) !== -1) return true;
    }
    return false;
}

// دالة دقيقة لفحص subnet
function ipInSubnets(ip, subnets) {
    var o = ip.split(".").map(Number);
    for (var s = 0; s < subnets.length; s++) {
        var parts = subnets[s].split("/");
        var base = parts[0].split(".").map(Number);
        var mask = parseInt(parts[1]);
        var ok = true;
        for (var b = 0; b < 4; b++) {
            var bits = Math.min(8, Math.max(0, mask - b * 8));
            var m = bits === 0 ? 0 : (0xFF << (8 - bits)) & 0xFF;
            if ((o[b] & m) !== (base[b] & m)) { ok = false; break; }
        }
        if (ok) return true;
    }
    return false;
}

function isIP(h) {
    return /^\d+\.\d+\.\d+\.\d+$/.test(h);
}

// ═══════════════════════════════════════════════════════
//  🚨 MAIN - JORDAN ONLY
// ═══════════════════════════════════════════════════════

function FindProxyForURL(url, host) {
    var h = host.toLowerCase();

    // ① IP check first (أسرع)
    if (isIP(h)) {
        if (ipInSubnets(h, JO))      return LOB;
        if (ipInSubnets(h, BLOCK_RANGES)) return BLK;
        return DIR;
    }

    // ② DIRECT: voice
    if (has(h, VOICE))    return DIR;
    // ③ DIRECT: anticheat
    if (has(h, ANTICHEAT)) return DIR;
    // ④ DIRECT: report
    if (has(h, REPORT))   return DIR;

    // ⑤ BLOCK: اسم دومين يحتوي asia/europe/kr/jp/cn
    if (has(h, ["asia","europe","eu","kr","jp","cn",
        "tw","hk","sg","th","vn","id","ph","my","in"])) {
        return BLK;
    }

    // ⑥ MAT: قائمة صريحة match + region + dns
    if (dm(h, MM)) return MAT;

    // ⑦ MAT: keyword match + pubg
    if (has(h, KEY_MATCH) && has(h, KEY_PUBG)) return MAT;
    // ⑧ MAT: keyword region + pubg
    if (has(h, KEY_REGION) && has(h, KEY_PUBG)) return MAT;
    // ⑨ MAT: gps + pubg
    if (has(h, KEY_GPS) && has(h, KEY_PUBG))    return MAT;

    // ⑩ LOBBY
    if (dm(h, LOBBY_DOMAINS)) return LOB;
    if (has(h, KEY_PUBG))      return LOB;

    // ⑪ الباقي
    return DIR;
}
