const mongoose = require("mongoose");

// Define the schema for a food item
const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter FoodItem name"], // Required and custom error message
    trim: true, // Trims whitespace from the start and end
    maxLength: [100, "FoodItem name cannot exceed 100 characters"], // Max length of name
  },
  price: {
    type: Number,
    required: [true, "Please enter FoodItem price"], // Required and custom error message
    maxLength: [5, "FoodItem price can't exceed 5 digits"], // Max length of price
    default: 0, // Default value of price
  },
  description: {
    type: String,
    required: [true, "Please enter FoodItem description"], // Required and custom error message
  },
  ratings: {
    type: Number,
    default: 0, // Default rating value
  },
  images: [
    {
      public_id: { type: String, required: true }, // Required field for public ID of the image
      url: { type: String, required: true }, // Required field for the image URL
    },
  ],
  menu: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Menu model
    ref: "Menu",
  },
  stock: {
    type: Number,
    required: [true, "Please enter foodItem stock"], // Required and custom error message
    maxLength: [5, "FoodItem stock can't exceed 5 digits"], // Max length of stock
    default: 0, // Default value of stock
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Restaurant model
    ref: "Restaurant",
  },
  numOfReviews: {
    type: Number,
    default: 0, // Default number of reviews
  },
  reviews: [
    {
      name: { type: String, required: true }, // Required field for reviewer name
      rating: { type: Number, required: true }, // Required field for rating
      Comment: { type: String, required: true }, // Required field for review comment
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now, // Default to the current date
  },
});

// Create and export the FoodItem model
module.exports = mongoose.model("FoodItem", foodSchema);
