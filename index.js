const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: { origin: "*" },
  // pingTimeout: 9000
});
const mongoose = require("./utils/db");
const room = {};

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "This is a new built for Students" });
});

app.use("/api/user", require("./router/userRouter"));
app.use("/api/interest", require("./router/interestRoute"));
app.use("/api/software", require("./router/softwareRoute"));
app.use("/api/project", require("./router/projectRoute"));

const db = mongoose.connection;

db.on("open", () => {
  const observer = db.collection("users").watch();

  observer.on("change", (change) => {
    if (change.operationType === "insert") {
      const newData = {
        name: change.fullDocument.name,
        _id: change.fullDocument._id,
        like: change.fullDocument.like,
        createAt: change.fullDocument.createAt,
      };
      // console.log(change.fullDocument);
      // console.log(change);

      io.emit("newEntry", newData);
    }
  });
});

db.on("open", () => {
  const observer = db.collection("users").watch();

  observer.on("change", (change) => {
    if (change.operationType === "update") {
      const newData = {
        _id: change.fullDocument._id,
        online: change.fullDocument.online,
      };
      console.log(change.fullDocument);
      console.log(change);

      io.emit("newLike", newData);
    }
  });
});

server.listen(process.env.PORT || 2400, () => {
  console.log("server is now running");
});
