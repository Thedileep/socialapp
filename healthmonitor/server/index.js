const express=require('express');
const colors=require('colors')
const morgan=require('morgan');
const dotenv=require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app=express();

connectDB();

app.use(express.json());
app.use(morgan('dev'));

app.use('/user',require('./routes/userRoutes'))

app.use('/user',require('./routes/adminRoutes'))
app.use('/user',require('./routes/doctorRoute'));

port=process.env.PORT || 4000;
app.listen(port,()=>{
    console.log(`server is listening on ${port} port`.red.bgWhite)
})