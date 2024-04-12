import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Users, useWebSocketChat, User } from "../hooks/useWebSocketChat";
import { useModal } from "../../../../hooks/useModal";
import Modal from "../../../../components/Modal";
import ChatModalContent from "../../../../components/ModalComponents/ChatModalContent";
import { SideBar } from "../../Components/SideBar";
import { MessageArea } from "../../Components/MessageArea";
import { ChatInputArea } from "../../Components/ChatInputArea";
import { useSharePost } from "../../../../hooks/useSharePost";
import Button from "../../../../components/Button";

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
    chatUser,
    setChatUser,
    handleInputChange,
    handleKeyDown,
    isUserJoined,
    additionalText,
    completedTyping,
    displayResponse,
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
          <MessageArea
            messageLog={messageLog}
            chatUser={chatUser}
            handleShare={handleShare}
            sharedImagesArr={sharedImagesArr}
            submitPostLoading={submitPostLoading}
            gptLoading={gptLoading}
            displayResponse={displayResponse}
            completedTyping={completedTyping}
          />

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
