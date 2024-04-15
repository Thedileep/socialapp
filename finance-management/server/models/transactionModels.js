// models/Expense.js

const mongoose = require('mongoose');

const financeSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    reference:{
        type:String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Transaction= mongoose.model('Transaction', financeSchema);

module.exports =Transaction;
