const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => console.log(`server on ${PORT}`));
const io = require("socket.io")(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
  },
});
const connections = new Set();

io.on("connection", function (socket) {
  console.log("New client connected " + socket.id);
  connections.add(socket.id);

  socket.on("join-room", function (roomId) {
    socket.join(roomId);
    const room = io.sockets.adapter.rooms.get(roomId);

    if (room.size > 2) {
      socket.emit("room-full", { roomId });
      socket.disconnect();
    } else {
      socket.join(roomId);
      console.log(
        "Client: " + socket.id + " connected to room with id: " + roomId
      );
    }
  });

  socket.on("sendTypeValueP2", function (data) {
    io.to(data.roomId).emit("receiveTypeValueP2", data);
  });

  socket.on("sendTypeValueP1", function (data) {
    io.to(data.roomId).emit("receiveTypeValueP1", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected: " + socket.id);
    connections.delete(socket.id);
  });
});
