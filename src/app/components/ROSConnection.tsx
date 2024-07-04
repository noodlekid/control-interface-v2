"use client";

import ROSContext from "../contexts/ROSContext";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

export default function RosConnect() : JSX.Element {
  const { connection, setConnection } = ROSContext.useConnectionState();
  const {ros, setConnect, setDisconnect} = ROSContext.useROSStore();

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
        toast.error("Lost Connection.", {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnFocusLoss: false,
          pauseOnHover: true,
          draggable: false,
        });
      }
    };

    setConnect(connect);
    setDisconnect(disconnect);
    
    ros.on("connection", handleConnection);

    ros.on("error", handleError);

    ros.on("close", handleClose);

    return () => {
      ros.off("connection", handleConnection);
      ros.off("close", handleClose);
      ros.off("error", handleError);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const connect = (url: string, callback: VoidFunction) => {
    console.log("Attempting conneciton to " + url);
    setConnection({
      ...connection,
      isConnected: false,
      isConnecting: true,
    });
    try {
      ros.connect(url);
      callback();
    } catch (e) {
      console.log("Failed to create ROS instance", e);
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
    }

    return () => {
      ros.off("connection", callback);
    };
  };

  const disconnect = () => {
    ros.close();
  };



  return <></>;
}
