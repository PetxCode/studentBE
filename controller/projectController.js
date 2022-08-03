const userModel = require("../model/userModel");
const projectModel = require("../model/projectModel");
const stackModel = require("../model/stackModel");

const mongoose = require("mongoose");

const createStack = async (req, res) => {
  try {
    const { title } = req.body;

    const getUser = await projectModel.findById(req.params.stack);
    const interested = new stackModel({
      title,
    });

    interested.project = getUser;
    interested.save();

    getUser.stack.push(mongoose.Types.ObjectId(interested._id));
    getUser.save();

    res.status(201).json({
      status: "stack created successfully",
      data: interested,
    });
  } catch (err) {
    res.status(404).json({
      status: err.message,
    });
  }
};

const showStack = async (req, res) => {
  try {
    const getUser = await projectModel.findById(req.params.stack).populate({
      path: "stack",
      options: {
        // limit: 3,
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

const createProject = async (req, res) => {
  try {
    const { title, capture, desc, url } = req.body;

    const getUser = await userModel.findById(req.params.id);
    const interested = new projectModel({
      title,
      capture,
      desc,
      url,
    });

    interested.user = getUser;
    interested.save();

    getUser.project.push(mongoose.Types.ObjectId(interested._id));
    getUser.save();

    res.status(201).json({
      status: "project created successfully",
      data: interested,
    });
  } catch (err) {
    res.status(404).json({
      status: err.message,
    });
  }
};

const showProject = async (req, res) => {
  try {
    const getUser = await userModel.findById(req.params.id).populate({
      path: "project",
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

const showAllProject = async (req, res) => {
  try {
    const getUser = await userModel.findById(req.params.id).populate({
      path: "project",
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

const deleteProject = async (req, res) => {
  try {
    const getUser = await userModel.findById(req.params.id);
    const deleteData = await projectModel.findByIdAndRemove(req.params.project);

    getUser.project.pull(deleteData);
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
  showAllProject,
  createProject,
  showProject,
  deleteProject,
  createStack,
  showStack,
};
