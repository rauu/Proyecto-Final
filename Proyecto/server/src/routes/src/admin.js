const express = require("express");
const router = express.Router();
const controller = require("../../controllers/adminController");


router.get("/", controller.getPDF);
router.post("/registerUser", controller.registerUser);
router.post("/createRoom", controller.createRoom);
router.delete("/deleteRoom", controller.deleteRoom);
router.get("/users", controller.users);
router.put("/updateUserType", controller.updateUserType);
router.delete("/deleteUser", controller.deleteUser);
router.get("/getsearchuser", controller.getSearchUser);
router.delete("/deleteCV", controller.deleteCV);

module.exports = router;
