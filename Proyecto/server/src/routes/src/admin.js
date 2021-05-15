const express = require("express");
const router = express.Router();
const controller = require("../../controllers/adminController");


router.get("/", controller.getPDF);
router.post("/registerUser", controller.registerUser);
router.post("/createRoom", controller.createRoom);
router.delete("/deleteRoom", controller.deleteRoom);
router.get("/users", controller.users);

module.exports = router;
