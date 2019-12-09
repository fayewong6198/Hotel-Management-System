const User = require("../models/User");
const asyncHandler = require("../middlewares/asyncHandler");
const errorHandler = require("../middlewares/errorHandler");
const ErrorResponse = require("../utils/ErrorResponse");
const config = require("config");
const path = require("path");
// @desc Get all users
// @route GET /api/users
// @access admin, staff
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({ role: "user" });

  console.log(users);
  res.status(200).json({
    success: true,
    data: users
  });
});

// @desc Create user
// @route POST /api/users/
// @access admin, staff
exports.createUser = asyncHandler(async (req, res, next) => {
  console.log("req.body", req.body);
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
  const user = await User.findOne({ role: "user", _id: req.params.id });

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
  console.log(req.body);
  const user = await User.findOneAndUpdate(
    { role: "user", _id: req.params.id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }

  // Only admin can set staff
  if (req.user.role !== "admin") {
    user.role = "user";
    user.save();
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc Delete user by id
// @route Delete /api/users/:id
// @access admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete({
    role: "user",
    _id: req.params.id
  });

  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }
  res.status(200).json({
    success: true,
    data: user
  });
});

// Upload avatar
// @desc Update user by id
// @route PUT /api/users/:id/avatar
// @access admin, staff
exports.uploadAvatar = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ role: "user", _id: req.params.id });

  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }

  if (!req.files) {
    return next(new ErrorResponse("File not found", 404));
  }

  const file = req.files.avatar;

  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse("Only upload image file", 404));
  }

  // File size
  if (file.size > config.get("MAX_FILE_UPLOAD")) {
    return next(new ErrorResponse("File too large", 404));
  }

  // Create custom file name
  const ext = file.name.split(".")[1];
  file.name = `avatar_${user._id}.${ext}`;

  file.mv(`${config.get("FILE_UPLOAD_PATH")}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse("File too large", 404));
    }

    await User.findOneAndUpdate(
      {
        role: "user",
        _id: req.params.id
      },
      {
        avatar: file.name
      },
      { new: true, runValidators: true }
    );
  });

  res.status(200).json({
    success: true,
    data: file.name
  });
});
