const Order = require('../models/Order.js');
const FuelType = require('../models/FuelType.js');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private (Customer)
const addOrderItems = async (req, res) => {
  const {
    fuelTypeId,
    quantity,
    deliveryAddress,
    deliveryDate,
    deliveryTimeSlot,
    specialInstructions,
    subtotal,
    deliveryFee,
    gst,
    totalPrice,
  } = req.body;

  try {
    if (!deliveryAddress) {
      return res.status(400).json({ message: 'No order items' });
    }
    const order = new Order({
      customer: req.user._id,
      fuelType: fuelTypeId,
      quantity,
      deliveryAddress,
      deliveryDate,
      deliveryTimeSlot,
      specialInstructions,
      subtotal,
      deliveryFee,
      gst,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get logged in user's orders
// @route   GET /api/orders/myorders
// @access  Private (Customer)
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user._id }).populate('fuelType', 'name unit');
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get a single order by its database _id
// @route   GET /api/orders/:id
// @access  Public
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customer', 'fullName email')
      .populate('fuelType', 'name');

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get a single order by its custom orderId (e.g., ORD-000001)
// @route   GET /api/orders/trackbyid/:customId
// @access  Public
const getOrderByCustomId = async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.customId })
      .populate('customer', 'fullName email')
      .populate('fuelType', 'name');

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


// --- ADMIN ONLY FUNCTIONS ---

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
    try {
      const orders = await Order.find({}).populate('customer', 'id fullName');
      res.json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
  
      if (order) {
        order.status = req.body.status || order.status;
        const updatedOrder = await order.save();
        res.json(updatedOrder);
      } else {
        res.status(404).json({ message: 'Order not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
};

module.exports = { 
    addOrderItems, 
    getMyOrders,
    getOrders,
    updateOrderStatus,
    getOrderById,
    getOrderByCustomId
};