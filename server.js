const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("Пользователь подключился");

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg); // Отправка сообщения всем подключенным клиентам
  });

  socket.on("disconnect", () => {
    console.log("Пользователь отключился");
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
