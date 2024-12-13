const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const productRoutes = require('./src/routes/product');
const redisClient = require('./src/config/redis');

// Load environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// API Routes
app.use('/api/products', productRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('API Caching Layer with Redis');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDB();
  await redisClient.connect();
  console.log(`Server running on port ${PORT}`);
});