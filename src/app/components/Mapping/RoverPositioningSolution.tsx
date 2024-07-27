"use client";

import { useEffect } from "react";
import useROSStore from "../../stores/ROSStore";
import ROSLIB from "roslib";
import useLocationStore from "@/app/stores/LocationStore";
import { NavPvt } from "@/app/types/ubloxMsg";
import { rawListeners } from "process";

interface coordinatePair {
  longitude: number;
  latitude: number;
}

export default function RoverLocation() {
  const { setLocation, setSpeed, setHeading, setHacc } = useLocationStore();
  const ros = useROSStore();

  const locationListener = new ROSLIB.Topic({
    ros: ros.ros,
    name: "/navpvt",
    messageType: "ublox_msgs/NavPVT",
  });

  const formatCoordinates = (data: NavPvt): coordinatePair => {
    const latitude = data.lat / 1e7;
    const longitude = data.lon / 1e7;

    return {
      longitude: longitude,
      latitude: latitude,
    };
  };

  const mmtom = (speed: number): number => {
    const metersPerSec = speed / 1000;
    return metersPerSec;
  };

  const formatDegrees = (degrees: number): number => {
    const formatedDegrees = degrees / 1e5;
    return formatedDegrees;
  };

  useEffect(() => {
    locationListener.subscribe((message) => {
      const rawCoordinate = message as NavPvt;

      setLocation(formatCoordinates(rawCoordinate) as coordinatePair);
      setSpeed(mmtom(rawCoordinate.g_speed));
      setHeading(formatDegrees(rawCoordinate.head_veh));
      setHacc(rawCoordinate.h_acc);
    });

    return () => {
      locationListener.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
}
