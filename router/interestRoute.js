const express = require("express");
const upload = require("../utils/multer");
// const logo = require("../utils/logo");
const {
  showAllInterest,
  createInterest,
  showInterest,
  deleteInterest,
} = require("../controller/interestController");
const router = express.Router();

router.route("/:id/limit").get(showInterest);
router.route("/:id").get(showAllInterest);
router.route("/:id/:interest").delete(deleteInterest);
router.route("/:id/create").post(createInterest);

module.exports = router;
