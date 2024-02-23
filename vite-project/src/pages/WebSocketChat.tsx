import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Users, User, useWebSocketChat } from "../hooks/useWebSocketChat";

const randomUser = `User${Math.floor(Math.random() * 1000)}`;
//sorts active user first
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

  const {
    handleJoinChat,
    handleSendMessage,
    messageLog,
    userList,
    newMessage,
    setNewMessage,
    chatUser,
    setChatUser,
  } = useWebSocketChat();
  return (
    <>
      <div>
        <form onSubmit={handleJoinChat}>
          <input
            type="text"
            value={chatUser}
            onChange={(e) => setChatUser(e.target.value)}
            className="border-2 w-30 p-2"
            placeholder="Type your message..."
          />
          <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-2">
            Join
          </button>
        </form>
      </div>
      <div className="flex" style={{ height: "78vh" }}>
        {/* Sidebar for Users */}
        <div className="w-1/4 bg-gray-200 p-4">
          <h2 className="font-bold text-lg mb-4">Connected Users</h2>
          <ul>
            {sortUsers(userList, chatUser).map((user) => (
              <li
                key={user.id}
                className={`mb-2 ${
                  user.user === chatUser ? "text-red-500" : ""
                }`}
              >
                {user.user}
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
    </>
  );
}
