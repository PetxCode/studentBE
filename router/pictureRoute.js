const express = require("express");
const upload = require("../utils/multer");

const {
  deletePictures,
  createPicture,
  getPicture,
  getPictures,
} = require("../controller/pictureControllerer");
const router = express.Router();

router.route("/:id").get(getPicture);
router.route("/").get(getPictures);
router.route("/:id/").delete(deletePictures);
router.route("/create").post(upload, createPicture);

module.exports = router;
