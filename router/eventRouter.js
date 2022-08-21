const express = require("express");
const upload = require("../utils/multer");

const {
  deleteEvents,
  createEvent,
  getEvent,
  getEvents,
  editEvent,
  unDoneEvent,
  doneEvent,
} = require("../controller/eventController");
const router = express.Router();

router.route("/:id/done").patch(doneEvent);
router.route("/:id/unDone").patch(unDoneEvent);

router.route("/:id").get(getEvent);

router.route("/").get(getEvents);
router.route("/:id/").delete(deleteEvents);
router.route("/:id/updated").patch(editEvent);
router.route("/create").post(upload, createEvent);

module.exports = router;
