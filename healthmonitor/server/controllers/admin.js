const doctorModel = require("../models/doctorModels")
const userModel = require("../models/userModels")


const getAllUsers=async(req,res)=>{
    try{
        const users=await userModel.find({})
        res.status(200).send({
            success:true,
            message:"users data",
            data:users
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Server error while fetching user',
            error
        })
    }
}

const getAllDoctors=async(req,res)=>{
    try{
        const doctors=await doctorModel.find({})
        res.status(200).send({
            success:true,
            message:"doctors data",
            data:doctors
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Server error while fetching doctor',
            error
        })
    }
}

//doctor status

const changeStatus=async(req,res)=>{
    try{
        const {doctorId,status}=req.body;
        const doctor=await  doctorModel.findByIdAndUpdate(doctorId,{status});
        const user=await  userModel.findOne({_id:doctor.userId});
        const notification=user.notification;
        notification.push({
            type:'doctor-account-request-updated',
            message:`Your doctor account request has ${status}`,
            onClickPath:'/notification'
        })
        
        user.isDoctor=status==='approved'?true:false;
        user.save();
        res.status(200).send({
            success:true,
            message: "Account updated successfully" ,
            data:doctor
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in status',
            error
        })
    }
}

module.exports={getAllUsers,getAllDoctors,changeStatus};