const Restaurant = require("../models/restaurant");
const ErrorHandler = require("../utils/errorHandler");
const catchAsync = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");

// Get all restaurants with optional filtering and sorting
exports.getAllRestaurants = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Restaurant.find(), req.query)
    .search() // Apply search filters (if defined in APIFeatures)
    .sort();  // Apply sorting (if defined in APIFeatures)

  const restaurants = await features.query; // Execute the query

  res.status(200).json({
    status: "success",
    count: restaurants.length,
    restaurants,
  });
});

// Create a new restaurant
exports.createRestaurant = catchAsync(async (req, res, next) => {
  const newRestaurant = await Restaurant.create(req.body); // Create new restaurant document

  res.status(201).json({
    status: "success",
    data: newRestaurant,
  });
});

// Get a specific restaurant by ID
exports.getRestaurant = catchAsync(async (req, res, next) => {
  const restaurant = await Restaurant.findById(req.params.storeId); // Fetch restaurant by ID

  if (!restaurant) {
    return next(new ErrorHandler("No Restaurant found with that ID", 404)); // Handle not found
  }

  res.status(200).json({
    status: "success",
    data: restaurant,
  });
});

// Delete a restaurant by ID
exports.deleteRestaurant = catchAsync(async (req, res, next) => {
  const restaurant = await Restaurant.findByIdAndDelete(req.params.storeId); // Delete restaurant by ID

  if (!restaurant) {
    return next(new ErrorHandler("No document found with that ID", 404)); // Handle not found
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
