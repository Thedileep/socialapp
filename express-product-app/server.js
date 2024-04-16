const express = require('express');
const app = express();
const path=require('path');
const PORT = 3000;

// Middleware to parse JSON body
app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.set('view engine', 'ejs');
//app.set('views',path.join(__dirname,'public'));
// Dummy product data
let products = [
    { id: 1, name: "Product 1", price: '10', rating: 4.5 },
    { id: 2, name: "Product 2", price: '20', rating: 3.8 }
];

// Product API endpoints
app.get('/', (req, res) => {
    const { id, name,price,rating} = req.query;
    products.push({ id, name,price,rating});
   res.render("index.ejs",{ products })
})

app.post('/', (req, res) => {
    const { id, name,price,rating} = req.body;
    products.push({ id, name,price,rating});
   res.render("index.ejs",{ products })
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
