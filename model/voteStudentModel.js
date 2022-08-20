const mongoose = require("mongoose");

const voteStudentModel = mongoose.Schema(
  {
    voter: {
      type: Number,
    },
    name: {
      type: String,
    },
    role: {
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

module.exports = mongoose.model("voteStudents", voteStudentModel);
