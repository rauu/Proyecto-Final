const express = require("express");
const router = express.Router();
const controller = require("../../controllers/allTrainersController");


router.get("/", controller.index);
router.get("/getsearchuser", controller.getSearchUser);

module.exports = router;
