import { useState } from "react";
import { useTypingAnimation } from "../../hooks/useTypingAnimation";
import { ChatCommands, Message } from "../../types/types";

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
    } catch (err: any) {
      console.log("err:", err);
      const json = await err.json();
      setChatLog((prev) => [...prev, json]);
      setLoading(false);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const commandMatch = value.match(/^\/(image|query)\s*/);

    if (commandMatch) {
      setCommand(commandMatch[1] as ChatCommands);
      setAdditionalText(value.slice(commandMatch[0].length));
    } else {
      if (command) {
        setAdditionalText(value);
      } else {
        setChatText(value);
      }
    }

    setChatText(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setChatLog((prev) => [
      ...prev,
      {
        text: chatText,
        sender: userName,
        id: Math.floor(Math.random() * 100000),
        time: new Date().toLocaleTimeString(),
        command,
        room: "",
      },
    ]);
    sendQuery();

    setChatText("");
    setCommand("");
  };

  const handleTextareaKeyPress = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevents new line and submits

      handleSubmit(event as unknown as React.FormEvent<HTMLFormElement>);
    }
    if (event.key === "Backspace" && command && additionalText.length === 0) {
      setCommand("");
      setChatText(`/${command}`);
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
    handleTextChange,
    handleTextareaKeyPress,
    handleSubmit,
  };
};
