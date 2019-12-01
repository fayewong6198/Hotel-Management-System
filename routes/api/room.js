const express = require("express");
const { protected, rolesProtected } = require("../../middlewares/auth");
const {
  createRoom,
  getRooms,
  getRoom,
  updateRoom,
  deleteRoom
} = require("../../controllers/room");
const Room = require("../../models/Room");

const advancedResults = require("../../middlewares/advanceResults");
const router = express.Router();

router
  .route("/:id")
  .get(getRoom)
  .put(protected, rolesProtected("staff", "admin"), updateRoom)
  .delete(protected, rolesProtected("staff", "admin"), deleteRoom);

router
  .route("/")
  .post(protected, rolesProtected("staff", "admin"), createRoom)
  .get(advancedResults(Room, ""), getRooms);

module.exports = router;
