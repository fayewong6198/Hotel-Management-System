const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middlewares/asyncHandler");
const errorHandler = require("../middlewares/errorHandler");
const config = require("config");

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

  if (!isMatch) {
    return next(new ErrorResponse("Wrong Password", 401));
  }

  sendJwtToken(200, res, user);
});

// @desc Update User Profile
// @route PUT /api/auth/profile
// @access Private
exports.updateProfile = asyncHandler(async (req, res, next) => {
  console.log("Go in to Update");
  const profile = req.body;

  const user = await User.findByIdAndUpdate(req.user.id, profile, {
    new: true,
    runValidators: true
  });

  console.log(user);

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc Get Current Profile
// @route GET /api/auth/
// @access Public
exports.getCurrentProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, user });
});

const sendJwtToken = (statusCode, res, user) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({
    success: true,
    token
  });
};

// Upload avatar
// @desc Update user by id
// @route PUT /api/users/:id/avatar
// @access admin, staff
exports.uploadAvatar = asyncHandler(async (req, res, next) => {
  console.log("body ", req.user);
  console.log("file ", req.files);
  const user = await User.findOne({ _id: req.user._id });

  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }

  if (!req.files) {
    return next(new ErrorResponse("File not found", 404));
  }

  const file = req.files.avatar;

  console.log("avatar: ", file);

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
        _id: req.user.id
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
