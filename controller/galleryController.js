const userModel = require("../model/userModel");
const interestModel = require("../model/galleryModel");
const mongoose = require("mongoose");
const cloudinary = require("../utils/cloudinary");
const { createLearning } = require("./learningController");

const createGallery = async (req, res) => {
  try {
    const image = await cloudinary.uploader.upload(req.file.path);
    console.log(image.secure_url);

    const getUser = await userModel.findById(req.params.id);
    const interested = new interestModel({
      image: image.secure_url,
      imageID: image.public_id,
    });

    interested.user = getUser;
    interested.save();

    getUser.gallary.push(mongoose.Types.ObjectId(interested._id));
    getUser.save();

    res.status(201).json({
      status: "gallary added successfully",
      data: interested,
    });
  } catch (err) {
    res.status(404).json({
      status: err.message,
    });
  }
};

const showGallery = async (req, res) => {
  try {
    const getUser = await userModel.findById(req.params.id).populate({
      path: "gallary",
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

const showAllGallery = async (req, res) => {
  try {
    const getUser = await userModel.findById(req.params.id).populate({
      path: "gallary",
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

const deleteGallery = async (req, res) => {
  try {
    const getUser = await userModel.findById(req.params.id);
    const deleteData = await interestModel.findByIdAndRemove(
      req.params.gallary
    );

    getUser.gallary.pull(deleteData);
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
  showAllGallery,
  createGallery,
  showGallery,
  deleteGallery,
};
