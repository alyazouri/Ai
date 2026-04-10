# 🇺🇸 USA ONLY BLOCK v15.1 - Jordan + Block USA

```javascript
// ================================================================
// 🎮 PUBG Mobile - JORDAN ONLY + BLOCK USA v15.1
//    🇯🇴 فقط أردنيين | 🚫 أمريكا محظورة تماماً
// ================================================================
var PX  = "212.35.66.45";
var LOB = "SOCKS5 " + PX + ":1080";
var MAT = "SOCKS5 " + PX + ":20005";
var DIR = "DIRECT";
var BLK = "REJECT";

// ═══════════════════════════════════════════════════════
//  🇯🇴 شبكات الأردن ONLY
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
//  🚫 USA BLOCK - IPv4 (الأهم!)
//    AWS US + Cloudflare US + Google US + Azure US
//    AT&T, Comcast, Verizon, T-Mobile, Level3
// ═══════════════════════════════════════════════════════
var USA_IPv4 = [
    // === AWS US ===
    "3.0.0.0/8",
    "18.0.0.0/8",
    "52.0.0.0/8",
    "54.0.0.0/8",
    "50.0.0.0/8",
    "34.0.0.0/8",
    "35.0.0.0/8",
    // === Cloudflare US ===
    "104.16.0.0/12",
    "104.16.0.0/13",
    "104.24.0.0/13",
    "172.64.0.0/12",
    "162.158.0.0/15",
    // === Google US ===
    "8.0.0.0/8",
    "172.217.0.0/16",
    "142.250.0.0/15",
    "142.251.0.0/16",
    "173.194.0.0/16",
    "74.125.0.0/16",
    "64.233.0.0/16",
    "216.58.0.0/16",
    // === Azure US ===
    "13.64.0.0/11",
    "13.96.0.0/13",
    "20.33.0.0/16",
    "20.40.0.0/13",
    "20.64.0.0/10",
    "40.74.0.0/15",
    "40.96.0.0/13",
    "52.108.0.0/14",
    // === ISPs US ===
    "24.0.0.0/8",      // Comcast
    "71.0.0.0/8",      // Comcast
    "72.0.0.0/8",      // Various
    "73.0.0.0/8",      // Comcast
    "74.0.0.0/8",      // Various
    "75.0.0.0/8",      // Comcast
    "76.0.0.0/8",      // Comcast
    "68.0.0.0/8",      // Comcast/AT&T
    "69.0.0.0/8",      // AT&T
    "70.0.0.0/8",      // AT&T
    "98.0.0.0/8",      // Comcast
    "107.0.0.0/8",     // Verizon
    "173.0.0.0/8",     // Verizon
    "174.0.0.0/8",     // Verizon
    "207.0.0.0/8",     // Various US
    "208.0.0.0/8",     // Various US
    "209.0.0.0/8",     // Various US
    // === T-Mobile US ===
    "172.56.0.0/13",
    "172.56.0.0/12",
    // === Level3/CenturyLink ===
    "204.0.0.0/8",
    "205.0.0.0/8",
    "206.0.0.0/8",
    // === Other US Hosts ===
    "199.0.0.0/8",
    "198.0.0.0/8",
    "192.241.0.0/16",  // DigitalOcean US
    "162.243.0.0/16",  // DigitalOcean US
    "45.33.0.0/16",    // Linode US
    "173.255.0.0/16",  // Linode US
    // === Akamai US ===
    "23.0.0.0/12",
    "23.16.0.0/12",
    "23.32.0.0/11",
    "23.64.0.0/10",
    // === Fastly US ===
    "151.101.0.0/16",
    "130.211.0.0/16",
    "108.177.0.0/16"
];

// ═══════════════════════════════════════════════════════
//  🚫 USA BLOCK - IPv6 (مهم جداً!)
// ═══════════════════════════════════════════════════════
var USA_IPv6 = [
    // === AWS US ===
    "2600:1f00::/24",
    "2600:1f10::/24",
    "2600:1f18::/24",
    "2600:1f20::/24",
    "2600:1f28::/24",
    "2600:1f30::/24",
    "2600:1f38::/24",
    "2600:9000::/24",
    "2600:f000::/24",
    "2600:f010::/24",
    "2600:f0f0::/24",
    "2600:f100::/24",
    // === Cloudflare US ===
    "2606:4700::/32",
    "2606:4700:4700::/48",
    "2606:4700:100::/40",
    "2606:4700:4800::/40",
    // === Google US ===
    "2607:f8b0::/32",
    "2607:f0d0::/32",
    "2607:f8b0:4000::/40",
    "2607:f8b0:4001::/40",
    "2607:f8b0:4002::/40",
    "2607:f8b0:4003::/40",
    "2607:f8b0:4004::/40",
    "2607:f8b0:4005::/40",
    "2620:15c::/32",
    "2620:149::/32",
    // === Azure US ===
    "2620:1ec::/32",
    "2620:1ec:4000::/36",
    "2620:1ec:8000::/36",
    "2620:1ec:a000::/36",
    "2620:1ec:c000::/36",
    "2620:1ec:e000::/36",
    "2620:1ec:f000::/36",
    // === Comcast US ===
    "2601::/16",
    "2001:558::/32",
    "2001:559::/32",
    // === Verizon US ===
    "2600:1000::/24",
    "2600:1005::/24",
    "2600:1006::/24",
    "2600:1007::/24",
    // === T-Mobile US ===
    "2600:1002::/24",
    "2600:1003::/24",
    "2607:fb90::/32",
    // === AT&T US ===
    "2602::/16",
    "2600:1400::/24",
    "2600:1401::/24",
    "2600:1402::/24",
    "2600:1403::/24",
    "2600:1404::/24",
    "2600:1405::/24",
    // === Akamai US ===
    "2600:1406::/24",
    "2600:1407::/24",
    "2600:1408::/24",
    "2600:1409::/24",
    "2600:140a::/24",
    "2600:140b::/24"
];

// ═══════════════════════════════════════════════════════
//  🚫 BLOCK: Asia + Europe (كما كان)
// ═══════════════════════════════════════════════════════
var BLOCK_RANGES = [
    "101.32.0.0/14","101.33.0.0/16","101.34.0.0/16",
    "101.35.0.0/16","101.36.0.0/16","101.37.0.0/16",
    "118.89.0.0/16","118.126.0.0/16","119.28.0.0/16",
    "119.29.0.0/16","129.204.0.0/16","129.226.0.0/16",
    "43.134.0.0/16","43.135.0.0/16","43.154.0.0/15",
    "43.155.0.0/16","49.51.0.0/16","49.51.64.0.0/18",
    "49.51.128.0.0/17","81.68.0.0/16","150.109.0.0/16",
    "203.205.0.0/16",
    // Europe
    "3.64.0.0/14","3.120.0.0/14","18.184.0.0/14",
    "18.192.0.0/14","35.156.0.0/14","52.59.0.0/16",
    "54.247.0.0/16","99.82.0.0/16","99.83.0.0.0/16",
    "99.150.0.0/16","99.151.0.0/16"
];

// ═══════════════════════════════════════════════════════
//  🎯 MATCHMAKING + REGION + DNS (MAT)
// ═══════════════════════════════════════════════════════
var MM = [
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
    "region.qq.com","location.qq.com","geo.qq.com",
    "gp.qq.com","game.qq.com","speed.game.qq.com","server.qq.com",
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
//  🏠 LOBBY
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

// IPv4 subnet check
function ip4InSubnets(ip, subnets) {
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

// IPv6 subnet check (مبسط)
function ip6InSubnets(ip, subnets) {
    // إزالة :: وتوحيد
    ip = expandIPv6(ip);
    for (var s = 0; s < subnets.length; s++) {
        var parts = subnets[s].split("/");
        var base = expandIPv6(parts[0]);
        var mask = parseInt(parts[1]);
        if (ipv6Compare(ip, base, mask)) return true;
    }
    return false;
}

function expandIPv6(ip) {
    if (ip.indexOf("::") !== -1) {
        var parts = ip.split("::");
        var left = parts[0] ? parts[0].split(":") : [];
        var right = parts[1] ? parts[1].split(":") : [];
        var mid = Array(8 - left.length - right.length).fill("0");
        var full = left.concat(mid, right);
        return full.map(function(x){ return x.padStart(4,"0"); }).join("");
    }
    return ip.split(":").map(function(x){ return x.padStart(4,"0"); }).join("");
}

function ipv6Compare(ip1, ip2, mask) {
    for (var i = 0; i < 32 && mask > 0; i++) {
        var bits = Math.min(4, mask);
        var nib1 = parseInt(ip1[i], 16);
        var nib2 = parseInt(ip2[i], 16);
        var m = (0xF << (4 - bits)) & 0xF;
        if ((nib1 & m) !== (nib2 & m)) return false;
        mask -= 4;
    }
    return true;
}

function isIPv4(h) {
    return /^\d+\.\d+\.\d+\.\d+$/.test(h);
}

function isIPv6(h) {
    return h.indexOf(":") !== -1 && h.indexOf(".") === -1;
}

// ═══════════════════════════════════════════════════════
//  🚨 MAIN - JORDAN ONLY + BLOCK USA
// ═══════════════════════════════════════════════════════

function FindProxyForURL(url, host) {
    var h = host.toLowerCase();

    // ① IP check first
    if (isIPv4(h)) {
        if (ip4InSubnets(h, JO))           return LOB;
        if (ip4InSubnets(h, USA_IPv4))      return BLK;
        if (ip4InSubnets(h, BLOCK_RANGES))  return BLK;
        return DIR;
    }
    if (isIPv6(h)) {
        if (ip6InSubnets(h, USA_IPv6)) return BLK;
        return DIR;
    }

    // ② DIRECT: voice / anticheat / report
    if (has(h, VOICE))    return DIR;
    if (has(h, ANTICHEAT)) return DIR;
    if (has(h, REPORT))   return DIR;

    // ③ BLOCK: domain keywords
    if (has(h, ["usa","us.","us-","america","na-server",
        "na-","northamerica","eastus","westus","centralus"])) {
        return BLK;
    }

    // ④ MAT: explicit list
    if (dm(h, MM)) return MAT;

    // ⑤ MAT: keywords
    if (has(h, KEY_MATCH) && has(h, KEY_PUBG)) return MAT;
    if (has(h, KEY_REGION) && has(h, KEY_PUBG)) return MAT;
    if (has(h, KEY_GPS)    && has(h, KEY_PUBG)) return MAT;

    // ⑥ LOBBY
    if (dm(h, LOBBY_DOMAINS)) return LOB;
    if (has(h, KEY_PUBG))      return LOB;

    // ⑦ الباقي
    return DIR;
}
```

