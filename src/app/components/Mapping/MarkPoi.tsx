import useLocationStore from "@/app/stores/LocationStore";
import { Box, Button, Grid, TextField } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { mutate } from "swr";

export default function AddCurrentLocation() {
  const { location } = useLocationStore();
  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");

  const handleNameChange = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    setName(target.value);
  };

  const handleDescChange = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    setDesc(target.value);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await fetch("/api/poi", {
      method: "POST",
      body: JSON.stringify({
        // New point of interest with coordinates of rover location
        poi: {
          name: name,
          desc: desc,
          coordinate: {
            longitude: location.longitude,
            latitude: location.latitude,
          },
        },
      }),
    });

    await mutate("/api/poi");
  };

  return (
   <Box
  component="form"
  onSubmit={handleSubmit}
  sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: "1"
  }}
>
  <Grid container spacing={1} justifyContent="flex-end" alignItems="center">
    <Grid item xs={12} sm={true}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            id="name"
            onChange={handleNameChange}
            value={name}
            label="POI Name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            id="desc"
            onChange={handleDescChange}
            value={desc}
            label="Desc."
          />
        </Grid>
      </Grid>
    </Grid>
    <Grid item>
      <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
        <Button variant="contained" type="submit">
          Add
        </Button>
      </Box>
    </Grid>
  </Grid>
</Box>
  );
}
