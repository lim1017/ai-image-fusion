// socket.js
import { Server as SocketIOServer } from "socket.io";

export const initSocketIO = (server) => {
  const users = {};

  const addUser = (user) => {
    users[user.id] = { id: user.id, user: user.user };
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
    //sends list of users on connection
    socket.emit("roomUsers", {
      users,
    });

    socket.on("join_room", (data) => {
      const { room, user } = data;
      socket.join(room);
      addUser({ user, id: socket.id });

      io.to("chat1").emit("roomUsers", {
        users: users,
        currentUser: { user, id: socket.id },
      });
    });

    socket.on("chat", (data) => {
      console.log(data, "chat");

      if (data.command === "image") {
        console.log("do image generation!!");
        //call image generation here
      }

      socket.to("chat1").emit("chat_response", data);
    });

    socket.on("disconnect", () => {
      removeUser(socket.id);
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  return io;
};
