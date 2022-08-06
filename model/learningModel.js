const mongoose = require("mongoose");

const learningModel = mongoose.Schema(
  {
    title: {
      type: String,
    },

    desc: {
      type: String,
    },

    course: {
      type: String,
    },

    useCase: {
      type: String,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("learnings", learningModel);
