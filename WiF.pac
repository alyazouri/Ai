// ═══════════════════════════════════════════════════════════════════════════
//  PUBG JORDAN UULTIMATE DOMINATION SCRIPT v3.0
//  Full Rewrite — Modular Pipeline Architecture
// ═══════════════════════════════════════════════════════════════════════════

// ─── CONSTANTS (immutable) ──────────────────────────────────────────────────
const C = {
  CONVERGENCE:    "PROXY 46.185.131.218:8443",
  MATCH_PATH:     "PROXY 46.185.131.218:20001",
  DIRECT:         "DIRECT",
  BLOCK:          "PROXY 127.0.0.1:9",

  PING_MAX:       25,
  PING_IDEAL:     12,
  PING_MATCH_MAX: 20,
  VIOLATIONS_MAX: 1,
  SESSION_MAX_MS: 2400000,
  INACTIVITY_MS:  300000,
  DNS_TTL_MS:     180000,
  DNS_NEG_TTL_MS: 30000,
  CACHE_MAX:      500,
  HISTORY_MAX:    30,

  TIER_ORDER:     ["diamond_tier","gold_tier","silver_tier","bronze_tier","copper_tier"],
  TIER_SCORE:     { diamond_tier:1000, gold_tier:850, silver_tier:700, bronze_tier:550, copper_tier:400 },

  // State machine states
  STATE: {
    IDLE:        "idle",
    MATCHMAKING: "matchmaking",
    IN_GAME:     "in_game",
    LOBBY:       "lobby",
    POST_GAME:   "post_game"
  }
};


// ─── UTILITY LIBRARY ────────────────────────────────────────────────────────

const U = {
  /**
   * Strip port from host string
   */
  normHost(h) {
    const i = h.indexOf(":");
    return i > -1 ? h.substring(0, i).toLowerCase() : h.toLowerCase();
  },

  /**
   * IPv4 string → 32-bit unsigned integer
   */
  ipToU32(ip) {
    const p = ip.split(".");
    if (p.length !== 4) return null;
    return ((+p[0] << 24) | (+p[1] << 16) | (+p[2] << 8) | +p[3]) >>> 0;
  },

  /**
   * CIDR notation "base/mask" → {baseU32, maskU32}
   * Supports: "192.168.1.0/24", "10.0.0.0/8", AND legacy "IP mask" format
   */
  parseNet(rangeBase, rangeMask) {
    // Legacy format: two separate strings "IP" + "255.255.255.0"
    if (rangeMask && rangeMask.includes(".")) {
      const base = this.ipToU32(rangeBase);
      const mask = this.ipToU32(rangeMask);
      return base !== null && mask !== null ? { base, mask } : null;
    }
    // CIDR format: "192.168.1.0/24"
    if (rangeBase.includes("/")) {
      const [b, bits] = rangeBase.split("/");
      const base = this.ipToU32(b);
      const mask = bits ? ~((1 << (32 - +bits)) - 1) >>> 0 : 0xFFFFFFFF;
      return base !== null ? { base, mask } : null;
    }
    return null;
  },

  /**
   * Check if IP (string) is within a network range
   */
  ipInNet(ipStr, rangeBase, rangeMask) {
    const net = this.parseNet(rangeBase, rangeMask);
    if (!net) return false;
    const ip = this.ipToU32(ipStr);
    return ip !== null && ((ip & net.mask) === (net.base & net.mask));
  },

  /**
   * Simple FNV-1a hash → hex
   */
  hash32(s) {
    let h = 0x811c9dc5;
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return (h >>> 0).toString(16);
  },

  /**
   * Extract /24 network prefix string
   */
  net24(ip) {
    const p = ip.split(".");
    return p.length === 4 ? `${p[0]}.${p[1]}.${p[2]}` : null;
  },

  net16(ip) {
    const p = ip.split(".");
    return p.length === 4 ? `${p[0]}.${p[1]}` : null;
  },

  now() { return Date.now(); },
};


// ─── LRU CACHE ──────────────────────────────────────────────────────────────

const LRU = function(maxSize) {
  this._max = maxSize || 500;
  this._map = {};
  this._order = [];
};

LRU.prototype.get = function(key) {
  const entry = this._map[key];
  if (!entry) return null;
  if (U.now() - entry.ts > (entry.ttl || C.DNS_TTL_MS)) {
    delete this._map[key];
    return null;
  }
  // bump
  const idx = this._order.indexOf(key);
  if (idx > -1) this._order.splice(idx, 1);
  this._order.unshift(key);
  return entry.val;
};

