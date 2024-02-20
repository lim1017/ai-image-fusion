import React from "react";
import io from "socket.io-client";

export default function WebSocketChat() {
  const handleConnect = () => {
    const socket = io(`${import.meta.env.VITE_API_URL}`);
    socket.emit("hello", "world");
  };
  return (
    <div>
      <button onClick={handleConnect}>connect to chat</button>
    </div>
  );
}
