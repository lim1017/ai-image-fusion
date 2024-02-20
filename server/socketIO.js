// socket.js
import { Server as SocketIOServer } from "socket.io";

export const initSocketIO = (server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"], // allowed HTTP methods
    },
  });
  io.on("connection", (socket) => {
    console.log("a user connected");
    // You can add more event listeners here
  });

  return io;
};