LRU.prototype.set = function(key, val, ttl) {
  if (this._order.length >= this._max) {
    const old = this._order.pop();
    delete this._map[old];
  }
  this._map[key] = { val, ts: U.now(), ttl: ttl || C.DNS_TTL_MS };
  this._order.unshift(key);
};


// ─── GEO DATABASE (pre-flattened for speed) ────────────────────────────────

const GEO = {
  /**
   * Build a flat array once from tiered structure:
   *   [{ base, mask, tier, provider, dc, ping, score, direct }]
   */
  _nets: null,

  init() {
    if (this._nets) return;
    const flat = [];
    for (const tierName of C.TIER_ORDER) {
      const tier = JORDAN_NETWORKS_DB[tierName];
      if (!tier) continue;
      for (const entry of tier) {
        const parsed = U.parseNet(entry.range[0], entry.range[1]);
        if (!parsed) continue;
        flat.push({
          base: parsed.base, mask: parsed.mask,
          tier: tierName,
          provider: entry.provider,
          dc: entry.dc,
          ping: entry.ping,
          score: entry.score,
          direct: entry.direct
        });
      }
    }
    // Sort: diamond first (highest score) for early match
    flat.sort((a, b) => (C.TIER_SCORE[b.tier] || 0) - (C.TIER_SCORE[a.tier] || 0));
    this._nets = flat;
  },

  /**
   * Lookup IP → network entry or null
   */
  lookup(ip) {
    if (!this._nets) this.init();
    const ip32 = U.ipToU32(ip);
    if (ip32 === null) return null;
    for (const n of this._nets) {
      if ((ip32 & n.mask) === (n.base & n.mask)) return n;
    }
    return null;
  }
};


const BLACKLIST = {
  _nets: null,

  init() {
    if (this._nets) return;
    const flat = [];
    for (const entry of GLOBAL_BLACKLIST) {
      const parsed = U.parseNet(entry.range[0], entry.range[1]);
      if (!parsed) continue;
      flat.push({ ...parsed, region: entry.region, threat: entry.threat });
    }
    this._nets = flat;
  },

  isBlocked(ip) {
    if (!this._nets) this.init();
    const ip32 = U.ipToU32(ip);
    if (ip32 === null) return null;
    for (const b of this._nets) {
      if ((ip32 & b.mask) === (b.base & b.mask))
        return { region: b.region, threat: b.threat };
    }
    return null;
  }
};


// ─── SMART DNS RESOLVER ────────────────────────────────────────────────────

const DNS_CACHE = new LRU(C.CACHE_MAX);

function smartResolve(host) {
  // 1. LRU cache hit?
  const cached = DNS_CACHE.get("dns:" + host);
  if (cached) return cached;

  // 2. Resolve
  let ip;
  try { ip = dnsResolve(host); } catch(e) { ip = null; }

  if (!ip || ip.includes(":")) {
    // Cache negative result briefly so we don't hammer
    DNS_CACHE.set("dns:" + host, null, C.DNS_NEG_TTL_MS);
    return null;
  }

  DNS_CACHE.set("dns:" + host, ip);
  return ip;
}


// ─── PLAYER DETECTOR ───────────────────────────────────────────────────────

const PLAYER = {
  detected: false,
  ip: null,
  provider: null,
  tier: null,
  dc: null,

  detect() {
    if (this.detected) return;
    let ip;
    try { ip = myIpAddress(); } catch(e) { ip = null; }
    if (!ip || ip === "127.0.0.1" || ip.includes(":")) {
      this.provider = "unknown";
      this.detected = true;
      return;
    }
    this.ip = ip;
    const net = GEO.lookup(ip);
    if (net) {
      this.provider = net.provider;
      this.tier = net.tier;
      this.dc = net.dc;
    } else {
      this.provider = "unknown";
    }
    this.detected = true;
  }
};


// ─── FINGERPRINT ENGINE ─────────────────────────────────────────────────────

function fingerprint(ip, host, url) {
  const now = U.now();
  const d = new Date();
  return {
    ip,
    host,
    net24: U.net24(ip),
    net16: U.net16(ip),
    hostType: classifyHost(host),
    urlType: classifyUrl(url),
    hash: U.hash32(ip + "|" + host + "|" + classifyHost(host)),
    ts: now,
    hour: d.getHours(),
    dow: d.getDay()
  };
}

