const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Servir les fichiers du dossier public
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  console.log("Utilisateur connecté :", socket.id);

  socket.on("chat_message", (msg) => {
    io.emit("chat_message", msg);
  });

  socket.on("disconnect", () => {
    console.log("Utilisateur déconnecté :", socket.id);
  });
});

// Render fournit PORT automatiquement
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Serveur lancé sur le port", PORT);
});
