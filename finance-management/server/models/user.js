const mongoose=require('mongoose')

const userSchema=new  mongoose.Schema({
username: { 
    type: String, 
    required: [true, "name is required"] 
},

email:{
    type :String ,
    required:[true,"email is required "]
}, 

password :{
    type :String ,
    required:[true,"password is required"]
},
})

const userModel=mongoose.model("Users",userSchema)

module.exports = userModel;