function classifyHost(h) {
  if (/match|game|battle|room/i.test(h)) return "match";
  if (/lobby|dispatch|gateway|platform/i.test(h)) return "lobby";
  if (/cdn|asset|resource|content/i.test(h)) return "cdn";
  if (/social|friend|squad|team|party/i.test(h)) return "social";
  if (/auth|login|account|session/i.test(h)) return "auth";
  return "other";
}

function classifyUrl(u) {
  const s = u.toLowerCase();
  if (/matchmaking|queue|find-match|search-game|join-queue/i.test(s)) return "matchmaking";
  if (/recruit|invite|squad|team-join|party/i.test(s)) return "recruitment";
  if (/\b(match|battle|combat|gameplay|room-\d+|session-\d+|live-game)\b/i.test(s)
      && !/matchmaking|history|stats|result/i.test(s)) return "gameplay";
  if (/lobby|hall|entrance|menu/i.test(s)) return "lobby";
  if (/friend|chat|message|voice|presence/i.test(s)) return "social";
  if (/cdn|asset|patch|update|download|static|skin|texture/i.test(s)) return "cdn";
  return "other";
}

function fpMatch(a, b) {
  if (!a || !b) return false;
  if (a.ip === b.ip && a.host === b.host) return true;
  if (a.net24 === b.net24 && a.hostType === b.hostType) return true;
  if (a.hash === b.hash) return true;
  return false;
}


// ─── TRAFFIC CLASSIFIER (returns priority + critical flag) ──────────────────

function classifyTraffic(url, host) {
  const combined = (url + "|" + host).toLowerCase();
  if (/matchmaking|match-queue|find-match|search-game|join-queue|enter-queue|queue-join|start-match/i.test(combined))
    return { type: "matchmaking", prio: 1000, critical: true };
  if (/recruit|invitation|squad-invite|team-join|party-invite|join-team|find-teammates/i.test(combined))
    return { type: "recruitment", prio: 950, critical: true };
  if (/\b(match|battle|game-server|combat|room-\d+|instance|gameplay|session-\d+|live-game)\b/i.test(combined)
      && !/matchmaking|prematch|postmatch|history|stats|result/i.test(combined))
    return { type: "gameplay", prio: 900, critical: true };
  if (/lobby|entrance|hall|dispatch|gateway|platform|waiting-room|main-menu/i.test(combined))
    return { type: "lobby", prio: 500, critical: false };
  if (/friend|squad|team|party|clan|social|invite|presence|chat|message|voice/i.test(combined))
    return { type: "social", prio: 400, critical: false };
  if (/cdn|asset|resource|patch|update|download|static|content|media|file|skin|texture/i.test(combined))
    return { type: "cdn", prio: 200, critical: false };
  return { type: "general", prio: 100, critical: false };
}


// ─── TIME ANALYZER ──────────────────────────────────────────────────────────

function timeAnalysis() {
  const d = new Date();
  const h = d.getHours(), m = d.getMinutes(), dow = d.getDay();
  let mult = 1.0, desc = "", peak = false, golden = false;

  if (h >= 19 && h <= 23) { mult = 5.0; peak = true; desc = "evening_peak"; }
  else if (h >= 0 && h <= 2) { mult = 4.0; peak = true; desc = "night_peak"; }
  else if (h >= 14 && h <= 18) { mult = 2.5; desc = "afternoon"; }
  else if (h >= 9 && h <= 12) { mult = 1.5; desc = "morning"; }

  if (dow === 5 || dow === 6) { mult *= 1.8; desc += "_weekend"; }

  if (m >= 0 && m <= 12) { golden = true; mult *= 3.0; desc += "_golden1"; }
  else if (m >= 28 && m <= 42) { golden = true; mult *= 2.0; desc += "_golden2"; }

  return { h, m, dow, mult, peak, golden, desc };
}


// ─── SESSION STATE MACHINE ──────────────────────────────────────────────────

