const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");

const cloudinary = require("../utils/cloudinary");
const crypto = require("crypto");
const {
  resetUserPassword,
  verifiedUser,
  verifiedSignUser,
} = require("../utils/email");

const viewUsers = async (req, res) => {
  try {
    const view = await userModel.find();
    res.status(200).json({
      message: "found",
      data: view,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const viewUser = async (req, res) => {
  try {
    const view = await userModel.findById(req.params.id);
    res.status(200).json({
      message: "found",
      data: view,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await userModel.findByIdAndRemove(req.params.id);
    res.status(200).json({
      message: "deleted",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateUserImage = async (req, res) => {
  try {
    const image = await cloudinary.uploader.upload(req.file.path);
    console.log(req.file.path, image);

    const viewUser = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        avatar: image.secure_url,
        avatarID: image.public_id,
      },
      { new: true }
    );
    res.status(200).json({
      message: "church updated",
      data: viewUser,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateUserLogo = async (req, res) => {
  try {
    const image = await cloudinary.uploader.upload(req.file.path);
    console.log(req.file.path, image);

    const viewUser = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        logo: image.secure_url,
        logoID: image.public_id,
      },
      { new: true }
    );
    res.status(200).json({
      message: "church Logo updated",
      data: viewUser,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const onlineInfo = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);

    if (user) {
      const viewUser = await userModel.findByIdAndUpdate(
        user._id,
        {
          online: true,
        },
        { new: true }
      );
      res.status(200).json({
        message: "user is online",
        data: viewUser,
      });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { secret, email, password, code } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const token = crypto.randomBytes(2).toString("hex");
    const accessToken = jwt.sign({ token }, "ThisisOneChurchProject");

    if (code === "CodeLab@2022") {
      const user = await userModel.create({
        code,
        email,
        password: hashed,
        secret: token,
        token: accessToken,
      });

      verifiedUser(email, user._id, accessToken)
        .then((result) => {
          console.log("sent: ", result);
        })
        .catch((error) => {
          console.log(error);
        });

      res.status(200).json({
        message: "check you email",
        data: viewUser,
      });
    } else {
      res.status(404).json({ message: "You code pass isn't correct" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const verifyUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);

    if (user) {
      if (user.token !== "") {
        await userModel.findByIdAndUpdate(
          user._id,
          {
            token: "",
            verified: true,
          },
          { new: true }
        );

        res.status(200).json({
          message: "You can now sign in",
        });
      } else {
        res.status(404).json({ message: "sorry you can't do this" });
      }
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const signinUser = async (req, res) => {
  try {
    const { secret, email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (user) {
      const check = await bcrypt.compare(password, user.password);
      if (check) {
        if (user.verified && user.token === "") {
          if (secret === user.secret) {
            const { password, ...info } = user._doc;
            const myToken = jwt.sign(
              {
                _id: user._id,
                status: user.status,
              },
              "Let'sGetinNOW...",
              { expiresIn: "2d" }
            );

            res
              .status(201)
              .json({ message: "welcome back", data: { myToken, ...info } });
          } else {
            res.status(404).json({ message: "Your secret code isn't correct" });
          }
        } else {
          const token = crypto.randomBytes(2).toString("hex");
          const accessToken = jwt.sign({ token }, "ThisisOneChurchProject");

          await userModel.findByIdAndUpdate(
            user._id,
            { token: accessToken },
            { new: true }
          );
          verifiedSignUser(email, user, accessToken)
            .then((result) => {
              console.log("message sent again: ", result);
            })
            .catch((error) => console.log(error));
        }
      } else {
        res.status(404).json({ message: "Password isn't correct" });
      }
    } else {
      res.status(404).json({ message: "no user found" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });
    if (user) {
      if (user.verified && user.token === "") {
        const token = crypto.randomBytes(5).toString("hex");
        const accessToken = jwt.sign({ token }, "ThisisOneChurchProject");

        await userModel.findByIdAndUpdate(
          user._id,
          { token: accessToken },
          { new: true }
        );
        resetUserPassword(email, user._id, accessToken)
          .then((result) => {
            console.log("message sent again: ", result);
          })
          .catch((error) => console.log(error));

        res.status(200).json({
          message: "Check your email to continue",
        });
      } else {
        res
          .status(404)
          .json({ message: "You do not have enough right to do this!" });
      }
    } else {
      res.status(404).json({ message: "user can't be found" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { password } = req.body;
    const user = await userModel.findById(req.params.id);
    if (user) {
      if (user.verified && user.token === req.params.token) {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        await userModel.findByIdAndUpdate(
          user._id,
          {
            token: "",
            password: hashed,
          },
          { new: true }
        );
      }
    } else {
      res.status(404).json({ message: "operation can't be done" });
    }

    res.status(200).json({
      message: "password changed",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  changePassword,
  resetPassword,
  deleteUser,
  onlineInfo,
  updateUserImage,
  viewUsers,
  verifyUser,
  createUser,
  viewUser,
  signinUser,
  //   deleteMember,
  updateUserLogo,
};
