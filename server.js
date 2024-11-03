const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("Пользователь подключился");

  socket.broadcast.emit(
    "user connected",
    "Новый пользователь присоединился к чату"
  );

  socket.on("disconnect", () => {
    io.emit("user disconnected", "Пользователь покинул чат");
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
