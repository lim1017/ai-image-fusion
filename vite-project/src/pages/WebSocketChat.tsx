import React, { useEffect } from "react";
import io from "socket.io-client";

export default function WebSocketChat() {
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
  const handleConnect = () => {
    socket.emit("chat", "Hello from chat world");
  };
  return (
    <div>
      <button onClick={handleConnect}>connect to chat</button>
    </div>
  );
}
