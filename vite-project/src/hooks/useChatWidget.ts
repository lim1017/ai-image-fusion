import { useState } from "react";
import { useTypingAnimation } from "./useTypingAnimation";
import { ChatCommands, Message } from "./useWebSocketChat";

export const useChatWidget = ({
  userName,
  email,
}: {
  userName: string;
  email: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [chatText, setChatText] = useState("");

  const [chatLog, setChatLog] = useState<Message[]>([
    {
      text: "Hello, I am Donkey, a custom-trained AI chatbot, ask me about to this app, myself, or my great creator Tommy Lim",
      sender: "AI",
      id: Math.floor(Math.random() * 100000),
      time: new Date().toLocaleTimeString(),
      command: "",
      room: "",
    },
  ]);

  //for special commands
  const [command, setCommand] = useState<ChatCommands | "">("");
  const [additionalText, setAdditionalText] = useState("");

  const { completedTyping, displayResponse } = useTypingAnimation({ chatLog });
  const sendQuery = async () => {
    console.log({ chatText, command });
    if (!chatText) return;
    setLoading(true);
    try {
      const result = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/gptSearch/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ chatText, command, userName, email }),
        }
      );
      const json = await result.json();
      setChatLog((prev) => [...prev, json]);
      setLoading(false);
    } catch (err) {
      console.log("err:", err);
      const json = await err.json();
      console.log(json);
      setChatLog((prev) => [...prev, json]);

      setLoading(false);
    }
  };

  return {
    sendQuery,
    loading,
    setLoading,
    chatLog,
    setChatLog,
    chatText,
    setChatText,
    completedTyping,
    displayResponse,
    command,
    setCommand,
    additionalText,
    setAdditionalText,
  };
};
