"use client";

import { create } from "zustand";
import ROSLIB from "roslib";
import { disconnect } from "process";

export interface ConnectionStatus {
  url: string;
  isConnecting: boolean;
  isConnected: boolean;
}

interface ROSConnection {
  ros: ROSLIB.Ros;
  connection: ConnectionStatus;
  connect: (url: string, callback: VoidFunction) => void;
  disconnect: () => void;
}

interface ROSConnectionState {
  connection: ConnectionStatus;
  setConnection: (newConnection: ConnectionStatus) => void;
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
}

const useConnectionState = create<ROSConnectionState>((set) => ({
  connection: {
    isConnected: false,
    isConnecting: false,
    url: "",
  },
  setConnection: (newConnection: ConnectionStatus) => set((state) => ({ connection: newConnection })),
}));

const useROSStore = create<ROSInstanceState>((set) => ({
  ros: new ROSLIB.Ros({}),
  connection: {
    isConnected: false,
    isConnecting: false,
    url: "",
  },
  connect: (url: string, callback: VoidFunction) => {
    // Implement your connect logic here
  },
  disconnect: () => {
    // Implement your disconnect logic here
  },
  setRos: (newRos: ROSLIB.Ros) => {
    set((state) => ({ ros: newRos }));
  },
  setConnect: (newConnect: (url: string, callback: VoidFunction) => void) => {
    set((state) => ({ connect: newConnect }));
  },
  setDisconnect: (newDisconnect: () => void) => {
    set((state) => ({ disconnect: newDisconnect }));
  },
}));

const ROSContext = { useROSStore, useConnectionState};
export default ROSContext;
