const mongoose = require("mongoose");

const userModel = mongoose.Schema(
  {
    code: {
      type: String,
    },
    sponor: {
      type: String,
    },
    promise: {
      type: String,
    },
    video: {
      type: String,
    },
    verified: {
      type: Boolean,
    },
    online: {
      type: Boolean,
    },
    experience: {
      type: Number,
    },
    phone: {
      type: Number,
    },
    motivation: {
      type: String,
    },
    futureAmbition: {
      type: String,
    },
    aboutYou: {
      type: String,
    },
    secret: {
      type: String,
    },
    token: {
      type: String,
    },
    userName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
    },
    avatarID: {
      type: String,
    },

    interest: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "interests",
      },
    ],
    software: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "softwares",
      },
    ],
    stat: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "stats",
      },
    ],
    stat2: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "stat2s",
      },
    ],
    learning: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "learnings",
      },
    ],
    project: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "projects",
      },
    ],
    gallary: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "gallarys",
      },
    ],
    voteInstructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "voteInstructors",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userModel);
