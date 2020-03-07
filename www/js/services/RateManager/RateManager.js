function showRateDialog(){
    let langCode = 'en';
    let rateLater = parseInt(storageMng.getValue('rateLater'));
    let playedGames = parseInt(storageMng.getValue('gamesPlayed'));
    let rateLaterGamesPlayed = parseInt(storageMng.getValue('rateLaterGamesPlayed'));

    getLangByStorageVal(function (lang) {
        if(lang !== 'undefined'){
            langCode = lang.code;
        }
    });

    AppRate.preferences.storeAppURL.android = 'market://details?id=net.hebasoft.pexesowildanimals';
    AppRate.preferences.simpleMode = true;
    AppRate.preferences.useLanguage = langCode;

    AppRate.preferences.callbacks.onButtonClicked = function(buttonIndex){
        switch(buttonIndex){
            case 1: storageMng.setValue('rated', '1'); break;
            case 2: dialogLaterOption(); break;
            case 3: storageMng.setValue('rated', '1'); break;
        }
    };

    if(rateLater === 0 || (rateLater === 1 && (rateLaterGamesPlayed + 5) <= playedGames)){
        AppRate.promptForRating();
    }
}

function dialogLaterOption(){
    let playedGames = storageMng.getValue('gamesPlayed');

    storageMng.setValue('rateLater', '1');
    storageMng.setValue('rateLaterGamesPlayed', playedGames);
}

function alreadyRated(){
    let rated = parseInt(storageMng.getValue('rated'));

    return rated === 1;
}

function iniRatedValues(){
    storageMng.iniValueFirstTime('rated', '0');
    storageMng.iniValueFirstTime('rateLater', '0');
    storageMng.iniValueFirstTime('rateLaterGamesPlayed', '0');
}

function showRateDialogIfNotRated(){
    if(!alreadyRated()){
        showRateDialog();
    }
}
