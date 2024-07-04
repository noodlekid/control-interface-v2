"use client";

import { create } from "zustand";
import ROSLIB from "roslib";

export interface ConnectionStatus {
  url: string;
  isConnecting: boolean;
  isConnected: boolean;
}

interface ROSInstanceState {
  ros: ROSLIB.Ros;
  connection: ConnectionStatus;
  connect: (url: string, callback: VoidFunction) => void;
  disconnect: () => void;

  setRos: (newRos: ROSLIB.Ros) => void;
  setConnect: (
    newConnect: (url: string, callback: VoidFunction) => void,
  ) => void;
  setDisconnect: (newDisconnect: () => void) => void;
  setConnectionStatus: (newConnection: ConnectionStatus) => void;
}

const useROSStore = create<ROSInstanceState>((set) => ({
  ros: new ROSLIB.Ros({}),
  connection: {
    isConnected: false,
    isConnecting: false,
    url: "",
  },
  connect: () => {},
  disconnect: () => {},
  setRos: (newRos: ROSLIB.Ros) => {
    set((state) => ({ ros: newRos }));
  },
  setConnect: (newConnect: (url: string, callback: VoidFunction) => void) => {
    set((state) => ({ connect: newConnect }));
  },
  setDisconnect: (newDisconnect: () => void) => {
    set((state) => ({ disconnect: newDisconnect }));
  },
  setConnectionStatus: (newConnection: ConnectionStatus) => {
    set((state) => ({ connection: newConnection }));
  },
}));

export default useROSStore;
