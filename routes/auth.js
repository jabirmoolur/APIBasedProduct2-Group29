const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Define routes and map them to controller methods
router.post('/signup', authController.signup);                     // Sign up a new user
router.post('/login', authController.login);                       // Log in a user
router.get('/logout', authController.logout);                      // Log out the user
router.post('/forgetPassword', authController.forgotPassword);     // Handle forgotten password
router.patch('/resetPassword/:token', authController.resetPassword); // Reset password using a token

// Protect middleware and routes requiring authentication
router.route('/me')
    .get(authController.protect, authController.getUserProfile);   // Get current user's profile

router.route('/me/update')
    .put(authController.protect, authController.updateProfile);    // Update user's profile

router.route('/password/update')
    .patch(authController.protect, authController.updatePassword); // Update user's password

// Export the router for use in the application
module.exports = router;
