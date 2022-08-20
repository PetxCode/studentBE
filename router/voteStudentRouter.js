const express = require("express");
const upload = require("../utils/multer");
const {
  deleteVote,
  createVoteEntry,
  getVoteEntry,
  deleteVoteEntry,
  VoteEntry,
  getAllVoteEntry,
  get2VoteEntry,
  Vote,
} = require("../controller/voteStudentController");
const router = express.Router();

router.route("/create").post(upload, createVoteEntry);
router.route("/").get(getVoteEntry);
router.route("/viewAll").get(getAllVoteEntry);
router.route("/view2").get(get2VoteEntry);
router.route("/:id").get(Vote);

router.route("/:id/:voterID/vote").patch(VoteEntry);
router.route("/:id/:voterID/unvote").patch(deleteVote);

router.route("/deleteAll").delete(deleteVoteEntry);

module.exports = router;
