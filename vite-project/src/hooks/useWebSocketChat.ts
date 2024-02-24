import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

interface Message {
  text: string;
  sender: string;
  id: number;
  time: string;
  room: string;
  command: string;
  image?: string;
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

  //for specialc commands
  const [command, setCommand] = useState("");
  const [additionalText, setAdditionalText] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    const commandMatch = value.match(/^\/image\s*/);

    if (commandMatch) {
      setCommand("image");
      setAdditionalText(value.slice(commandMatch[0].length));
    } else {
      if (command) {
        setAdditionalText(value);
      } else {
        setNewMessage(value);
      }
    }

    setNewMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace" && command && additionalText.length === 0) {
      setCommand("");
      setNewMessage("/image");
    }
  };

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
      setImageLoading(false);
      setMessageLog((prev) => [...prev, data]);
    });

    return () => {
      //clean up other wise duplicate events
      socket.off("chat_response");
      socket.off("roomUsers");
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (socket) {
      const MsgData: Message = {
        text: newMessage,
        sender: chatUser,
        command,
        time: new Date().toLocaleTimeString(),
        id: Math.floor(Math.random() * 1000000),
        room: "chat1",
      };
      if (command === "image") setImageLoading(true);
      socket.emit("chat", MsgData);
      setNewMessage("");
      setCommand("");
      // setMessageLog((prev) => [...prev, MsgData]);
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
    imageLoading,
    handleJoinChat,
    handleSendMessage,
    handleInputChange,
    handleKeyDown,
    messageLog,
    userList,
    newMessage,
    setNewMessage,
    chatUser,
    setChatUser,
    command,
    setCommand,
    additionalText,
  };
};
