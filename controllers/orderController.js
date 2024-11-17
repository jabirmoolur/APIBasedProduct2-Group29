const Order = require("../models/order"),
  FoodItem = require("../models/foodItem"),
  { ObjectId } = require("mongodb"),
  ErrorHandler = require("../utils/errorHandler"),
  catchAsyncErrors = require("../middlewares/catchAsyncErrors");

exports.createNewOrder = catchAsyncErrors(
  async (req, res, next) => {
    const { orderItems, deliveryInfo, itemsPrice, taxPrice, deliveryCharge, finalTotal, paymentInfo } = req.body;
    
    const newOrder = await Order.create({
      orderItems,
      deliveryInfo,
      itemsPrice,
      taxPrice,
      deliveryCharge,
      finalTotal,
      paymentInfo,
      paidAt: Date.now(),
      user: req.user.id,
      restaurant: req.params.restaurantId
    });

    res.status(200).json({
      success: true,
      order: newOrder,
    });
  }
);

exports.getSingleOrder = catchAsyncErrors(
  async (req, res, next) => {
    const order = await Order.findById(req.params.orderId)
      .populate("user", "name email")
      .populate("restaurant")
      .exec();

    if (!order)
      return next(new ErrorHandler("No Order found with this ID", 404));

    res.status(200).json({
      success: true,
      order: order,
    });
  }
);

exports.getUserOrders = catchAsyncErrors(
  async (req, res, next) => {
    const userId = new ObjectId(req.user.id);
    const orders = await Order.find({ user: userId })
      .populate("user", "name email")
      .populate("restaurant")
      .exec();

    res.status(200).json({
      success: true,
      orders: orders,
    });
  }
);

exports.getAllOrders = catchAsyncErrors(
  async (req, res, next) => {
    const orders = await Order.find();
    let totalAmount = 0;

    orders.forEach((order) => {
      totalAmount += order.finalTotal;
    });

    res.status(200).json({
      success: true,
      totalAmount: totalAmount,
      orders: orders,
    });
  }
);

function catchAsyncErrors(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  };
}
