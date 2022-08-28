const userModel = require("../model/userModel");
const statModel = require("../model/statModel");
const mongoose = require("mongoose");

const createStat = async (req, res) => {
  try {
    const {
      rate,
      rate1,
      rate2,
      rate3,
      rate4,
      rate5,

      course,
      course1,
      course2,
      course3,
      course4,
      course5,
    } = req.body;

    const getUser = await userModel.findById(req.params.id);
    const addStat = await new statModel({
      rate,
      rate1,
      rate2,
      rate3,
      rate4,
      rate5,

      course,
      course1,
      course2,
      course3,
      course4,
      course5,

      sum: Math.ceil((rate + rate1 + rate2 + rate3 + rate4 + rate5) / 6),
    });

    addStat.user = getUser;
    addStat.save();

    getUser.stat.push(mongoose.Types.ObjectId(addStat._id));
    getUser.save();

    res.status(201).json({
      status: "stat record has been added successfully",
      data: addStat,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const readStat = async (req, res) => {
  try {
    const getStat = await userModel.findById(req.params.id).populate({
      path: "stat",
      options: { createdAt: -1 },
    });
    res.status(201).json({
      status: "stat record has been added successfully",
      data: getStat,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteStat = async (req, res) => {
  try {
    const getStat = await userModel.findById(req.params.id);

    const deleteState = await statModel.findByIdAndRemove(req.params.statID);

    getStat.stat.pull(deleteState);
    getStat.save();

    res.status(200).json({
      status: "Stat Deleted",
      data: getStat,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  deleteStat,
  createStat,
  readStat,
};
