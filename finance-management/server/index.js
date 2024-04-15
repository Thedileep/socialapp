const express=require('express');
const colors=require('colors')
const morgan=require('morgan');
const dotenv=require('dotenv');
const connectDB = require('./database/db');

dotenv.config();

const app=express();

connectDB();

app.use(express.json());
app.use(morgan('dev'));

app.use('/user', require('./routes/userRoute'));
app.use('/user', require('./routes/expenseRoute'));
app.use('/transaction',require('./routes/transactionRoute'))


const port=4000;

app.listen(port,()=>{
    console.log( `Server is running on ${port}`)
})