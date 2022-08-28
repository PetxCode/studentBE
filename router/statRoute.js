const express = require("express");
const upload = require("../utils/multer");
const {
  deleteStat,
  createStat,
  readStat,
} = require("../controller/statController");
const router = express.Router();

router.route("/:id/create").post(createStat);
router.route("/:id").get(readStat);

router.route("/:id/:statID").delete(deleteStat);

module.exports = router;
