const express = require("express");
const router = express.Router();
const controller = require("../../controllers/trainerProfileController");


 router.get("/", controller.index);
 router.put("/", controller.update);
/*router.get("/getsearchuser", controller.getSearchUser); */

module.exports = router;
