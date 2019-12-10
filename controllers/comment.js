const Comment = require("../models/Comment");
const Room = require("../models/Room");
const asyncHandler = require("../middlewares/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");
const config = require("config");

// @desc Get comment by Room id
// @route GET /api/rooms/:id/comments
// @access Public
exports.getCommentsByRoomId = asyncHandler(async (req, res, next) => {
  const comments = await Comment.find({ room: req.params.id }).populate({
    path: "user",
    select: "firstName lastName avatar"
  });

  if (!comments) {
    console.log("Fail");
    return next(new ErrorResponse("No comments found", 404));
  }

  res.status(200).json({ success: true, data: comments.reverse() });
});

// @desc Create new comment by Room ID
// @route POST /api/rooms/:id/comments
// @access Private
exports.createNewCommentByRoomID = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  // Add User and Room to the Comment
  req.body.user = req.user;
  req.body.room = await Room.findById(req.params.id);

  if (!req.body.room) {
    return next(new ErrorResponse("Room not found", 404));
  }

  console.log(req.body);

  const comment = await Comment.create(req.body);

  res.status(200).json({ success: true, data: comment });
});

// @desc Update one Room
// @route PUT /api/comments/:id
// @access Private
exports.updateComment = asyncHandler(async (req, res, next) => {
  let comment = await Comment.findById(req.params.commentId);

  if (!comment) {
    return next(new ErrorResponse("No Comment found", 404));
  }

  // Only admin, staff or comment user can update the comment

  if (
    req.user._id !== comment.user._id &&
    (req.user.role !== "admin" || req.user.role !== "staff")
  ) {
    return next(new ErrorResponse("Not Authorized", 401));
  }

  comment = await comment.update(req.body, { new: true, runValidators: true });

  res.status(200).json({ success: true, data: comment });
});

// @desc Delete one Comment
// @route GET /delete/comments/:id
// @access Admin
exports.deleteComment = asyncHandler(async (req, res, next) => {
  let comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(new ErrorResponse("No Comment found", 404));
  }

  // Only admin, staff or comment user can update the comment
  if (
    !req.user._id.equals(comment.user._id) &&
    (req.user.role != "admin" || req.user.role != "staff")
  ) {
    return next(new ErrorResponse("Not Authorized", 401));
  }

  comment = await comment.remove();

  res.status(200).json({ success: true, data: comment });
});
