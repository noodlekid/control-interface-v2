"use client";

import { useState } from "react";
import Map from "react-map-gl/maplibre";
import RoverLocation from "./RoverLocation";

const TIlING_SERVER = process.env.NEXT_PUBLIC_MAPTILE_URI;

export default function MapView() {
  return (
    <Map
      initialViewState={{
        longitude: -75.6989402,
        latitude: 45.386601,
        zoom: 14,
      }}
      mapStyle={TIlING_SERVER}
    >
      <RoverLocation />
    </Map>
  );
}
