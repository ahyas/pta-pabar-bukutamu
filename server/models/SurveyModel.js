const mongoose = require("mongoose")

const collection = mongoose.Schema({
    id_survey:Number,
    email:String,
    tanggal:String
})

module.exports = mongoose.model("Surveys", collection)