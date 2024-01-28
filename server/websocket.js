const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const connections = new Map()

io.on("connection", function(socket) {
  console.log("New client connected " + socket.id);
  connections.set(socket.id, socket.id)

  socket.on("type", function(data) {
    const userId = connections.get(socket.id);
    if (userId) {
      console.log(userId + " typing");
      io.emit("type", data);
    }
  });
});

http.listen(3001, function() {
  console.log("listening on *:3001");
});