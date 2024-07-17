"use client";

import { Grid } from "@mui/material";
import GeoPointPub from "../components/GeoPointPub";
import MapView from "../components/Map";
import "maplibre-gl/dist/maplibre-gl.css";
import ROSDiagnosticViewer from "../components/ROSDiagnosticsData";

function Dashboard() {
  return (
    <>
      <div
        className="h-screen bg-gray-100 p-2"
        style={{ height: `calc(100vh - 60px)` }}
      >
        <div className="flex flex-wrap h-full">
          <div className="w-full md:w-1/2 h-1/2">
            <div className="bg-white h-full flex justify-center items-center">
              <MapView />
            </div>
          </div>
          <div className="w-full md:w-1/2 h-1/2">
            <div className="bg-white h-full p-4 flex justify-center items-center">
              Component 2
            </div>
          </div>
          <div className="w-full md:w-1/2 h-1/2 p-2">
            <div className="bg-black h-full p-4 flex justify-left items-left overflow-auto">
              <ROSDiagnosticViewer />
            </div>
          </div>
          <div className="w-full md:w-1/2 h-1/2">
            <div className="bg-white h-full p-4 flex justify-center items-center">
              Component 4
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
