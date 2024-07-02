"use client";

import ROSContext, { ConnectionStatus } from "../contexts/ROSContext";
import ROSLIB from "roslib";
import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

const defaultConnection: ConnectionStatus = {
  url: "ws://localhost:9090",
  isConnected: false,
  isConnecting: false,
};

export const useROS = () => {
  const context = useContext(ROSContext);
  if (context === null) {
    throw new Error("useROS must be used within a ROSProvider");
  }
  return context;
};

export default function ROSConnect({
  children,
}: {
  children: React.ReactNode;
}) {
  const [connection, setConnection] =
    useState<ConnectionStatus>(defaultConnection);
  const [ros] = useState<ROSLIB.Ros>(new ROSLIB.Ros({}));

  useEffect(() => {

    const handleConnection = () => {
      console.log("CONNECTION SUCCESSFUL");
      setConnection({
        ...connection,
        isConnected: true,
        isConnecting: false,
      });
      toast.success("CONNECT SUCCESSFUL", {
        position: "top-right",
        autoClose: 5000,
        draggable: false,
        closeOnClick: true,
        pauseOnHover: true,
        pauseOnFocusLoss: false,
      });
    };

    const handleError = (error: Error) => {
      console.error(error);
      localStorage.removeItem("rosServerAddress");
      setConnection({
        ...connection,
        isConnected: false,
        isConnecting: false,
      });
      toast.error("Connection Failed.", {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: false,
        pauseOnHover: true,
        draggable: false,
      });
    };

    const handleClose = (e: { wasClean: boolean }) => {
      if (e.wasClean) {
        console.log("Disconnected");
        setConnection({
          ...connection,
          isConnected: false,
          isConnecting: false,
        });
        toast.info("Disconnected.", {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnFocusLoss: false,
          pauseOnHover: true,
          draggable: false,
        });
      } else {
        setConnection({
          ...connection,
          isConnected: false,
          isConnecting: false,
        });
        toast.error('Connection Failed.', {
          position: 'top-right',
          autoClose: 5000,
          closeOnClick: true,
          pauseOnFocusLoss: false,
          pauseOnHover: true,
          draggable: false,
        });
      }
    };

    ros.on('connection', handleConnection)

    ros.on('error', handleError)

    ros.on('close', handleClose)

    return () => {
      ros.off('connection', handleConnection);
      ros.off('error', handleError);
      ros.off('close', handleClose);
    }
  }, []);

  const connect = (url: string, callback: VoidFunction) => {
    console.log('Attempting conneciton to ' + url);
    setConnection({
      ...connection,
      isConnected: false,
      isConnecting: true
    })
    try {
      ros.connect(url);
      // ros.on('connection', callback);
    } catch (e) { 
      console.log('Failed to create ROS instance', e);
      setConnection({
        ...connection,
        isConnected: false,
        isConnecting: false
      })
      toast.error('Connection Failed.', {
        position: 'top-right',
        autoClose: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: false,
        pauseOnHover: true,
        draggable: false,
      });
    }

    return () => {
      ros.off('connection', callback)
    }
  }

  const disconnect = () => {
    ros.close();
  }

  return (
    <ROSContext.Provider
      value={{
        connect: connect,
        disconnect: disconnect,
        ros: ros,
        connection: connection,
      }}
    >
      {children}
    </ROSContext.Provider>
  );
}
