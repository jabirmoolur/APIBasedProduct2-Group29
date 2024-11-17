const AppError = require("../utils/errorHandler"),
  Review = require("../models/reviewModel"),
  catchAsync = require("../middlewares/catchAsyncErrors");

// Set user restaurant IDs (likely to update or assign IDs)
exports.setUserRestaurantIds = (req, res, next) => {
  if (!req.body.user) req.body.user = { id: req.body.userId };
  if (!req.body.restaurant) req.body.restaurant = req.body.restaurantId;
  next();
};

// Create a new review
exports.createReviews = catchAsync(
  async (req, res, next) => {
    const review = await Review.create(req.body);
    res.status(201).json({
      status: "success",
      data: review,
    });
  }
);

// Get all reviews for a specific restaurant
exports.getAllReviews = catchAsync(
  async (req, res, next) => {
    let filter = {};
    if (req.params.restaurantId) {
      filter = { restaurant: req.params.restaurantId };
    }
    const reviews = await Review.find(filter);
    res.status(200).json({
      status: "success",
      data: reviews,
    });
  }
);

// Get a specific review by ID
exports.getReviewById = catchAsync(
  async (req, res, next) => {
    const review = await Review.findById(req.params.reviewId);
    if (!review) {
      return next(new AppError("No Review with given Id", 404));
    }
    res.status(200).json({
      status: "success",
      data: review,
    });
  }
);

// Update a review by ID
exports.updateReview = catchAsync(
  async (req, res, next) => {
    const review = await Review.findByIdAndUpdate(
      req.params.reviewId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!review) {
      return next(new AppError("No Review with given Id", 404));
    }
    res.status(200).json({
      status: "success",
      data: review,
    });
  }
);

// Delete a review by ID
exports.deleteReview = catchAsync(
  async (req, res, next) => {
    const review = await Review.findByIdAndDelete(req.params.reviewId);
    if (!review) {
      return next(new AppError("No Review with given Id", 404));
    }
    res.status(200).json({
      status: "success",
    });
  }
);
