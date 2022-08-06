const userModel = require("../model/userModel");
const interestModel = require("../model/learningModel");
const mongoose = require("mongoose");

const createLearning = async (req, res) => {
  try {
    const { title, useCase, desc, course } = req.body;

    const getUser = await userModel.findById(req.params.id);
    const interested = new interestModel({
      title,
      useCase,
      desc,
      course,
    });

    interested.user = getUser;
    interested.save();

    getUser.learning.push(mongoose.Types.ObjectId(interested._id));
    getUser.save();

    res.status(201).json({
      status: "learning created successfully",
      data: interested,
    });
  } catch (err) {
    res.status(404).json({
      status: err.message,
    });
  }
};

const showLearning = async (req, res) => {
  try {
    const getUser = await userModel.findById(req.params.id).populate({
      path: "learning",
      options: {
        limit: 3,
        sort: { createdAt: -1 },
      },
    });

    res.status(200).json({
      status: "successful",
      data: getUser,
    });
  } catch (err) {
    res.status(404).json({
      status: err.message,
    });
  }
};

const showAllLearning = async (req, res) => {
  try {
    const getUser = await userModel.findById(req.params.id).populate({
      path: "learning",
      options: {
        sort: { createdAt: -1 },
      },
    });

    res.status(200).json({
      status: "successful",
      data: getUser,
    });
  } catch (err) {
    res.status(404).json({
      status: err.message,
    });
  }
};

const deleteLearning = async (req, res) => {
  try {
    const getUser = await userModel.findById(req.params.id);
    const deleteData = await interestModel.findByIdAndRemove(
      req.params.interest
    );

    getUser.learning.pull(deleteData);
    getUser.save();

    res.status(200).json({
      status: "deleted",
      data: getUser,
    });
  } catch (err) {
    res.status(404).json({
      status: err.message,
    });
  }
};

module.exports = {
  showAllLearning,
  createLearning,
  showLearning,
  deleteLearning,
};
