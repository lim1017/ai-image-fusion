import "./ChatWidget.css";

import React, { useState, useRef, useEffect } from "react";
import "./ChatWidget.css";
import { useChatWidget } from "../hooks/useChatWidget";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { ChatInputArea } from "../../Components/ChatInputArea";
import { useCreatePost } from "../../../CreateImage/hooks/useCreatePost";
import { useAuth0 } from "@auth0/auth0-react";
import { MessageArea } from "../../Components/MessageArea";
import Button from "../../../../components/Button";
import { useModal } from "../../../../hooks/useModal";
import Modal from "../../../../components/Modal";
import ChatHelpModalContent from "../../Components/ChatHelpModalContent";

export const ChatWidget = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { user } = useAuth0();
  const userName = user?.nickname || "User";
  const { handleShare, submitPostLoading, sharedImagesArr } = useCreatePost({
    user: userName,
    email: user?.email || "",
  });

  const {
    loading,
    chatLog,
    chatText,
    completedTyping,
    displayResponse,
    command,
    setCommand,
    additionalText,
    handleTextChange,
    handleTextareaKeyPress,
    handleSubmit,
  } = useChatWidget({ userName, email: user?.email || "" });

  const { isOpen, openModal, closeModal } = useModal();

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
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
    <div className={`chat-widget ${isChatOpen ? "open" : ""}`}>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <ChatHelpModalContent />
      </Modal>
      <div className="chat-icon" onClick={toggleChat}></div>
      <div className="chat-window">
        <div className="chat-header">
          <span className="text-[5] font-bold">
            AI Chat Assistance{" "}
            <Button size="small" intent={"secondary"} onClick={openModal}>
              Help
            </Button>
          </span>

          <button className="chat-header-icon" onClick={toggleChat}>
            {isChatOpen ? (
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
        <div className="chat-input w-full">
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
        </div>
      </div>
    </div>
  );
};
