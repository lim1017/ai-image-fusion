import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import { Users, User, useWebSocketChat } from "../hooks/useWebSocketChat";
import Button from "../components/Button";
import { Loader } from "../components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../lib/api";
import { SinglePost, postData } from "../lib/types";
import MuiLoader from "../components/MuiLoader";

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
  const queryClient = useQueryClient();
  const [sharedImagesArr, setSharedImagesArr] = useState<number[]>([]);

  const {
    imageLoading,
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
  } = useWebSocketChat();

  const { mutate, isLoading } = useMutation<SinglePost, unknown, postData>(
    (newData: postData) => createPost(newData),
    {
      onSuccess: () => {
        //@ts-expect-error passing in an array does not work
        queryClient.invalidateQueries("posts");
      },
      onError(error) {
        console.log(error);
        alert(error);
      },
    }
  );

  const handleShare = async (message) => {
    console.log(message);
    try {
      mutate({
        name: chatUser,
        prompt: message.text,
        photo: `data:image/jpeg;base64,${message.image}`,
        email: "",
      });
      setSharedImagesArr((prev) => [...prev, message.id]);
    } catch (error) {
      console.log(error);
    }
  };

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
            {messageLog.map((message, index) => {
              return (
                <div key={index} className="mb-4 text-left">
                  <span className="font-bold">
                    {`${message.sender.toString().slice(0, 6)}`}:{" "}
                  </span>
                  <span>{message.text}</span>
                  {message.image && (
                    <>
                      <img
                        className="w-1/2"
                        src={`data:image/jpeg;base64,${message.image}`}
                        alt={message.text}
                      />
                      <Button
                        onClick={() => handleShare(message)}
                        disabled={sharedImagesArr.includes(message.id)}
                        className="mt-1"
                      >
                        {isLoading ? (
                          <MuiLoader />
                        ) : sharedImagesArr.includes(message.id) ? (
                          "Shared"
                        ) : (
                          "Share to Wall"
                        )}
                      </Button>
                    </>
                  )}
                </div>
              );
            })}
            {imageLoading ? <Loader /> : null}
          </div>

          {/* Message Input Area */}
          <div className="p-4 border-t-2">
            <form onSubmit={handleSendMessage}>
              <div className="flex items-center border-2 w-full p-2">
                {command && (
                  <div className="chip bg-purple-500 text-white p-1 mr-2 rounded">
                    {command}
                    <span
                      className="ml-2 cursor-pointer"
                      onClick={() => setCommand("")}
                    >
                      &times;
                    </span>
                  </div>
                )}
                <input
                  type="text"
                  value={command ? additionalText : newMessage}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="flex-1"
                  placeholder={command ? "" : "Type your message..."}
                />
              </div>
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
