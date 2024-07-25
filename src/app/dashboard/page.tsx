"use client";

import MapView from "../components/Mapping/Map";
import "maplibre-gl/dist/maplibre-gl.css";
import ROSDiagnosticViewer from "../components/ROSDiagnosticsData";
import PoiList from "../components/Mapping/PoiList";
import NewPoi from "../components/Mapping/MarkPoi";
import AddCurrentLocation from "../components/Mapping/MarkPoi";

function Dashboard() {
  return (
    <>
      <div
        className="h-screen bg-gray-100 p-2"
        style={{ height: `calc(100vh - 60px)` }}
      >
        <div className="flex flex-wrap h-full">
          <div className="w-full md:w-1/2 h-1/2 p-1">
            <div className="bg-white h-full flex justify-center items-center">
              <MapView />
            </div>
          </div>
          <div className="w-full md:w-1/2 h-1/2">
            <div className="bg-white h-full flex flex-col p-2">
              <AddCurrentLocation />
              <PoiList />
            </div>
          </div>
          <div className="w-full md:w-1/2 h-1/2 p-1">
            <div className="bg-black h-full p-4 flex justify-left items-left overflow-auto">
              <ROSDiagnosticViewer />
            </div>
          </div>
          <div className="w-full md:w-1/2 h-1/2">
            <div className="bg-white h-full p-4 flex justify-center items-center">
              Insert Components
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
