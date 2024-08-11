"use client";

import useLocationStore from "@/app/stores/LocationStore";
import Image from "next/image";
import { Marker } from "react-map-gl/maplibre";
import navigationArrow from "./navarrow.png"

export default function RoverMarker() {
  const { location, heading } = useLocationStore();

  return (
    <Marker
      longitude={location.longitude}
      latitude={location.latitude}
      rotation={heading}
   />
  );
}
