import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

interface Messages {
  text: string;
  sender: string;
  id: number;
}

interface Users {
  [key: string]: User;
}

interface User {
  id: number;
  name: string;
}

export const useWebSocketChat = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messageLog, setMessageLog] = useState<Messages[]>([]);
  const [socket, setSocket] = useState<Socket>();
  const [userList, setUserList] = useState<Users>({});

  const [chatUser, setChatUser] = useState("");

  useEffect(() => {
    const socket = io(`${import.meta.env.VITE_API_URL}`);
    setSocket(socket);

    socket.emit("join_room", { user: chatUser || undefined, room: 1 });

    //get list of users
    socket.on("roomUsers", (data) => {
      console.log(data);
      setUserList(data.users);

      setChatUser(data.currentUser);
    });

    socket.on("chat_response", (data: Messages) => {
      setMessageLog((prev) => [...prev, data]);
    });

    return () => {
      if (socket.connected) {
        socket.emit("leave_room", {
          user: chatUser,
          room: 1,
        });
        socket.disconnect();
      }
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (socket) {
      socket.emit("chat", {
        text: newMessage,
        sender: chatUser,
        id: Math.floor(Math.random() * 1000000),
      });
      setNewMessage("");
    }
  };

  return {
    handleSendMessage,
    messageLog,
    userList,
    newMessage,
    setNewMessage,
  };
};
