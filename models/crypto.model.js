const mongoose = require('mongoose');

const crytpoSchema = new mongoose.Schema({

    key:{type:String,required:true},
    name:{type:String,required:true},
    last:{type:String,required:true},
    buy:{type:String,required:true},
    sell:{type:String,required:true},
    volume:{type:String,required:true},
    base_unit:{type:String,required:true},

});

const Crypto = mongoose.models?.Crypto || mongoose.model('Crypto',crytpoSchema);
module.exports =  Crypto;