const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const PORT = 3000;

mongoose.connect('mongodb+srv://invalid_bug:Dileep%402020@dileep.jngl3rt.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

const productSchema = new mongoose.Schema({
    id: Number,
    name: String,
    price: String,
    rating: Number
});

const Product = mongoose.model('Product', productSchema);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');

// Define a route handler for getting all products
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.render('index', { products: products });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Define a route handler for adding a new product
app.post('/products', async (req, res) => {
    const { name, price, rating } = req.body;
    try {
        const newProduct = new Product({ name, price, rating });
        await newProduct.save();
        res.redirect('/products');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Define a route handler for updating a product
app.put('/products/:id', async (req, res) => {
    const productId = req.params.id;
    const { name, price, rating } = req.body;
    try {
        let product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        product.name = name;
        product.price = price;
        product.rating = rating;
        await product.save();
        res.redirect('/products');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Define a route handler for deleting a product
app.delete('/products/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        await product.remove();
        res.redirect('/products');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
