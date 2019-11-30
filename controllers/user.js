const User = require("../models/User");
const asyncHandler = require("../middlewares/asyncHandler");
const errorHandler = require("../middlewares/errorHandler");
const ErrorResponse = require("../utils/ErrorResponse");

// @desc Get all users
// @route GET /api/users
// @access admin, staff
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({ role: "user" });

  res.status(200).json({
    success: true,
    data: users
  });
});

// @desc Create user
// @route POST /api/users/
// @access admin, staff
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc Get user by id
// @route GET /api/users/:id
// @access admin, staff
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ role: "user", id: req.params.id });

  console.log(user);

  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc Update user by id
// @route PUT /api/users/:id
// @access admin, staff
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ role: "user", id: req.params.id });

  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }

  user = await User.findOneAndUpdate(
    { role: "user", id: req.params.id },
    req.body
  );

  // Only admin can set staff
  if (req.user.role !== "admin") {
    user.role = "user";
    user.save();
  }

  res.status(200).json({
    success: true,
    data: users
  });
});

// @desc Delete user by id
// @route Delete /api/users/:id
// @access admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const users = await User.findOne({ role: "user", id: req.params.id });

  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }

  user = await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    data: users
  });
});
