const express = require("express");
const router = express.Router();
const controller = require("../../controllers/exerciseRoomVideosController")


router.get("/", controller.index);
router.get("/roomName", controller.roomName);

module.exports = router;
