const express = require("express");
const {
  deleteStat,
  createStat,
  readStat,
} = require("../controller/stat2Controller");
const router = express.Router();

router.route("/:id/create").post(createStat);
router.route("/:id").get(readStat);

router.route("/:id/:statID").delete(deleteStat);

module.exports = router;
