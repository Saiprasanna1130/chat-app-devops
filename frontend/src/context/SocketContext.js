import React, { createContext, useContext, useMemo, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useMemo(() => {
    return io(process.env.REACT_APP_API_URL, {
      transports: ["websocket"],
    });
  }, []);

  const [roomId, setRoomId] = useState(null);

  const getRoomId = () => roomId;

  return (
    <SocketContext.Provider value={{ socket, setRoomId, getRoomId }}>
      {children}
    </SocketContext.Provider>
  );
};
