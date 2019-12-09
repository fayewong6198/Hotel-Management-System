const express = require("express");
const { protected, rolesProtected } = require("../../middlewares/auth");
const {
  getCommentsByRoomId,
  createNewCommentByRoomID,
  updateComment,
  deleteComment
} = require("../../controllers/comment");
const Room = require("../../models/Comment");

const advancedResults = require("../../middlewares/advanceResults");
const router = express.Router({ mergeParams: true });

router
  .route("/:id")
  .put(protected, updateComment)
  .delete(protected, deleteComment);

router
  .route("/")
  .get(getCommentsByRoomId)
  .post(protected, createNewCommentByRoomID);

module.exports = router;
