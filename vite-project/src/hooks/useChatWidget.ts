import { useEffect, useState } from "react";

export const useChatWidget = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatText, setChatText] = useState("");

  const [chatLog, setChatLog] = useState(["Hello, ask me anything"]);

  //typing anmiation
  const [completedTyping, setCompletedTyping] = useState(true);
  const [displayResponse, setDisplayResponse] = useState("");

  const sendQuery = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const result = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/gptSearch/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
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

  useEffect(() => {
    setCompletedTyping(false);

    let i = 0;
    const stringResponse = chatLog[chatLog.length - 1];

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
    sendQuery,
    query,
    setQuery,
    loading,
    setLoading,
    chatLog,
    setChatLog,
    chatText,
    setChatText,
    completedTyping,
    displayResponse,
  };
};
