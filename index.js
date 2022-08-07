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
app.use("/api/learning", require("./router/learningRoute"));

const db = mongoose.connection;

db.on("open", () => {
  const observer = db.collection("users").watch();

  observer.on("change", (change) => {
    if (change.operationType === "update") {
      const online = {
        online: change.updateDescription.updatedFields.online,
        updatedAt: change.updateDescription.updatedFields.updatedAt,
      };
      io.emit("online", online);
    }
  });
});

db.on("open", () => {
  const observer = db.collection("stacks").watch();

  observer.on("change", (change) => {
    if (change.operationType === "insert") {
      const newData = {
        _id: change.fullDocument._id,
        title: change.fullDocument.title,
        createAt: change.fullDocument.createAt,
      };
      console.log(change.fullDocument);
      console.log(change);

      io.emit("newData", newData);
    }
  });
});

io.on("connection", (socket) => {
  // console.log("a user connected", socket.id);

  socket.on("disconnect", () => {
    console.log("user has been disconnected");
  });

  socket.emit("chat message", (text) => {
    console.log(text);
  });
});

server.listen(process.env.PORT || 2400, () => {
  console.log("server is now running");
});
