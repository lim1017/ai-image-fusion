import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const users = [
  { name: "tom", id: 1 },
  { name: "bob", id: 2 },
  { name: "jill", id: 3 },
];

const messages = [
  { text: "hello", sender: "tom" },
  { text: "hi", sender: "jill" },
];

export default function WebSocketChat() {
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const socket = io(`${import.meta.env.VITE_API_URL}`);
    socket.on("chat_response", (data) => {
      console.log(data);
    });

    return () => {
      socket.disconnect();
    };
  });

  const socket = io(`${import.meta.env.VITE_API_URL}`);
  const handleSendMessage = () => {
    socket.emit("chat", "Hello from chat world");
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
          {messages.map((message, index) => (
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
