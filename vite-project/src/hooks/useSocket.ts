import { useState, useEffect } from "react";
import { Socket, io } from "socket.io-client";

export const useSocketConnection = (url: string) => {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const newSocket = io(url);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [url]);

  return socket;
};
