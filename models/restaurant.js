const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the restaurant name"],
    trim: true,
    maxLength: [100, "Restaurant name cannot exceed 100 characters"],
  },
  isVeg: {
    type: Boolean,
    default: false,
  },
  address: {
    type: String,
    required: [true, "Please enter the restaurant address"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Indexes
// GeoJSON index for geospatial queries
restaurantSchema.index({ location: "2dsphere" });

// Text index for address to enable text-based search
restaurantSchema.index({ address: "text" });

// Exporting the Restaurant model
module.exports = mongoose.model("Restaurant", restaurantSchema);
