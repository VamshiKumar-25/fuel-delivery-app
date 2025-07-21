const mongoose = require('mongoose');
const Counter = require('./Counter'); // Import the Counter model

const orderSchema = new mongoose.Schema(
  {
    orderId: { // Field for the custom ID, e.g., "ORD-000001"
      type: String,
      unique: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    fuelType: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'FuelType',
    },
    quantity: {
      type: Number,
      required: true,
    },
    deliveryAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      area: { type: String, required: true },
      zip: { type: String, required: true },
    },
    deliveryDate: {
      type: Date,
      required: true,
    },
    deliveryTimeSlot: {
      type: String,
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    deliveryFee: {
      type: Number,
      required: true,
    },
    gst: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['Pending', 'Confirmed', 'Out for Delivery', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
    paymentMethod: {
      type: String,
      required: true,
      default: 'Cash on Delivery',
    },
    specialInstructions: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// This function runs before a new order document is saved
orderSchema.pre('save', async function(next) {
  // Only generate an ID if the document is new
  if (this.isNew) {
    try {
      // Find the counter for orders, increment it, and create it if it doesn't exist (upsert: true)
      const counter = await Counter.findByIdAndUpdate(
        { _id: 'orderId' },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
      );
      
      // Pad the number with leading zeros to make it 6 digits long
      const orderNumber = counter.sequence_value.toString().padStart(6, '0');
      this.orderId = `ORD-${orderNumber}`;
      next();
    } catch (error) {
      next(error); // Pass any errors to the next middleware
    }
  } else {
    next();
  }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;