"use client";

import ROSLIB from "roslib";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

interface RosConnectionStatus {
  ros: ROSLIB.Ros | null;
  connectionStatus: {
    url: string;
    isConnecting: boolean;
    isConnected: boolean;
  };
  connect: (url: string, callback: VoidFunction) => void;
  disconnect: () => void;
}

export const RosConnectionContext = createContext<RosConnectionStatus>(
  {} as RosConnectionStatus,
);

const RosConnection = ({ children }: { children: React.ReactNode }) => {
  const [connectionStatus, setConnectionStatus] = useState<
    RosConnectionStatus["connectionStatus"]
  >({
    url: "",
    isConnecting: false,
    isConnected: false,
  });
  const [ros, setRos] = useState<ROSLIB.Ros | null>(null);

  const connect = (url: string, callback: VoidFunction) => {
    if (ros) {
      ros.close();
      console.log("Existing connection terminated");
    }

    // Beggin connection process
    setConnectionStatus({
      ...connectionStatus, // Keep prev connection state
      isConnecting: true,
      isConnected: false,
    });

    const connectStatusMsg = "CONNECTION TO ROS2 HUMBLE" + ": ";
    // Create new ROS object and attempt to connect, then update state.
    const newRos = new ROSLIB.Ros({ url });

    newRos?.on("connection", () => {
      toast.success(connectStatusMsg + "SUCCESSFUL"),
        {
          position: "top-right",
          autoclose: 5000,
          draggable: "false",
          pauseOnHover: "true",
        };
      console.log(connectStatusMsg + "SUCCESSFUL");
      setConnectionStatus({
        ...connectionStatus,
        isConnecting: false,
        isConnected: true,
      });

      callback();
    });
    newRos?.on("error", (e) => {
      toast.error("Error occureed connecting to server"),
        {
          position: "top-right",
          autoclose: 5000,
          draggable: "false",
          pauseOnHover: "true",
        };
      console.error("Error occured connecting to server", e);
      setRos(null);
      setConnectionStatus({
        ...connectionStatus,
        isConnecting: false,
        isConnected: false,
      });
    });

    setRos(newRos);
  };
  const disconnect = () => {
    if (ros) {
      ros?.close();
      console.log("Disconnected from server");
      toast.info("Disconnected from server");
      setConnectionStatus({
        ...connectionStatus,
        isConnecting: false,
        isConnected: false,
      });
    }
    setRos(null);
  };

  return (
    <RosConnectionContext.Provider
      value={{ ros, connectionStatus, connect, disconnect }}
    >
      {children}
    </RosConnectionContext.Provider>
  );
};

export default RosConnection;
