import "./ChatWidget.css";

import React, { useState, useRef, useEffect } from "react";
import "./ChatWidget.css";
import Input from "../Input";
import { useChatWidget } from "../../hooks/useChatWidget";
import CursorSVG from "../icons/CursorSVG";

const ChatLoader = () => {
  return (
    <div
      className={`w-8 h-8 border-4 border-dashed rounded-full animate-spin border-blue-500 dark:border-violet-600`}
      aria-label="Loading"
      data-testid="loader"
    ></div>
  );
};

export const ChatWidget: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const {
    sendQuery,
    setQuery,
    loading,
    chatLog,
    chatText,
    setChatText,
    setChatLog,
    completedTyping,
    displayResponse,
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
    setChatLog((prev) => [...prev, chatText]);
    sendQuery();

    setChatText("");
    setQuery("");
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
              {index % 2 === 0 && index === chatLog.length - 1 ? (
                <div className="flex">
                  <p className="font-bold text-green-500 mr-2">AI: </p>{" "}
                  <p>{displayResponse}</p>
                  {!completedTyping && <CursorSVG />}
                </div>
              ) : index % 2 === 0 ? (
                <div className="flex">
                  <p className="font-bold text-green-500 mr-2">AI: </p>{" "}
                  <p>{log}</p>
                </div>
              ) : (
                <div className="flex mt-2">
                  <p className="font-bold text-red-500 mr-2">Me: </p>{" "}
                  <p>{log}</p>
                </div>
              )}
            </div>
          ))}
          {loading ? (
            <div>
              <ChatLoader />
            </div>
          ) : null}
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
