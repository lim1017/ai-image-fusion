import { useEffect, useState } from "react";
import { Message } from "./useWebSocketChat";

export const useTypingAnimation = ({ chatLog }: { chatLog: Message[] }) => {
  //typing anmiation
  const [completedTyping, setCompletedTyping] = useState(true);
  const [displayResponse, setDisplayResponse] = useState("");

  useEffect(() => {
    if (!chatLog.length) return;
    const stringResponse =
      chatLog[chatLog.length - 1].text || chatLog[chatLog.length - 1].gpt || "";

    setCompletedTyping(false);
    let i = 0;
    const intervalId = setInterval(() => {
      setDisplayResponse(stringResponse.slice(0, i));

      i++;

      if (i > stringResponse.length) {
        clearInterval(intervalId);
        setCompletedTyping(true);
      }
    }, 20);

    return () => clearInterval(intervalId);
  }, [chatLog]);

  return {
    completedTyping,
    displayResponse,
  };
};
