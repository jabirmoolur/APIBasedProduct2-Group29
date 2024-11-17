const express = require("express"),
  router = express.Router(),
  authController = require("../controllers/authController"),
  { processPayment, sendStripeApi } = require("../controllers/paymentController");

router.route("/payment/process").post(authController.protect, processPayment);
router.route("/stripeapi").post(authController.protect, sendStripeApi);

module.exports = router;
