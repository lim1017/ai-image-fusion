import { useState } from "react";

export const useChatWidget = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const sendQuery = async () => {
    if (!query) return;
    setResult("");
    setLoading(true);
    console.log(query, "queryyyyyyyyyyy");
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
      console.log(json.data, "result from gpt");
      setResult(json.data);
      setLoading(false);
    } catch (err) {
      console.log("err:", err);
      setLoading(false);
    }
  };

  return {
    sendQuery,
    query,
    setQuery,
    result,
    loading,
    setLoading,
  };
};
