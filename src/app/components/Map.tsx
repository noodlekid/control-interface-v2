import React, { useRef, useEffect, useState } from 'react';
import path from 'path';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './map.css';
import data from './positron.json';



export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(-75.7003);
  const [lat] = useState(45.4247);
  const [zoom] = useState(14);

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      /* change this to IP of maptile server */
      style: 'http://localhost:8080/styles/basic-preview/style.json',
      center: [lng, lat],
      zoom: zoom
    });

  }, [lng, lat, zoom]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}