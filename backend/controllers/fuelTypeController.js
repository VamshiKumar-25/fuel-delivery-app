const FuelType = require('../models/FuelType');

// GET all active fuel types
const getFuelTypes = async (req, res) => {
  try {
    const fuelTypes = await FuelType.find({ isActive: true });
    res.json(fuelTypes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// GET a single fuel type by ID
const getFuelTypeById = async (req, res) => {
  try {
    const fuelType = await FuelType.findById(req.params.id);
    if (fuelType) {
      res.json(fuelType);
    } else {
      res.status(404).json({ message: 'Fuel type not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// --- ADMIN ONLY FUNCTIONS ---

// POST a new fuel type
const createFuelType = async (req, res) => {
  const { name, pricePerUnit, unit, description } = req.body;
  const fuelType = new FuelType({ name, pricePerUnit, unit, description });
  try {
    const createdFuelType = await fuelType.save();
    res.status(201).json(createdFuelType);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT (update) a fuel type
const updateFuelType = async (req, res) => {
  const { name, pricePerUnit, unit, description, isActive } = req.body;
  try {
    const fuelType = await FuelType.findById(req.params.id);
    if (fuelType) {
      fuelType.name = name ?? fuelType.name;
      fuelType.pricePerUnit = pricePerUnit ?? fuelType.pricePerUnit;
      fuelType.unit = unit ?? fuelType.unit;
      fuelType.description = description ?? fuelType.description;
      fuelType.isActive = isActive ?? fuelType.isActive;

      const updatedFuelType = await fuelType.save();
      res.json(updatedFuelType);
    } else {
      res.status(404).json({ message: 'Fuel type not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE a fuel type
const deleteFuelType = async (req, res) => {
    try {
        const fuelType = await FuelType.findById(req.params.id);
        if (fuelType) {
            await fuelType.deleteOne();
            res.json({ message: 'Fuel type removed' });
        } else {
            res.status(404).json({ message: 'Fuel type not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


module.exports = { getFuelTypes, getFuelTypeById, createFuelType, updateFuelType, deleteFuelType };