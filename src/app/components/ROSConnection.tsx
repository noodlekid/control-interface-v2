"use client";

import ROSContext, { ConnectionStatus } from "../contexts/ROSContext";
import ROSLIB from "roslib";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

const ROSConnect = ({ children }: { children: React.ReactNode }) => {
  const [connection, setConnection] = useState<ConnectionStatus>({
    url: "",
    isConnecting: false,
    isConnected: false,
  });

  const [ros] = useState<ROSLIB.Ros>(new ROSLIB.Ros({}));

  useEffect(() => {

    ros.on("connection", () => {
      // Call back on connection
      setConnection({
        ...connection,
        isConnecting: false,
        isConnected: true,
      });
      toast.success('Successful Connection', {
        position: "top-right",
        autoClose: 5000,
        draggable: false,
        pauseOnHover: true,
        pauseOnFocusLoss: false
      });
    });

    ros.on("error", (error) => {
      // Call back on error
      console.error("Error connecting", error);
      toast.error('Failed Connection Attempt', { 
        position: "top-right",
        autoClose: 5000,
        draggable: false,
        pauseOnHover: true,
        pauseOnFocusLoss: false
      })
    });

    ros.on("close", (e: CloseEvent) => {
      if (e.wasClean) {
        console.log("Disconnected");
        setConnection({
          ...connection,
          isConnecting: false,
          isConnected: false,
        });
      } else {
        setConnection({
            ...connection,
            isConnecting: false,
            isConnected: false,
        })
        console.log('Connenction failed');
      }
    });
  }, []);

  const connect = (url: string, callback: VoidFunction) => {
    setConnection({
      ...connection,
      url: url,
      isConnecting: true,
    });

    const onConnection = () => {
      callback();
      ros.off("connection", onConnection)
    }

    try {
      ros.connect(url);
      ros.on("connection", onConnection);
    } catch (e) {
      console.error("Failed to create ROS instance", e);
      ros.off("connection", onConnection);
    }
  };

  const disconnect = () => {
    ros.close();
    localStorage.removeItem("ROSServerAddress");
  };

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
};

export default ROSConnect;