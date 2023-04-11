const mongoose = require("mongoose")

const collection = mongoose.Schema({
    email:String,
    keperluan:String,
    status:Number,
    photo:String,
    tanggal:String
})

module.exports = mongoose.model("Transactions", collection)