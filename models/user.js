const mongoose = require("mongoose"),
  validator = require("validator"),
  bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken"),
  crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxLength: [30, "Your name cannot exceed 30 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter valid email address"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [6, "Your password must be longer than 6 characters"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: function (confirmPassword) {
      return confirmPassword === this.password;
    },
    message: "Passwords are not the same!",
  },
  avatar: {
    public_id: { type: String, required: true },
    url: { type: String, required: true },
  },
  role: {
    type: String,
    enum: ["user", "restaurant-owner", "admin"],
    default: "user",
  },
  phoneNumber: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  passwordChangedAt: Date,
  active: { type: Boolean, default: true, select: false },
  passwordResetToken: String,
  passwordResetExpires: Date,
});

// Encrypt password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

// Check if the entered password matches the stored password
userSchema.methods.correctPassword = async function (enteredPassword, storedPassword) {
  return await bcrypt.compare(enteredPassword, storedPassword);
};

// Check if the password was changed after a certain date
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const passwordChangedTime = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < passwordChangedTime;
  }
  return false;
};

// Generate password reset token
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // Expires in 10 minutes
  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
