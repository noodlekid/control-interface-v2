"use client";

import Map from "react-map-gl/maplibre";
import RoverMarker from "./RoverMarker";
import RoverTrace from "./RoverTrace";
import RoverLocation from "./RoverPositioningSolution";

import "maplibre-gl/dist/maplibre-gl.css";

const TIlING_SERVER = process.env.NEXT_PUBLIC_MAPTILE_URI;

// Displays the mapview for the cooresponding maptile served by tileserver-gl
export default function MapView() {
  return (
    <>
      <RoverLocation />
      <Map
        initialViewState={{
          longitude: -75.6989402,
          latitude: 45.386601,
          zoom: 14,
        }}
        mapStyle={TIlING_SERVER}
      >
        <RoverMarker />
        <RoverTrace />
      </Map>
    </>
  );
}
