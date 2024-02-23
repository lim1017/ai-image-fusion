import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

interface Message {
  text: string;
  sender: string;
  id: number;
  time: string;
  room: string;
}

export interface Users {
  [key: string]: User;
}

export interface User {
  id: number;
  user: string;
}

export const useWebSocketChat = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messageLog, setMessageLog] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket>();
  const [userList, setUserList] = useState<Users>({});

  const [chatUser, setChatUser] = useState("");

  useEffect(() => {
    const socket = io(`${import.meta.env.VITE_API_URL}`);
    setSocket(socket);
    //get list of users
    socket.on("roomUsers", (data) => {
      setUserList(data.users);
      if (data.currentUser) {
        setChatUser(data.currentUser.user);
      } else {
        setChatUser("");
      }
    });

    socket.on("chat_response", (data: Message) => {
      console.log(data, "reciving chat response");
      setMessageLog((prev) => [...prev, data]);
    });

    return () => {
      //clean up other wise duplicate events
      socket.off("chat_response");
      socket.off("roomUsers");
    };
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (socket) {
      const MsgData: Message = {
        text: newMessage,
        sender: chatUser,
        time: new Date().toLocaleTimeString(),
        id: Math.floor(Math.random() * 1000000),
        room: "chat1",
      };
      await socket.emit("chat", MsgData);
      setNewMessage("");
      setMessageLog((prev) => [...prev, MsgData]);
    }
  };

  const handleJoinChat = (e) => {
    e.preventDefault();
    if (socket) {
      socket.emit("join_room", {
        user: chatUser,
        room: "chat1",
      });
    }
  };

  return {
    handleJoinChat,
    handleSendMessage,
    messageLog,
    userList,
    newMessage,
    setNewMessage,
    chatUser,
    setChatUser,
  };
};
