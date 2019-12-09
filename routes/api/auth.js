const express = require("express");

const router = express.Router();

const {
  register,
  login,
  loadUser,
  getCurrentProfile,
  updateProfile,
  uploadAvatar
} = require("../../controllers/auth");
const { protected } = require("../../middlewares/auth");

router.route("/register").post(register);
router.route("/login").post(login);
router
  .route("/")
  .get(protected, loadUser)
  .get(protected, getCurrentProfile)
  .put(protected, updateProfile);
router.route("/avatar").put(protected, uploadAvatar);
module.exports = router;
