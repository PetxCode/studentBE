const express = require("express");
const {
  showAllLearning,
  createLearning,
  showLearning,
  deleteLearning,
} = require("../controller/learningController");
const router = express.Router();

router.route("/:id/limit").get(showLearning);
router.route("/:id").get(showAllLearning);
router.route("/:id/:interest").delete(deleteLearning);
router.route("/:id/create").post(createLearning);

module.exports = router;
