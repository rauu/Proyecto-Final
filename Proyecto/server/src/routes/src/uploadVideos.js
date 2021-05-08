const express = require("express");
const router = express.Router();
const controller = require("../../controllers/uploadVideoController")


router.get("/getRooms", controller.getRooms);
router.post("/", controller.store);

module.exports = router;
