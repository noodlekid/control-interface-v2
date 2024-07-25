// Displays all the POIs in the database as a list of cards
"use client";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { useFetchAllPoi } from "./FetchPoi";
import { Poi, Coordinate } from "@prisma/client";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  Checkbox,
  IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import { mutate } from "swr";

export default function PoiList() {
  const [checked, setChecked] = useState<boolean>(false);

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
    <div
      className="
    overflow-auto
    h-auto
    "
    >
      <Grid container spacing={2}>
        {pois.map((poi: Poi) => {
          const coord = coords.find(
            (coord: Coordinate) => coord.id === poi.coordinateId,
          );
          return (
            <Grid item xs={12} key={poi.id}>
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
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                  title={poi.name}
                />
                <CardContent>
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
    </div>
  );
}