const SESSION = {
  state: C.STATE.IDLE,
  fp: null,
  ip: null,
  host: null,
  start: 0,
  last: 0,
  violations: 0,
  packets: 0,

  reset() {
    this.state = C.STATE.IDLE;
    this.fp = null;
    this.ip = null;
    this.host = null;
    this.start = 0;
    this.last = 0;
    this.violations = 0;
    this.packets = 0;
  },

  begin(ip, host, url, analysis) {
    this.state = C.STATE.IN_GAME;
    this.fp = fingerprint(ip, host, url);
    this.ip = ip;
    this.host = host;
    this.start = U.now();
    this.last = U.now();
    this.violations = 0;
    this.packets = 0;
  },

  validate(ip, host, url) {
    if (this.state === C.STATE.IDLE) return { ok: true, reason: "idle" };
    const curr = fingerprint(ip, host, url);
    if (!fpMatch(curr, this.fp)) {
      this.violations++;
      return {
        ok: false,
        reason: "fp_mismatch",
        violations: this.violations,
        hardBlock: this.violations > C.VIOLATIONS_MAX
      };
    }
    this.last = U.now();
    this.packets++;
    return { ok: true, reason: "matched" };
  },

  stale() {
    if (this.state === C.STATE.IDLE) return false;
    const age = U.now() - this.start;
    const idle = U.now() - this.last;
    if (age > C.SESSION_MAX_MS) return true;
    if (idle > C.INACTIVITY_MS) return true;
    return false;
  }
};


// ─── ANALYSIS PIPELINE (single pass) ────────────────────────────────────────

function analyzeIP(ip) {
  // 1. Blacklist check (fast bitmask)
  const blocked = BLACKLIST.isBlocked(ip);
  if (blocked) {
    return {
      ip, isJordanian: false, shouldBlock: true,
      reason: "blacklist:" + blocked.region,
      threat: blocked.threat, score: -10000
    };
  }

  // 2. Jordan lookup
  const net = GEO.lookup(ip);
  if (!net) {
    return {
      ip, isJordanian: false, shouldBlock: true,
      reason: "not_jordanian", score: -5000
    };
  }

  // 3. Build analysis
  let bonus = 0;
  let effectivePing = net.ping;

  // Same provider bonus (local peering = lower latency)
  if (PLAYER.provider && PLAYER.provider === net.provider) {
    bonus += 150;
    effectivePing = Math.floor(effectivePing * 0.6);
  }
  if (PLAYER.dc && PLAYER.dc === net.dc) {
    bonus += 80;
    effectivePing = Math.floor(effectivePing * 0.75);
  }

  // Tier bonus
  if (net.tier === "diamond_tier") bonus += 100;
  else if (net.tier === "gold_tier") bonus += 50;

  return {
    ip,
    isJordanian: true,
    shouldBlock: false,
    tier: net.tier,
    provider: net.provider,
    dc: net.dc,
    expectedPing: effectivePing,
    baseScore: net.score,
    bonusScore: bonus,
    totalScore: net.score + bonus,
    allowDirect: net.direct
  };
}


// ─── POLICY ENGINE (scored decision tree) ───────────────────────────────────

function decide(actionInput) {
  const { ip, host, url, analysis, traffic, t } = actionInput;

  // ═══ LAYER 0: Hard block ═══
  if (analysis.shouldBlock) {
    return { action: C.BLOCK, reason: analysis.reason };
  }

  // ═══ LAYER 1: Matchmaking — forced convergence ═══
  if (traffic.type === "matchmaking") {
    if (!analysis.isJordanian || analysis.expectedPing > C.PING_MATCH_MAX) {
      return { action: C.BLOCK, reason: "mm_jordan_only" };
    }
    return { action: C.CONVERGENCE, reason: "mm_convergence" };
  }

  // ═══ LAYER 2: Recruitment ═══
  if (traffic.type === "recruitment") {
    if (!analysis.isJordanian) return { action: C.BLOCK, reason: "rec_jordan_only" };
    return { action: C.CONVERGENCE, reason: "rec_convergence" };
  }

  // ═══ LAYER 3: Gameplay — session state machine ═══
  if (traffic.type === "gameplay") {
    if (!analysis.isJordanian || analysis.expectedPing > C.PING_MAX) {
      return { action: C.BLOCK, reason: "game_jordan_ping" };
    }

    if (SESSION.state === C.STATE.IDLE) {
      SESSION.begin(ip, host, url, analysis);
      return { action: C.MATCH_PATH, reason: "game_new_session" };
    }

    const v = SESSION.validate(ip, host, url);
    if (!v.ok) {
      if (v.hardBlock) return { action: C.BLOCK, reason: "session_hard_violation" };
      return { action: C.BLOCK, reason: "session_soft_violation" };
    }

    return { action: C.MATCH_PATH, reason: "game_continue" };
  }

  // ═══ LAYER 4: Lobby ═══
  if (traffic.type === "lobby") {
    if (SESSION.stale()) SESSION.reset();
    if (!analysis.isJordanian) return { action: C.BLOCK, reason: "lobby_jordan_only" };
    return { action: C.CONVERGENCE, reason: "lobby_convergence" };
  }

  // ═══ LAYER 5: Social ═══
  if (traffic.type === "social") {
    if (!analysis.isJordanian) return { action: C.BLOCK, reason: "social_jordan_only" };
    return { action: C.CONVERGENCE, reason: "social_convergence" };
  }

  // ═══ LAYER 6: CDN ═══
  if (traffic.type === "cdn") {
    if (!analysis.isJordanian) return { action: C.BLOCK, reason: "cdn_jordan_only" };
    if (analysis.expectedPing < C.PING_IDEAL && analysis.allowDirect) {
      return { action: C.DIRECT, reason: "cdn_direct" };
    }
    return { action: C.CONVERGENCE, reason: "cdn_proxy" };
  }

  // ═══ LAYER 7: General — Jordan only ═══
  if (!analysis.isJordanian) {
    return { action: C.BLOCK, reason: "general_jordan_only" };
  }

  // Fast direct for trusted
  if (analysis.expectedPing < C.PING_IDEAL && analysis.allowDirect) {
    return { action: C.DIRECT, reason: "general_direct" };
  }

  return { action: C.CONVERGENCE, reason: "general_proxy" };
}


