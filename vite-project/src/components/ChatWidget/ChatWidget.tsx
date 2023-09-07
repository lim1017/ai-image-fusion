import "./ChatWidget.css";

import React, { useState, useRef, useEffect } from "react";
import "./ChatWidget.css";
import Input from "../Input";
import { useChatWidget } from "../../hooks/useChatWidget";

export const ChatWidget: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const {
    sendQuery,
    query,
    setQuery,
    loading,
    setLoading,
    chatLog,
    chatText,
    setChatText,
  } = useChatWidget();

  useEffect(() => {
    const createIndexAndEmbeddings = async () => {
      try {
        const result = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/gptSearch/setup`,
          {
            method: "POST",
          }
        );
        const json = await result.json();
        console.log("result: ", json);
      } catch (err) {
        console.log("err:", err);
      }
    };

    createIndexAndEmbeddings();
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatText(e.target.value);
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setChatText("");
    setQuery("");

    console.log(query);
    sendQuery();
  };

  useEffect(() => {
    if (!loading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [loading]);

  return (
    <div className={`chat-widget ${isOpen ? "open" : ""}`}>
      <div className="chat-icon" onClick={toggleChat}>
        <img src="/chat-icon.png" alt="Chat Icon" />
      </div>
      <div className="chat-window">
        <div className="chat-header">
          <span>Chat</span>
          <button onClick={() => inputRef.current?.focus()}>FOCUS</button>
          <button onClick={toggleChat}>Close</button>
        </div>
        <div className="chat-messages">
          {chatLog.map((log, index) => (
            <div key={index}>
              {index % 2 === 0 ? (
                <div className="flex">
                  <p className="font-bold text-green-500 mr-2">AI: </p>{" "}
                  <p className="typing-text">{log}</p>
                </div>
              ) : (
                <div className="flex mt-2">
                  <p className="font-bold text-red-500 mr-2">Me: </p>{" "}
                  <p>{log}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <form onSubmit={handleSubmit}>
            <Input
              ref={inputRef}
              type="text"
              name="text"
              placeholder="Ask something..."
              value={chatText}
              onChange={handleTextChange}
              disabled={loading}
            />
          </form>
        </div>
      </div>
    </div>
  );
};
