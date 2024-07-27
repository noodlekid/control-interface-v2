"use client";

import useLocationStore from "@/app/stores/LocationStore";
import { Marker } from "react-map-gl/maplibre";

export default function RoverMarker() {
  const { location, heading } = useLocationStore();

  return (
    <Marker
      longitude={location.longitude}
      latitude={location.latitude}
      color="red"
      rotation={heading}
    />
  );
}
