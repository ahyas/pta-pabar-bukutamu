const Transaction = require("../models/TransactionModel")
const SignUpModel =require("../models/SignUpModel")

//get last transaction to show at home page
const lastBukutamu = async (req, res) => {
    try {
        let email = req.query.email;
        
        Transaction.aggregate([
            {
                $match:{
                    "email":email
                }
            },
            {
                $lookup:{
                    from:"userinfos",
                    localField:"email",
                    foreignField:"email",
                    as:"userInfo"
                }
            },
            {
                $lookup:{
                    from:"status",
                    localField:"status",
                    foreignField:"id",
                    as:"status"
                }
            },
            {
                $unwind:"$userInfo"
            },
            {
                $unwind:'$status'
            },
            {
                $project:{"keperluan":1, "photo":1, "tanggal":1, "userInfo.nama_depan":1, "userInfo.nama_belakang":1,"status.detail":1,"status.detail.id":1}
            },
            {
                $sort: {tanggal: -1}
            },
            {
                $limit:1
            }
        ]).exec(function(err, data) {
            res.json(data)
        });
    } catch (error) {
        res.json(error)
    }
}

//show visits history
const getList = async (req, res) => {
    try {
        let param = req.query.email
        //const list = await Transaction.find({email:param})
       Transaction.aggregate([
            {
                $match:{
                    'email':param
                }
            },
            {
                $lookup: {
                    from: "status", // collection name in db
                    localField: "status",
                    foreignField: "id",
                    as: "worksnapsTimeEntries"
                }
            }, 
            {
                $unwind:'$worksnapsTimeEntries'
            },
            {
                $project:{'_id':1, 'tanggal':1, 'keperluan':1, 'status':1, 'email':1, 'worksnapsTimeEntries.detail':1, 'photo':1}
            },
            {
                $sort: {tanggal: -1}
            }
        ]).exec(function(err, data) {
            // students contain WorksnapsTimeEntries
            res.json(data)
        });
        
    } catch (error) {
        res.json(error)
    }
}

const getListAll = (req, res) => {
    try {
        
       Transaction.aggregate([
            {
                $lookup: {
                    from: "status", // collection name in db
                    localField: "status",
                    foreignField: "id",
                    as: "worksnapsTimeEntries"
                }
            }, 
            {
                $lookup: {
                    from: "userinfos", // collection name in db
                    localField: "email",
                    foreignField: "email",
                    as: "userinfo"
                }
            }, 
            {
                $unwind:'$worksnapsTimeEntries'
            },
            {
                $unwind:'$userinfo'
            },
            {
                $project:{"_id":1, 'tanggal':1, 'userinfo.nama_depan':1, 'status':1, 'userinfo.nama_belakang':1,'userinfo.no_hp':1, 'keperluan':1, 'email':1, 'worksnapsTimeEntries.detail':1, 'photo':1}
            },
            {
                $sort: {tanggal: -1}
            }
        ]).exec(function(err, data) {
            // students contain WorksnapsTimeEntries
            res.json(data)
        });
    } catch (error) {
        res.json(error)
    }
}

const verify = async (req, res) => {
    try {
        //await Transaction.create()
        await Transaction.findByIdAndUpdate(req.params.id, {status:2})
        res.json({msg:"Success"})
    } catch (error) {
        res.json(error)
    }
}

const saveData = async (req, res) => {
    try {
        await Transaction.create(req.body)

       await SignUpModel.updateOne({ email: req.body.email },{$set: {nama_depan: req.body.nama_depan, nama_belakang: req.body.nama_belakang, no_hp: req.body.no_hp, satker_asal: req.body.satker_asal} })

        res.json({msg:"success"})
    } catch (error) {
        res.json(error)
    }
}

const deleteData = async (req, res) => {
    try {
        let {id} = req.params
        await Transaction.findByIdAndDelete(id)
        res.json({msg:"success"})
    } catch (error) {
        res.json(error)
    }
}

module.exports = {getList, getListAll, saveData, verify, deleteData, lastBukutamu}