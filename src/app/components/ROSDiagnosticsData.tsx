"use client";

import ROSLIB from "roslib";
import useROSStore from "../stores/ROSStore";
import { useEffect, useRef, useState } from "react";
import { Log } from "../types/rosgraphTypes";

export default function ROSDiagnosticViewer() {
  const { ros } = useROSStore();
  const [msgs, setMsgs] = useState<String[]>([]);
  const subscribedRef = useRef(false);

  const diagnostics = new ROSLIB.Topic({
    ros: ros,
    name: "/rosout",
    messageType: "rcl_interfaces/msg/Log",
  });

  useEffect(() => {
    if (!subscribedRef.current) {
      diagnostics.subscribe((msg) => {
        setMsgs((prevMessages) => [...prevMessages, (msg as Log).msg]);
      });
      subscribedRef.current = true;
    }

    return () => {
      if (subscribedRef.current) {
        diagnostics.unsubscribe();
        subscribedRef.current = false;
      }
    };
  }, []); // The empty dependency array ensures this effect runs only once after the initial render

  return (
    <div>
      {msgs.map((message, index) => (
        <div className="text-white" key={index}>
          {message}
        </div>
      ))}
    </div>
  );
}
