const mongoose = require("mongoose")

const collection = mongoose.Schema({
    id:Number,
    option:String
})

module.exports = mongoose.model("options", collection)