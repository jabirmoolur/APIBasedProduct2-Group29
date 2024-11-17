const catchAsyncErrors = require("../middlewares/catchAsyncErrors"),
  dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Create a payment intent
exports.processPayment = catchAsyncErrors(
  async (req, res, next) => {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in the smallest currency unit (e.g., cents for USD)
      currency: "inr", // Currency code (INR in this case)
      metadata: { integration_check: "accept_a_payment" }, // Metadata for the payment
    });

    res.status(200).json({
      success: true,
      client_secret: paymentIntent.client_secret, // Client secret used in the frontend to confirm the payment
    });
  }
);

// Send Stripe API key to frontend (for frontend integration)
exports.sendStripeApiKey = catchAsyncErrors(
  async (req, res, next) => {
    res.status(200).json({
      stripeApiKey: process.env.STRIPE_API_KEY, // Stripe API key for the frontend to use
    });
  }
);
