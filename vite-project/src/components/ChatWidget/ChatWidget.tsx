// src/components/ChatWidget.ts
import "./ChatWidget.css";

import React, { useState } from "react";
import "./ChatWidget.css";
import FormField from "../FormField";

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatText, setChatText] = useState("");

  const [chatLog, setChatLog] = useState(["Hello, ask me anything"]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleTextChange = (e) => {
    setChatText(e.target.value);
    console.log(e.keyCode);
    if (e.key === "enter") {
      console.log(e.key, "was pressed");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setChatLog((prev) => [...prev, chatText]);
    setChatText("");
  };

  return (
    <div className={`chat-widget ${isOpen ? "open" : ""}`}>
      <div className="chat-icon" onClick={toggleChat}>
        <img src="/chat-icon.png" alt="Chat Icon" />
      </div>
      <div className="chat-window">
        <div className="chat-header">
          <span>Chat</span>
          <button onClick={toggleChat}>Close</button>
        </div>
        <div className="chat-messages">
          <p>{chatLog}</p>
        </div>
        <div className="chat-input">
          <form onSubmit={handleSubmit}>
            <FormField
              labelName=""
              type="text"
              name="text"
              placeholder="Ask something..."
              value={chatText}
              handleChange={handleTextChange}
            />
          </form>
        </div>
      </div>
    </div>
  );
};
