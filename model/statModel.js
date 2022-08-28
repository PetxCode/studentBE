const mongoose = require("mongoose");

const learningModel = mongoose.Schema(
  {
    rate: {
      type: Number,
    },

    Course: {
      type: String,
    },
    rate1: {
      type: Number,
    },

    Course1: {
      type: String,
    },

    rate2: {
      type: Number,
    },

    Course2: {
      type: String,
    },

    rate3: {
      type: Number,
    },

    Course3: {
      type: String,
    },

    rate4: {
      type: Number,
    },

    Course4: {
      type: String,
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

module.exports = mongoose.model("learnings", learningModel);
