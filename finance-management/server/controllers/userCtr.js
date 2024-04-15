const userModel=require("../models/user");
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');

const moment = require("moment");

const loginController=async (req,res)=>{
    try{
        const user=await userModel.findOne({username:req.body.username})
        if(!user){
            return res.status(200).send({message:"User not found",success:false});
        }
        const isMatch= await  bcrypt.compare(req.body.password,user.password);
        
        if (!isMatch) {
            return res.status(200).send({message: "Invalid Password!" , success : false })
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn:'1h'
        })
        return res.status(200).send({message: "Login success" , success : true,token })
    }
    catch(err){
        console.log(err);
        res.status(500).send({message:`Error in login ctrl ${err.message}`});
    }
}

const registerController=async(req,res)=>{
    try{
        const existingUser=await userModel.findOne({username:req.body.username})
        if(existingUser) {
            return res.status(200).send({message:"Username is already in use",success:false});
    }
    const password=req.body.password;
    const salt= await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt); 
    req.body.password=hashedPassword
    const newUser=new  userModel(req.body)
    await  newUser.save();
    res.status(200).send({data:newUser,"Message":"User Registerd Successfully" , success : true })
}
    catch(err){
        console.log(err);
        res.status(500).send({message:`Register controller error: ${err.message}`});
    }
}

const authctrl = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send({ message: "User not found", success: false });
        }
        // Remove sensitive data like password before sending the response
        user.password = undefined;
        res.status(200).send({ success: true, data: user });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: `auth error ${err.message}`, success: false });
    }
};


module.exports={ loginController,registerController,authctrl }