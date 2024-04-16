const express=require('express')
const auth=require("../middleware/auth");
const {getDoctorInfo,updateProfileCtr, getDoctorByIdCtr} = require('../controllers/doctorCtrl');


const router=express()

router.post('/getDoctorInfo',auth,getDoctorInfo)

//update profile 
router.post('/updateProfile',auth,updateProfileCtr)

//get doctor

router.post('/getDoctorById',auth,getDoctorByIdCtr)

module.exports=router;