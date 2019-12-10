const express = require("express");
const { protected, rolesProtected } = require("../../middlewares/auth");
const {
  createRoom,
  getRooms,
  getRoom,
  updateRoom,
  deleteRoom,
  uploadRoomImage,
  makePayment
} = require("../../controllers/room");
const Room = require("../../models/Room");

const advancedResults = require("../../middlewares/advanceResults");
const router = express.Router();

// Include other resource router
const commentRouter = require("./comment");

// Re-route into other resources routers
router.use("/:id/comments", commentRouter);

router
  .route("/:id")
  .get(getRoom)
  .put(protected, rolesProtected("staff", "admin"), updateRoom)
  .delete(protected, rolesProtected("staff", "admin"), deleteRoom);

router
  .route("/")
  .post(protected, rolesProtected("staff", "admin"), createRoom)
  .get(advancedResults(Room, ""), getRooms);

router
  .route("/:id/image")
  .put(protected, rolesProtected("staff", "admin"), uploadRoomImage);

router.route("/:id/payment").post(protected, makePayment);

module.exports = router;
