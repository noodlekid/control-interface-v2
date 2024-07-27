"use client";
import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
// Import your components
import MapView from "../components/Mapping/Map";
import AddCurrentLocation from "../components/Mapping/MarkPoi";
import PoiList from "../components/Mapping/PoiList";
import ROSDiagnosticViewer from "../components/ROSDiagnosticsData";
import Speedometer from "../components/Indicators/Speed";
import HorizontalAccuracy from "../components/Indicators/HAccEstimate";

function Dashboard() {
  return (
    <Container
      maxWidth={false}
      style={{ height: `calc(100vh - 60px)`, padding: 0 }}
    >
      <Grid container style={{ height: "100%" }}>
        <Grid item xs={12} md={3} className="h-1/2 pl-2 pr-1 py-2">
          <Paper elevation={3} style={{ height: "100%", overflow: "auto" }}>
            <MapView />
          </Paper>
        </Grid>
        <Grid item xs={12} md={3} className="h-1/2 pl-1 pr-2 pt-2 pb-1">
          <Paper elevation={3} className="h-full">
            <div className="justify-center p-2 overflow-y-scroll h-full">
              <div className="p-1 border-2 rounded-md border-slate-800">
                <AddCurrentLocation />
              </div>
              <div className="pt-2">
                <PoiList />
              </div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} style={{ height: "50%" }}>
          <Paper elevation={3} style={{ height: "100%", overflow: "auto" }}>
            <ROSDiagnosticViewer />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} className="h-1/2 pl-2 pr-1 pt-1 pb-2">
          <Paper elevation={3} className="h-full">
            <Grid item xs={12} md={4} className="p-2">
              <Speedometer />
            </Grid>
            <Grid item xs={12} md={4} className="p-2">
              <HorizontalAccuracy />
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
