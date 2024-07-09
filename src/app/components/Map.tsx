"use client";

import { useState } from "react";
import Map from "react-map-gl/maplibre";
import RoverLocation from "./RoverLocation";

// Move to .env.local for production
const TIlING_SERVER = "http://localhost:8080/styles/basic-preview/style.json";

export default function MapView() {
  return (
    <>
      <Map
        initialViewState={{
          longitude:-75.6989402 ,
          latitude: 45.386601,
          zoom: 14,
        }}
        style={{position: "absolute", width: "100%", height:"100%"}}
        mapStyle={TIlING_SERVER}
      >
        <RoverLocation />
      </Map>
    </>
  );
}