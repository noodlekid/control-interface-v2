// Displays all the POIs in the database as a list of cards
"use client";
import React from "react";
import { useFetchAllPoi } from "./FetchPoi";
import { Poi, Coordinate } from "@prisma/client";
import { Marker } from "react-map-gl";
import Image from "next/image"
import star from "../../../../public/images.png"

export default function ListMark() {

  const { data, error } = useFetchAllPoi();
  if (error) {
    return <div>Error loading data</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const { pois, coords } = data.data;

  if (pois.length === 0) {
    return <div>No data to display</div>;
  }

  return pois.map((poi: Poi) => {
    const coord = coords.find(
      (coord: Coordinate) => coord.id === poi.coordinateId,
    );
    return (
      <>
        <Marker
          key={poi.id}
          longitude={coord.longitude}
          latitude={coord.latitude}
        >
        </Marker>
      </>
    );
  });
}
