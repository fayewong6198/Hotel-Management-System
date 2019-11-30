const express = require("express");

const router = express.Router();

const { register, login, loadUser } = require("../../controllers/auth");
const { protected } = require("../../middlewares/auth");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/").get(protected, loadUser);
module.exports = router;
