"use client";

import { SyntheticEvent } from "react";
import useROSStore from "../stores/ROSStore"; // Import the useROSInstanceState function
import { useState, useEffect } from "react";
import ConnectButton from "./ConnectButton";
import { TextField, Grid, Paper, Box } from "@mui/material";

import { useRouter } from "next/navigation";

function Connect() {
  const router = useRouter();
  const ros = useROSStore();

  const [address, setAddress] = useState<string>("");
  useEffect(() => {
    const defaultAddress =
      "ws://" + "192.168.1.55" + ":9090";
    setAddress(defaultAddress);
    if (ros.connection.isConnected) {
      router.push("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ros.connection.isConnected]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    ros.connect(address);
  };

  const handleChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setAddress(target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: `calc(100vh - 60px)` }}
    >
      <Grid item lg={4} md={6} sm={8}>
        <Paper>
          <Box p={1}>
            <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
              <Grid
                container
                direction="row"
                spacing={2}
                justifyContent="left"
                alignItems="center"
              >
                <Grid item xs={9}>
                  <TextField
                    required
                    fullWidth
                    id="address"
                    onChange={handleChange}
                    value={address}
                    label="Rover IP"
                  />
                </Grid>
                <Grid item xs={3}>
                  <ConnectButton
                    connecting={ros.connection.isConnecting}
                    connected={ros.connection.isConnected}
                  />
                </Grid>
              </Grid>
            </form>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Connect;
