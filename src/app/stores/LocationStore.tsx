"use client";

import { create } from "zustand";

export interface coordinatePair {
  latitude: number;
  longitude: number;
}

export interface LocationHook {
  location: coordinatePair;
  speed: number;
  heading: number;
  horizontalAccEst: number;
  setHacc: (newHacc: number) => void;
  setLocation: (newLocation: coordinatePair) => void;
  setSpeed: (newSpeed: number) => void;
  setHeading: (newHeading: number) => void;
}

const useLocationStore = create<LocationHook>((set) => ({
  location: { latitude: 0, longitude: 0 },
  speed: 0,
  heading: 0,
  horizontalAccEst: 0,
  setHacc: (newHacc: number) => {
    set((state) => ({ horizontalAccEst: newHacc }));
  },
  setSpeed: (newSpeed: number) => {
    set((state) => ({ speed: newSpeed }));
  },
  setLocation: (newLocation: coordinatePair) => {
    set((state) => ({ location: newLocation }));
  },
  setHeading: (newHeading: number) => {
    set((state) => ({ heading: newHeading }));
  },
}));
export default useLocationStore;
