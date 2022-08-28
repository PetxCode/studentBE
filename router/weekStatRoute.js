const express = require("express");
const {
  deleteStat,
  createStat,
  readStat,
  readAllStat,
} = require("../controller/statWeek");
const router = express.Router();

router.route("/:id/:statID/create").post(createStat);
router.route("/:id/:weeklyID/view").get(readStat);
router.route("/:id/view").get(readAllStat);

router.route("/:id/:statID").delete(deleteStat);

module.exports = router;
