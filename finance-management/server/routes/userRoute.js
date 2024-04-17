const express = require('express');
const router = express.Router();

const { loginController, registerController, authctrl } = require('../controllers/userCtr');
const auth = require('../middleware/auth');


router.post('/login',loginController)

router.post('/register',registerController)

router.post('/getUserData',auth,authctrl)

module.exports = router;
