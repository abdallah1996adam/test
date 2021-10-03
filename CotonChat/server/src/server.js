require("dotenv").config();

const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const morgan = require("morgan");
const { Server } = require("socket.io");

app.use(cors());
app.use(morgan("dev"));
//Création d'un serveur http pour socket.io
const server = http.createServer(app);
//Configuration de socket.io pour accepter l'appel http du Front-End
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
//Connexion à la socket.io
io.on("connection", (socket) => {
  //   console.log("User is connected ", socket.id);

  //Lorsque l'utilisateur rejoint un chat
  socket.on("join_chat", (data) => {
    socket.join(data);
    // console.log(`User with ID: ${socket.id} joined ${data}`);
  });
  //Lorsque l'utilisateur envoie un message
  socket.on("send_message", (data) => {
    socket.to(data.chatId).emit("receive_message", data);
    console.log(data);
  });
  //Lorsque l'utilisateur se déconnecte
  socket.on("Disconnected", () => {
    console.log("User Disconnected", socket.id);
  });
});


//lancer le serveur
server.listen(process.env.SERVER_PORT, () => {
  console.log(`server is up and running on port ${process.env.SERVER_PORT}`);
});
