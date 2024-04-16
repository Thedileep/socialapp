const bcrypt=require('bcryptjs');
const userModel=require("../models/userModels");
const jwt=require('jsonwebtoken');
const doctorModel = require('../models/doctorModels');
const appointmentModel = require('../models/appointmentModel');
const moment = require("moment");

const loginController=async (req,res)=>{
    try{
        const user=await userModel.findOne({email:req.body.email})
        if(!user){
            return res.status(200).send({message:"User not found",success:false});
        }
        const isMatch= await  bcrypt.compare(req.body.password,user.password);
        
        if (!isMatch) {
            return res.status(200).send({message: "Invalid Password!" , success : false })
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn:'1h'
        })
        return res.status(200).send({message: "Login success" , success : true,token })
    }
    catch(err){
        console.log(err);
        res.status(500).send({message:`Error in login ctrl ${err.message}`});
    }
}

const registerController=async(req,res)=>{
    try{
        const existingUser=await userModel.findOne({email:req.body.email})
        if(existingUser) {
            return res.status(200).send({message:"Email is already in use",success:false});
    }
    const password=req.body.password;
    const salt= await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt); 
    req.body.password=hashedPassword
    const newUser=new  userModel(req.body)
    await  newUser.save();
    res.status(200).send({data:newUser,"Message":"User Registerd Successfully" , success : true })
}
    catch(err){
        console.log(err);
        res.status(500).send({message:`Register controller error: ${err.message}`});
    }
}

const authctrl=async(req,res)=>{
    try{
        const user=await userModel.findOne({_id:req.body.userId})
        user.password=undefined;
        if(!user){
            return res.status(200).send({message:"User not found",success:false});
        }
        else{
            res.status(200).send({
                success:true,
                data:user
            })
        }
       
    }
    catch(err){
        console.log(err);
        res.status(500).send({message:`auth error ${err.message}`,success:false});
    }
}

//apply doctor controller
 
const applyDoctor=async(req,res)=>{
    try{
        const newDoctor=await doctorModel({...req.body,status:'pending'})
        await newDoctor.save()
        const adminUser=await  userModel.findOne({isAdmin:true})
        const notification=adminUser.notification
        notification.push({
            type: "apply-doctor-request",
            message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account`,
            data: {
            doctorId: newDoctor._id,
            name: newDoctor.firstName + " " + newDoctor.lastName,
            onClickPath: "/admin/doctors",
            },
            });
            await userModel.findByIdAndUpdate (adminUser._id, { notification });
            res.status(201).send({
            success: true,
            message: "Doctor Account Applied Successfully",
            });
    }
    catch(err){
        console.log(err)
        res.status(500).send({
            success:false,
            message:'Error in applying for a Doctor',
            err,
            
        })
    }
}

//notification ctrl

const getNotification=async(req,res)=>{
    try{
        const user=await userModel.findOne({_id : req.body.userId})
        const seennotification=user.seennotification;
        const notification=user.notification;
        seennotification.push(...notification);
        user.notification=[];
        user.seennotification=notification
        const updatedUser=await user.save()
        res.status(200).send({
            success:true,
            message:'all notification are marked as read',
            data:updatedUser
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            message: 'error in notification',
            success:false,
            error
        })
    }
}


//deleete notificstion 

const deleteNotification=async(req,res)=>{
    try{
        const user=await userModel.findOne({_id:req.body.userId});
        user.notification=[]
        user.seennotification=[]
        const updatedUser=user.save();
        (await updatedUser).password=undefined;
        res.status(200).send({
            success:true,
            message: "All notifications have been deleted",
            data:updatedUser
        });

    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'unable to delete notification',
            error
        })
    }
}


const getAllDoctorCtr=async(req,res)=>{
    try{
        const doctors=await doctorModel.find({status:'approved'})
        res.status(200).send({
            success:true,
            message:'doctot list fetch successfully',
            data:doctors
        })

    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'something went wrong',
            error
        })
    }
}

//book appointment

const bookeAppointmnetCtr = async (req, res) => {
    try {
        req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
        req.body.time = moment(req.body.time, "HH:mm").toISOString();
        req.body.status = "pending";
        const newAppointment = new appointmentModel(req.body);
        await newAppointment.save();
        const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });
        user.notification.push({
          type: "New-appointment-request",
          message: `A new Appointment Request from ${req.body.userInfo.name}`,
          onCLickPath: "/user/appointments",
        });
        await user.save();
        res.status(200).send({
          success: true,
          message: "Appointment Book succesfully",
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error While Booking Appointment",
        });
      }
    };
    
    // booking bookingAvailabilityController
    const bookingAvailabilityCtr = async (req, res) => {
      try {
        const date = moment(req.body.date, "DD-MM-YY").toISOString();
        const fromTime = moment(req.body.time, "HH:mm")
          .subtract(1, "hours")
          .toISOString();
        const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
        const doctorId = req.body.doctorId;
        const appointments = await appointmentModel.find({
          doctorId,
          date,
          time: {
            $gte: fromTime,
            $lte: toTime,
          },
        });
        if (appointments.length > 0) {
          return res.status(200).send({
            message: "Appointments not Availibale at this time",
            success: true,
          });
        } else {
          return res.status(200).send({
            success: true,
            message: "Appointments available",
          });
        }
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error In Booking",
        });
      }
    };

module.exports={loginController,registerController,authctrl,applyDoctor,getNotification,deleteNotification,getAllDoctorCtr,bookeAppointmnetCtr,bookingAvailabilityCtr}