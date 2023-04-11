const mongoose = require("mongoose")

const collection = mongoose.Schema({
    id:Number,
    question:String,
})

module.exports = mongoose.model("Questions", collection)