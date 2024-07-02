"use client";

import { useContext, useEffect, useState } from "react";
import { RosConnectionContext } from "./RosConnection";
import { NavSatFix } from "../types/sensorTypes";
import ROSLIB from "roslib";

function GNSSFix() {
  const ros = useContext(RosConnectionContext);
  const [msg, setMsg] = useState<NavSatFix | null>(null);
  const [topic, setTopic] = useState<ROSLIB.Topic | null>(null);

  if (ros.ros) {
    if (!topic) {
      const rosTopic = new ROSLIB.Topic({
        ros: ros.ros,
        name: "/gnss1/fix",
        messageType: "sensor_msgs/NavSatFix",
      });
      setTopic(rosTopic);
    }
    if (topic) {
      topic.subscribe((message) => {
        setMsg(message as NavSatFix);
      });
    }
  }

  return (
    <>
      <h1>{msg?.latitude}</h1>
      <h1>{msg?.longitude}</h1>
    </>
  );
}

export default GNSSFix;
