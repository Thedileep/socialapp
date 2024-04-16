const express=require('express');
const app=express();
const path=require('path');
//const schema=require('./schema')
const mongoose=require('mongoose')
const Phone=require('./phone')

app.set( 'view engine', 'ejs' ); 
app.set('views',path.join(__dirname,'/views'));

mongoose
  .connect('mongodb+srv://invalid_bug:Dileep%402020@dileep.jngl3rt.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.log(err);
  });


app.get('/', (req,res)=>{
    res.render('home')
})

app.get('/phone/:phone',(req,res)=>{
    //let phone=983939;
    let { phone } = req.params;
    res.render('phone.ejs',{ phone })

})

app.post('/save',async(req,res)=>{
    let {phone}=req.body;
    
    const newPhone=new Phone({
        phone,
    })
    await Phone.save()
    res.redirect('/phone/:phone')
})

app.listen(4000,()=>{
    console.log("listening on port 4000")
})
