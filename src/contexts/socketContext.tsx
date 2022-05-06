import { activeOrdersQueryKey, customerReceptQueryKey, orderClaimQueryKey, orderReceptsQueryKey, orderReceptsTotalQueryKey } from "@src/hooks/order";
import { tableClaimQueryKey } from "@src/hooks/tableClaim";
import { queryClient } from "@src/utils";
import React, { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./authContext";
import { useTable } from "./tableContext";

interface ContextInterface {
  socket: Socket | null;
}

const contextDefaultValues: ContextInterface = {
  socket: null
};

export const SocketContext = createContext(contextDefaultValues);

export const useSocket = () => useContext(SocketContext);

interface Props {
  children: ReactNode;
}

export const SocketProvider = ({ children }: Props) => {
  const [socket, setSocket] = useState<Socket<any, any> | null>(null)
  const { user } = useAuth();
  const { tableClaim, setUpdates } = useTable();

  useEffect(() => {
    if (user && !socket) {
      initSocket();
    }
  }, [user, tableClaim]);

  const initSocket = async () => {
    const newSocket = await io(process.env.API_URL, {
      auth: { accessToken: user.accessToken },
      query: {
        tableClaim: tableClaim?.id,
        isEmployee: user.isEmployee
      },
      reconnection: true
    });

    if (user.isEmployee) {
      newSocket.on('status', () => {
        setUpdates(true);
        queryClient.invalidateQueries(activeOrdersQueryKey);
      });
    } else {
      newSocket.on('status', () => {
        setUpdates(true);
        queryClient.invalidateQueries(orderClaimQueryKey);
        queryClient.invalidateQueries(customerReceptQueryKey);
        queryClient.invalidateQueries(orderReceptsQueryKey);
        queryClient.invalidateQueries(orderReceptsTotalQueryKey);
      });

      newSocket.on('joined', () => {
        queryClient.invalidateQueries(tableClaimQueryKey);
      });
    }

    setSocket(newSocket);
  }

  return (
    <SocketContext.Provider value={{ socket: socket }}>
      {children}
    </SocketContext.Provider>
  );
};