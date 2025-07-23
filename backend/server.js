const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const fuelTypeRoutes = require('./routes/fuelTypeRoutes');
const orderRoutes = require('./routes/orderRoutes');

dotenv.config();
connectDB();

const app = express();

// NEW: Explicit CORS Configuration
const corsOptions = {
  origin: [
    'http://localhost:3000', // Your local frontend
    'https://fuel-delivery-app.netlify.app' // Your live Netlify URL
  ],
  optionsSuccessStatus: 200 
};
app.use(cors(corsOptions));


app.use(express.json());

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/fueltypes', fuelTypeRoutes);
app.use('/api/orders', orderRoutes);

// --- DEPLOYMENT CONFIGURATION ---
// This code will only run in a true production environment, which we aren't using for the API.
// We are serving the frontend from Netlify, so this block is not strictly necessary for an API-only server.
if (process.env.NODE_ENV === 'production' && !process.env.API_ONLY) {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'))
  );
} else {
    app.get('/', (req, res) => {
        res.send('API is running successfully.');
    });
}

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});