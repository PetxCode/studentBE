const mongoose = require("mongoose");

const stat2Model = mongoose.Schema(
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

module.exports = mongoose.model("stat2s", stat2Model);
