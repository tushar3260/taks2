



const express = require('express');
const mongoose = require('mongoose');
const app = express();


app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));


mongoose.connect('mongodb://localhost:27017/demotaks', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
});

// Create a Product model
const Product = mongoose.model('task2', productSchema);
const port = 3000;

// Route to render the 'add-product' view
app.get('/views/add-product', (req, res) => {
    res.render('add-product');
});

// Route to handle form submission
app.post('/add-product', async (req, res) => {
    const { name, description, price } = req.body;

    // Create a new product instance
    const newProduct = new Product({
        name,
        description,
        price,
    });

    try {
        // Save the product to the database
        await newProduct.save();
        console.log('Product added successfully!');
        res.redirect('/'); // Redirect back to the product list
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).send('Internal server error');
    }
});

app.get('/', async (req, res) => {
  try {
    const products = await Product.find(); // Fetch products from MongoDB
    res.render('index', { products }); // Render your HTML template
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Internal server error');
  }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
