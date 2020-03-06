var storageMng = {
    storage: window.localStorage,

    getValue: function(key){
        if(storageMng.valueExist(key)){
            return storageMng.storage.getItem(key);
        }
        return null;
    },

    setValue: function (key, value) {
        storageMng.storage.setItem(key, value)
    },

    valueExist: function (key) {
        return storageMng.storage.getItem(key) !== null;
    },

    iniValueFirstTime: function(key, value){
        if(!this.valueExist(key)){
           this.setValue(key, value)
        }
    }
};
