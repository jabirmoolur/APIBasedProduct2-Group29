const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');

// Route to get the count of restaurants
router.get('/count', async (req, res) => {
  try {
    const count = await Restaurant.countDocuments(); // Fetch the number of documents in the Restaurant collection
    res.json({ count }); // Respond with the count
  } catch (error) {
    res.status(500).json({
      error: "Unable to fetch the number of restaurants.", // Handle any errors that occur
    });
  }
});

module.exports = router;
