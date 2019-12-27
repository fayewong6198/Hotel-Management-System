const Room = require("../models/Room");
const Payment = require("../models/Payment");
const asyncHandler = require("../middlewares/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");
const config = require("config");

// @desc Get all Rooms
// @route GET /api/rooms/
// @access Public
exports.getRooms = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc Get one Room
// @route GET /api/rooms/:id
// @access Public
exports.getRoom = asyncHandler(async (req, res, next) => {
  const room = await Room.findById(req.params.id);

  if (!room) {
    console.log("Fail");
    return next(new ErrorResponse("No Room found", 404));
  }

  res.status(200).json({ success: true, data: room });
});

// @desc Create new Room
// @route POST /api/rooms/
// @access Admin
exports.createRoom = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const room = await Room.create(req.body);

  res.status(200).json({ success: true, data: room });
});

// @desc Update one Room
// @route GET /put/rooms/:id
// @access Admin
exports.updateRoom = asyncHandler(async (req, res, next) => {
  const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!room) {
    return next(new ErrorResponse("No Room found", 404));
  }

  res.status(200).json({ success: true, data: room });
});

// @desc Delete one Room
// @route GET /put/rooms/:id
// @access Admin
exports.deleteRoom = asyncHandler(async (req, res, next) => {
  let room = await Room.findById(req.params.id);

  if (!room) {
    return next(new ErrorResponse("No Room found", 404));
  }

  room = await Room.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, data: room });
});

// Upload Room Image
// @desc Update user by id
// @route PUT /api/rooms/:id/image
// @access admin, staff
exports.uploadRoomImage = asyncHandler(async (req, res, next) => {
  const room = await Room.findById(req.params.id);

  if (!room) {
    return next(new ErrorResponse("Room not found", 404));
  }

  if (!req.files) {
    return next(new ErrorResponse("File not found", 404));
  }

  const file = req.files.image;

  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse("Only upload image file", 404));
  }

  // File size
  if (file.size > config.get("MAX_FILE_UPLOAD")) {
    return next(new ErrorResponse("File too large", 404));
  }

  // Create custom file name
  const ext = file.name.split(".")[1];
  file.name = `image_${room._id}.${ext}`;

  console.log("cc");
  file.mv(`${config.get("FILE_UPLOAD_PATH")}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse("File too large", 404));
    }

    await Room.findByIdAndUpdate(
      req.params.id,
      { image: file.name },
      { new: true, runValidators: true }
    );
  });

  res.status(200).json({
    success: true,
    data: file.name
  });
});

// @desc Booking room
// @route POST /api/rooms/:id/payment
// @access Private
exports.makePayment = asyncHandler(async (req, res, next) => {
  const room = await Room.findById(req.params.id);

  if (!room) {
    return next(new ErrorResponse("Room not found", 404));
  }

  const payments = await Payment.find({
    room: room,
    $or: [{ status: "watting" }, { status: "checked_in" }]
  });

  const check_in_date = new Date(req.body.checkInDate);
  const check_out_date = new Date(req.body.checkOutDate);

  if (payments) {
    for (let i = 0; i < payments.length; i++) {
      if (
        (check_in_date >= payments[i].checkInDate &&
          check_in_date <= payments[i].checkOutDate) ||
        (check_out_date >= payments[i].checkInDate &&
          check_out_date <= payments[i].checkOutDate) ||
        (payments[i].checkInDate >= check_in_date &&
          payments[i].checkInDate <= check_out_date)
      ) {
        console.log("Dupplicate in Date");
        return next(new ErrorResponse("Duplicate in Date", 401));
      }
    }
  }

  req.body.room = room;
  req.body.user = req.user;

  console.log("-------------------------------------------------------");

  const payment = await Payment.create(req.body);

  console.log(payment);
  res.status(200).json({
    success: true,
    data: payment
  });
});
