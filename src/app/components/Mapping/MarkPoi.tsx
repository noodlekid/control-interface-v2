import useLocationStore from "@/app/stores/LocationStore";
import { Button, TextField } from "@mui/material";
import { Poi } from "@prisma/client";
import { SyntheticEvent, useState } from "react";
import { mutate } from "swr";

export default function AddCurrentLocation() {
  const { location } = useLocationStore();
  const [name, setName] = useState<string>();
  const [desc, setDesc] = useState<string>();

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

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await fetch("/api/poi", {
      method: "POST",
      body: JSON.stringify({
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

    await mutate('/api/poi')
  };

  return (
    <div className="w-full h-full">
      <form onSubmit={onSubmit}>
        <TextField
          required
          fullWidth
          id="name"
          onChange={handleNameChange}
          value={name}
          label="POI Name"
        />
        <TextField
          required
          fullWidth
          id="desc"
          onChange={handleDescChange}
          value={desc}
          label="Desc."
        />
        <Button variant="contained" type="submit" fullWidth>Create POI</Button>
      </form>
    </div>
  );
}
