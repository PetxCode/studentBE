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
app.use("/api/gallary", require("./router/galleryRoute"));
app.use("/api/picture", require("./router/pictureRoute"));
app.use("/api/voteIntructor", require("./router/voteRouter"));
app.use("/api/voteStudent", require("./router/voteStudentRouter"));

const db = mongoose.connection;

db.on("open", () => {
  const observer = db.collection("voteinstructors").watch();

  observer.on("change", (change) => {
    if (change.operationType === "insert") {
      io.emit("instructorsData");
    }
  });
});

db.on("open", () => {
  const observer = db.collection("voteinstructors").watch();

  observer.on("change", (change) => {
    if (change.operationType === "update") {
      console.log(change);
      io.emit("instructorsVote");
    }
  });
});

db.on("open", () => {
  const observer = db.collection("votestudents").watch();

  observer.on("change", (change) => {
    if (change.operationType === "insert") {
      io.emit("studentsData");
    }
  });
});

db.on("open", () => {
  const observer = db.collection("votestudents").watch();

  observer.on("change", (change) => {
    if (change.operationType === "update") {
      io.emit("studentsVote");
    }
  });
});

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

      io.emit("newData", newData);
    }
  });
});

db.on("open", () => {
  const observer = db.collection("pictures").watch();

  observer.on("change", (change) => {
    if (change.operationType === "insert") {
      const newData = {
        _id: change.fullDocument._id,
        image: change.fullDocument.image,
        createAt: change.fullDocument.createAt,
      };
      io.emit("newData", newData);
    }
  });
});

db.on("open", () => {
  const observer = db.collection("pictures").watch();

  observer.on("change", (change) => {
    if (change.operationType === "delete") {
      console.log(change);
      const deleteData = {
        _id: change.documentKey._id,
      };
      io.emit("delete", deleteData);
    }
  });
});

db.on("open", () => {
  const observer = db.collection("gallarys").watch();

  observer.on("change", (change) => {
    if (change.operationType === "insert") {
      const newData = {
        _id: change.fullDocument._id,
        image: change.fullDocument.image,
        createAt: change.fullDocument.createAt,
      };
      console.log(change.fullDocument);
      console.log(change);

      io.emit("addGallary", newData);
    }
  });
});

db.on("open", () => {
  const observer = db.collection("gallarys").watch();

  observer.on("change", (change) => {
    if (change.operationType === "delete") {
      console.log(change);
      const deleteData = {
        _id: change.documentKey._id,
      };
      io.emit("delete", deleteData);
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
