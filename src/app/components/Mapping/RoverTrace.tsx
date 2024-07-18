"use client";
import { useEffect, useState } from "react";
import { Marker, Source, Layer, LineLayer } from "react-map-gl/maplibre";
import * as GeoJSON from "geojson";
import useLocationStore from "@/app/stores/LocationStore";

export default function Trace() {
  const { location } = useLocationStore();

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

  useEffect(() => {
    setTrace((currentTrace) => ({
      ...currentTrace,
      geometry: {
        ...currentTrace.geometry,
        coordinates: [
          ...currentTrace.geometry.coordinates,
          [location.longitude, location.latitude],
        ],
      },
    }));
  }, [location]);

  return (
    <>
      <Source id="trace" type="geojson" data={trace}>
        <Layer {...layerStyle} source="trace" />
      </Source>
    </>
  );
}
