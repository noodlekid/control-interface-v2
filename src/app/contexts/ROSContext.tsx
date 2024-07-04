"use client";

import { createContext } from "react";

export interface ConnectionStatus {
  url: string;
  isConnecting: boolean;
  isConnected: boolean;
}

interface ROSConnection {
  ros: ROSLIB.Ros | null;
  connection: ConnectionStatus;
  connect: (url: string, callback: VoidFunction) => void;
  disconnect: () => void;
}

const ROSContext = createContext<ROSConnection>({} as ROSConnection);

export default ROSContext;
