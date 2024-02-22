// socket.js
import { Server as SocketIOServer } from "socket.io";

export const initSocketIO = (server) => {
  const users = {};

  const addUser = (user) => {
    users[user.id] = { id: user.id, name: user.user };
  };

  const removeUser = (user) => {
    console.log("DELETING user", user);
    delete users[user];
  };

  const io = new SocketIOServer(server, {
    cors: {
      origin: ["http://localhost:5173", "https://ai-image-tom.netlify.app/"], // your frontend application's origin
      methods: ["GET", "POST"], // allowed HTTP methods
    },
  });
  io.on("connection", (socket) => {
    socket.on("join_room", (data) => {
      const { room, user } = data;
      addUser({ user, id: socket.id });

      socket.broadcast.emit("roomUsers", { users, currentUser: socket.id });
    });

    socket.on("leave_room", (data) => {
      removeUser(data);
      console.log(users);
    });

    socket.on("chat", (data) => {
      socket.broadcast.emit("chat_response", data);
    });

    socket.on("disconnect", () => {
      removeUser(socket.id);
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  return io;
};
