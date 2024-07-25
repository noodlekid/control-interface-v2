"use client";

import useROSStore from "../stores/ROSStore";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { DEFAULT_TOAST_OPTIONS } from "./ToastHelper";

import "react-toastify/ReactToastify.css";

export default function RosConnect() {
  const { ros, setConnect, setDisconnect, setConnectionStatus, connection } =
    useROSStore();

  useEffect(() => {
    const handleConnection = () => {
      console.log("CONNECTION SUCCESSFUL");
      setConnectionStatus({
        ...connection,
        isConnected: true,
        isConnecting: false,
      });
      toast.success("CONNECT SUCCESSFUL", DEFAULT_TOAST_OPTIONS);
    };

    const handleError = (error: Error) => {
      console.error(error);
      setConnectionStatus({
        ...connection,
        isConnected: false,
        isConnecting: false,
      });
      toast.error("Connection Failed.", DEFAULT_TOAST_OPTIONS);
    };

    const handleClose = (e: { wasClean: boolean }) => {
      if (e.wasClean) {
        console.log("Disconnected");
        setConnectionStatus({
          ...connection,
          isConnected: false,
          isConnecting: false,
        });
        toast.info("Disconnected.", DEFAULT_TOAST_OPTIONS);
      } else {
        setConnectionStatus({
          ...connection,
          isConnected: false,
          isConnecting: false,
        });
        toast.error("Lost Connection.", DEFAULT_TOAST_OPTIONS);
      }
    };

    ros.on("connection", handleConnection);

    ros.on("error", handleError);

    ros.on("close", handleClose);

    setConnect(connect);
    setDisconnect(disconnect);

    return () => {
      ros.off("connection", handleConnection);
      ros.off("close", handleClose);
      ros.off("error", handleError);
    };
  }, []);

  const connect = (url: string) => {
    console.log("Attempting conneciton to " + url);
    setConnectionStatus({
      ...connection,
      isConnected: false,
      isConnecting: true,
    });

    try {
      ros.connect(url);
    } catch (e) {
      console.log("Failed to create ROS instance", e);
      setConnectionStatus({
        ...connection,
        isConnected: false,
        isConnecting: false,
      });
      toast.error("Connection Failed.", DEFAULT_TOAST_OPTIONS);
    }

    return () => {
      ros.off("connection", () => {});
    };
  };

  const disconnect = () => {
    ros.close();
  };

  return <></>;
}
