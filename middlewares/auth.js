const User = require("../models/User");
const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");
const config = require("config");

exports.protected = asyncHandler(async (req, res, next) => {
  let token;

  console.log(req.headers);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("You have to login", 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    console.log(decoded);

    // Set req.user
    req.user = await User.findById(decoded.id);

    next();
  } catch (error) {
    return next(new ErrorResponse("You have to login", 401));
  }
});

// Role access
exports.rolesProtected = (...roles) => {
  return (req, res, next) => {
    console.log(req.user.role);
    if (!roles.includes(req.user.role)) {
      return next(new ErrorResponse("You can not access this route", 401));
    }
    next();
  };
};