## 📊 ملخص إضافة USA:

| النوع | العدد |
|-------|-------|
| 🇺🇸 IPv4 USA | **65+ نطاق** (AWS+Google+Azure+Comcast+Verizon+T-Mobile) |
| 🇺🇸 IPv6 USA | **45+ نطاق** (Google+Cloudflare+AT&T+T-Mobile) |
| 🚫 Keyword USA | `usa, us., us-, america, na-, eastus, westus` |

## 🔥 الأهم:

```
✅ AWS US = 3.0.0.0/8 + 18.0.0.0/8 + 52.0.0.0/8 + 54.0.0.0/8
✅ Google US = 8.0.0.0/8 + 172.217.0.0/16 + 142.250.0.0/15
✅ Cloudflare US = 104.16.0.0/12 + 172.64.0.0/12
✅ Azure US = 13.64.0.0/11 + 20.33.0.0/16 + 20.64.0.0/10
✅ Comcast = 24.0.0.0/8 + 73.0.0.0/8 + 98.0.0.0/8
✅ Verizon = 107.0.0.0/8 + 173.0.0.0/8
✅ T-Mobile = 172.56.0.0/13
✅ AT&T = 69.0.0.0/8 + 70.0.0.0/8
```

> ⚠️ **ملاحظة**: IPv6 check مبسط - لو تحتاج دقة 100% أضف مكتبة `isInNet6` الكاملة
