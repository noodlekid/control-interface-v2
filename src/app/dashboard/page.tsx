"use client";

import GeoPointPub from "../components/GeoPointPub";
import MapView from "../components/Map";
import "maplibre-gl/dist/maplibre-gl.css";

function Dashboard() {
  return (
    <>
      <MapView />
      <GeoPointPub />
    </>
  );
}

export default Dashboard;
