const Fooditem = require("../models/foodItem");
const ErrorHandler = require("../utils/errorHandler");
const catchAsync = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllFoodItems = catchAsync(
  async (req, res, next) => {
    let filter = {};
    if (req.params.restaurantId) {
      filter = { restaurant: req.params.restaurantId };
    }
    const foodItems = await Fooditem.find(filter);
    res.status(200).json({
      status: "success",
      results: foodItems.length,
      data: foodItems,
    });
  }
);

exports.createFoodItem = catchAsync(
  async (req, res, next) => {
    const newFoodItem = await Fooditem.create(req.body);
    res.status(201).json({
      status: "success",
      data: newFoodItem,
    });
  }
);

exports.getFoodItem = catchAsync(
  async (req, res, next) => {
    const foodItem = await Fooditem.findById(req.params.foodId);
    if (!foodItem) {
      return next(new ErrorHandler("No foodItem found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: foodItem,
    });
  }
);

