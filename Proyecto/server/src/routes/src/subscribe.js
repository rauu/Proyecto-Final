const express = require("express");
const router = express.Router();
const controller = require("../../controllers/subscribeController");

router.get("/getPlans", controller.getPlans);
router.get("/trainerExists", controller.userExists);
/*router.get("/getsearchuser", controller.getSearchUser); */

module.exports = router;
