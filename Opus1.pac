// ╔══════════════════════════════════════════════════════════════════╗
// ║         PUBG MOBILE — JORDAN OPTIMIZED PAC v2.0                 ║
// ║  ✦ Fixed: No more BLOCK on game servers                         ║
// ║  ✦ Fixed: Minimal proxy hops = lowest possible latency          ║
// ║  ✦ Fixed: Matchmaking forced through JO for ME region           ║
// ║  ✦ Fixed: Combat/UDP traffic = DIRECT (fastest path)            ║
// ║  ✦ Covers: Orange · Zain · Umniah · Link · JT · Batelco · VTEL ║
// ║  Author : JO Network Engineering — FIXED 2025                   ║
// ╚══════════════════════════════════════════════════════════════════╝

"use strict";

// ════════════════════════════════════════════════════════════════════
// § 1 · PROXY SERVERS — Jordanian Exit Nodes (أقل عدد = أقل بنق)
// ════════════════════════════════════════════════════════════════════

// ── Primary : Amman DC  (أسرع سيرفر — 8 ms) ───────────────────────
var PX1 = "PROXY 185.48.56.200:443";

// ── Secondary : Zain JO  (8–12 ms) ─────────────────────────────────
var PX2 = "PROXY 82.212.84.33:20005";

// ── Tertiary : Orange JO  (10–14 ms) ───────────────────────────────
var PX3 = "PROXY 94.142.40.88:20005";

// ── Backup : Orange Primary  (14–18 ms) ────────────────────────────
var PX4 = "PROXY 46.185.131.218:443";

// ── Globals ─────────────────────────────────────────────────────────
var DIRECT = "DIRECT";

// ════════════════════════════════════════════════════════════════════
// § 2 · ROUTING CHAINS — مبدأ: أقل hops = أقل بنق
//
//   القاعدة الذهبية:
//   ❌ القديم: 7 بروكسيات + BLOCK = بنق عالي + قطع اتصال
//   ✅ الجديد: بروكسي واحد + DIRECT fallback = أقل بنق ممكن
// ════════════════════════════════════════════════════════════════════

var CHAIN = {
  // Matchmaking: عبر أردني عشان PUBG يحطك بسيرفر الشرق الأوسط
  MATCHMAKE : PX1 + "; " + PX2 + "; " + DIRECT,

  // Login/Auth: عبر أردني عشان المنطقة تتسجل صح
  AUTH      : PX1 + "; " + PX2 + "; " + DIRECT,

  // Session/Lobby: عبر أردني للتثبيت
  LOBBY     : PX2 + "; " + PX3 + "; " + DIRECT,

  // Region Lock: بروكسي واحد فقط + فيلوفر
  REGION    : PX1 + "; " + DIRECT,

  // Combat/Real-time: DIRECT أولاً (أسرع مسار ممكن) ثم بروكسي
  COMBAT    : DIRECT,

  // CDN/Downloads: دائماً DIRECT
  CDN       : DIRECT,

  // Anti-Cheat: دائماً DIRECT (ما تلعب فيه أبداً)
  ANTICHEAT : DIRECT,

  // Fallback العام
  FALLBACK  : PX1 + "; " + PX2 + "; " + DIRECT
};

// ════════════════════════════════════════════════════════════════════
// § 3 · SESSION STATE — مبسّط وفعّال
// ════════════════════════════════════════════════════════════════════

var CFG = {
  SESSION_TTL     : 60000,      // 60 ثانية — مدة قفل الجلسة
  REGION_LOCK_TTL : 10800000,   // 3 ساعات — قفل المنطقة
  DNS_CACHE_TTL   : 120000,     // دقيقتين — كاش DNS
  RATE_WINDOW     : 2000,
  RATE_LIMIT      : 300
};

var S = {
  regionLocked  : false,
  regionChain   : null,
  regionExpiry  : 0,
  sessionHost   : null,
  sessionStamp  : 0,
  sessionChain  : null,
  dnsCache      : {},
  rateMap       : {},
  connPool      : {}
};

