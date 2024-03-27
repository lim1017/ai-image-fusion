import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import {
  Message,
  Users,
  useWebSocketChat,
  User,
} from "../hooks/useWebSocketChat";
import Button from "../components/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../lib/api";
import { SinglePost, postData } from "../lib/types";
import { useModal } from "../hooks/useModal";
import Modal from "../components/Modal";
import ChatModalContent from "../components/ModalComponents/ChatModalContent";
import { SideBar } from "../components/ChatWebSockets/SideBar";
import { MessageArea } from "../components/ChatWebSockets/MessageArea";
import { ChatInputArea } from "../components/ChatWebSockets/ChatInputArea";
import { useSharePost } from "../hooks/useSharePost";

const sortUsers = (userList: Users, chatUser: string): User[] => {
  const result = Object.keys(userList)
    .sort((a, b) => {
      if (userList[a].user === chatUser) return -1;
      if (userList[b].user === chatUser) return 1;
      return 0;
    })
    .map((key) => userList[key]);
  return result;
};

export default function WebSocketChat() {
  const { user } = useAuth0();

  const { isOpen, openModal, closeModal } = useModal();

  const {
    gptLoading,
    handleJoinChat,
    handleSendMessage,
    messageLog,
    userList,
    newMessage,
    command,
    setCommand,
    additionalText,
    chatUser,
    setChatUser,
    handleInputChange,
    handleKeyDown,
    isUserJoined,
  } = useWebSocketChat(user);

  const { handleShare, submitPostLoading, sharedImagesArr } = useSharePost({
    user: chatUser,
  });

  return (
    <div className="overflow-y-hidden">
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <ChatModalContent />
      </Modal>
      <div>
        <form onSubmit={handleJoinChat}>
          <input
            type="text"
            value={chatUser}
            onChange={(e) => setChatUser(e.target.value)}
            className="border-2 w-30 p-2"
            placeholder="Enter your name"
          />
          <Button
            disabled={!chatUser}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded ml-2"
          >
            Join Chat
          </Button>
          <Button onClick={openModal} intent={"alt"} className="ml-2">
            Help
          </Button>
        </form>
      </div>
      <div className="flex h-75vh">
        {/* Sidebar for Users */}
        <SideBar userList={sortUsers(userList, chatUser)} chatUser={chatUser} />

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Message Display Area */}
          <MessageArea
            messageLog={messageLog}
            chatUser={chatUser}
            handleShare={handleShare}
            sharedImagesArr={sharedImagesArr}
            submitPostLoading={submitPostLoading}
            gptLoading={gptLoading}
          />

          {/* Message Input Area */}
          <ChatInputArea
            handleSendMessage={handleSendMessage}
            command={command}
            setCommand={setCommand}
            isUserJoined={isUserJoined}
            additionalText={additionalText}
            newMessage={newMessage}
            handleInputChange={handleInputChange}
            handleKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </div>
  );
}
