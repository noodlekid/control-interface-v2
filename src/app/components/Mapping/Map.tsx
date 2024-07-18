"use client";

import Map from "react-map-gl/maplibre";
import RoverMarker from "./RoverMarker";
import Trace from "./RoverTrace";
import RoverLocation from "./RoverLocation";

const TIlING_SERVER = process.env.NEXT_PUBLIC_MAPTILE_URI;

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
        <Trace />
      </Map>
    </>
  );
}
