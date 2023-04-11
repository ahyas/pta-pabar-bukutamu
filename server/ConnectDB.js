const mongoose = require('mongoose')

const connectDB = async (uri) => {
    try {
        await mongoose.set("strictQuery", false);
        await mongoose.connect(uri)
        console.log("App is connected to DB")
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB