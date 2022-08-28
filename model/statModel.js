const mongoose = require("mongoose");

const statModel = mongoose.Schema(
  {
    rate: {
      type: Number,
    },
    course: {
      type: String,
    },

    rate1: {
      type: Number,
    },
    course1: {
      type: String,
    },

    rate2: {
      type: Number,
    },
    course2: {
      type: String,
    },

    rate3: {
      type: Number,
    },
    course3: {
      type: String,
    },

    rate4: {
      type: Number,
    },
    course4: {
      type: String,
    },

    rate5: {
      type: Number,
    },
    course5: {
      type: String,
    },

    sum: {
      type: Number,
    },

    weekly: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "weeklys",
      },
    ],

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("stats", statModel);
