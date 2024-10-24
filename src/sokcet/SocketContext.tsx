import { createContext, useContext } from 'react';
import io from 'socket.io-client';

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`;
const socket = io(BASE_URL);

const SocketContext = createContext(socket);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
