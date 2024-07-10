"uses client";

import ROSLIB from "roslib";
import useROSStore from "../stores/ROSStore";
import { GeoPoint } from "../types/geographyTypes";
import { SyntheticEvent, useState } from "react";
import { Box, Button, TextField } from "@mui/material";

export default function GeoPointPub() {
  const ros = useROSStore();
  const [coord, setCoord] = useState<GeoPoint>({
    latitude: 0,
    longitude: 0,
    altitude: 0,
  });
  const [msg, setMsg] = useState<ROSLIB.Message>(coord);
  const geopointPublisher = new ROSLIB.Topic({
    ros: ros.ros,
    name: "/chatter",
    messageType: "geographic_msgs/GeoPoint",
  });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (ros.ros.isConnected == false) {
      console.log(
        "Unable to publish message, client not connected to ROS server",
      );
      return;
    }
    geopointPublisher.publish(msg);
  };

  const handleChange = (e: SyntheticEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setCoord((prevCoord) => ({
      ...prevCoord,
      [name]: value,
    }));
    setMsg(coord);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        required
        onChange={handleChange}
        name="latitude"
        id="latitude"
        label="Required"
        value={coord.latitude}
      />

      <TextField
        required
        onChange={handleChange}
        name="longitude"
        id="longitude"
        label="Required"
        value={coord.longitude}
      />

      <TextField
        required
        onChange={handleChange}
        name="altitude"
        id="altitude"
        label="Required"
        value={coord.altitude}
      />
      <Button type="submit">Submit</Button>
    </Box>
  );
}
