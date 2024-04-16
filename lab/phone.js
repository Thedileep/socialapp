const mongoose=require('mongoose');

const schema=new mongoose.Schema({
    phone:Number,
})

const  Phone = mongoose.model("Phone",schema);
module.exports=Phone;