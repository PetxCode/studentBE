const mongoose = require("mongoose");

const gallaryModel = mongoose.Schema(
  {
    image: {
      type: String,
    },
    imageID: {
      type: String,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("gallarys", gallaryModel);
