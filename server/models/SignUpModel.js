const mongoose = require("mongoose")

const collection = mongoose.Schema({
    email:String,
    nama_depan:String,
    nama_belakang:String,
    satker_asal:String,
    no_hp:String,
    password:String,
    role_id:Number
})

module.exports = mongoose.model("userinfos", collection)