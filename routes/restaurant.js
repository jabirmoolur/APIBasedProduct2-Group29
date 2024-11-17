const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  getAllRestaurants,
  createRestaurant,
  getRestaurant,
  deleteRestaurant,
} = require('../controllers/restaurantController');
const menuRoutes = require('./menu');
const reviewRoutes = require('./reviewsRoutes');

// Route to handle restaurant collection
router
  .route('/')
  .get(getAllRestaurants)    // Get all restaurants
  .post(createRestaurant);   // Create a new restaurant

// Route to handle individual restaurant
router
  .route('/:storeId')
  .get(getRestaurant)        // Get a specific restaurant by ID
  .delete(deleteRestaurant); // Delete a specific restaurant by ID

// Nested routes for menus and reviews
router.use('/:storeId/menus', menuRoutes);     // Menu routes for a specific restaurant
router.use('/:storeId/reviews', reviewRoutes); // Review routes for a specific restaurant

// Export the router
module.exports = router;
