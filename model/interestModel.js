const mongoose = require("mongoose");

const interestModel = mongoose.Schema(
  {
    title: {
      type: String,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("interests", interestModel);
