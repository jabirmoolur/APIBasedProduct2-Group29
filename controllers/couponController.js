const Coupon = require("../models/couponModel"),
  ErrorHandler = require("../utils/errorHandler"),
  catchAsync = require("../middlewares/catchAsyncErrors");

// Exported functions for coupon management
exports.createCoupon = catchAsync(
  async (req, res, next) => {
    const coupon = await Coupon.create(req.body);
    res.status(200).json({ status: "success", data: coupon });
  }
);

exports.getCoupon = catchAsync(
  async (req, res, next) => {
    const coupons = await Coupon.find();
    res.status(200).json({
      status: "success",
      data: coupons,
    });
  }
);

exports.updateCoupon = catchAsync(
  async (req, res, next) => {
    const coupon = await Coupon.findByIdAndUpdate(
      req.params.couponId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!coupon)
      return next(
        new ErrorHandler("No Coupon found with that ID", 404)
      );
    res.status(200).json({
      status: "success",
      data: coupon,
    });
  }
);

exports.deleteCoupon = catchAsync(
  async (req, res, next) => {
    const coupon = await Coupon.findByIdAndDelete(req.params.couponId);
    if (!coupon)
      return next(new ErrorHandler("No coupon found with the given Id", 404));
    res.status(200).json({ status: "success" });
  }
);

exports.couponValidate = catchAsync(
  async (req, res, next) => {
    const { couponCode, cartItemsTotalAmount } = req.body;

    // Aggregate logic for coupon validation
    const coupon = await Coupon.aggregate([
      {
        $addFields: {
          finalTotal: {
            $cond: [
              { $gte: [cartItemsTotalAmount, 1000] },
              {
                $subtract: [
                  cartItemsTotalAmount,
                  {
                    $min: [
                      {
                        $multiply: [
                          cartItemsTotalAmount,
                          { $divide: [200, 100] },
                        ],
                      },
                      50,
                    ],
                  },
                ],
              },
              cartItemsTotalAmount,
            ],
          },
          message: {
            $cond: [
              { $gte: [cartItemsTotalAmount, 1000] },
              "",
              {
                $concat: [
                  "Add ₹",
                  {
                    $toString: { $subtract: [1000, cartItemsTotalAmount] },
                  },
                  " more to avail this offer",
                ],
              },
            ],
          },
        },
      },
      {
        $project: {
          _id: 0,
          subTitle: 1,
          couponName: 1,
          details: 1,
          minAmount: 1,
          finalTotal: 1,
          message: 1,
        },
      },
    ]);

    if (!coupon)
      return next(new ErrorHandler("Invalid coupon code.", 404));

    res.status(200).json({
      status: "success",
      data: coupon,
    });
  }
);
