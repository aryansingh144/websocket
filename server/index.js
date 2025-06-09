const cors = require("cors");
const express = require("express");
const { Server } = require("socket.io");

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
const server = require("http").createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.use(addUser);

function addUser(socket, next) {
  const user = socket.handshake.auth.token;
  if (user) {
    try {
      socket.data = { ...socket.data, user: user };
    } catch (err) {}
  }
  next();
}

const poll = {
  question: "Vote for one of the best leader?",
  options: [
    {
      id: 1,
      text: "Adarsh",
      votes: [],
    },
    {
      id: 2,
      text: "Ayush",
      votes: [],
    },
    {
      id: 3,
      text: "Vansh",
      votes: [],
    },
    {
      id: 4,
      text: "Anshima",
      votes: [],
    },
    {
      id: 5,
      text: "Aryan",
      votes: [],
    },
    {
      id: 6,
      text: "Siddharth",
      votes: [],
    },
  ],
};

io.on("connection", (socket) => {
  console.log("a user connected", socket.data.user);

  socket.on("updateState", () => {
    console.log("client asked For State Update");
    socket.emit("updateState", poll);
  });

  socket.on("vote", (optionId) => {
    poll.options.forEach((option) => {
      option.votes = option.votes.filter((user) => user !== socket.data.user);
    });
    const option = poll.options.find((o) => o.id === optionId);
    if (!option) {
      return;
    }
    option.votes.push(socket.data.user);
    io.emit("updateState", poll);
  });

  socket.on("disconnect", () => {
    console.log("user is disconnected");
  });
});

server.listen(8000, () => {
  console.log("listening on Port:8000");
});