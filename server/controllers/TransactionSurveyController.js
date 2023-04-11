const TransactionSurveyController = require("../models/TransactionSurveyModel")

const insertMany = async (req, res) => {
    try {
        let count = await TransactionSurveyController.find({id_user: req.body.id_user}).count()
        if(count===0){
            await TransactionSurveyController.insertMany([
                { id_user: req.body.id_user, id_category:1, id_question: 1, value:"" },
                { id_user: req.body.id_user, id_category:1, id_question: 2, value:"" },
                { id_user: req.body.id_user, id_category:1, id_question: 3, value:"" },
                { id_user: req.body.id_user, id_category:1, id_question: 4, value:"" },
                { id_user: req.body.id_user, id_category:1, id_question: 5, value:"" },
                { id_user: req.body.id_user, id_category:1, id_question: 6, value:"" },
                { id_user: req.body.id_user, id_category:1, id_question: 7, value:"" },
                { id_user: req.body.id_user, id_category:1, id_question: 8, value:"" },
                { id_user: req.body.id_user, id_category:2, id_question: 9, value:"" },
                { id_user: req.body.id_user, id_category:2, id_question: 10, value:"" },
                { id_user: req.body.id_user, id_category:2, id_question: 11, value:"" },
                { id_user: req.body.id_user, id_category:2, id_question: 12, value:"" },
                { id_user: req.body.id_user, id_category:2, id_question: 13, value:"" },
            ])
        }
        res.json({msg:"success"})
    } catch (error) {
        res.json(error)
    }
}

const updateOne = async (req, res) => {
    try {
        let id_user = req.body.id_user
        let id_question = req.body.id_question
        let value = req.body.value
        
        await TransactionSurveyController.updateOne(
            {
                "id_user": id_user,
                "id_question": id_question
            },
            {
                $set:{
                    value:value,
                }
            }
        );

        res.json({msg:"Success"})
    } catch (error) {
        res.json(error)
    }
}

module.exports = {insertMany, updateOne}