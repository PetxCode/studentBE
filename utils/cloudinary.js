const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dv4dlmp4e",
  api_key: "464513458841612",
  api_secret: "VxFfeGaNMPPudxcq0GWcsh6zfRk",
  secure: true,
});

module.exports = cloudinary;
