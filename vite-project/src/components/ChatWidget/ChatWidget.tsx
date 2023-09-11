import "./ChatWidget.css";

import React, { useState, useRef, useEffect } from "react";
import "./ChatWidget.css";
import Input from "../Input";
import { useChatWidget } from "../../hooks/useChatWidget";
import CursorSVG from "../icons/CursorSVG";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
const ChatLoader = () => {
  return (
    <div
      className={`w-8 h-8 border-4 border-dashed rounded-full animate-spin border-blue-500 dark:border-violet-600`}
      aria-label="Loading"
      data-testid="loader"
    ></div>
  );
};

interface ChatWidgetProps {
  name?: string;
}

export const ChatWidget = ({ name }: ChatWidgetProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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

  //scrolls to the bottom of the chat window as new text is added
  useEffect(() => {
    if (containerRef && containerRef.current) {
      const element = containerRef.current;
      element.scroll({
        top: element.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [containerRef, displayResponse]);

  return (
    <div className={`chat-widget ${isOpen ? "open" : ""}`}>
      <div className="chat-icon" onClick={toggleChat}></div>
      <div className="chat-window">
        <div className="chat-header" onClick={toggleChat}>
          <span>AI Chat Assistance</span>

          <button onClick={toggleChat}>
            {isOpen ? (
              <AiOutlineArrowUp size={20} className="mr-2" />
            ) : (
              <AiOutlineArrowDown size={20} className="mr-2" />
            )}
          </button>
        </div>
        <div id="chat-container" ref={containerRef}>
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
                  <p className="font-bold text-red-500 mr-2">
                    {name ? name : "User"}:{" "}
                  </p>{" "}
                  <p>{log}</p>
                </div>
              )}
            </div>
          ))}
          {loading ? (
            <div className="flex justify-center mt-2">
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
              autoComplete="off"
            />
          </form>
        </div>
      </div>
    </div>
  );
};
