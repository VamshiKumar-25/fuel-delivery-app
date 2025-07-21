const mongoose = require('mongoose');

const fuelTypeSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true 
  },
  pricePerUnit: { 
    type: Number, 
    required: true 
  },
  unit: { 
    type: String, 
    required: true, 
    enum: ['liter', 'kWh'] 
  },
  description: { 
    type: String 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
}, { timestamps: true });

const FuelType = mongoose.model('FuelType', fuelTypeSchema);
module.exports = FuelType;