let allLangs = [
    {
        "lang": "english",
        "langName": "English",
        "code": "en-gb",
        "translations": {
            "loading": "Loading...",

            "difficulty": "Difficulty",
            "easy": "Easy",
            "moderate": "Moderate",
            "hard": "Hard",
            "tablet": "Tablet",

            "continue": "Continue",
            "new_game": "New Game",

            "settings": "Settings",
            "game": "Game",
            "language": "Language",
            "ads": "Ads",

            "theme": "Theme",
            "light": "Light",
            "dark": "Dark",

            "banner": "Banner",
            "fullscreen": "Fullscreen",
            "banner_info": "A banner will be displayed at the bottom of the screen",
            "full_info": "Fullscreen ad will appear at the end of the game",

            "cards": "Cards",
            "approve": "Confirm?",
            "buy": "Buy",
            "cancel": "Cancel",

            "moves": "Moves",
            "results": "Results",
            "time" : "Time",
        }
    },
    {
        "lang": "czech",
        "langName": "Čeština",
        "code": "cs-CZ",
        "translations": {
            "loading": "Načítám...",

            "difficulty": "Obtížnost",
            "easy": "Snadný",
            "moderate": "Pokročilý",
            "hard": "Těžký",
            "tablet": "Tablet",

            "continue": "Pokračovat",
            "new_game": "Nová Hra",

            "settings": "Nastavení",
            "game": "Hra",
            "language": "Jazyk",
            "ads": "Reklamy",

            "theme": "Režim",
            "light": "Světlý",
            "dark": "Tmavý",

            "banner": "Banner",
            "fullscreen": "Fullscreen",
            "banner_info": "Na spodní části obrazovky bude zobrazen banner",
            "full_info": "Na konci hry se zobrazí reklama na celou obrazovku",

            "cards": "Karty",
            "approve": "Potvrdit?",
            "buy": "Koupit",
            "cancel": "Zpět",

            "moves": "Tahy",
            "results": "Výsledky",
            "time" : "Čas",
        }
    },
    {
        "lang": "german",
        "langName": "German",
        "code": "de",
        "translations": {
            "loading": "Wird geladen...",

            "difficulty": "Schwierigkeit",
            "easy": "Einfach",
            "moderate": "Mittelschwer",
            "hard": "Schwer",
            "tablet": "Tablet",

            "continue": "Fortsetzen",
            "new_game": "Neues Spiel",

            "settings": "die Einstellungen",
            "game": "Spiel",
            "language": "Sprache",
            "ads": "Werbung",

            "theme": "Modus",
            "light": "Lichtmodus",
            "dark": "Dunkler Modus",

            "banner": "Banner",
            "fullscreen": "Ganzer Bildschirm",
            "banner_info": "Am unteren Bildschirmrand wird ein Banner angezeigt",
            "full_info": "Die Vollbildanzeige werbung erscheint am Ende des Spiels",

            "cards": "Karten",
            "approve": "Bestätigen?",
            "buy": "Kaufen",
            "cancel": "Zurück",

            "moves": "Bewegt sich",
            "results": "Ergebnisse",
            "time" : "Zeit",
        }
    },
    {
        "lang": "france",
        "langName": "Français",
        "code": "fr",
        "translations": {
            "loading": "Chargement...",

            "difficulty": "Difficulté",
            "easy": "Facile",
            "moderate": "Modéré",
            "hard": "Difficile",
            "tablet": "Tablet",

            "continue": "Continuer",
            "new_game": "Nouveau jeu",

            "settings": "Paramètres",
            "game": "Jeu",
            "language": "La langue",
            "ads": "Publicité",

            "theme": "Mode",
            "light": "Mode lumière",
            "dark": "Mode sombre",

            "banner": "Bannière",
            "fullscreen": "Plein écran",
            "banner_info": "Une bannière s'affiche en bas de l'écran",
            "full_info": "La publicité plein écran apparaît à la fin du jeu",

            "cards": "Les cartes",
            "approve": "Confirmer?",
            "buy": "Acheter",
            "cancel": "Fermer",

            "moves": "Déplace",
            "results": "Résultats",
            "time" : "Temps",
        }
    }
];

function setLang(lang){
    storageMng.setValue('lang', lang);
    setupLang();
}

function loadLangByName(_name){
    return allLangs.filter(
        function(data){ return data.lang === _name}
    );
}

function loadLangByCode(_code){
    return allLangs.filter(
        function(data){ return data.code === _code}
    );
}

function getLangByNavigatorSetup(_callback){
    navigator.globalization.getLocaleName(function (language) {
        let loadedLang = loadLangByCode(language.value);

        if(typeof(loadedLang[0]) === 'undefined' || typeof(loadedLang[0].translations) === 'undefined'){
            loadedLang = loadLangByName('english');
        }
        if (typeof _callback === "function") {
            _callback(loadedLang[0]);
        }
    });
}

function getLangByStorageVal(_callback){
    let storage = window.localStorage;
    let storedLang = storage.getItem('lang');

    if(typeof(storedLang) !== 'undefined' && storedLang !== null && storedLang !== 'auto') {
        let loadedLang = loadLangByName(storedLang);
        if(typeof(loadedLang[0]) === 'undefined'){
            loadedLang = loadLangByName('english');
        }

        if (typeof _callback === "function") {
            _callback(loadedLang[0]);
        }
    }else{
        if (typeof _callback === "function") {
            _callback('undefined');
        }
    }
}

function loadLangTranslation(_translation, _callback){
    getLangByStorageVal(function (loadedLang) {
        if (typeof (loadedLang.translations) !== 'undefined') {
            if (typeof _callback === "function") {
                _callback(loadedLang.translations[_translation]);
            }
        }else{
            getLangByNavigatorSetup(function (loadedLang) {
                if (typeof _callback === "function") {
                    _callback(loadedLang.translations[_translation]);
                }
            });
        }
    });
}

function setupLang(){
    getLangByStorageVal(function (loadedLang) {
        if (typeof(loadedLang.translations) !== 'undefined') {
            doTranslation(loadedLang);
        }else{
            getLangByNavigatorSetup(function (loadedLang) {
                storageMng.setValue('lang', loadedLang.lang);
                doTranslation(loadedLang);
            });
        }
    });
}

function doTranslation(lang){
    let translateElements = document.querySelectorAll('[data-trans]');

    if(translateElements.length > 0){
        translateElements.forEach(function (translation) {
            let transVal = translation.dataset.trans;
            translation.innerHTML = lang.translations[transVal]
        });
    }
}
