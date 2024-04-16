const mongoose=require('mongoose');

const resturant=new mongoose.Schema({
    restaurantName :{
        type:String,
        required:true,
    },
Cuisine :{
    type:String,
    required:true,
},
Chef : {
    type:String,
    required:true,
},
phoneNo:{
    type:Number,
    required:true,
},
ImageUrl:{
    type:String,
},
})

module.exports=mongoose.model( 'Resturant',resturant); 