/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    moves: 0,
    difficulty: 0,
    time: 0,
    animals : [
        "alpaca_1.png",
        "bear_1.png",
        "bear_2.png",
        "bear_3.png",
        "bear_4.png",
        "camel_1.png",
        "camel_2.png",
        "deer_1.png",
        "deer_2.png",
        "deer_3.png",
        "elephant_1.png",
        "elephant_2.png",
        "elephant_3.png",
        "flemish_1.png",
        "flemish_3.png",
        "fox_1.png",
        "fox_2.png",
        "fox_3.png",
        "gepard_1.png",
        "gepard_2.png",
        "giraffe_2.png",
        "giraffe_3.png",
        "hippo_2.png",
        "horse_1.png",
        "horse_2.png",
        "horse_3.png",
        "hyena_2.png",
        "hyena_3.png",
        "impala_1.png",
        "impala_2.png",
        "kangaroo_1.png",
        "kangaroo_2.png",
        "kangaroo_3.png",
        "koala_1.png",
        "lama_1.png",
        "lemur_1.png",
        "lemur_2.png",
        "lion_1.png",
        "lion_2.png",
        "lynx_1.png",
        "meerkat_1.png",
        "meerkat_2.png",
        "meerkat_3.png",
        "monkey_1.png",
        "monkey_2.png",
        "monkey_3.png",
        "otter_1.png",
        "otter_2.png",
        "otter_3.png",
        "owl_1.png",
        "owl_2.png",
        "owl_3.png",
        "panda_1.png",
        "panda_2.png",
        "penguin_1.png",
        "penguin_2.png",
        "penguin_3.png",
        "rabbit_1.png",
        "rabbit_2.png",
        "rabbit_3.png",
        "raccoon_1.png",
        "raccoon_2.png",
        "rhino_1.png",
        "rhino_2.png",
        "seal_1.png",
        "seal_2.png",
        "squirrel_1.png",
        "squirrel_2.png",
        "tiger_1.png",
        "tiger_2.png",
        "tiger_3.png",
        "wolf_1.png",
        "wolf_2.png",
        "wolf_3.png",
        "zebra_1.png",
        "zebra_2.png",
        "zebra_3.png"
    ],

    cards: {
        'default': {
            'price': 0,
            'name': 'default'
        },
        'hawk': {
            'price': 200,
            'name': 'hawk'
        },
        'panther': {
            'price': 500,
            'name': 'panther'
        },
        'bear': {
            'price': 1000,
            'name': 'bear'
        }
    },

    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        document.addEventListener('pause', this.onPause.bind(this), false);
        document.addEventListener('backbutton', this.onBackKeyDown.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        let application = this;
        this.prepareApplication();

        document.addEventListener('onAdLoaded',function(data){
            if(data.adType === 'banner') showBanner("bottom");
        });

        let actionElms = document.querySelectorAll('[data-action]');
        actionElms.forEach(function(item){
            item.addEventListener('click', function(){
                application.doAction(item.dataset.action, item)
            });
        });
    },

    onPause: function(){
        let pgGame = document.getElementById('PgGame');

        if(pgGame.classList.contains('flex')){
            this.saveGame();
        }
    },

    onBackKeyDown: function(e){
        e.preventDefault()
        let pgGame = document.getElementById('PgGame');
        let pgMain = document.getElementById('PgMain');

        if(pgGame.classList.contains('flex')){
            this.saveGame();
        }else if(!pgMain.classList.contains('flex')){
            this.actionShowMain();
        }
    },

    prepareApplication: function () {
        let application = this;
        setTimeout(function () {
            iniAdsSettings();
            setupLang();
            application.iniStorageValues();
        }, 500);

        setTimeout(function () {
            application.drawTheme();
            application.showStars();
            application.setAdsSettingRadio();
            application.setLangRadio();
            application.setCardSettingsRatio();
            application.setThemeRadio();
            prepareBannerAd(true);
        }, 1000);

        setTimeout(function () {
            let loadScreen = document.getElementById('LoadScreen');
            loadScreen.style.display = 'none';
        }, 2000);

    },

    doAction: function (functionName, item) {
        let actionName = "action" + functionName;
        window["app"][actionName](item);
    },

    actionQuit: function () {
        navigator.app.exitApp();
    },

    actionNewGame: function (button) {
        this.difficulty = button.dataset.option;
        let pages = document.querySelectorAll('#App > div.flex');
        let PgGame = document.getElementById('PgGame');

        this.showHidePage(pages, PgGame);
        this.prepareGame(this.difficulty);
    },

    actionShowMain: function () {
        let pages = document.querySelectorAll('#App > div.flex');
        let PgMain = document.getElementById('PgMain');

        this.removeAllCards();
        this.showHidePage(pages, PgMain);
        this.showStars();
        this.setAdsSettingRadio();
        this.setLangRadio();
        this.setCardSettingsRatio();
    },

    actionShowMainSave: function () {
        this.saveGame();
        this.actionShowMain();
    },

    actionShowSettings: function () {
        let pages = document.querySelectorAll('#App > div.flex');
        let PgMain = document.getElementById('PgSettings');

        this.showHidePage(pages, PgMain);
    },

    actionCardDesign: function () {
        let pages = document.querySelectorAll('#App > div.flex');
        let PgMain = document.getElementById('PgCardDesign');

        this.showHidePage(pages, PgMain);
    },

    actionShowGameDialog: function () {
        let savedGame = storageMng.getValue('saved');

        if(savedGame == '1'){
            let GameContionueDialog = document.getElementById('GameContionueDialog');
            GameContionueDialog.style.display = "flex";
        }else{
            let gameDifficultyDialog = document.getElementById('GameDifficultyDialog');
            gameDifficultyDialog.style.display = "flex";
        }
    },

    actionLoadGame: function () {
        let pages = document.querySelectorAll('#App > div.flex');
        let PgGame = document.getElementById('PgGame');

        this.showHidePage(pages, PgGame);
        this.loadGame();
    },

    actionShowDifficultyDialog: function () {
        this.hideDialogs();
        let gameDifficultyDialog = document.getElementById('GameDifficultyDialog');
        gameDifficultyDialog.style.display = "flex";
    },

    actionCloseDialog: function (element) {
        let dialog = element.closest(".dialog_container");
        dialog.style.removeProperty('display');
    },

    actionRepeatGame: function (button) {
        this.prepareGame(this.difficulty);
    },

    actionSetAdsPreferences: function (element) {
        let radio = element.querySelector(".radio");
        if(!radio.classList.contains("selected")){
            let selectedRadio = document.querySelectorAll('.adOption .radio.selected');
            selectedRadio.forEach(function (item) {
                item.classList.remove('selected');
            });

            radio.classList.add('selected');

            if(element.dataset.option === 'Banner'){
                changeBannerAllow('allow');
                changeInterstitialAllow('disallow');
                prepareBannerAd(true);
            }else if(element.dataset.option === 'Interstitial'){
                changeBannerAllow('disallow');
                changeInterstitialAllow('allow');
                prepareInterstitialAd();
                hideBanner();
            }
        }
    },

    actionSetCard: function (element) {
        let radio = element.querySelector(".radio");

        if(radio && !radio.classList.contains("selected")){
            let selectedRadio = document.querySelectorAll('.cardOption .radio.selected');
            selectedRadio.forEach(function (item) {
                item.classList.remove('selected');
            });

            radio.classList.add('selected');

            storageMng.setValue('card', element.dataset.option);
        }else if(element && !radio){
            if(element.classList.contains('disabled')){
                return;
            }
            let cardName = element.dataset.option;
            let buyCardDialog = document.getElementById('BuyCardDialog');
            let buyCardDialogPriceElm = buyCardDialog.querySelector('.cardPrice');

            buyCardDialog.dataset.option = cardName;
            buyCardDialogPriceElm.innerHTML = this.cards[cardName].price;
            buyCardDialog.style.display = "flex";
        }
    },

    actionBuyCard: function (element) {
        let buyCardDialog = document.getElementById('BuyCardDialog');
        let cardName = buyCardDialog.dataset.option;
        let price = this.cards[cardName].price;

        this.addOwnedCard(cardName);
        this.addStars(-price);
        this.setCardSettingsRatio();
        this.hideDialogs();
    },

    actionSetLang: function (element) {
        let radio = element.querySelector(".radio");

        if(!radio.classList.contains("selected")){
            let selectedRadio = document.querySelectorAll('.langOption .radio.selected');
            selectedRadio.forEach(function (item) {
                item.classList.remove('selected');
            });

            radio.classList.add('selected');

            setLang(element.dataset.option);
        }
    },

    actionSetTheme: function (element) {
        let radio = element.querySelector(".radio");

        if(!radio.classList.contains("selected")){
            let selectedRadio = document.querySelectorAll('.themeOption .radio.selected');
            selectedRadio.forEach(function (item) {
                item.classList.remove('selected');
            });

            radio.classList.add('selected');

            storageMng.setValue('theme', element.dataset.option);
            this.drawTheme();
        }
    },

    actionShowSettingsCategory: function (element) {
        let actualOption = document.querySelectorAll(".option_settings.selected");
        actualOption.forEach(function(item){
            item.classList.remove("selected");
        });

        element.classList.add("selected");
        let option = element.dataset.option;

        this.showStyleCategory(option);
    },

    actionFlipCard: function(card){
        if(card.classList.contains('hidden')){
            return;
        }

        let application = this;
        let flipped = document.querySelectorAll('.card.flipped');

        if (flipped.length === 0){
            card.classList.add("flipped");
        }else if(flipped.length > 0 && flipped.length < 2 && !card.classList.contains('flipped')){
            card.classList.add("flipped");
            this.moves++;
            document.querySelector("#PgGame .movesNum").textContent = this.moves;

            let showedImage = flipped[0].dataset.img;
            if (card.dataset.img === showedImage){
                setTimeout(function () {
                    let restCards = document.querySelectorAll('.card:not(.hidden)');
                    if(restCards.length !== 2){
                       card.classList.add("hidden");
                       card.classList.remove("flipped");

                       flipped[0].classList.add("hidden");
                       flipped[0].classList.remove("flipped");
                    }
                    if(restCards.length === 6){
                        let interestial = storageMng.getValue('allowInterstitial');

                        if(interestial === 'allow'){
                            prepareInterstitialAd(true);
                        }
                    }
                   if(restCards.length <= 2){
                       application.finishGame();
                   }
                }, 800);
            }else{
                setTimeout(function () {
                    card.classList.remove("flipped");
                    flipped[0].classList.remove("flipped");
                }, 800);
            }
        }
    },

    showHidePage: function (hide, show) {
        hide.forEach(function(item){
            item.classList.remove("flex");
            item.classList.add("none");
        });

        show.classList.remove("none");
        show.classList.add('flex');
    },

    getCardSize: function(numOfImages){
        let PgGame = document.querySelector('#PgGame .mainActivity');
        let width = PgGame.offsetWidth;

        return Math.floor((width - (2 * numOfImages)) / numOfImages);
    },

    prepareGame: function (difficulty) {
        this.hideDialogs();
        this.removeAllCards();

        let application = this;
        application.moves = 0;

        let starsElements = document.querySelectorAll("#GameResultDialog .star");

        starsElements.forEach(function (star) {
            star.classList.remove('full');
        });

        document.querySelector("#PgGame .movesNum").textContent = application.moves;

        let PgGame = document.querySelector('#PgGame .mainActivity');

        let images = 4;

        switch(difficulty){
            case "1": images = 4; break;
            case "2": images = 5; break;
            case "3": images = 6; break;
            case "4": images = 7; break;
        }

        let height = parseInt(window.getComputedStyle(PgGame, null).getPropertyValue("height"));

        let size = this.getCardSize(images);
        let rows = Math.floor((height - (2 * images) - 60) / size);

        let cardsAmount = this.isOdd(images * rows) ? images * (rows - 1) : images * rows;
        let imagesArray = this.getImagesArray(cardsAmount/2);

        for(let i = 0; i < cardsAmount; i++){
            let newCard = this.createCard(size, imagesArray[i]);
            PgGame.appendChild(newCard);
            newCard.addEventListener('click', function(){
                application.doAction(newCard.dataset.action, newCard)
            });
        }

        let date = new Date();
        this.time = date.getTime();
    },

    createCard: function (size, image) {
        let card = document.createElement("div");
        let imageUrl = "url('./img/pexeso/"+image+"')";
        let cardDesign = storageMng.getValue('card');

        card.className = "card";
        card.style.cssText = "height: " + size + "px;" + "width: " + size + "px;";
        card.setAttribute('data-action', 'FlipCard');
        card.innerHTML = '<div class="card_back"></div>';
        card.dataset.imagename = image;

        let cardImage = document.createElement("div");
        cardImage.className = "card_front";
        cardImage.style.backgroundImage = imageUrl;
        card.setAttribute('data-img', image);

        let cardBack = document.createElement("div");
        cardBack.className = "card_back";
        cardBack.dataset.card = cardDesign;

        card.appendChild(cardImage);
        card.appendChild(cardBack);

        return card;
    },

    getImagesArray: function(amount){
        let imgArray = this.animals;
        imgArray = imgArray.sort(() => 0.5 - Math.random());

        let images = imgArray.slice(0, amount).concat(imgArray.slice(0, amount));
        images = images.sort(() => 0.5 - Math.random());

        return images;
    },

    removeAllCards: function () {
        let cards = document.getElementsByClassName('card');

        while(cards[0]) {
            cards[0].parentNode.removeChild(cards[0]);
        }
    },

    showAllCards: function () {
        let cards = document.querySelectorAll('.card');

        cards.forEach(function (card) {
            card.classList.add('flipped');
            card.classList.remove('hidden');
        });

    },

    hideDialogs: function(){
        let dialogs = document.querySelectorAll(".dialog_container");
        dialogs.forEach(function (dialog) {
            dialog.style.removeProperty('display');
        });
    },

    isOdd: function (num) {
        return num % 2;
    },

    showStyleCategory: function (option) {
        let categoryElement = "";

        switch (option) {
            case "1": categoryElement = document.getElementById('SettingsCategoryGame'); break;
            case "2": categoryElement = document.getElementById('SettingsCategoryLang'); break;
            case "3": categoryElement = document.getElementById('SettingsCategoryAds'); break;
        }
        let categories = document.querySelectorAll(".mainActivity > .settings_category:not(.none)");

        categories.forEach(function (category) {
            category.classList.add('none');
        });

        categoryElement.classList.remove('none');
    },

    setAdsSettingRadio: function () {
        let banner = storageMng.getValue('allowBanner');
        let interstitial = storageMng.getValue('allowInterstitial');

        if(banner === "allow"){
            let radio = document.querySelector('.adOption[data-option="Banner"] .radio');
            radio.classList.add('selected');

        }else if(interstitial === 'allow'){
            let radio = document.querySelector('.adOption[data-option="Interstitial"] .radio');
            radio.classList.add('selected');

        }
    },

    setLangRadio: function (){
        getLangByStorageVal(function (lang) {
            if(lang != "undefined"){
                let langRadio = document.querySelector('.langOption[data-option="'+lang.lang+'"] .radio');
                if(langRadio){
                    langRadio.classList.add('selected');
                }
            }
        });
    },

    setThemeRadio: function (){
        let theme = storageMng.getValue('theme');
        let themeRadio = document.querySelector('.themeOption[data-option="'+theme+'"] .radio');

        if(theme === "dark"){
            let radio = document.querySelector('.themeOption[data-option="dark"] .radio');
            radio.classList.add('selected');

        }else if(theme === 'light'){
            let radio = document.querySelector('.themeOption[data-option="light"] .radio');
            radio.classList.add('selected');

        }
    },

    finishGame: function(){
        let application = this;
        let date = new Date();
        let totalTimeSec = (date.getTime() - application.time) / 1000;
        let timeMins = application.leftPad(Math.floor(totalTimeSec / 60), 2);
        let timeSec = application.leftPad(Math.floor(totalTimeSec - (timeMins*60)), 2);
        let formattedTime = timeMins + ':' + timeSec;

        this.showAllCards();
        setTimeout(function () {
            let gamesPlayed = parseInt(storageMng.getValue('gamesPlayed'));
            gamesPlayed++;

            let gameResultDialog = document.getElementById('GameResultDialog');
            let cards = document.getElementsByClassName('card').length;
            let stars = 1 + Math.floor((cards) / (application.moves / (application.difficulty * 1.2)));

            stars = stars > 3 ? 3 : stars;
            let starsElements = document.querySelectorAll("#GameResultDialog .star");

            for(let i = 0; i < stars; i++){
                starsElements[i].classList.add('full')
            }

            application.addStars(stars);

            document.querySelector('#GameResultDialog .resultRow.hintsResult .value').innerHTML = application.moves;
            document.querySelector('#GameResultDialog .resultRow.timeResult .value').innerHTML = formattedTime;

            gameResultDialog.style.display = "flex";

            storageMng.setValue('saved', '0');
            storageMng.setValue('gamesPlayed', gamesPlayed);

            showInterstitial();
        }, 1000);
    },

    iniStorageValues: function(){
        storageMng.iniValueFirstTime('playerStars', '0');
        storageMng.iniValueFirstTime('theme', 'light');
        storageMng.iniValueFirstTime('gamesPlayed', '0');
    },

    showStars: function () {
        let stars = storageMng.getValue('playerStars');
        let starsNums = document.querySelectorAll('.starNum');

        starsNums.forEach(function (starNum) {
            starNum.textContent = stars;
        });
    },

    addStars: function (amount) {
        let stars = parseInt(storageMng.getValue('playerStars'));

        if(!Number.isInteger(stars) || Number.isNaN(stars)){
            stars = 0 + amount;
        }else{
            stars = stars + amount;
        }

        storageMng.setValue('playerStars', stars);
        this.showStars();
    },

    getStars: function (amount) {
        return storageMng.getValue('playerStars');
    },

    leftPad: function (number, targetLength) {
        var output = number + '';
        while (output.length < targetLength) {
            output = '0' + output;
        }
        return output;
    },

    getCardsSettings: function () {
        if(storageMng.valueExist('card')){
            return storageMng.getValue('card');
        }else{
            storageMng.setValue('card', 'default');
            return 'default';
        }
    },

    setCardSettingsRatio: function () {
        let application = this;
        let cardDesign = this.getCardsSettings();
        let ownedCards = this.getOwnedCards();
        let cards = application.cards;
        let isOwned = false;

        for (let card in cards){
            card = cards[card];
            let cardPriceElm = document.querySelector('.cardOption[data-option="'+card.name+'"] .btn_buyCard .cardPrice');
            if(cardPriceElm){
                let cardOptionElm = cardPriceElm.closest('.cardOption');
                let isDisabled = cardOptionElm.classList.contains('disabled');
                let playerStars = application.getStars();
                if(card.price > playerStars && !isDisabled){
                    cardOptionElm.classList.add('disabled');
                }else if(card.price <= playerStars && isDisabled){
                    cardOptionElm.classList.remove('disabled');
                }
                cardPriceElm.innerHTML = card.price;
            }
        }

        ownedCards.forEach(function (card) {
            if(card === cardDesign){
                isOwned = true;
            }
            let aviableCardRadioContainer = document.querySelector('.cardOption[data-option="'+card+'"] .radioContainer');
            let cardOptionElm = aviableCardRadioContainer.closest('.cardOption');

            cardOptionElm.classList.remove('disabled');
            aviableCardRadioContainer.innerHTML = ' <div class="radio"></div>';
            aviableCardRadioContainer.classList.remove('buyContainer')
        });

        if(!isOwned){
            cardDesign = "default";
        }

        let cardRadio = document.querySelector('.cardOption[data-option="'+cardDesign+'"] .radio');
        cardRadio.classList.add('selected');
    },

    /*
    *   Funkce pro získání vlastněných karet z local Storage
    *   Return JSON object
     */
    getOwnedCards: function () {
        if(storageMng.valueExist('ownedCards')){
            let ownedCardsString = storageMng.getValue('ownedCards');
            return JSON.parse(ownedCardsString);
        }else{
            let ownedCardsArray = ['default'];
            let ownedCardsString = JSON.stringify(ownedCardsArray);

            storageMng.setValue('ownedCards', ownedCardsString);
            return JSON.parse(ownedCardsString);
        }
    },

    addOwnedCard: function (cardName) {
        let ownedCards = this.getOwnedCards();
        let newOwnedCards = [];
        ownedCards.forEach(function (card){
            newOwnedCards.push(card);
        });
        ownedCards.push(cardName);
        let ownedCardsString = JSON.stringify(ownedCards);

        storageMng.setValue('ownedCards', ownedCardsString);
    },

    drawTheme: function () {
        document.body.dataset.theme = storageMng.getValue('theme');
    },

    saveGame: function () {
        let application = this;
        let cards = document.querySelectorAll('.card');
        let savedCards = [];

        if(typeof cards !== "undefined" && cards.length > 0){
            cards.forEach(function (card) {
                let cardImg = card.dataset.imagename;

                let cardFlipped = 0;
                let cardHidden = 0;
                if(card.classList.contains('flipped')){
                    cardFlipped = 1
                }

                if(card.classList.contains('hidden')){
                    cardHidden = 1
                }

                savedCards.push({
                    "img" : cardImg,
                    "flipped" : cardFlipped,
                    "hidden" : cardHidden
                });
            });
        }
        let savedOptions = { 'difficulty' : this.difficulty, 'moves' : this.moves, 'time' : this.time};

        storageMng.setValue('savedCards', JSON.stringify(savedCards));
        storageMng.setValue('savedOptions', JSON.stringify(savedOptions));
        storageMng.setValue('saved', '1');
    },

    loadGame: function () {
        let application = this;

        this.hideDialogs();
        this.removeAllCards();

        let cards = JSON.parse(storageMng.getValue('savedCards'));
        let options = JSON.parse(storageMng.getValue('savedOptions'));
        let PgGame = document.querySelector('#PgGame .mainActivity');

        let images = 4;

        let starsElements = document.querySelectorAll("#GameResultDialog .star");

        starsElements.forEach(function (star) {
            star.classList.remove('full');
        });

        document.querySelector("#PgGame .movesNum").textContent = options.moves;
        this.time = options.time;
        this.moves = options.moves;
        this.difficulty = options.difficulty;

        switch(options.difficulty){
            case "1": images = 4; break;
            case "2": images = 5; break;
            case "3": images = 6; break;
            case "4": images = 7; break;
        }

        let size = this.getCardSize(images);

        if(typeof cards !== "undefined" && cards.length > 0) {
            cards.forEach(function (card) {
                let newCard = application.createCard(size, card.img);

                if(card.hidden == '1'){
                    newCard.classList.add('hidden');
                }else if(card.flipped == '1'){
                    newCard.classList.add('flipped');
                }

                PgGame.appendChild(newCard);
                newCard.addEventListener('click', function(){
                    application.doAction(newCard.dataset.action, newCard)
                });

            });
        }

        let flipped = document.querySelectorAll('.card.flipped');
        let restCards = document.querySelectorAll('.card:not(.hidden)');

        if(restCards.length <= 6){
            let interestial = storageMng.getValue('allowInterstitial');

            if(interestial === 'allow'){
                prepareInterstitialAd(true);
            }
        }

        if(flipped.length === 2){
            if(flipped[0].dataset.img === flipped[1].dataset.img){
                flipped.forEach(function (card) {
                    card.classList.add("hidden");
                    card.classList.remove("flipped");
                });
            }else{
                setTimeout(function () {
                    flipped[0].classList.remove("flipped");
                    flipped[1].classList.remove("flipped");
                }, 800);
            }
        }
    }
};


app.initialize();
