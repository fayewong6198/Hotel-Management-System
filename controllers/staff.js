const User = require("../models/User");
const asyncHandler = require("../middlewares/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");

// @desc Get all stafs
// @route GET /api/staffs
// @access admin
exports.getStaffs = asyncHandler(async (req, res, next) => {
  const staffs = await User.find({ role: "staff" });

  res.status(200).json({
    success: true,
    data: staffs
  });
});

// @desc Create staff
// @route POST /api/staffs/
// @access admin
exports.createStaff = asyncHandler(async (req, res, next) => {
  let staff = await User.new(req.body);
  staff.role = "staff";
  staff.save();

  res.status(200).json({
    success: true,
    data: staff
  });
});

// @desc Get staff by id
// @route GET /api/staffs/:id
// @access admin
exports.getStaff = asyncHandler(async (req, res, next) => {
  const staff = await User.findOne({ role: "staff", id: req.params.id });

  console.log(staff);

  if (!staff) {
    return next(new ErrorResponse("Staff not found", 404));
  }

  res.status(200).json({
    success: true,
    data: staff
  });
});

// @desc Update staff by id
// @route PUT /api/staffs/:id
// @access admin
exports.updateStaff = asyncHandler(async (req, res, next) => {
  let staff = await User.findOne({ role: "staff", id: req.params.id });

  if (!staff) {
    return next(new ErrorResponse("User not found", 404));
  }

  staff = await User.findOneAndUpdate(
    { role: "staff", id: req.params.id },
    req.body
  );

  res.status(200).json({
    success: true,
    data: staffs
  });
});

// @desc Delete staff by id
// @route Delete /api/staffs/:id
// @access admin
exports.deleteStaff = asyncHandler(async (req, res, next) => {
  const staffs = await User.findOne({ role: "staff", id: req.params.id });

  if (!staff) {
    return next(new ErrorResponse("User not found", 404));
  }

  staff = await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    data: staffs
  });
});
