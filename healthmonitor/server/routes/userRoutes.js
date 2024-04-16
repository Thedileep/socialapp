const express=require('express');
const { loginController, registerController,authctrl,applyDoctor,getNotification,
  
deleteNotification, getAllDoctorCtr, bookeAppointmnetCtr, bookingAvailabilityCtr} 
= require('../controllers/userCtr');


const auth=require("../middleware/auth");

const router=express.Router();

router.post('/login',loginController)

router.post('/register',registerController)

router.post('/getUserData',auth,authctrl)

//apply doctor
router.post('/apply-doctor',auth,applyDoctor)

//notification 
router.post('/notification',auth,getNotification)

//delete notification
router.post('/delete-notification',auth,deleteNotification)

//doctor list
router.get('/getAllDoctors',auth,getAllDoctorCtr)

//BOOK APPOINTMENT
router.post("/book-appointment", auth, bookeAppointmnetCtr);

//Booking Avliability
router.post(
    "/booking-availbility",
    auth,
    bookingAvailabilityCtr
  );

module.exports=router   