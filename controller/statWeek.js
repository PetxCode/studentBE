const userModel = require("../model/userModel");
const weekModel = require("../model/weekModel");
const statModel = require("../model/statModel");
const mongoose = require("mongoose");

const createStat = async (req, res) => {
  try {
    const getData = await statModel.findById(req.params.statID);
    console.log(getData.rate);

    const getUser = await statModel.findById(req.params.statID);
    const addStat = await new weekModel({
      status: Math.ceil(
        (getData.rate +
          getData.rate1 +
          getData.rate2 +
          getData.rate3 +
          getData.rate4 +
          getData.rate5) /
          6
      ),
    });

    addStat.user = getUser;
    addStat.save();

    getUser.weekly.push(mongoose.Types.ObjectId(addStat._id));
    getUser.save();

    res.status(201).json({
      status: "creating weekly data successfully",
      data: addStat,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const readStat = async (req, res) => {
  try {
    const getStat = await statModel.findById(req.params.weeklyID).populate({
      path: "weekly",
      options: { createdAt: -1 },
    });
    res.status(201).json({
      status: "viewing weekly data successfully",
      data: getStat,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const readAllStat = async (req, res) => {
  try {
    const getStat = await statModel.findById(req.params.id).populate({
      path: "weekly",
      options: { createdAt: -1 },
    });
    res.status(201).json({
      status: "viewing weekly data successfully",
      data: getStat,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteStat = async (req, res) => {
  try {
    const getStat = await statModel.findById(req.params.id);

    const deleteState = await weekModel.findByIdAndRemove(req.params.statID);

    getStat.stat.pull(deleteState);
    getStat.save();

    res.status(200).json({
      status: "Weekly Stat Deleted",
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
  readAllStat,
};
