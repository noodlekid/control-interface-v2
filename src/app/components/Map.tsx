import Map from "react-map-gl";
import maplibregl from "maplibre-gl";

import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import './map.css'

function Mapping() {
  const mapContainer = useRef<HTMLDivElement>(null!);
  const map = useRef<maplibregl.Map | null>(null);
  const [lng] = useState(139.753);
  const [lat] = useState(35.6844);
  const [zoom] = useState(14);

  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: "https://demotiles.maplibre.org/style.json",
        center: [lng, lat],
        zoom: zoom
    });
  });

  return (
  <div>
    <div ref={mapContainer} className="map" />
  </div>
  )

}

export default Mapping;
