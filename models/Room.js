const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: [true, "Room ID is required"],
    unique: [true, "Room with this ID has already exits"]
  },

  checkInDate: {
    type: Date
  },

  expectedCheckInDate: {
    type: Date
  },

  expectedCheckOutDate: {
    type: Date
  },

  status: {
    type: String,
    enum: ["available", "booked"],
    default: "available"
  },

  numberOfAdults: {
    type: Number,
    required: [true, "Number of aldults is required"],
    min: [1, "Mininum adults is 1"],
    max: [5, "Maximum adults is 5 "],
    default: 2
  },

  numberOfChildren: {
    type: Number,
    required: [true, "Number of children is required"],
    min: [1, "Mininum children is 1"],
    max: [5, "Maximum children is 5 "],
    default: 2
  },

  createdAt: {
    type: Date,
    default: Date.now()
  },

  description: {
    type: String
  }
});

module.exports = mongoose.model("Room", RoomSchema);
