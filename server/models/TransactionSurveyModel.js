const mongoose = require("mongoose")

const collection = mongoose.Schema({
    id_user:String,
    id_category:Number,
    id_question:Number,
    value:Number,
})

module.exports = mongoose.model("answers", collection)