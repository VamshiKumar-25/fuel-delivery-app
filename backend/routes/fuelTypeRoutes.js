const express = require('express');
const router = express.Router();
const { getFuelTypes, getFuelTypeById, createFuelType, updateFuelType, deleteFuelType } = require('../controllers/fuelTypeController.js');
const { protect, admin } = require('../middleware/authMiddleware.js');

// Public Routes
router.get('/', getFuelTypes);
router.get('/:id', getFuelTypeById);

// Admin Only Routes
router.post('/', protect, admin, createFuelType);
router.put('/:id', protect, admin, updateFuelType);
router.delete('/:id', protect, admin, deleteFuelType);

module.exports = router;