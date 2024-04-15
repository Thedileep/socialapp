const express = require('express');
const router = express.Router();

const { getTransaction, addTransaction } = require('../controllers/transactionCtr');


router.get('/get-transaction',getTransaction)

router.post('/income',addTransaction)


module.exports = router;
