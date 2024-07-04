"use client";

import { useState, useEffect, useContext } from "react";
import ROSLIB from "roslib";
import ROSContext from "../contexts/ROSContext";
import { String } from "../types/stdMsgTypes";
import useROS from "../contexts/ROSContext";

function Subscribe() : JSX.Element {
  const ros = ROSContext.useROSStore();
  const [msg, setMsg] = useState<string>("");

  const listener = new ROSLIB.Topic({
    ros: (ros.ros as ROSLIB.Ros),
    name: "/chatter",
    messageType: "std_msgs/String",
  });

  useEffect(() => {
    listener.subscribe((message) => setMsg((message as String).data));
    return () => listener.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Received Message:</h1>
      <p>{msg}</p>
    </div>
  );
}

export default Subscribe;