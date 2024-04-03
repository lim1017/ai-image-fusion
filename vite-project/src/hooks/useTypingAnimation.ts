import { useEffect, useState } from "react";

export const useTypingAnimation = ({ chatLog }: { chatLog: string[] }) => {
  //typing anmiation
  const [completedTyping, setCompletedTyping] = useState(true);
  const [displayResponse, setDisplayResponse] = useState("");

  useEffect(() => {
    const stringResponse = chatLog[chatLog.length - 1];
    console.log(chatLog, "chatlog");
    console.log(stringResponse);
    if (!chatLog.length || chatLog[chatLog.length - 1] === stringResponse)
      return;

    setCompletedTyping(false);
    let i = 0;
    console.log(chatLog, "chatlog");
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