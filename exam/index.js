const express=require('express');
const app=express();
const path=require('path');
const Resturant=require('./model/Resturant')
const mongoose=require('mongoose')


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


app.get('/',(req,res)=>{
    res.render('index.ejs')
})


app.post('/restaurants', async (req, res) => {
    try {
      const { restaurantName,Cuisine,Chef,phoneNo,ImageUrl} = req.body;
      const newItem = new Resturant({ restaurantName,Cuisine,Chef,phoneNo,ImageUrll: [ ImageUrl ]});
      await newItem.save();
      res.render('index.ejs',{ item: newItem});
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.get('/restaurants', async (req, res) => {
    try {
      const products = await Resturant.find();
      res.render('index.ejs', { items: products });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

app.get('/restaurant/:id/edit',(req,res)=>{
    let id = req.params.id; 
    Resutrant.findById(id , (err , found )=>{
      if (!err) {
         res.render('edit.ejs' , {food:found} ) ;
      } else {
         console.log(err);
      }
    })
})


app.put('/resturant/:id', async (req, res) => {
    try {
      const { Cuisine,Chef,phoneNo,ImageUrl } = req.body;
      const updatedProduct = await Resturant.findByIdAndUpdate(req.params.id, { Cuisine,Chef,phoneNo,ImageUrl }, { new: true });
      if (!updatedProduct) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }
      res.redirect('/resurants');
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

app.delete('/restaurant/:id/delete', async (req, res) => {
    try {
      const deletedProduct = await Resturant.findByIdAndDelete(req.params.id);
      if (!deletedProduct) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }
      res.json(deletedProduct);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

port=4000
  
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})
