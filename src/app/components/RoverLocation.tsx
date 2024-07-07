"use client"

import { useEffect, useRef, useState } from "react";
import useROSStore from "../stores/ROSStore";
import ROSLIB from "roslib";
import { NavSatFix } from "../types/sensorTypes";
import { Marker } from "react-map-gl/maplibre";
import maplibregl from 'maplibre-gl';

interface coordinatePair {
    longitude: number;
    latitude: number;
}

export default function RoverLocation() {
    const ros = useROSStore();
    const markerRef = useRef<maplibregl.Marker>();

    const [location, setLocation ] = useState<coordinatePair>({
        longitude: 0,
        latitude: 0,
    })

    const locationListener = new ROSLIB.Topic({
        ros: ros.ros,
        name: '/fix',
        messageType: 'sensor_msgs/NavSatFix'
    })

    useEffect(() => {
        locationListener.subscribe((message) => {
            setLocation({
                latitude: (message as NavSatFix).latitude,
                longitude: (message as NavSatFix).longitude
            })
        })
        return () => {
            locationListener.unsubscribe();
        }
    }, [])

  return (
    <Marker longitude={location.longitude} latitude={location.latitude} color="red" />
  );
}
