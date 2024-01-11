const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 3000; // You can use any port you prefer

// Serve static files (like register.html) from a directory
// app.use(express.static(path.join(__dirname, 'public')));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: false }));

// Connection URI for your MongoDB Atlas cluster
const uri = 'mongodb+srv://invalid_bug:Dileep%402020@dileep.jngl3rt.mongodb.net/?retryWrites=true&w=majority';

// Create a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Route to render the register.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'register.html'));
});

// Handle register form submission
app.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log('Connected to MongoDB Atlas');

    // Access a specific database and collection
    const database = client.db('your_database');
    const collection = database.collection('users');

    // Find user by email
    const user = await collection.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).send('Invalid email or password');
    }

    // Handle successful register (e.g., set session, return success response, etc.)
    res.status(200).send('register successful!');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal server error');
  } finally {
    // Close the connection when done
    await client.close();
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
