import "./ChatWidget.css";

import React, { useState, useRef, useEffect } from "react";
import "./ChatWidget.css";
import { useChatWidget } from "../../hooks/useChatWidget";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { ChatCommands } from "../../hooks/useWebSocketChat";
import { ChatInputArea } from "../ChatWebSockets/ChatInputArea";
import { useSharePost } from "../../hooks/useSharePost";
import { useAuth0 } from "@auth0/auth0-react";
import { MessageArea } from "../ChatWebSockets/MessageArea";

export const ChatWidget = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth0();
  const userName = user?.nickname || "User";
  const { handleShare, submitPostLoading, sharedImagesArr } = useSharePost({
    user: userName,
  });

  const {
    sendQuery,
    loading,
    chatLog,
    chatText,
    setChatText,
    setChatLog,
    completedTyping,
    displayResponse,
    command,
    setCommand,
    additionalText,
    setAdditionalText,
  } = useChatWidget({ userName, email: user?.email || "" });

  const toggleChat = () => {
    setIsOpen(!isOpen);
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

        <MessageArea
          messageLog={chatLog}
          chatUser={userName}
          handleShare={handleShare}
          sharedImagesArr={sharedImagesArr}
          submitPostLoading={submitPostLoading}
          gptLoading={loading}
          displayResponse={displayResponse}
          completedTyping={completedTyping}
          ref={containerRef}
        />
        <div className="chat-input">
          <form onSubmit={handleSubmit} className="w-full">
            <ChatInputArea
              ref={inputRef}
              hideButton={true}
              handleSendMessage={handleSubmit}
              command={command}
              setCommand={setCommand}
              isUserJoined={true}
              additionalText={additionalText}
              newMessage={chatText}
              handleInputChange={handleTextChange}
              handleKeyDown={handleTextareaKeyPress}
            />
          </form>
        </div>
      </div>
    </div>
  );
};
