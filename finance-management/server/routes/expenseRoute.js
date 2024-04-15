const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { getAllExpenses, addExpenses, updateExpenses, deleteExpenses } = require('../controllers/expenseCtr')


router.get('/expenses',getAllExpenses);
router.post('/expenses',addExpenses);
router.put('/expenses/:id',updateExpenses);
router.delete('/expenses/:id',deleteExpenses);

module.exports=router