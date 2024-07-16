"use client";

import React from "react";
import useROSStore from "../stores/ROSStore";
import Connect from "./Connect";

function Header() {
  const ros = useROSStore();

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <div
          className={`rounded-full h-3 w-3 ${ros.connection.isConnected === true ? "bg-green-500" : "bg-red-500"}`}
        ></div>
        <span>{`Connected to: ${ros.connection.isConnected === true ? process.env.NEXT_PUBLIC_ROVER_IP : undefined}`}</span>
      </div>
      <div className="flex items-center"></div>
      <div className="text-xl font-bold">
        <span>{"ROS WEB INTERFACE"}</span>
      </div>
    </header>
  );
}

export default Header;
