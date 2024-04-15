const Expenses = require('../models/expenseModel');

const getAllExpenses = async (req, res) => {
    try {
        const Expensess = await Expenses.find();
        res.send({sucess:true, message:'Successful', data:Expensess});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const addExpenses = async (req, res) => {
    try {
        const newExpense = new Expenses(req.body); 
        await newExpense.save(); 
        res.status(201).send({ 
            success: true, 
            message:'succefully executed',
            data: newExpense });
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server Error' });
      }
    
};

const updateExpenses = async (req, res) => {
    try {
        const updatedExpenses = await Expenses.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send({ success:true,message:'updated',data:updatedExpenses});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteExpenses = async (req, res) => {
    try {
        await Expenses.findByIdAndDelete(req.params.id);
        res.send({sucess:true, message: 'Expenses deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllExpenses,
    addExpenses,
    updateExpenses,
    deleteExpenses
};
