const express = require("express");
const upload = require("../utils/multer");

const {
  deleteEvents,
  createEvent,
  getEvent,
  getEvents,
  editEvent,
} = require("../controller/eventController");
const router = express.Router();

router.route("/:id").get(getEvent);
router.route("/").get(getEvents);
router.route("/:id/").delete(deleteEvents);
router.route("/:id/updated").patch(editEvent);
router.route("/create").post(upload, createEvent);

module.exports = router;
