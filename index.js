const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
require("./utils/db");
const room = {};

app.use(cors());
app.use(express.json());

app.get((req, res) => {
  res.status(200).json({ message: "This is a new built for Students" });
});

app.use("/api/user", require("./router/userRouter"));
app.use("/api/interest", require("./router/interestRoute"));
app.use("/api/software", require("./router/softwareRoute"));
app.use("/api/project", require("./router/projectRoute"));

server.listen(2400, () => {
  console.log("server is now running");
});
