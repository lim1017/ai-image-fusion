import { useState, useEffect } from "react";
import { Socket, io } from "socket.io-client";

/**
 * Returns a socket connection to the specified URL.
 *
 * @param {string} url - The URL to connect to.
 * @return {Socket | undefined} The socket connection, or undefined if the connection has not been established.
 */
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
