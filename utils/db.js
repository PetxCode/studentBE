const mongoose = require("mongoose");

const url = "mongodb://localhost/studentsDB";
const url2 =
  "mongodb+srv://newStudent:newStudent@cluster0.gkpjkup.mongodb.net/studentDB?retryWrites=true&w=majority";

mongoose.connect(url2).then(() => {
  console.log("database now connected");
});

module.exports = mongoose;
