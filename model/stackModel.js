const mongoose = require("mongoose");

const stackModel = mongoose.Schema(
  {
    title: {
      type: String,
    },

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "projects",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("stacks", stackModel);
