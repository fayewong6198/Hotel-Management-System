const Room = require("../models/Room");
const asyncHandler = require("../middlewares/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");

// @desc Get all Rooms
// @route GET /api/room/
// @access Public
exports.getRooms = asyncHandler(async (req, res, next) => {
  console.log(req.query);
  res.status(200).json(res.advancedResults);
});

// @desc Get one Room
// @route GET /api/room/:id
// @access Public
exports.getRoom = asyncHandler(async (req, res, next) => {
  const room = await Room.findById(req.params.id);

  if (!room) {
    return next(new ErrorResponse("No Room found", 404));
  }
  res.status(200).json({ success: true, data: room });
});

// @desc Create new Room
// @route POST /api/room/
// @access Admin
exports.createRoom = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const room = await Room.create(req.body);

  res.status(200).json({ success: true, data: room });
});

// @desc Update one Room
// @route GET /put/room/:id
// @access Admin
exports.updateRoom = asyncHandler(async (req, res, next) => {
  let room = await Room.findById(req.params.id);

  if (!room) {
    return next(new ErrorResponse("No Room found", 404));
  }

  room = await Room.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json({ success: true, data: room });
});

// @desc Delete one Room
// @route GET /put/room/:id
// @access Admin
exports.deleteRoom = asyncHandler(async (req, res, next) => {
  let room = await Room.findById(req.params.id);

  if (!room) {
    return next(new ErrorResponse("No Room found", 404));
  }

  room = await Room.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, data: room });
});
