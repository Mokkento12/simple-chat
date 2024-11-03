const socket = io();

const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");
const usernameInput = document.getElementById("username");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value && usernameInput.value) {
    const messageData = {
      username: usernameInput.value,
      message: input.value,
    };
    socket.emit("chat message", messageData);
    input.value = "";
  }
});

socket.on("chat message", (data) => {
  const item = document.createElement("li");
  item.textContent = `${data.username}: ${data.message}`;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on("user connected", (message) => {
  const item = document.createElement("li");
  item.textContent = message;
  item.classList.add("notification");
  messages.appendChild(item);
});

socket.on("user disconnected", (message) => {
  const item = document.createElement("li");
  item.textContent = message;
  item.classList.add("notification");
  messages.appendChild(item);
});
