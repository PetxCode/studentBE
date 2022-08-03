const express = require("express");
const upload = require("../utils/multer");
const {
  showAllProject,
  createProject,
  showProject,
  deleteProject,
  createStack,
  showStack,
} = require("../controller/projectController");
const router = express.Router();

router.route("/:id/:stack/stack/create").post(createStack);
router.route("/:id/:stack/stack").get(showStack);

router.route("/:id/limit").get(showProject);
router.route("/:id").get(showAllProject);
router.route("/:id/:project").delete(deleteProject);
router.route("/:id/create").post(createProject);

module.exports = router;

// "desc": "A Real Time Chat Application",
//     "url": "www.google.com",
//     "capture": "web app"
