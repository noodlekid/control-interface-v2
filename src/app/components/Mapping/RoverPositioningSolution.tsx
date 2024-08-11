"use client";

import { useEffect } from "react";
import useROSStore from "../../stores/ROSStore";
import ROSLIB from "roslib";
import useLocationStore from "@/app/stores/LocationStore";
import { NavPvt } from "@/app/types/ubloxMsg";
import  NavRelPosNed  from "@/app/types/navRELPOSNED"
interface coordinatePair {
  longitude: number;
  latitude: number;
}

export default function RoverLocation() {
  const { setLocation, setSpeed, setHeading, setHacc } = useLocationStore();
  const ros = useROSStore();

  const navpvtListener = new ROSLIB.Topic({
    ros: ros.ros,
    name: "/navpvt",
    messageType: "ublox_msgs/NavPVT",
  });

  /* https://docs.ros.org/en/noetic/api/ublox_msgs/html/msg/NavRELPOSNED.html */
  const relposnedListener = new ROSLIB.Topic({
    ros: ros.ros,
    name: "/relposned",
    messageType: "ublox_msgs/NavRELPOSNED"
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

  // Heading angle defined :
  // North: 0 deg
  // East: 90 deg
  // South: 180 deg
  // West: 270 deg
  const nedToHeadingAngle = (north_component: number, east_component: number): number => {
    var headingAngle = Math.atan2(north_component, east_component);
    headingAngle = (headingAngle + 360) % 360;

    return headingAngle;
  }  

  useEffect(() => {
    navpvtListener.subscribe((message) => {
      const rawCoordinate = message as NavPvt;

      setLocation(formatCoordinates(rawCoordinate) as coordinatePair);
      setSpeed(mmtom(rawCoordinate.g_speed));
      setHacc(rawCoordinate.h_acc);
    });

    relposnedListener.subscribe((message) => {
      const relposened = (message as NavRelPosNed);
      const north_component = relposened.relPosN;
      const east_component = relposened.relPosE;
      const heading = nedToHeadingAngle(north_component, east_component);
      setHeading(heading);
    })
    

    return () => {
      navpvtListener.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
}
