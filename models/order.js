const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  // Delivery information
  deliveryInfo: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    phoneNo: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },

  // Reference to the restaurant
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
  },

  // Reference to the user who placed the order
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  // List of items in the order
  orderItems: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      fooditem: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "FoodItem",
      },
    },
  ],

  // Payment information
  paymentInfo: { id: { type: String }, status: { type: String } },
  paidAt: { type: Date },

  // Prices for the order
  itemsPrice: { type: Number, required: true, default: 0 },
  taxPrice: { type: Number, required: true, default: 0 },
  deliveryCharge: { type: Number, required: true, default: 0 },
  finalTotal: { type: Number, required: true, default: 0 },

  // Order status and other timestamps
  orderStatus: { type: String, required: true, default: "Processing" },
  deliveredAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

// Pre-save middleware to check stock availability
orderSchema.pre("save", async function (next) {
  try {
    for (const item of this.orderItems) {
      const foodItem = await mongoose.model("FoodItem").findById(item.fooditem);
      if (!foodItem) throw new Error("Food item not found.");

      if (foodItem.stock < item.quantity) {
        throw new Error(
          `Insufficient stock for '${item.name}' in this order.`
        );
      }

      foodItem.stock -= item.quantity;
      await foodItem.save();
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Create and export the Order model
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
