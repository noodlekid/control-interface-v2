"use client"

import { Poi, Coordinate } from "@prisma/client";
import useSWR from "swr";

export function useFetchSinglePoi(id: string){
  const key = `/api/poi/${id}`;

  return useSWR<{ poi: Poi; coordinate: Coordinate }>([key], async () => {
    return fetch(key).then((res) => res.json());
  });
}

export function useFetchAllPoi() {
  const key = "/api/poi";

  return useSWR(key, async () => {
    return fetch(key).then((res) => res.json());
  });
}
