"use client";

import { SyntheticEvent } from "react";
import useROSStore from "../contexts/ROSContext"; // Import the useROSInstanceState function
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
      "ws://" + window.location.host.split(":")[0] + ":9090";
    setAddress(defaultAddress);
  }, [address]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (address) {
      ros.connect(address, () => {
        // TO-DO: Page Navigation (use router.push())
      });
    }
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
      style={{ minHeight: "100vh" }}
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
