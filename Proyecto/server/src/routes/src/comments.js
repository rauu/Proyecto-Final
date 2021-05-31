const express = require("express");
const router = express.Router();
const controller = require("../../controllers/commentsController");


router.post("/newsComment", controller.UploadNewsComment);
router.get("/newsComments", controller.GetNewsComment);
router.delete("/deleteNewsComment", controller.DeleteNewsComment);

router.post("/videoComment", controller.UploadVideoComment);
router.get("/videoComments", controller.GetVideoComment);
router.delete("/deleteVideoComment", controller.DeleteVideoComment);

module.exports = router;
