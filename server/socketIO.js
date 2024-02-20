// socket.js
import { Server as SocketIOServer } from "socket.io";

export const initSocketIO = (server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: ["http://localhost:5173", "https://ai-image-tom.netlify.app/"], // your frontend application's origin
      methods: ["GET", "POST"], // allowed HTTP methods
    },
  });
  io.on("connection", (socket) => {
    console.log(`a user connected ${socket.id}`);

    socket.on("chat", (data) => {
      console.log(data);
      socket.broadcast.emit("chat_response", data);
    });
  });

  return io;
};
