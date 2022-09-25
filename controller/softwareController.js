const userModel = require("../model/userModel");
const softwareModel = require("../model/softwareModel");

const mongoose = require("mongoose");

const createSoftware = async (req, res) => {
  try {
    const { title } = req.body;

    const getUser = await userModel.findById(req.params.id);
    const interested = new softwareModel({
      title,
    });

    interested.user = getUser;
    interested.save();

    getUser.software.push(mongoose.Types.ObjectId(interested._id));
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

const showAllSoftware = async (req, res) => {
  try {
    const getUser = await userModel.findById(req.params.id).populate({
      path: "software",
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

const showSoftware = async (req, res) => {
  try {
    const getUser = await userModel.findById(req.params.id).populate({
      path: "software",
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

const deleteSoftware = async (req, res) => {
  try {
    const getUser = await userModel.findById(req.params.id);
    const deleteData = await softwareModel.findByIdAndRemove(
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
  showAllSoftware,
  createSoftware,
  showSoftware,
  deleteSoftware,
};
