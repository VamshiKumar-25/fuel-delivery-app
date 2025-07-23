const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const fuelTypeRoutes = require('./routes/fuelTypeRoutes');
const orderRoutes = require('./routes/orderRoutes'); // This line must be present

dotenv.config();
connectDB();

const app = express();

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://fuel-delivery-app.netlify.app' // Your live Netlify URL
  ],
  optionsSuccessStatus: 200 
};
app.use(cors(corsOptions));

app.use(express.json());

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/fueltypes', fuelTypeRoutes);
app.use('/api/orders', orderRoutes); // This line must be present

app.get('/', (req, res) => {
    res.send('API is running successfully.');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});