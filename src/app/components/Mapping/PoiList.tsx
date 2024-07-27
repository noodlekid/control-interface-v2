// Displays all the POIs in the database as a list of cards
"use client";
import React from "react";
import { useFetchAllPoi } from "./FetchPoi";
import { Poi, Coordinate } from "@prisma/client";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import { mutate } from "swr";

export default function PoiList() {
  const { data, error } = useFetchAllPoi();
  if (error) {
    return <div>Error loading data</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const { pois, coords } = data.data;

  if (pois.length === 0) {
    return <div>No data to display</div>;
  }

  return (
    <Grid container spacing={1}>
      {pois.map((poi: Poi) => {
        const coord = coords.find(
          (coord: Coordinate) => coord.id === poi.coordinateId,
        );
        return (
          <Grid item xs={6} key={poi.id}>
            <Card>
              <CardHeader
                action={
                  <IconButton
                    aria-label="delete entry"
                    onClick={() => {
                      fetch(`/api/poi/${poi.id}`, {
                        method: "DELETE",
                      }).then(() => mutate("/api/poi"));
                    }}
                    style={{ padding: "4px" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
                title={poi.name}
                style={{
                  paddingTop: "8px",
                  paddingRight: "8px",
                  paddingLeft: "8px",
                  paddingBottom: "2px"
                  
                }}
                titleTypographyProps={{ style: { fontSize: "1.2rem" } }}
              />
              <CardContent style={{
                  paddingTop: "0px",
                  paddingRight: "8px",
                  paddingLeft: "8px",
                  paddingBottom: "8px"
              }}>
                  
                <Typography variant="body1">
                  {`Latitude: ${coord.latitude}`}
                </Typography>
                <Typography variant="body1">
                  {`Longitude: ${coord.longitude}`}
                </Typography>
                <Typography variant="body1">{`Desc: ${poi.desc}`}</Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
