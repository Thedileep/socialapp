const Transaction = require("../models/transactionModels");

const getTransaction=async(req,res)=>{
    try{
        const transaction=await Transaction.find({})
        res.status(201).send({
            success:true,
            message:'Get all transactions',
            data:transaction
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'something went wrong',
            error
        })
    }

}

const addTransaction=async(req,res)=>{
    try{
        const newTransaction= new Transaction(req.body)
        await newTransaction.save()
        res.status(200).send({
            success:true,
            message:'transaction created'

        })

    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'something went wrong',
            error
        })
    }
}

module.exports={getTransaction,addTransaction};