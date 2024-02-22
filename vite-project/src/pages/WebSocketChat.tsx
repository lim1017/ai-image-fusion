import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";

const randomUser = `User${Math.floor(Math.random() * 1000)}`;

interface Messages {
  text: string;
  sender: string;
  id: number;
}

interface Users {
  [key: string]: User;
}

interface User {
  id: number;
  name: string;
}

export default function WebSocketChat() {
  const [newMessage, setNewMessage] = useState("");
  const [messageLog, setMessageLog] = useState<Messages[]>([]);
  const [socket, setSocket] = useState<Socket>();
  const [userList, setUserList] = useState<Users>({});
  const { user } = useAuth0();

  const [chatUser, setChatUser] = useState("");
  // const chatUser = user?.nickname || randomUser;

  // const socketRef = useRef<Socket | null>(null);
  // useEffect(() => {
  //   // Initialize socket only if it doesn't exist
  //   if (!socketRef.current) {
  //     socketRef.current = io(`${import.meta.env.VITE_API_URL}`);
  //     socketRef.current.emit("join_room", {
  //       user: user?.nickname || undefined,
  //       room: 1,
  //     });

  //     socketRef.current.on("roomUsers", (users) => {
  //       console.log(users, "users");
  //       setUserList(users);
  //     });

  //     socketRef.current.on("chat_response", (data: Messages) => {
  //       console.log(data);
  //       setMessageLog((prev) => [...prev, data]);
  //     });
  //   }

  //   return () => {
  //     if (socketRef.current) {
  //       socketRef.current.emit("leave_room", {
  //         user: user?.nickname || undefined,
  //         room: 1,
  //       });
  //       socketRef.current = null;
  //     }
  //   };
  // }, []); // Empty dependency array ensures this runs once

  useEffect(() => {
    const socket = io(`${import.meta.env.VITE_API_URL}`);
    setSocket(socket);

    socket.emit("join_room", { user: chatUser || undefined, room: 1 });

    //get list of users
    socket.on("roomUsers", (data) => {
      console.log(data);
      setUserList(data.users);

      setChatUser(data.currentUser);
    });

    socket.on("chat_response", (data: Messages) => {
      setMessageLog((prev) => [...prev, data]);
    });

    return () => {
      if (socket.connected) {
        socket.emit("leave_room", {
          user: chatUser,
          room: 1,
        });
        socket.disconnect();
      }
    };
  }, []);

  const handleSendMessage = () => {
    if (socket) {
      socket.emit("chat", {
        text: newMessage,
        sender: chatUser,
        id: Math.floor(Math.random() * 1000000),
      });
      setNewMessage("");
    }
  };
  return (
    <div className="flex" style={{ height: "78vh" }}>
      {/* Sidebar for Users */}
      <div className="w-1/4 bg-gray-200 p-4">
        <h2 className="font-bold text-lg mb-4">Connected Users</h2>
        <ul>
          {Object.keys(userList).map((user) => (
            <li key={userList[user].id} className="mb-2">
              {`User${userList[user].id.toString().slice(0, 6)}`}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Message Display Area */}
        <div className="flex-1 overflow-y-auto p-4">
          {messageLog.map((message, index) => (
            <div key={index} className="mb-4 text-left">
              <span className="font-bold">{message.sender}: </span>
              <span>{message.text}</span>
            </div>
          ))}
        </div>

        {/* Message Input Area */}
        <div className="p-4 border-t-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="border-2 w-full p-2"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSendMessage}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-2"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
