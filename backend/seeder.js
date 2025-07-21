const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load Models
const FuelType = require('./models/FuelType');

// Load env vars
dotenv.config();

// Connect to DB
connectDB();

const fuelTypes = [
  {
    name: 'Petrol',
    pricePerUnit: 105.41,
    unit: 'liter',
    description: 'Standard petrol for most vehicles.'
  },
  {
    name: 'Diesel',
    pricePerUnit: 89.62,
    unit: 'liter',
    description: 'For diesel engine vehicles.'
  },
  {
    name: 'CNG',
    pricePerUnit: 75.09,
    unit: 'liter', // Often measured in kg, but using liter for consistency
    description: 'Compressed Natural Gas for compatible vehicles.'
  },
  {
    name: 'Electric Charging',
    pricePerUnit: 18.00,
    unit: 'kWh',
    description: 'Fast charging for electric vehicles.'
  }
];

const importData = async () => {
  try {
    await FuelType.deleteMany(); // Clear existing data
    await FuelType.insertMany(fuelTypes);
    console.log('Data Imported! ✅');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await FuelType.deleteMany();
    console.log('Data Destroyed! ❌');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}