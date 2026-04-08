// ====================================
// سكربت PAC مولد تلقائياً
// PAC Script - Auto Generated
// التاريخ: ٨‏/٤‏/٢٠٢٦
// ====================================

function FindProxyForURL(url, host) {
  // تحويل IP إلى رقم
  function ip2number(ip) {
    var parts = ip.split('.');
    return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
  }

  // الحصول على IP المحلي
  function myIP() {
    return "192.168.1.1";
  }

  // حل DNS
  var resolvedIP = dnsResolve(host);
  var ipNum = ip2number(resolvedIP || "0.0.0.0");


  // === نطاقات محظورة ===
    if (dnsDomainIs(host, "doubleclick.net") || shExpMatch(host, "*.doubleclick.net")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "googlesyndication.com") || shExpMatch(host, "*.googlesyndication.com")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "googleadservices.com") || shExpMatch(host, "*.googleadservices.com")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "google-analytics.com") || shExpMatch(host, "*.google-analytics.com")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "googletagmanager.com") || shExpMatch(host, "*.googletagmanager.com")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "facebook.net") || shExpMatch(host, "*.facebook.net")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "fbcdn.net") || shExpMatch(host, "*.fbcdn.net")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "ads.yahoo.com") || shExpMatch(host, "*.ads.yahoo.com")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "adnxs.com") || shExpMatch(host, "*.adnxs.com")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "adsrvr.org") || shExpMatch(host, "*.adsrvr.org")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "amazon-adsystem.com") || shExpMatch(host, "*.amazon-adsystem.com")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "advertising.com") || shExpMatch(host, "*.advertising.com")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "adbrite.com") || shExpMatch(host, "*.adbrite.com")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "bidvertiser.com") || shExpMatch(host, "*.bidvertiser.com")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "chitika.net") || shExpMatch(host, "*.chitika.net")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "infolinks.com") || shExpMatch(host, "*.infolinks.com")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "media.net") || shExpMatch(host, "*.media.net")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "outbrain.com") || shExpMatch(host, "*.outbrain.com")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "taboola.com") || shExpMatch(host, "*.taboola.com")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "popads.net") || shExpMatch(host, "*.popads.net")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "adsterra.com") || shExpMatch(host, "*.adsterra.com")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "propellerads.com") || shExpMatch(host, "*.propellerads.com")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "hilltopads.com") || shExpMatch(host, "*.hilltopads.com")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "ad-maven.com") || shExpMatch(host, "*.ad-maven.com")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "popcash.net") || shExpMatch(host, "*.popcash.net")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "propeller.plops.com") || shExpMatch(host, "*.propeller.plops.com")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "pagead2.googlesyndication.com") || shExpMatch(host, "*.pagead2.googlesyndication.com")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "tpc.googlesyndication.com") || shExpMatch(host, "*.tpc.googlesyndication.com")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "ad.doubleclick.net") || shExpMatch(host, "*.ad.doubleclick.net")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "stats.g.doubleclick.net") || shExpMatch(host, "*.stats.g.doubleclick.net")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "pornhub.com") || shExpMatch(host, "*.pornhub.com")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "xvideos.com") || shExpMatch(host, "*.xvideos.com")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "xnxx.com") || shExpMatch(host, "*.xnxx.com")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "xhamster.com") || shExpMatch(host, "*.xhamster.com")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "redtube.com") || shExpMatch(host, "*.redtube.com")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "youporn.com") || shExpMatch(host, "*.youporn.com")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "tube8.com") || shExpMatch(host, "*.tube8.com")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "spankbang.com") || shExpMatch(host, "*.spankbang.com")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "brazzers.com") || shExpMatch(host, "*.brazzers.com")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "bangbros.com") || shExpMatch(host, "*.bangbros.com")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "realitykings.com") || shExpMatch(host, "*.realitykings.com")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "naughtyamerica.com") || shExpMatch(host, "*.naughtyamerica.com")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "chaturbate.com") || shExpMatch(host, "*.chaturbate.com")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "livejasmin.com") || shExpMatch(host, "*.livejasmin.com")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "stripchat.com") || shExpMatch(host, "*.stripchat.com")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "bongacams.com") || shExpMatch(host, "*.bongacams.com")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "onlyfans.com") || shExpMatch(host, "*.onlyfans.com")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "manyvids.com") || shExpMatch(host, "*.manyvids.com")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "porntrex.com") || shExpMatch(host, "*.porntrex.com")) return "PROXY 127.0.0.1:1";
    if (dnsDomainIs(host, "eporner.com") || shExpMatch(host, "*.eporner.com")) return "PROXY 127.0.0.1:1";


  // === النطاقات الأردنية - اتصال مباشر ===
  function isJordanIP(ipNum) {
    return (ipNum & 4294934528) === 1296072704
      || (ipNum & 4294950912) === 1389641728
      || (ipNum & 4294950912) === 1586298880
      || (ipNum & 4294950912) === 1835663360
      || (ipNum & 4294959104) === 2957238272
      || (ipNum & 4294901760) === 2989752320
      || (ipNum & 4294963200) === 1348116480
      || (ipNum & 4294959104) === 3559079936
      || (ipNum & 4294959104) === 3559088128
      || (ipNum & 4294950912) === 1382465536
      || (ipNum & 4294959104) === 3585458176
      || (ipNum & 4294965248) === 521781248
      || (ipNum & 4294965248) === 92602368
      || (ipNum & 4294965248) === 92604416;
  }
  if (isJordanIP(ip2number(myIP()))) return "DIRECT";

  // === سيرفرات ببجي ===
  function isPubgIP(ipNum) {
    return (ipNum & 4294966784) === 600868352;
  }
  if (isPubgIP(ip2number(resolvedIP))) return "SOCKS5 46.185.131.218:1080";

  // الافتراضي
  return "DIRECT";
}
