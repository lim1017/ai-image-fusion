import { useState, useEffect } from "react";
import { Socket } from "socket.io-client";
import { Users } from "./useWebSocketChat";
import { User as Auth0User } from "@auth0/auth0-react";

export const useChatUserManagement = (
  socket: Socket | undefined,
  defaultUser: Auth0User | undefined
) => {
  const [userList, setUserList] = useState<Users>({});
  const [chatUser, setChatUser] = useState("");

  const isUserJoined = socket && userList[socket.id as string] ? true : false;

  useEffect(() => {
    if (!socket) return;

    //get list of users
    socket.on("roomUsers", (data) => {
      setUserList(data.users);
      if (data.users[socket.id as string]) {
        setChatUser(data.users[socket.id as string].user);
      } else {
        setChatUser("");
      }
    });

    return () => {
      socket.off("roomUsers");
    };
  }, [socket]);

  useEffect(() => {
    if (socket && defaultUser) {
      setChatUser(defaultUser.nickname || "");

      socket.emit("join_room", {
        user: defaultUser.nickname || "",
        id: socket.id,
        room: "chat1",
      });
    }

    return () => {
      if (socket) socket.off("roomUsers");
    };
  }, [socket, defaultUser]);

  const handleJoinChat = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (socket && chatUser) {
      socket.emit("join_room", {
        user: chatUser,
        id: socket.id,
        room: "chat1",
      });
    }
  };

  return { userList, chatUser, setChatUser, handleJoinChat, isUserJoined };
};