// ─── IS-PUBG CHECK ──────────────────────────────────────────────────────────

function isPUBGHost(h) {
  return /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite|proximabeta|igame|intlgame|vng|garena/i.test(h);
}


// ═══════════════════════════════════════════════════════════════════════════
//  ENTRY POINT — FindProxyForURL
// ═══════════════════════════════════════════════════════════════════════════

function FindProxyForURL(url, host) {
  host = U.normHost(host);

  // Non-PUBG → direct, zero overhead
  if (!isPUBGHost(host)) {
    return C.DIRECT;
  }

  // Detect player info once
  if (!PLAYER.detected) PLAYER.detect();

  // DNS resolution with smart caching
  const ip = smartResolve(host);
  if (!ip) return C.BLOCK;

  // Multi-layer analysis (single pass)
  const analysis = analyzeIP(ip);

  // Traffic classification
  const traffic = classifyTraffic(url, host);

  // Time-based multiplier (applies to score for logging/debug)
  const t = timeAnalysis();
  if (analysis.isJordanian) {
    analysis.totalScore = Math.floor(analysis.totalScore * t.mult);
  }

  // Session staleness cleanup
  if (SESSION.stale()) SESSION.reset();

  // Policy decision
  const decision = decide({ ip, host, url, analysis, traffic, t });

  return decision.action;
}


// ═══════════════════════════════════════════════════════════════════════════
//  SECTION: DATABASES (unchanged data, referenced by GEO / BLACKLIST)
// ═══════════════════════════════════════════════════════════════════════════

