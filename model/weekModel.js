const mongoose = require("mongoose");

const weeklyModel = mongoose.Schema(
  {
    status: {
      type: Number,
    },

    stat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "stats",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("weeklys", weeklyModel);
