"use client";

import { useContext, useState, useEffect } from "react";
import { RosConnectionContext } from "./RosConnection";
import ROSLIB from "roslib";

interface StdMsgString {
    message: ROSLIB.Message;
    data: string;
}

const Subscriber = () => {
  const ros = useContext(RosConnectionContext);
  const [msg, setMsg] = useState<ROSLIB.Message>("");

  useEffect(() => {
    if (!ros.ros) return;

    const topic = new ROSLIB.Topic({
      ros: ros.ros,
      name: "/chatter",
      messageType: "std_msgs/String",
    });

    topic.subscribe((message) => {
      setMsg((message as StdMsgString).data);
    });

    return () => {
      topic.unsubscribe();
    };
  }, [ros.ros]);

  return <h1>{JSON.stringify(msg)}</h1>;
};

export default Subscriber;
