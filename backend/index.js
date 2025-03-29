const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const addressRoutes = require('./routes/addressRoutes')
const paymentRoutes = require('./routes/paymentRoutes');
const orderRoutes = require('./routes/orderRoutes')
const { errorHandler } = require('./middlewares/errorMiddleware');

// Load environment variables from .env file
dotenv.config();

// CORS Configuration
const whitelist = ['http://localhost:5173', 'http://localhost:5000',"https://nordstrom-rack-clone-6vug.vercel.app"];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Connect to MongoDB
connectDB();

const app = express();

// Apply CORS Middleware Globally
app.use(cors(corsOptions));

// Logger middleware using Morgan
app.use(morgan('dev'));

// Middleware for parsing JSON
app.use(express.json());

// Mount API routes
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/cart', cartRoutes);
app.use('/wishlist', wishlistRoutes);
app.use('/payment', paymentRoutes);
app.use('/addresses', addressRoutes);
app.use('/orders',orderRoutes)

// Global error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
