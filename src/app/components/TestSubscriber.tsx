"use client";

import { useState, useEffect } from "react";
import ROSLIB from "roslib";
import useROSStore from "../stores/ROSStore";
import { String } from "../types/stdMsgTypes";

function Subscribe(): JSX.Element {
  const ros = useROSStore();
  const [msg, setMsg] = useState<string>("");

  const listener = new ROSLIB.Topic({
    ros: ros.ros as ROSLIB.Ros,
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
