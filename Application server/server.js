// Add your functions for database connection and configuring middleware, defining API endpoints, and starting the server.
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors'); 

const app = express();

// connect to database
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/order'));
app.use('/api/recommendations', require('./routes/recommendations'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));