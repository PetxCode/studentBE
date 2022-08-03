const mongoose = require("mongoose");

const projectModel = mongoose.Schema(
  {
    title: {
      type: String,
    },

    captured: {
      type: String,
    },

    desc: {
      type: String,
    },

    url: {
      type: String,
    },

    stack: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "stacks",
      },
    ],

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("projects", projectModel);
