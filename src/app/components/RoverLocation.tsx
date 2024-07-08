"use client";

import { useEffect, useState } from "react";
import useROSStore from "../stores/ROSStore";
import ROSLIB from "roslib";
import { NavSatFix } from "../types/sensorTypes";
import { Marker, Source, Layer, LineLayer } from "react-map-gl/maplibre";
import * as GeoJSON from "geojson";
interface coordinatePair {
  longitude: number;
  latitude: number;
}

export default function RoverLocation() {
  const ros = useROSStore();
  const [trace, setTrace] = useState<GeoJSON.Feature<GeoJSON.LineString>>({
    type: "Feature",
    properties: null,
    geometry: {
      type: "LineString",
      coordinates: [],
    },
  });

  const layerStyle: LineLayer = {
    id: "trace",
    type: "line",
    paint: {
      "line-color": "yellow",
      "line-opacity": 0.75,
      "line-width": 2,
    },
    source: "",
  };

  const [location, setLocation] = useState<coordinatePair>({
    longitude: 0,
    latitude: 0,
  });

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

      setTrace((currentTrace) => ({
        ...currentTrace,
        geometry: {
          ...currentTrace.geometry,
          coordinates: [
            ...currentTrace.geometry.coordinates,
            [newLocation.longitude, newLocation.latitude],
          ],
        },
      }));
    });

    return () => {
      locationListener.unsubscribe();
    };
  }, []);

  return (
    <>
      <Marker
        longitude={location.longitude}
        latitude={location.latitude}
        color="red"
      />
      <Source id="trace" type="geojson" data={trace}>
        <Layer {...layerStyle} source="trace" />
      </Source>
    </>
  );
}
