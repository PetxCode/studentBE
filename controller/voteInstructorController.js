const mongoose = require("mongoose");
const cloudinary = require("../utils/cloudinary");
const userModel = require("../model/userModel");
const voteInstructorModel = require("../model/voteInstructorModel");

const createVoteEntry = async (req, res) => {
  try {
    const { name, course } = req.body;
    const image = await cloudinary.uploader.upload(req.file.path);
    const newEntry = await voteInstructorModel.create({
      name,
      course,
      role: "Instructor",
      image: image.secure_url,
      imageID: image.public_id,
    });
    res.status(201).json({ message: "Instructor created", data: newEntry });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getAllVoteEntry = async (req, res) => {
  try {
    const newEntry = await voteInstructorModel.find({}).sort({ createdAt: -1 });

    res.status(200).json({ message: "View All Entry", data: newEntry });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getVoteEntry = async (req, res) => {
  try {
    const newEntry = await voteInstructorModel
      .find({})
      .sort({ createdAt: -1 })
      .limit(1);

    res.status(200).json({ message: "created", data: newEntry });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const get2VoteEntry = async (req, res) => {
  try {
    const newEntry = await voteInstructorModel
      .find({})
      .sort({ createdAt: -1 })
      .limit(2);

    res.status(200).json({ message: "created", data: newEntry });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteVoteEntry = async (req, res) => {
  try {
    await voteInstructorModel.deleteMany();
    res.status(200).json({ message: "All Deleted" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const VoteEntry = async (req, res) => {
  try {
    const voted = await voteInstructorModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: { user: req.params.voterID },
      },
      { new: true }
    );

    res.status(201).json({ message: "voted", data: voted });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteVote = async (req, res) => {
  try {
    const voted = await voteInstructorModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { user: req.params.voterID },
      },
      { new: true }
    );

    res.status(201).json({ message: "vote Deleted", data: voted });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  deleteVote,
  createVoteEntry,
  getVoteEntry,
  deleteVoteEntry,
  VoteEntry,
  getAllVoteEntry,
  get2VoteEntry,
};
