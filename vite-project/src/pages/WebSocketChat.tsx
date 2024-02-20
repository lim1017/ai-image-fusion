import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

const users = [
  { name: "tom", id: 1 },
  { name: "bob", id: 2 },
  { name: "jill", id: 3 },
];

// const messageLog = [
//   { text: "hello", sender: "tom", id: 1 },
//   { text: "hi", sender: "jill", id: 2 },
// ];

interface Messages {
  text: string;
  sender: string;
  id: number;
}
// const socket = io(`${import.meta.env.VITE_API_URL}`);

export default function WebSocketChat() {
  const [newMessage, setNewMessage] = useState("");
  const [messageLog, setMessageLog] = useState<Messages[]>([]);
  const [socket, setSocket] = useState<Socket>();

  const { user } = useAuth0();

  useEffect(() => {
    const socket = io(`${import.meta.env.VITE_API_URL}`);
    setSocket(socket);

    socket.on("chat_response", (data: Messages) => {
      console.log(data);
      setMessageLog((prev) => [...prev, data]);
    });
  }, []);

  const handleSendMessage = () => {
    if (socket) {
      socket.emit("chat", {
        text: newMessage,
        sender: user?.nickname || `user${Math.floor(Math.random() * 1000)}`,
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
          {users.map((user) => (
            <li key={user.id} className="mb-2">
              {user.name}
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
