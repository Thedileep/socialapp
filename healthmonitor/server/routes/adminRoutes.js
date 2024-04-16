const express=require('express')
const auth = require('../middleware/auth')
const { getAllUsers, getAllDoctors, changeStatus } = require('../controllers/admin')

const router=express.Router()

//user route
router.get('/getAllUsers',auth,getAllUsers)

//doctor route
router.get('/getAllDoctors',auth,getAllDoctors)

//status route

router.post('/status',auth,changeStatus)


module.exports=router