"use client";

import { useEffect } from "react";
import useROSStore from "../../stores/ROSStore";
import ROSLIB from "roslib";
import { NavSatFix } from "../../types/sensorTypes";
import useLocationStore from "@/app/stores/LocationStore";

interface coordinatePair {
  longitude: number;
  latitude: number;
}

export default function RoverLocation() {
  const { setLocation } = useLocationStore();
  const ros = useROSStore();

  const locationListener = new ROSLIB.Topic({
    ros: ros.ros,
    name: "/fix",
    messageType: "sensor_msgs/NavSatFix",
  });

  useEffect(() => {
    locationListener.subscribe((message) => {
      const newLocation: coordinatePair = {
        latitude: (message as NavSatFix).latitude,
        longitude: (message as NavSatFix).longitude,
      };
      setLocation(newLocation);
    });

    return () => {
      locationListener.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
}
