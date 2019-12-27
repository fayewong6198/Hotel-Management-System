const Room = require("../models/Room");
const Payment = require("../models/Payment");
const asyncHandler = require("../middlewares/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");
const config = require("config");

// @desc Get all Payments
// @route GET /api/payments/
// @access Admin
exports.getPayments = asyncHandler(async (req, res, next) => {
  const payments = await Payment.find().populate("room", "roomId");
  console.log(payments);
  res.status(200).json({
    success: true,
    data: payments
  });
});

// @desc Get all User Payments
// @route GET /api/payments/users/
// @access Protected
exports.getUserPayments = asyncHandler(async (req, res, next) => {
  console.log("go in user payment");
  const payments = await Payment.find({ user: req.user }).populate(
    "room",
    "roomId"
  );
  res.status(200).json({
    success: true,
    data: payments
  });
});

// @desc Get one Payment
// @route GET /api/payments/:id
// @access Private
exports.getPayment = asyncHandler(async (req, res, next) => {
  const payment = await Payment.findById(req.params.id);

  if (!payment) {
    console.log("Fail");
    return next(new ErrorResponse("No Payment found", 404));
  }

  res.status(200).json({ success: true, data: payment });
});
