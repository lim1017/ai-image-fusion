import { User as Auth0User } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { Socket } from "socket.io-client";
import { ChatCommands, Message } from "./useWebSocketChat";

export const useChat = (
  socket: Socket | undefined,
  user: Auth0User | undefined,
  chatUser: string
) => {
  const [newMessage, setNewMessage] = useState("");
  const [messageLog, setMessageLog] = useState<Message[]>([]);

  //for special commands
  const [command, setCommand] = useState<ChatCommands | "">("");
  const [additionalText, setAdditionalText] = useState("");

  const [gptLoading, setGptLoading] = useState(false);

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
    if (!socket) return;

    socket.on("chat_response", (data: Message) => {
      if (data.gpt || data.image || data.isError) setGptLoading(false);
      setMessageLog((prev) => [...prev, data]);
    });

    return () => {
      //clean up other wise duplicate events
      socket.off("chat_response");
      socket.off("roomUsers");
      socket.disconnect();
    };
  }, [socket]);

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
      if (
        command === ChatCommands.GPT ||
        command === ChatCommands.QUERY ||
        command === ChatCommands.IMAGE
      )
        setGptLoading(true);
      socket.emit("chat", MsgData);
      setNewMessage("");
      setCommand("");
      // setMessageLog((prev) => [...prev, MsgData]);
    }
  };

  return {
    messageLog,
    gptLoading,
    handleInputChange,
    handleKeyDown,
    handleSendMessage,
    newMessage,
    setNewMessage,
    command,
    setCommand,
    additionalText,
  };
};
