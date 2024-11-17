const mongoose = require("mongoose");

// Define the schema for a menu
const menuSchema = new mongoose.Schema(
  {
    menu: [
      {
        category: { type: String }, // Category of items in the menu
        items: [
          {
            type: mongoose.Schema.Types.ObjectId, // Reference to FoodItem model
            ref: "FoodItem",
          },
        ],
      },
    ],
    restaurant: {
      type: mongoose.Schema.Types.ObjectId, // Reference to Restaurant model
      ref: "Restaurant",
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Create and export the Menu model
const Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;
