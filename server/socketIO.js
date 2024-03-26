// socket.js
import { Server as SocketIOServer } from "socket.io";
import { generateImage } from "./services/openai.js";
import { queryPinecone } from "./services/pinecone.js";

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
      });
    });

    socket.on("chat", async (data) => {
      if (data.command === "image") {
        io.in("chat1").emit("chat_response", data);
        const image = await generateImage(data.text);
        io.in("chat1").emit("chat_response", { ...data, image, text: "" });
      } else if (data.command === "gpt") {
        io.in("chat1").emit("chat_response", data);
        console.log(data.text, "gpt query");
        const response = await queryPinecone(data.text);
        io.in("chat1").emit("chat_response", {
          ...data,
          text: "",
          gpt: response,
        });
      } else {
        io.in("chat1").emit("chat_response", data);
      }
    });

    socket.on("disconnect", () => {
      removeUser(socket.id);
      console.log(`User disconnected: ${socket.id}`);

      // Update the user list for all clients on disconnect
      io.emit("roomUsers", { users });
    });
  });

  return io;
};
