// Return markers of all points of interest from database

import React, { useEffect, useState } from 'react';

import { Button } from '@mui/material';

import { Poi, Coordinate } from '@prisma/client';

import { Marker } from 'react-map-gl';

import useSWR, { mutate } from 'swr';

export default function ViewPOI() {

  const { data, error } = useSWR('/api/poi', (url) => fetch(url).then((res) => res.json()));

  if (error) return <div>Error loading POIs</div>;

  if (!data) return <div>Loading POIs...</div>;

  const { pois, coords } = data.data;

  return (
    <div className="
            bg-white
            h-full
            p-4
            overflow-auto
        ">
      <div>
        <div className="grid text-2xl font-bold grid-cols-2 gap-10">
          <Button className="col-span-1" variant="contained" color="primary" onClick={async () => {
            await fetch('/api/poi', {
              method: 'DELETE'
            });
            mutate('/api/poi');
          }}>
            Delete All
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap">
        {pois.map((poi: Poi) => {
          const coord = coords.find((coord: Coordinate) => coord.id === poi.coordinateId);
          return (
            <Marker key={poi.id} longitude={coord.longitude} latitude={coord.latitude} offsetLeft={-20} offsetTop={-10}>
              <div className="bg-white text-black p-2 rounded-sm shadow-sm">
                {poi.name}
              </div>
            </Marker>
          );
        })}
      </div>
    </div>
  );
}