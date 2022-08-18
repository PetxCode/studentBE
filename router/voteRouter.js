const express = require("express");
const upload = require("../utils/multer");
const {
  showAllGallery,
  deleteVote,
  createVoteEntry,
  getVoteEntry,
  deleteVoteEntry,
  VoteEntry,
  getAllVoteEntry,
} = require("../controller/voteInstructorController");
const router = express.Router();

router.route("/create").post(upload, createVoteEntry);
router.route("/").get(getVoteEntry);
router.route("/viewAll").get(getAllVoteEntry);

router.route("/:id/:voterID/vote").patch(VoteEntry);
router.route("/:id/:voterID/unvote").patch(deleteVote);

router.route("/deleteAll").delete(deleteVoteEntry);

module.exports = router;
