const mongoose = require("mongoose");

const eventModel = mongoose.Schema(
  {
    title: {
      type: String,
    },
    desc: {
      type: String,
    },
    date: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("eventNotes", eventModel);
