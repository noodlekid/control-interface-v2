"use client";

import { create } from "zustand";

export interface coordinatePair {
  latitude: number;
  longitude: number;
}

export interface LocationHook {
  location: coordinatePair;
  setLocation: (newLocation: coordinatePair) => void;
}

const useLocationStore = create<LocationHook>((set) => ({
  location : { latitude: 0, longitude: 0 },
  setLocation: (newLocation: coordinatePair) => {
    set((state) => ({ location: newLocation }));
  },
}));
export default useLocationStore;
