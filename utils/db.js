const mongoose = require("mongoose");

const url = "mongodb://localhost/studentsDB";

mongoose.connect(url).then(() => {
  console.log("database now connected");
});

module.exports = mongoose;
