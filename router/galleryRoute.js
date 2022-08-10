const express = require("express");
const upload = require("../utils/multer");
// const logo = require("../utils/logo");
const {
  showAllGallery,
  createGallery,
  showGallery,
  deleteGallery,
} = require("../controller/galleryController");
const router = express.Router();

router.route("/:id/limit").get(showGallery);
router.route("/:id").get(showAllGallery);
router.route("/:id/:gallary").delete(deleteGallery);
router.route("/:id/create").post(upload, createGallery);

module.exports = router;
