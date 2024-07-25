"use client";

import MapView from "../components/Mapping/Map";
import ROSDiagnosticViewer from "../components/ROSDiagnosticsData";
import PoiList from "../components/Mapping/PoiList";
import AddCurrentLocation from "../components/Mapping/MarkPoi";

const BORDER_STYLE = "border-2 border-gray-800";

function Dashboard() {
  return (
    <>
      <div
        className="h-screen bg-gray-100 p-2"
        style={{ height: `calc(100vh - 60px)` }}
      >
        <div className="flex flex-wrap h-full">
          <div className={`w-full md:w-1/2 h-1/2 ${BORDER_STYLE}`}>
            <div className="bg-white h-full flex justify-center items-center">
              <MapView />
            </div>
          </div>
          <div className={`w-full md:w-1/2 h-1/2 ${BORDER_STYLE}`}>
            <div className="bg-white h-full flex flex-col p-2">
              <AddCurrentLocation />
              <PoiList />
            </div>
          </div>

          <div className={`w-full md:w-1/2 h-1/2 ${BORDER_STYLE}`}>
            <div className="bg-black h-full p-4 flex justify-left items-left overflow-auto">
              <ROSDiagnosticViewer />
            </div>
          </div>

          <div className={`w-full md:w-1/2 h-1/2 ${BORDER_STYLE}`}>
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
