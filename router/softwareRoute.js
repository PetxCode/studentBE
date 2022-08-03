const express = require("express");
const upload = require("../utils/multer");
// const logo = require("../utils/logo");
const {
  createSoftware,
  showSoftware,
  deleteSoftware,
  showAllSoftware,
} = require("../controller/softwareController");
const router = express.Router();

router.route("/:id/limit").get(showSoftware);
router.route("/:id").get(showAllSoftware);
router.route("/:id/:software").delete(deleteSoftware);
router.route("/:id/create").post(createSoftware);

module.exports = router;
