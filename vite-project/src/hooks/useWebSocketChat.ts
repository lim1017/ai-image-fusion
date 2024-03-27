import { User as Auth0User } from "@auth0/auth0-react";
import { useSocketConnection } from "./useSocket";
import { useChatUserManagement } from "./useChatUserManagement";
import { useChat } from "./useChat";

export interface Message {
  text: string;
  sender: string;
  id: number;
  time: string;
  room: string;
  command: string;
  image?: string;
  gpt?: string;
  email?: string;
}

export interface Users {
  [key: string]: User;
}

export interface User {
  id: number;
  user: string;
}

export const enum ChatCommands {
  IMAGE = "image",
  GPT = "gpt",
  QUERY = "query",
}

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
  };
};