var JORDAN_NETWORKS_DB = {
  diamond_tier: [
    {range:["46.185.131.0","255.255.255.0"],provider:"zain",dc:"amman-core",ping:5,score:1000,direct:true},
    {range:["46.185.140.0","255.255.252.0"],provider:"zain",dc:"amman-core",ping:5,score:1000,direct:true},
    {range:["46.185.144.0","255.255.248.0"],provider:"zain",dc:"amman-core",ping:6,score:990,direct:true},
    {range:["149.200.200.0","255.255.252.0"],provider:"orange",dc:"amman-core",ping:6,score:985,direct:true},
    {range:["212.35.66.0","255.255.254.0"],provider:"orange",dc:"amman-core",ping:6,score:980,direct:true},
    {range:["212.35.68.0","255.255.252.0"],provider:"orange",dc:"amman-core",ping:7,score:975,direct:true},
    {range:["77.245.224.0","255.255.240.0"],provider:"umniah",dc:"amman-core",ping:7,score:970,direct:true}
  ],
  gold_tier: [
    {range:["46.185.128.0","255.255.128.0"],provider:"zain",dc:"national",ping:8,score:920,direct:true},
    {range:["46.185.0.0","255.255.0.0"],provider:"zain",dc:"national",ping:9,score:910,direct:true},
    {range:["2.59.52.0","255.255.252.0"],provider:"zain",dc:"mobile",ping:10,score:900,direct:true},
    {range:["2.59.56.0","255.255.248.0"],provider:"zain",dc:"mobile",ping:10,score:895,direct:true},
    {range:["2.59.48.0","255.255.240.0"],provider:"zain",dc:"mobile",ping:11,score:890,direct:true},
    {range:["149.200.128.0","255.255.128.0"],provider:"orange",dc:"national",ping:8,score:915,direct:true},
    {range:["149.200.0.0","255.255.0.0"],provider:"orange",dc:"national",ping:9,score:905,direct:true},
    {range:["212.35.64.0","255.255.192.0"],provider:"orange",dc:"national",ping:9,score:900,direct:true},
    {range:["212.35.0.0","255.255.0.0"],provider:"orange",dc:"national",ping:10,score:890,direct:true},
    {range:["2.17.24.0","255.255.248.0"],provider:"orange",dc:"mobile",ping:10,score:885,direct:true},
    {range:["2.17.16.0","255.255.240.0"],provider:"orange",dc:"mobile",ping:11,score:880,direct:true},
    {range:["2.17.0.0","255.255.0.0"],provider:"orange",dc:"mobile",ping:11,score:875,direct:true},
    {range:["77.245.0.0","255.255.224.0"],provider:"umniah",dc:"national",ping:9,score:910,direct:true},
    {range:["77.245.32.0","255.255.224.0"],provider:"umniah",dc:"national",ping:10,score:895,direct:true},
    {range:["5.45.112.0","255.255.240.0"],provider:"umniah",dc:"broadband",ping:11,score:885,direct:true},
    {range:["5.45.96.0","255.255.224.0"],provider:"umniah",dc:"broadband",ping:11,score:880,direct:true},
    {range:["5.45.64.0","255.255.192.0"],provider:"umniah",dc:"broadband",ping:12,score:870,direct:true}
  ],
  silver_tier: [
    {range:["188.161.0.0","255.255.128.0"],provider:"batelco",dc:"national",ping:12,score:850,direct:true},
    {range:["188.161.128.0","255.255.128.0"],provider:"batelco",dc:"national",ping:13,score:840,direct:true},
    {range:["37.17.128.0","255.255.192.0"],provider:"batelco",dc:"broadband",ping:13,score:835,direct:true},
    {range:["37.17.0.0","255.255.128.0"],provider:"batelco",dc:"broadband",ping:14,score:825,direct:true},
    {range:["176.9.0.0","255.255.0.0"],provider:"mixed-isps",dc:"national",ping:14,score:825,direct:true},
    {range:["176.10.0.0","255.255.128.0"],provider:"mixed-isps",dc:"national",ping:15,score:815,direct:true},
    {range:["185.15.216.0","255.255.248.0"],provider:"datacenter",dc:"amman",ping:13,score:830,direct:true},
    {range:["185.44.36.0","255.255.252.0"],provider:"datacenter",dc:"amman",ping:13,score:825,direct:true},
    {range:["185.117.136.0","255.255.248.0"],provider:"hosting",dc:"amman",ping:12,score:840,direct:true},
    {range:["185.125.4.0","255.255.252.0"],provider:"cloud",dc:"amman",ping:13,score:830,direct:true},
    {range:["79.134.128.0","255.255.224.0"],provider:"enterprise",dc:"amman",ping:14,score:820,direct:true},
    {range:["79.134.160.0","255.255.224.0"],provider:"enterprise",dc:"amman",ping:14,score:815,direct:true},
    {range:["79.173.192.0","255.255.192.0"],provider:"government",dc:"national",ping:15,score:810,direct:true},
    {range:["79.173.0.0","255.255.128.0"],provider:"government",dc:"national",ping:16,score:800,direct:true},
    {range:["80.90.160.0","255.255.240.0"],provider:"premium-isp",dc:"amman",ping:14,score:820,direct:true},
    {range:["82.212.64.0","255.255.192.0"],provider:"regional-isp",dc:"national",ping:15,score:800,direct:true},
    {range:["91.218.88.0","255.255.248.0"],provider:"business",dc:"amman",ping:15,score:805,direct:true},
    {range:["109.106.192.0","255.255.192.0"],provider:"residential",dc:"national",ping:16,score:790,direct:true},
    {range:["109.107.0.0","255.255.128.0"],provider:"residential",dc:"national",ping:16,score:785,direct:true},
    {range:["109.108.0.0","255.255.128.0"],provider:"residential",dc:"national",ping:17,score:780,direct:true}
  ],
  bronze_tier: [
    {range:["212.118.0.0","255.255.128.0"],provider:"orange",dc:"legacy",ping:18,score:750,direct:false},
    {range:["212.118.128.0","255.255.128.0"],provider:"orange",dc:"legacy",ping:19,score:740,direct:false},
    {range:["213.6.128.0","255.255.128.0"],provider:"legacy-isp",dc:"national",ping:19,score:735,direct:false},
    {range:["213.6.0.0","255.255.128.0"],provider:"legacy-isp",dc:"national",ping:20,score:730,direct:false},
    {range:["195.229.0.0","255.255.224.0"],provider:"academic",dc:"universities",ping:20,score:725,direct:false},
    {range:["195.229.32.0","255.255.224.0"],provider:"academic",dc:"universities",ping:21,score:720,direct:false},
    {range:["195.229.64.0","255.255.192.0"],provider:"government",dc:"official",ping:20,score:730,direct:false},
    {range:["193.188.80.0","255.255.248.0"],provider:"education",dc:"schools",ping:21,score:715,direct:false},
    {range:["212.33.192.0","255.255.192.0"],provider:"ministry",dc:"government",ping:21,score:720,direct:false},
    {range:["31.9.0.0","255.255.0.0"],provider:"regional-isp",dc:"various",ping:22,score:695,direct:false},
    {range:["85.115.0.0","255.255.128.0"],provider:"alternate-isp",dc:"regional",ping:23,score:680,direct:false},
    {range:["178.130.0.0","255.255.128.0"],provider:"wireless-isp",dc:"national",ping:23,score:675,direct:false},
    {range:["185.98.128.0","255.255.128.0"],provider:"corporate",dc:"business",ping:22,score:690,direct:false}
  ],
  copper_tier: [
    {range:["62.215.0.0","255.255.128.0"],provider:"rural-isp",dc:"southern",ping:26,score:650,direct:false},
    {range:["78.134.0.0","255.255.128.0"],provider:"alternate",dc:"northern",ping:27,score:640,direct:false},
    {range:["94.127.0.0","255.255.128.0"],provider:"secondary",dc:"various",ping:28,score:630,direct:false},
    {range:["151.236.0.0","255.255.128.0"],provider:"satellite",dc:"remote",ping:30,score:600,direct:false},
    {range:["194.126.0.0","255.255.128.0"],provider:"vintage",dc:"legacy",ping:32,score:580,direct:false},
    {range:["195.0.0.0","255.255.128.0"],provider:"classic-isp",dc:"legacy",ping:33,score:570,direct:false}
  ]
};

