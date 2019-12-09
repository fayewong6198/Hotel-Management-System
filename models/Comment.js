const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    minlength: [5, "Comment must at least have 5 charaters"],
    maxlength: [1000, "Too long"],
    trim: true,
    required: [true, "Comment can not be blank"]
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  },

  room: {
    type: mongoose.Schema.ObjectId,
    ref: "Room",
    required: true
  }
});

module.exports = mongoose.model("Comment", CommentSchema);
