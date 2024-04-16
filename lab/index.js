const express=require('express');
const app=express();
//crud operation on productname,price,and description in nodejs without databse in single file res will send on brwoser?
app.get('/product-name',(req,res)=>{
    //create read upadate and delete
    

    res.send("the product name are: <br>  1. Macbook Pro<br>2. Iphone X<br>3. Samsung Galaxy Note 9 <br> <input type='text' placeholder='Enter Product'> " );

})
app.get('/price',(req,res)=>{
    res.send(" price of product are: <br> 1. Macbook Pro:50000<br>2. Iphone X: 1 lakh <br>3. Samsung Galaxy Note 9:9000")
})

app.get('/description',(req,res)=>{
    res.send("This is a description of the product");
})

app.listen(4000,()=>
{
    console.log('listening on 4000')
})