var GLOBAL_BLACKLIST = [
  {range:["78.160.0.0","255.224.0.0"],region:"turkey",threat:"high"},
  {range:["88.240.0.0","255.240.0.0"],region:"turkey",threat:"high"},
  {range:["176.40.0.0","255.248.0.0"],region:"turkey",threat:"high"},
  {range:["185.80.0.0","255.248.0.0"],region:"turkey",threat:"high"},
  {range:["212.174.0.0","255.254.0.0"],region:"turkey",threat:"high"},
  {range:["31.145.0.0","255.255.0.0"],region:"turkey",threat:"high"},
  {range:["5.35.0.0","255.255.0.0"],region:"gulf",threat:"medium"},
  {range:["5.37.0.0","255.255.0.0"],region:"gulf",threat:"medium"},
  {range:["31.12.0.0","255.252.0.0"],region:"gulf",threat:"medium"},
  {range:["37.230.0.0","255.254.0.0"],region:"gulf",threat:"medium"},
  {range:["46.33.0.0","255.255.0.0"],region:"gulf",threat:"medium"},
  {range:["78.90.0.0","255.254.0.0"],region:"gulf",threat:"medium"},
  {range:["82.148.0.0","255.252.0.0"],region:"gulf",threat:"medium"},
  {range:["85.95.0.0","255.255.0.0"],region:"gulf",threat:"medium"},
  {range:["94.200.0.0","255.248.0.0"],region:"gulf",threat:"medium"},
  {range:["188.119.0.0","255.255.0.0"],region:"gulf",threat:"medium"},
  {range:["41.32.0.0","255.224.0.0"],region:"egypt",threat:"medium"},
  {range:["41.64.0.0","255.192.0.0"],region:"egypt",threat:"medium"},
  {range:["156.160.0.0","255.224.0.0"],region:"egypt",threat:"medium"},
  {range:["197.32.0.0","255.224.0.0"],region:"egypt",threat:"medium"},
  {range:["5.0.0.0","252.0.0.0"],region:"europe",threat:"critical"},
  {range:["31.0.0.0","255.0.0.0"],region:"europe",threat:"critical"},
  {range:["45.0.0.0","255.0.0.0"],region:"europe",threat:"critical"},
  {range:["50.0.0.0","255.0.0.0"],region:"europe",threat:"critical"},
  {range:["51.0.0.0","255.0.0.0"],region:"europe",threat:"critical"},
  {range:["62.0.0.0","252.0.0.0"],region:"europe",threat:"critical"},
  {range:["77.0.0.0","255.0.0.0"],region:"europe",threat:"critical"},
  {range:["78.0.0.0","255.0.0.0"],region:"europe",threat:"critical"},
  {range:["79.0.0.0","255.0.0.0"],region:"europe",threat:"critical"},
  {range:["80.0.0.0","255.0.0.0"],region:"europe",threat:"critical"},
  {range:["81.0.0.0","255.0.0.0"],region:"europe",threat:"critical"},
  {range:["82.0.0.0","255.0.0.0"],region:"europe",threat:"critical"},
  {range:["83.0.0.0","254.0.0.0"],region:"europe",threat:"critical"},
  {range:["85.0.0.0","254.0.0.0"],region:"europe",threat:"critical"},
  {range:["86.0.0.0","255.0.0.0"],region:"europe",threat:"critical"},
  {range:["87.0.0.0","254.0.0.0"],region:"europe",threat:"critical"},
  {range:["88.0.0.0","255.0.0.0"],region:"europe",threat:"critical"},
  {range:["89.0.0.0","254.0.0.0"],region:"europe",threat:"critical"},
  {range:["90.0.0.0","255.0.0.0"],region:"europe",threat:"critical"},
  {range:["91.0.0.0","254.0.0.0"],region:"europe",threat:"critical"},
  {range:["92.0.0.0","255.0.0.0"],region:"europe",threat:"critical"},
  {range:["93.0.0.0","254.0.0.0"],region:"europe",threat:"critical"},
  {range:["94.0.0.0","255.0.0.0"],region:"europe",threat:"critical"},
  {range:["95.0.0.0","255.0.0.0"],region:"europe",threat:"critical"},
  {range:["1.0.0.0","255.0.0.0"],region:"asia",threat:"critical"},
  {range:["14.0.0.0","255.0.0.0"],region:"asia",threat:"critical"},
  {range:["27.0.0.0","255.0.0.0"],region:"asia",threat:"critical"},
  {range:["36.0.0.0","255.0.0.0"],region:"asia",threat:"critical"},
  {range:["39.0.0.0","255.0.0.0"],region:"asia",threat:"critical"},
  {range:["42.0.0.0","255.0.0.0"],region:"asia",threat:"critical"},
  {range:["43.0.0.0","255.0.0.0"],region:"asia",threat:"critical"},
  {range:["49.0.0.0","255.0.0.0"],region:"asia",threat:"critical"},
  {range:["58.0.0.0","248.0.0.0"],region:"asia",threat:"critical"},
  {range:["101.0.0.0","255.0.0.0"],region:"asia",threat:"critical"},
  {range:["103.0.0.0","255.0.0.0"],region:"asia",threat:"critical"},
  {range:["106.0.0.0","248.0.0.0"],region:"asia",threat:"critical"},
  {range:["110.0.0.0","248.0.0.0"],region:"asia",threat:"critical"},
  {range:["114.0.0.0","248.0.0.0"],region:"asia",threat:"critical"},
  {range:["118.0.0.0","248.0.0.0"],region:"asia",threat:"critical"},
  {range:["120.0.0.0","240.0.0.0"],region:"asia",threat:"critical"},
  {range:["8.0.0.0","255.0.0.0"],region:"na",threat:"critical"},
  {range:["12.0.0.0","255.0.0.0"],region:"na",threat:"critical"},
  {range:["13.0.0.0","255.0.0.0"],region:"na",threat:"critical"},
  {range:["15.0.0.0","255.0.0.0"],region:"na",threat:"critical"},
  {range:["16.0.0.0","255.0.0.0"],region:"na",threat:"critical"},
  {range:["17.0.0.0","255.0.0.0"],region:"na",threat:"critical"},
  {range:["18.0.0.0","255.0.0.0"],region:"na",threat:"critical"},
  {range:["19.0.0.0","255.0.0.0"],region:"na",threat:"critical"},
  {range:["20.0.0.0","255.0.0.0"],region:"na",threat:"critical"},
  {range:["23.0.0.0","255.0.0.0"],region:"na",threat:"critical"},
  {range:["24.0.0.0","255.0.0.0"],region:"na",threat:"critical"}
];
