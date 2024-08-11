"use client";

import Map from "react-map-gl/maplibre";
import RoverMarker from "./RoverMarker";
import RoverTrace from "./RoverTrace";
import RoverLocation from "./RoverPositioningSolution";

import "maplibre-gl/dist/maplibre-gl.css";
import useLocationStore, { coordinatePair } from "@/app/stores/LocationStore";
import { Coordinate } from "@prisma/client";
import ListMark from "./ListAllOnMap";
import { Marker } from "react-map-gl";

const DRUM_COORDS = {
  latitude: 51.4619,
  longitude: -112.7107,
};

const TIlING_SERVER = process.env.NEXT_PUBLIC_MAPTILE_URI;

// Displays the mapview for the cooresponding maptile served by tileserver-gl
export default function MapView() {
  const { location } = useLocationStore();

  return (
    <>
      <RoverLocation />
      <Map
        initialViewState={{
          longitude: DRUM_COORDS.longitude,
          latitude: DRUM_COORDS.latitude,
          zoom: 14,
        }}
        mapStyle={TIlING_SERVER}
      >
        <ListMark />
        <RoverTrace />
        <Marker longitude={-112.752809} latitude={51.471273}  />
      </Map>
    </>
  );
}
