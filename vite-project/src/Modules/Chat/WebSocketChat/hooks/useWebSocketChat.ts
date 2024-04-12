import { User as Auth0User } from "@auth0/auth0-react";
import { useSocketConnection } from "./useSocket";
import { useChatUserManagement } from "./useChatUserManagement";
import { useChat } from "./useChat";
import { useTypingAnimation } from "../../hooks/useTypingAnimation";

export const useWebSocketChat = (user: Auth0User | undefined) => {
  const socket = useSocketConnection(import.meta.env.VITE_API_URL);

  const { userList, chatUser, setChatUser, handleJoinChat, isUserJoined } =
    useChatUserManagement(socket, user);

  const {
    messageLog,
    gptLoading,
    handleInputChange,
    handleKeyDown,
    handleSendMessage,
    newMessage,
    setNewMessage,
    command,
    setCommand,
    additionalText,
  } = useChat(socket, user, chatUser);

  const { completedTyping, displayResponse } = useTypingAnimation({
    chatLog: messageLog,
  });

  return {
    handleJoinChat,
    handleSendMessage,
    handleInputChange,
    handleKeyDown,
    messageLog,
    userList,
    newMessage,
    setNewMessage,
    chatUser,
    setChatUser,
    command,
    setCommand,
    additionalText,
    isUserJoined,
    gptLoading,
    completedTyping,
    displayResponse,
  };
};
