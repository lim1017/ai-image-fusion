import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { useWebSocketChat } from "../hooks/useWebSocketChat";

const randomUser = `User${Math.floor(Math.random() * 1000)}`;

export default function WebSocketChat() {
  const { user } = useAuth0();

  const { handleSendMessage, messageLog, userList, newMessage, setNewMessage } =
    useWebSocketChat();

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
              <span className="font-bold">
                {`User${message.sender.toString().slice(0, 6)}`}:{" "}
              </span>
              <span>{message.text}</span>
            </div>
          ))}
        </div>

        {/* Message Input Area */}
        <div className="p-4 border-t-2">
          <form onSubmit={handleSendMessage}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="border-2 w-full p-2"
              placeholder="Type your message..."
            />
            <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-2">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
