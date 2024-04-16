const mongoose=require('mongoose');
const colors=require('colors')

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.Mongo_Url);
        console.log(`MongoDb Connected ${mongoose.connection.host}`.bgRed.green);
    }
    catch(err){
        console.log(`${err}`.bgRed.white)
    }
}

module.exports=connectDB;