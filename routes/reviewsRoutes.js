const express = require('express');
const router = express.Router({ mergeParams: true });

const {
  setUserRestaurantIds,
  createReviews,
  getAllReviews,
  getReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');

const authController = require('../controllers/authController');

// Protect all routes below this middleware
router.use(authController.protect);

// Route for handling all reviews
router
  .route('/')
  .get(getAllReviews)                       // Get all reviews
  .post(setUserRestaurantIds, createReviews); // Create a new review with user and restaurant IDs

// Route for handling individual review by ID
router
  .route('/:reviewId')
  .get(getReview)                           // Get a specific review by ID
  .patch(updateReview)                      // Update a specific review by ID
  .delete(deleteReview);                    // Delete a specific review by ID

// Export the router
module.exports = router;
