const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middlewares/asyncHandler");
const errorHandler = require("../middlewares/errorHandler");

// @desc TEST user
// @route GET /api/auth/
// @access Public
exports.loadUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json(user);
});

// @desc Register user
// @route POST /api/auth/register
// @access Public
exports.register = asyncHandler(async (req, res, next) => {
  // Create User
  const user = await User.create(req.body);

  // Send jwt token
  sendJwtToken(200, res, user);
});

// @desc Login user
// @route POST /api/v1/auth/login
// @access Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Email and password is required", 401));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Wrong Email", 401));
  }
  const isMatch = await user.comparePassword(password);
  console.log("isMatch", isMatch);
  if (!isMatch) {
    return next(new ErrorResponse("Wrong Password", 401));
  }

  sendJwtToken(200, res, user);
});

const sendJwtToken = (statusCode, res, user) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({
    success: true,
    token
  });
};
