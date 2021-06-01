const express = require("express");
const router = express.Router();
const controller = require("../../controllers/videoConteoller")


router.get("/", controller.index);
router.delete("/videoDelete", controller.videoDelete);

module.exports = router;
