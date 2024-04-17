const express=require('express');
const colors=require('colors')
const morgan=require('morgan');
const dotenv=require('dotenv');
const connectDB = require('./database/db');
const cors = require('cors');

dotenv.config();

const app = express();

// Enable CORS
app.use(cors());

connectDB();

app.use(express.json());
app.use(morgan('dev'));

app.use('/user', require('./routes/userRoute'));
app.use('/user',require('./routes/transactionRoute'))


const port=4000;

app.listen(port,()=>{
    console.log( `Server is running on ${port}`)
})