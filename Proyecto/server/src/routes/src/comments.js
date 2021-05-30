const express = require("express");
const router = express.Router();
const controller = require("../../controllers/commentsController");


router.post("/newsComment", controller.UploadNewsComment);
router.get("/newsComments", controller.GetNewsComment);
router.delete("/deleteNewsComment", controller.DeleteNewsComment);

module.exports = router;
