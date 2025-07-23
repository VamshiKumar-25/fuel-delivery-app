const express = require('express');
const router = express.Router();

const { 
  addOrderItems, 
  getMyOrders, 
  getOrders, 
  updateOrderStatus,
  getOrderById,
  getOrderByCustomId
} = require('../controllers/orderController.js');

const { protect, admin } = require('../middleware/authMiddleware.js');

// --- Customer Routes ---
router.post('/', protect, addOrderItems);
router.get('/myorders', protect, getMyOrders); // This is the route that's missing on the server

// --- Admin Routes ---
router.get('/', protect, admin, getOrders);
router.put('/:id/status', protect, admin, updateOrderStatus);

// --- Public Tracking Routes ---
router.get('/trackbyid/:customId', getOrderByCustomId);
router.get('/:id', getOrderById);

module.exports = router;