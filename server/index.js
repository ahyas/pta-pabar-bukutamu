const express = require("express")
const app = express()
const cors = require("cors")
const ConnectDB = require("./ConnectDB")
const TransactionModel = require("./models/TransactionModel")
const SignUpModel =require("./models/SignUpModel")

const {getList, saveData, getListAll, verify, deleteData} = require("./controllers/TransactionController")
const {SignUp, userInfo} = require("./controllers/SignUpController")
const {getSurveys} = require("./controllers/SurveyController")
const {insertMany, updateOne} = require("./controllers/TransactionSurveyController")
const {Verify} = require("./controllers/VerifyController")

require("dotenv").config()

app.use(cors())
app.use(express.json());

app.get("/bukutamu-api/",(req, res)=>{
    try {
        res.json({
            msg:"Wellcome to REST API Home",
            author:process.env.AUTHOR
        })
    } catch (error) {
        res.json(error)        
    }
})

app.get("/bukutamu-api/api/v1/get", async (req, res)=>{
    try {
        let data = await TransactionModel.find({})
        res.json({
            msg:"Success",
            data:data,
            author:process.env.AUTHOR
        })   
    } catch (error) {
        res.json(error)
    }
})

app.post("/bukutamu-api/api/v1/post", async (req, res)=>{
    try {
        await TransactionModel.create(req.body)
        console.log("Testting")
        res.json({
            msg:"Success",
            data:req.body,
            author:process.env.AUTHOR
        })   
    } catch (error) {
        res.json(error)
    }
})

app.post("/bukutamu-api/api/v1/post2", async (req, res)=>{
    try {
        await TransactionModel.create(req.body)
        await SignUpModel.updateOne({ email: req.body.email },{$set: {nama_depan: req.body.nama_depan, nama_belakang: req.body.nama_belakang, no_hp: req.body.no_hp, satker_asal: req.body.satker_asal} })
        console.log("Test")
        res.json({
            msg:"Success",
            data:req.body,
            author:process.env.AUTHOR
        })   
    } catch (error) {
        res.json(error)
    }
})


app.delete("/bukutamu-api/api/v1/:id/delete", async (req, res)=>{
    try {
        let {id} = req.params
        await TransactionModel.findByIdAndDelete(id)
        console.log(id)
        res.json({
            msg:"Success",
            author:process.env.AUTHOR
        })
    } catch (error) {
        res.json(error)
    }
})

app.put("/bukutamu-api/api/v1/:id/put", async(req, res)=>{
    try {
        let {id} = req.params
        let data = await TransactionModel.findById(id)
        res.json({
            msg:"Success",
            data:data,
            author:process.env.AUTHOR
        })
    } catch (error) {
        res.json(error)
    }
})

app.patch("/bukutamu-api/api/v1/:id/update", async (req, res)=>{
    try {
        let {id} = req.params
        let data = req.body
        await TransactionModel.findByIdAndUpdate(id, data)
        res.json({
            msg:"Success",
            author:process.env.AUTHOR
        })
    } catch (error) {
        req.json(error)
    }
})

app.post("/bukutamu-api/api/v1/signup", SignUp);
app.get("/bukutamu-api/api/v1/userinfo", userInfo)
app.get("/bukutamu-api/api/v1/transaction", getList)
app.post("/bukutamu-api/api/v1/transaction/save", saveData)
app.get("/bukutamu-api/api/v1/transaction/all", getListAll)
app.patch("/bukutamu-api/api/v1/transaction/:id/verify", verify)
app.delete("/bukutamu-api/api/v1/transaction/:id/delete", deleteData)

app.post("/bukutamu-api/survey/api/v1/insert", insertMany)
app.patch("/bukutamu-api/survey/api/v1/update", updateOne)

app.get("/bukutamu-api/api/v1/survey", getSurveys)

app.post("/bukutamu-api/api/v1/verify", Verify)

let PORT = process.env.PORT
let URI = process.env.MONGO_URI
app.listen(PORT, ()=>{
    console.log("App is running on port", PORT)
    ConnectDB(URI)
})
