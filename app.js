const express = require("express"),
  app = express(),
  path = require("path"),
  cookieParser = require("cookie-parser"),
  bodyParser = require("body-parser"),
  cloudinary = require("cloudinary"),
  fileUpload = require("express-fileupload"),
  errorMiddleware = require("./middlewares/errors");

// Set up middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Routers
const foodRouter = require("./routes/foodItem"),
  restaurantRouter = require("./routes/restaurant"),
  menuRouter = require("./routes/menu"),
  couponRouter = require("./routes/couponRoutes"),
  reviewRouter = require("./routes/reviewsRoutes"),
  orderRouter = require("./routes/order"),
  authRouter = require("./routes/auth"),
  paymentRouter = require("./routes/payment");

// Set up routes
app.use("/api/v1/eats/menus", foodRouter);
app.use("/api/v1/eats", menuRouter);
app.use("/api/v1/eats/stores", restaurantRouter);
app.use("/api/v1/eats/orders", orderRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/users", authRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/coupon", couponRouter);

// Set up views
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Handle unknown routes
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

// Error handling middleware
app.use(errorMiddleware);

// Export the app
module.exports = app;
