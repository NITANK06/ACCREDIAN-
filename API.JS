
import { Server } from "socket.io";

export default function handler(req, res) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server, {
      path: "/api/socket",
    });

    io.on("connection", (socket) => {
      console.log("New client connected");

      socket.on("joinRoom", (room) => {
        socket.join(room);
      });

      socket.on("sendMessage", (msg) => {
        io.to(msg.room).emit("receiveMessage", msg);
      });
    });

    res.socket.server.io = io;
  }
  res.end();
}
