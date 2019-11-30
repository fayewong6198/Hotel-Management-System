const express = require("express");

const {
  getStaff,
  getStaffs,
  createStaff,
  updateStaff,
  deleteStaff
} = require("../../controllers/staff");
const { protected, rolesProtected } = require("../../middlewares/auth");

const router = express.Router();

router
  .route("/")
  .get(protected, rolesProtected("admin"), getStaffs)
  .post(protected, rolesProtected("admin"), createStaff);

router
  .route("/:id")
  .get(protected, rolesProtected("admin"), getStaff)
  .put(protected, rolesProtected("admin"), updateStaff)
  .delete(protected, rolesProtected("admin"), deleteStaff);

module.exports = router;
