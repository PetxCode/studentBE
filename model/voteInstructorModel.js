const mongoose = require("mongoose");

const voteInstructorModel = mongoose.Schema(
  {
    name: {
      type: String,
    },
    role: {
      type: String,
    },
    course: {
      type: String,
    },
    image: {
      type: String,
    },
    imageID: {
      type: String,
    },

    user: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("voteInstructors", voteInstructorModel);
