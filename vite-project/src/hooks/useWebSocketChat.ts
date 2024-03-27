import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { User as Auth0User } from "@auth0/auth0-react";

export interface Message {
  text: string;
  sender: string;
  id: number;
  time: string;
  room: string;
  command: string;
  image?: string;
  gpt?: string;
  email?: string;
}

export interface Users {
  [key: string]: User;
}

export interface User {
  id: number;
  user: string;
}

const enum ChatCommands {
  IMAGE = "image",
  GPT = "gpt",
  QUERY = "query",
}

export const useWebSocketChat = (user: Auth0User | undefined) => {
  const [newMessage, setNewMessage] = useState("");
  const [messageLog, setMessageLog] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket>();
  const [userList, setUserList] = useState<Users>({});

  const [chatUser, setChatUser] = useState("");

  //for special commands
  const [command, setCommand] = useState<ChatCommands | "">("");
  const [additionalText, setAdditionalText] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  const [gptLoading, setGptLoading] = useState(false);

  const isUserJoined = socket ? userList[socket.id as string] : false;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const commandMatch = value.match(/^\/(image|gpt|query)\s*/);

    if (commandMatch) {
      setCommand(commandMatch[1] as ChatCommands);
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && command && additionalText.length === 0) {
      setCommand("");
      setNewMessage(`/${command}`);
    }
  };

  useEffect(() => {
    const socket = io(`${import.meta.env.VITE_API_URL}`);
    setSocket(socket);
    //get list of users
    socket.on("roomUsers", (data) => {
      setUserList(data.users);
      if (data.users[socket.id as string]) {
        setChatUser(data.users[socket.id as string].user);
      } else {
        setChatUser("");
      }
    });

    socket.on("chat_response", (data: Message) => {
      console.log(data, "reciving chat response");
      if (data.image) setImageLoading(false);
      if (data.gpt) setGptLoading(false);
      setMessageLog((prev) => [...prev, data]);
    });

    return () => {
      //clean up other wise duplicate events
      socket.off("chat_response");
      socket.off("roomUsers");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket && user) {
      setChatUser(user.nickname || "");

      socket.emit("join_room", {
        user: user.nickname || "",
        id: socket.id,
        room: "chat1",
      });
    }
  }, [socket, user]);

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (socket) {
      const MsgData: Message = {
        text: newMessage,
        sender: chatUser,
        email: user?.email,
        command,
        time: new Date().toLocaleTimeString(),
        id: Math.floor(Math.random() * 1000000),
        room: "chat1",
      };
      if (command === ChatCommands.IMAGE) setImageLoading(true);
      if (command === ChatCommands.GPT || command === ChatCommands.QUERY)
        setGptLoading(true);
      socket.emit("chat", MsgData);
      setNewMessage("");
      setCommand("");
      // setMessageLog((prev) => [...prev, MsgData]);
    }
  };

  const handleJoinChat = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (socket) {
      socket.emit("join_room", {
        user: chatUser,
        id: socket.id,
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
    isUserJoined,
    gptLoading,
  };
};
