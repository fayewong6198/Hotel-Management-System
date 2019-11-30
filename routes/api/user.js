const express = require("express");

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require("../../controllers/user");
const { protected, rolesProtected } = require("../../middlewares/auth");

const router = express.Router();

router
  .route("/")
  .get(protected, rolesProtected("staff", "admin"), getUsers)
  .post(protected, rolesProtected("staff", "admin"), createUser);

router
  .route("/:id")
  .get(protected, rolesProtected("staff", "admin"), getUser)
  .put(protected, rolesProtected("staff", "admin"), updateUser)
  .delete(protected, rolesProtected("staff", "admin"), deleteUser);

module.exports = router;
