const userModel = require("../model/userModel");
const interestModel = require("../model/interestModel");
const mongoose = require("mongoose");
const createInterest = async (req, res) => {
  try {
    const { title } = req.body;

    const getUser = await userModel.findById(req.params.id);
    const interested = new interestModel({
      title,
    });

    interested.user = getUser;
    interested.save();

    getUser.interest.push(mongoose.Types.ObjectId(interested._id));
    getUser.save();

    res.status(201).json({
      status: "interest created successfully",
      data: interested,
    });
  } catch (err) {
    res.status(404).json({
      status: err.message,
    });
  }
};

const showInterest = async (req, res) => {
  try {
    const getUser = await userModel.findById(req.params.id).populate({
      path: "interest",
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

const showAllInterest = async (req, res) => {
  try {
    const getUser = await userModel.findById(req.params.id).populate({
      path: "interest",
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

const deleteInterest = async (req, res) => {
  try {
    const getUser = await userModel.findById(req.params.id);
    const deleteData = await interestModel.findByIdAndRemove(
      req.params.interest
    );

    getUser.interest.pull(deleteData);
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
  showAllInterest,
  createInterest,
  showInterest,
  deleteInterest,
};
