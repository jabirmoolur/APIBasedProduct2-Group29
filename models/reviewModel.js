const mongoose = require("mongoose");
const Restaurant = require("./restaurant");

// Define the Review schema
const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "Review cannot be empty!"],
    },
    rating: { type: Number, min: 1, max: 5 },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Review must belong to a user"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Static method to calculate average rating and number of reviews for a restaurant
reviewSchema.statics.calcAverageRatings = async function (restaurantId) {
  const stats = await this.aggregate([
    { $match: { restaurant: restaurantId } },
    {
      $group: {
        _id: "$restaurant",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  if (stats.length > 0) {
    await Restaurant.findByIdAndUpdate(restaurantId, {
      numOfReviews: stats[0].nRating,
      ratings: stats[0].avgRating,
    });
  } else {
    await Restaurant.findByIdAndUpdate(restaurantId, {
      numOfReviews: 0,
      ratings: 3.5,
    });
  }
};

// Pre-save hook to update restaurant rating and number of reviews after each review
reviewSchema.pre("save", function () {
  this.constructor.calcAverageRatings(this.restaurant);
});

// Middleware for `findOneAndUpdate` to trigger average ratings calculation after an update
reviewSchema.pre(/^findOneAnd/, async function () {
  this._doc = await this.model.findOne(this.getQuery());
});

reviewSchema.post(/^findOneAnd/, async function () {
  if (this._doc) {
    await this._doc.constructor.calcAverageRatings(this._doc.restaurant);
  }
});

// Create and export the Review model
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
