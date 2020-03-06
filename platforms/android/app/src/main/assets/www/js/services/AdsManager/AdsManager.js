let bannerAdId = 'ca-app-pub-3801963890145689/2288738290';
let interstitialAdId ='ca-app-pub-3801963890145689/3013333467';

// Požádá síť admob o bannerovou reklamu
function prepareBannerAd(testAd = false, autoShow = false) {
    if (! AdMob ) {return; }
    let adId = testAd ? 'ca-app-pub-3940256099942544/6300978111' : bannerAdId;

    AdMob.createBanner( {
        adId: adId,
        position: AdMob.AD_POSITION.BOTTOM_CENTER,
        overlap: false,
        offsetTopBar: false,
        bgColor: 'black',
        autoShow: autoShow,
    });
}

// Požádá síť admob o celoobrazovkovou reklamu
function prepareInterstitialAd(testAd = false, autoShow = false){
    if (! AdMob ) {return; }
    let adId = testAd ? 'ca-app-pub-3940256099942544/1033173712' : interstitialAdId;

    AdMob.prepareInterstitial({
        adId: adId,
        autoShow: autoShow,
    });
}

// Zobrazí banner, pokud je povolen
function showBanner(position){
    let isBannerAllowed = storageMng.getValue('allowBanner');
    let pos = "";

    switch (position){
        case "bottom" : pos = AdMob.AD_POSITION.BOTTOM_CENTER; break;
        case "top" : pos = AdMob.AD_POSITION.TOP_CENTER; break;
        default: pos = AdMob.AD_POSITION.BOTTOM_CENTER;
    }

    if(isBannerAllowed === 'allow'){
        AdMob.showBanner(pos);
    }
}

// Skryje banner
function hideBanner() {
    AdMob.hideBanner();
}

// Zobrazí celoobrazovkovou reklamu, pokud je povolena
function showInterstitial(){
    let isInterstitialAllowed = storageMng.getValue('allowInterstitial');

    if(isInterstitialAllowed === 'allow'){
        AdMob.isInterstitialReady(function(isready){
            if(isready) AdMob.showInterstitial();
        });
    }
}

// Změní nastavení pro zobrazení banneru
function changeBannerAllow(allowed){
    storageMng.setValue('allowBanner', allowed)
}

//Změní nastavení pro zobrazení celoubrazovkové reklamy
function changeInterstitialAllow(allowed){
    storageMng.setValue('allowInterstitial', allowed)
}

// Nastaví pravidla pro zobrazení reklamy, pokud ještě nejsou nastaveny
function iniAdsSettings(allowBanner = 'disallow', allowInterstitial = 'allow'){
    storageMng.iniValueFirstTime('allowBanner', allowBanner);
    storageMng.iniValueFirstTime('allowInterstitial', allowInterstitial);
}

