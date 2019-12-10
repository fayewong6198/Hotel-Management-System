const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ["watting", "checked_in", "checked_out"],
    default: "watting"
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  },
  staff: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  total: {
    type: Number,
    required: true
  },
  checkInDate: {
    type: Date,
    required: true
  },
  checkOutDate: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  room: {
    type: mongoose.Schema.ObjectId,
    ref: "Room",
    required: true
  }
});

module.exports = mongoose.model("Payment", PaymentSchema);
