const express = require("express");
const upload = require("../utils/multer");
// const logo = require("../utils/logo");
const {
  changePassword,
  resetPassword,
  deleteUser,
  onlineInfo,
  updateUserImage,
  viewUsers,
  verifyUser,
  createUser,
  viewUser,
  signinUser,
  updateInfo,
  offlineInfo,
} = require("../controller/userController");
const router = express.Router();

router.route("/").get(viewUsers);
router.route("/register").post(createUser);

router.route("/signin").post(signinUser);

router.route("/:id/:token").get(verifyUser);

router.route("/reset").post(resetPassword);
router.route("/change/:id/:token").post(changePassword);

router.route("/:id/image").patch(upload, updateUserImage);

router.route("/:id/online").patch(onlineInfo);
router.route("/:id/offline").patch(offlineInfo);
router.route("/:id/update").patch(updateInfo);
router.route("/:id").get(viewUser).delete(deleteUser);
router.route("/:id").get(viewUser).delete(deleteUser);

module.exports = router;