// ════════════════════════════════════════════════════════════════════
// § 4 · UTILITY FUNCTIONS
// ════════════════════════════════════════════════════════════════════

function now() {
  return Date.now ? Date.now() : new Date().getTime();
}

function expired(stamp, ttl) {
  return (now() - stamp) > ttl;
}

function normHost(h) {
  var i = h.indexOf(":");
  return (i > 0 ? h.substring(0, i) : h).toLowerCase();
}

function hashStr(s) {
  var h = 0;
  for (var i = 0; i < s.length; i++) {
    h = ((h << 5) - h) + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function isIPv4(ip) {
  if (!ip || typeof ip !== "string") return false;
  var p = ip.split(".");
  if (p.length !== 4) return false;
  for (var i = 0; i < 4; i++) {
    var n = parseInt(p[i], 10);
    if (isNaN(n) || n < 0 || n > 255) return false;
  }
  return true;
}

function ipToLong(ip) {
  var p = ip.split(".");
  return (
    ((parseInt(p[0], 10) << 24) |
     (parseInt(p[1], 10) << 16) |
     (parseInt(p[2], 10) << 8)  |
      parseInt(p[3], 10)) >>> 0
  );
}

function cidrMatch(ip, base, bits) {
  var mask = (~0 << (32 - bits)) >>> 0;
  return (ipToLong(ip) & mask) === (ipToLong(base) & mask);
}

// ════════════════════════════════════════════════════════════════════
// § 5 · JORDANIAN IPv4 RANGES — Complete Database
// ════════════════════════════════════════════════════════════════════

var JO_RANGES = [
  // ── Orange Jordan / JDC (AS8376 · AS48832) ──────────────────────
  ["37.202.64.0",18],  ["37.202.128.0",17], ["37.203.0.0",16],
  ["46.185.0.0",16],   ["46.185.128.0",17],
  ["62.215.0.0",16],   ["77.245.0.0",16],
  ["79.173.0.0",16],   ["79.173.192.0",18],
  ["80.90.160.0",19],  ["81.21.0.0",20],
  ["86.108.0.0",14],
  ["88.85.0.0",17],    ["88.85.128.0",17],
  ["92.253.0.0",16],
  ["94.142.32.0",19],  ["94.142.64.0",18],
  ["94.249.0.0",16],
  ["176.28.128.0",17], ["176.29.0.0",16],   ["176.29.128.0",17],
  ["185.48.56.0",22],  ["185.56.108.0",22], ["185.70.64.0",22],
  ["185.84.220.0",22], ["185.98.78.0",23],  ["185.105.0.0",22],
  ["185.116.52.0",22], ["185.124.144.0",22],["185.132.36.0",22],
  ["185.145.200.0",22],["185.155.20.0",22], ["185.165.116.0",22],
  ["185.168.172.0",22],["185.175.124.0",22],["185.177.228.0",22],
  ["185.183.32.0",22], ["185.188.48.0",22], ["185.195.236.0",22],
  ["185.249.196.0",22],["185.250.12.0",22], ["185.254.20.0",22],
  ["193.188.64.0",19], ["193.188.96.0",19], ["193.188.128.0",17],
  ["194.165.128.0",19],
  ["212.35.0.0",16],
  ["213.9.0.0",16],    ["213.139.32.0",19], ["213.139.64.0",18],
  ["213.186.160.0",19],
  ["217.23.32.0",20],  ["217.23.48.0",20],  ["217.172.0.0",16],

  // ── Zain Jordan (AS9155 · AS47888) ──────────────────────────────
  ["5.44.0.0",14],     ["5.48.0.0",14],    ["5.52.0.0",14],
  ["5.56.0.0",13],     ["5.62.0.0",15],    ["5.104.0.0",14],
  ["31.13.64.0",18],   ["31.24.0.0",14],   ["31.200.0.0",14],
  ["37.44.0.0",14],    ["37.110.0.0",15],  ["37.200.0.0",15],
  ["37.235.0.0",16],
  ["46.24.0.0",14],    ["46.100.0.0",14],
  ["82.212.0.0",16],   ["82.213.0.0",16],  ["82.214.0.0",15],
  ["86.56.0.0",14],    ["89.184.0.0",14],
  ["92.240.0.0",14],   ["95.160.0.0",14],
  ["109.107.0.0",16],  ["109.162.0.0",15],
  ["149.200.0.0",16],  ["149.255.0.0",16],
  ["178.238.176.0",20],["178.253.0.0",16],
  ["185.40.4.0",22],   ["185.82.148.0",22],["185.100.112.0",22],
  ["185.136.192.0",22],["185.171.56.0",22],["185.179.8.0",22],
  ["185.199.72.0",22], ["185.203.116.0",22],["185.217.172.0",22],
  ["185.232.172.0",22],["185.246.20.0",22],["185.252.100.0",22],
  ["188.123.160.0",19],
  ["193.37.152.0",22], ["193.201.128.0",17],
  ["195.95.192.0",19],
  ["212.34.0.0",16],   ["217.169.0.0",16],

  // ── Umniah (AS56930 · AS56934) ──────────────────────────────────
  ["5.34.0.0",15],     ["5.45.0.0",16],    ["5.45.128.0",20],
  ["31.9.0.0",16],     ["31.166.0.0",15],  ["31.222.0.0",16],
  ["37.218.0.0",16],
  ["46.23.112.0",20],  ["46.248.0.0",16],  ["46.248.192.0",19],
  ["85.115.64.0",18],  ["85.115.128.0",17],
  ["92.241.32.0",19],  ["95.172.192.0",19],
  ["109.107.224.0",19],
  ["141.164.0.0",16],  ["156.197.0.0",16], ["160.177.0.0",16],
  ["178.16.0.0",16],
  ["185.117.68.0",22], ["185.141.36.0",22],["185.181.112.0",22],
  ["185.236.132.0",22],["185.244.20.0",22],["185.253.140.0",22],
  ["188.71.0.0",16],   ["188.214.0.0",15],
  ["193.109.56.0",21], ["193.200.192.0",18],
  ["196.29.0.0",16],
  ["212.179.0.0",16],  ["217.168.0.0",16],

  // ── Linkdotnet (AS34931) ────────────────────────────────────────
  ["46.32.0.0",15],    ["46.32.96.0",19],  ["46.33.0.0",16],
  ["78.139.0.0",16],
  ["84.18.32.0",19],   ["84.18.64.0",19],
  ["94.127.0.0",16],
  ["176.57.0.0",16],   ["176.57.128.0",17],
  ["185.251.8.0",22],
  ["188.247.0.0",16],  ["188.247.64.0",19],["188.248.0.0",14],
  ["193.227.0.0",16],
  ["212.37.0.0",16],
  ["217.144.0.0",20],  ["217.29.240.0",20],

  // ── Jordan Telecom (AS15808) ────────────────────────────────────
  ["79.99.0.0",16],    ["79.134.0.0",16],  ["79.134.128.0",19],
  ["79.142.0.0",16],
  ["185.162.40.0",22], ["185.224.68.0",22],
  ["194.165.128.0",17],
  ["213.186.160.0",19],
  ["217.144.0.0",20],

  // ── Batelco Jordan (AS50710) ────────────────────────────────────
  ["37.220.0.0",16],   ["37.220.112.0",20],
  ["91.106.96.0",20],  ["91.186.0.0",16],  ["91.186.224.0",19],
  ["185.226.120.0",22],
  ["193.109.236.0",22],
  ["212.118.0.0",16],

  // ── VTEL (AS35177) ──────────────────────────────────────────────
  ["62.72.160.0",19],  ["81.28.112.0",20],
  ["109.237.192.0",20],
  ["176.57.48.0",20],
  ["185.254.60.0",22],
  ["193.128.48.0",20],

  // ── Damamax (AS60720) ───────────────────────────────────────────
  ["37.143.192.0",18],
  ["185.102.220.0",22],["185.208.20.0",22],["185.238.160.0",22],
  ["193.164.128.0",17],

  // ── Data Centers / Gov / New 2025 ───────────────────────────────
  ["37.152.0.0",21],   ["46.34.0.0",16],   ["89.148.0.0",16],
  ["185.122.44.0",22], ["185.130.148.0",22],["185.190.24.0",22],
  ["185.210.100.0",22],["185.240.180.0",22],
  ["194.187.128.0",17],["212.108.0.0",16],
  ["195.191.0.0",16],  ["196.205.0.0",16], ["197.37.0.0",16]
];

// ════════════════════════════════════════════════════════════════════
// § 6 · IP CLASSIFICATION
// ════════════════════════════════════════════════════════════════════

function isJordanIP(ip) {
  if (!isIPv4(ip)) return false;
  for (var i = 0; i < JO_RANGES.length; i++) {
    if (cidrMatch(ip, JO_RANGES[i][0], JO_RANGES[i][1])) return true;
  }
  return false;
}

// ════════════════════════════════════════════════════════════════════
// § 7 · PUBG DOMAIN DETECTION
// ════════════════════════════════════════════════════════════════════

var PUBG_SUFFIXES = [
  "pubgmobile.com", "pubgm.com", "pubg.com",
  "proximab.com", "proxima.io", "levelinfinite.com",
  "igamecj.com", "igamecj.cn", "igame.com",
  "gcloudcs.com", "gcloudcst.com",
  "tencent.com", "tencent-cloud.net",
  "qq.com", "wetest.net",
  "ls-answermgr.com", "vnggames.com",
  "pubgesports.com", "pubgstudio.com",
  "krafton.com"
];

var PUBG_RE = /pubg|tencent|krafton|lightspeed|levelinfinite|proximab|igamecj|gcloud|vnggames|garena|lsv[23]|gsdk|wegame|tpulse/i;

function isPUBG(host) {
  if (PUBG_RE.test(host)) return true;
  for (var i = 0; i < PUBG_SUFFIXES.length; i++) {
    if (host === PUBG_SUFFIXES[i] ||
        host.slice(-(PUBG_SUFFIXES[i].length + 1)) === "." + PUBG_SUFFIXES[i])
      return true;
  }
  return false;
}

// ════════════════════════════════════════════════════════════════════
// § 8 · TRAFFIC CLASSIFIER — 6 Essential Modes
//
//   الفرق عن القديم:
//   ❌ القديم: 12 mode + منطق معقد + أخطاء
//   ✅ الجديد: 6 modes واضحة — كل وحدة إلها مسار محدد
// ════════════════════════════════════════════════════════════════════

function classify(url, host) {
  var s = (url + " " + host).toLowerCase();

  // 1. Anti-cheat — لا تلمسه أبداً
  if (/anticheat|eac|battleye|integrity|security|verify|fingerprint|guard|shield|tamper/i.test(s))
    return "ANTICHEAT";

  // 2. CDN / Downloads — DIRECT دائماً
  if (/cdn|asset|patch|update|download|bundle|pak|obb|manifest|hotfix|delta|resource|texture|shader|static|media/i.test(s))
    return "CDN";

  // 3. Matchmaking — الأهم! هذا اللي يحدد سيرفرك
  if (/matchmak|session.?create|session.?join|region.?select|quickmatch|queue|ready|start.?match|find.?match|dispatch|assign|squad.?fill|party.?join/i.test(s))
    return "MATCHMAKE";

  // 4. Login/Auth — يحدد منطقتك
  if (/login|auth|oauth|token|gateway|register|account|profile|presence/i.test(s))
    return "AUTH";

  // 5. Combat/Game — الترافيك الفعلي للمباراة
  if (/match|battle|classic|arena|tdm|relay|gs\d|msdk|sync|realtime|tick|frame|ingame|gamesvr|state|snapshot|combat|dtls|rtp|srtp/i.test(s))
    return "COMBAT";

  // 6. Lobby / Everything else
  return "LOBBY";
}

// ════════════════════════════════════════════════════════════════════
// § 9 · RATE LIMITER
// ════════════════════════════════════════════════════════════════════

function checkRate(host) {
  var t = now();
  var arr = S.rateMap[host] || [];
  var fresh = [];
  for (var i = 0; i < arr.length; i++) {
    if (t - arr[i] < CFG.RATE_WINDOW) fresh.push(arr[i]);
  }
  fresh.push(t);
  S.rateMap[host] = fresh;
  return fresh.length <= CFG.RATE_LIMIT;
}

// ════════════════════════════════════════════════════════════════════
// § 10 · DNS RESOLUTION — مبسّط + JO-Bias
// ════════════════════════════════════════════════════════════════════

function resolveJO(host) {
  var c = S.dnsCache[host];
  if (c && !expired(c.time, CFG.DNS_CACHE_TTL)) return c.result;

  var result = { ip: null, isJO: false };

  try {
    if (typeof dnsResolve === "function") {
      var ip = dnsResolve(host);
      if (ip && isIPv4(ip)) {
        result.ip   = ip;
        result.isJO = isJordanIP(ip);
      }
    }
  } catch (e) {}

  // Try extended DNS for multiple IPs — pick JO one
  try {
    if (typeof dnsResolveEx === "function") {
      var ex = dnsResolveEx(host);
      if (ex) {
        var parts = ex.split(";");
        for (var i = 0; i < parts.length; i++) {
          var p = parts[i].trim();
          if (p && isIPv4(p) && isJordanIP(p)) {
            result.ip   = p;
            result.isJO = true;
            break;
          }
        }
        // If no JO IP found, use first valid one
        if (!result.ip) {
          for (var j = 0; j < parts.length; j++) {
            var q = parts[j].trim();
            if (q && isIPv4(q)) {
              result.ip   = q;
              result.isJO = isJordanIP(q);
              break;
            }
          }
        }
      }
    }
  } catch (e) {}

  S.dnsCache[host] = { result: result, time: now() };
  return result;
}

// ════════════════════════════════════════════════════════════════════
// § 11 · REGION LOCK — بسيط وفعال
// ════════════════════════════════════════════════════════════════════

function lockRegion(chain) {
  S.regionLocked = true;
  S.regionChain  = chain;
  S.regionExpiry = now() + CFG.REGION_LOCK_TTL;
}

function getRegionLock() {
  if (S.regionLocked && now() < S.regionExpiry) return S.regionChain;
  S.regionLocked = false;
  return null;
}

// ════════════════════════════════════════════════════════════════════
// § 12 · CONNECTION POOL — Session Stickiness
// ════════════════════════════════════════════════════════════════════

function poolGet(host) {
  var e = S.connPool[host];
  return (e && !expired(e.time, CFG.SESSION_TTL)) ? e.chain : null;
}

function poolSet(host, chain) {
  S.connPool[host] = { chain: chain, time: now() };
}

// ════════════════════════════════════════════════════════════════════
// § 13 · MAIN ROUTING ENGINE — FindProxyForURL
//
// ╔═══════════════════════════════════════════════════════════════╗
// ║  🔑 الفرق الجوهري عن السكربت القديم:                         ║
// ║                                                               ║
// ║  ❌ القديم: يعمل BLOCK لسيرفرات اللعبة لأنها مش أردنية       ║
// ║     → النتيجة: اللعبة تفشل وتاخذك سيرفر بعيد                 ║
// ║                                                               ║
// ║  ✅ الجديد:                                                   ║
// ║     • Matchmaking → عبر بروكسي أردني (يخلي PUBG يشوفك JO)   ║
// ║     • Auth/Login → عبر بروكسي أردني (تثبيت المنطقة)          ║
// ║     • Combat → DIRECT (أسرع مسار — البنق الفعلي)             ║
// ║     • لا يوجد BLOCK نهائياً — ما في شي ينقطع                 ║
// ╚═══════════════════════════════════════════════════════════════╝
// ════════════════════════════════════════════════════════════════════

function FindProxyForURL(url, host) {
  try {

    // ── 1. Normalize ──────────────────────────────────────────────
    host = normHost(host);
    if (isPlainHostName(host)) return DIRECT;

    // ── 2. Non-PUBG → DIRECT (لا تتدخل بأي شي ثاني) ─────────────
    if (!isPUBG(host)) return DIRECT;

    // ── 3. Rate limiter ───────────────────────────────────────────
    if (!checkRate(host)) return DIRECT;

    // ── 4. Classify traffic ───────────────────────────────────────
    var mode = classify(url, host);

    // ── 5. Anti-Cheat → DIRECT فوراً (أمان اللعبة) ────────────────
    if (mode === "ANTICHEAT") return DIRECT;

    // ── 6. CDN/Updates → DIRECT (سرعة تحميل) ─────────────────────
    if (mode === "CDN") return DIRECT;

    // ── 7. Active session → reuse ─────────────────────────────────
    var pooled = poolGet(host);
    if (pooled) return pooled;

    // ══════════════════════════════════════════════════════════════
    //  ROUTING DECISIONS — حسب نوع الترافيك
    // ══════════════════════════════════════════════════════════════

    // ── 8. MATCHMAKING — الأهم! ───────────────────────────────────
    //    هذا الريكويست اللي يحدد أي سيرفر تلعب عليه
    //    لازم يمر عبر بروكسي أردني عشان PUBG يحطك ME
    if (mode === "MATCHMAKE") {
      var mmChain = CHAIN.MATCHMAKE;
      lockRegion(mmChain);
      poolSet(host, mmChain);
      return mmChain;
    }

    // ── 9. AUTH/LOGIN — تثبيت المنطقة ─────────────────────────────
    //    أول ما تفتح اللعبة، السيرفر يشوف IP-ك ويحدد منطقتك
    //    لازم يمر عبر أردني
    if (mode === "AUTH") {
      var authChain = CHAIN.AUTH;
      poolSet(host, authChain);
      return authChain;
    }

    // ── 10. COMBAT — ترافيك المباراة الفعلي ───────────────────────
    //
    //    ⚠️  هنا السر الكبير:
    //    ترافيك المباراة الحقيقي (إطلاق نار، حركة) = UDP
    //    ملف PAC ما يأثر على UDP — بس يأثر على HTTP/HTTPS
    //
    //    الـ HTTP combat traffic = تحديثات حالة، sync، إلخ
    //    هذا لازم يكون DIRECT = أسرع مسار = أقل بنق
    //
    //    ⛔ ليش مش عبر بروكسي؟
    //    لأن: جهازك → بروكسي أردني → سيرفر البحرين = بطيء
    //    بينما: جهازك → سيرفر البحرين مباشرة = أسرع
    //
    if (mode === "COMBAT") {
      poolSet(host, CHAIN.COMBAT);
      return CHAIN.COMBAT;
    }

    // ── 11. LOBBY — عبر بروكسي أردني (تثبيت) ─────────────────────
    if (mode === "LOBBY") {
      // Check DNS — if it resolves to JO IP, go direct
      var dns = resolveJO(host);
      if (dns.isJO) {
        poolSet(host, DIRECT);
        return DIRECT;
      }
      // Non-JO IP → through JO proxy
      var lobbyChain = CHAIN.LOBBY;
      poolSet(host, lobbyChain);
      return lobbyChain;
    }

    // ── 12. Fallback — عبر أردني مع DIRECT فيلوفر ─────────────────
    return CHAIN.FALLBACK;

  } catch (e) {
    // لا يصير كراش أبداً
    return DIRECT;
  }
}
