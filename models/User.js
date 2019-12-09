const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is requied"]
  },

  lastName: {
    type: String,
    required: [true, "Last name is required"]
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "User already exits"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email"
    ]
  },

  role: {
    type: String,
    enum: ["user", "staff"],
    default: "user"
  },

  password: {
    type: String,
    required: true,
    minlength: [5, "Password requied at least 5 character"],
    select: false
  },

  phoneNumber: {
    type: String
  },

  cardNumber: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now()
  },

  address: {
    type: String
  },
  gender: {
    type: String,
    enum: ["male", "female", "none"],
    default: "none"
  },
  avatar: {
    type: String,
    default: ""
  }
});

// Hash password before save
UserSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, config.get("jwtSecret"), {
    expiresIn: config.get("jwtExpires")
  });
};

UserSchema.methods.comparePassword = async function(enteredPassword) {
  console.log(this.password);
  return await bcrypt.compare(enteredPassword, this.password);
  console.log("isMatch: ", isMatch);
};

module.exports = mongoose.model("User", UserSchema);
