"use client";

import React from "react";
import { Button, CircularProgress } from "@mui/material";

interface ConnectButtonProps {
  connecting: boolean;
  connected: boolean;
}

function ConnectButton(props: ConnectButtonProps): React.ReactElement {
  if (props.connecting) {
    return (
      <Button fullWidth disabled variant="contained">
        <CircularProgress color="inherit" size={25} />
      </Button>
    );
  } else if (props.connected) {
    return (
      <Button fullWidth disabled variant="contained">
        Connected
      </Button>
    );
  }
  return (
    <Button fullWidth type="submit" variant="contained">
      Connect
    </Button>
  );
}

export default ConnectButton;
