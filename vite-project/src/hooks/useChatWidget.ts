import { useState } from "react";
import { useTypingAnimation } from "./useTypingAnimation";
import { ChatCommands } from "./useWebSocketChat";

export const useChatWidget = () => {
  const [loading, setLoading] = useState(false);
  const [chatText, setChatText] = useState("");

  const [chatLog, setChatLog] = useState([
    "Hello, I am Donkey, a custom-trained AI chatbot, ask me about to this app, myself, or my great creator Tommy Lim",
  ]);

  //for special commands
  const [command, setCommand] = useState<ChatCommands | "">("");
  const [additionalText, setAdditionalText] = useState("");

  const { completedTyping, displayResponse } = useTypingAnimation({ chatLog });
  const sendQuery = async () => {
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
          body: JSON.stringify({ chatText }),
        }
      );
      const json = await result.json();
      console.log(json);
      setChatLog((prev) => [...prev, json]);
      setLoading(false);
    } catch (err) {
      console.log("err:", err);
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
