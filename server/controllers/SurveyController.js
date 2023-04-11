const Question = require("../models/QuestionsModel")
const option = require("../models/OptionsModel")

const getSurveys = async (req, res) => {

    try {
        const list = await Question.find({})
        res.json(list)
    }catch(error){
        res.json(error)
    }
}

module.exports = {getSurveys}