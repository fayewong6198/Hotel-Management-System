const express = require("express");
const { protected, rolesProtected } = require("../../middlewares/auth");
const {
  getPayments,
  getPayment,
  getUserPayments
} = require("../../controllers/payments");

const Payment = require("../../models/Payment");

const advancedResults = require("../../middlewares/advanceResults");
const router = express.Router();

router.route("/").get(protected, rolesProtected("admin", "staff"), getPayments);
router.route("/user").get(protected, getUserPayments);
router.route("/:id").get(protected, getPayment);
module.exports = router;
