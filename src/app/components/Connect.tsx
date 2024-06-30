'use client'

import { SyntheticEvent, useContext } from "react"
import { RosConnectionContext } from "./RosConnection"
import { useState, useEffect } from 'react';
import ConnectButton from "./ConnectButton";
import { TextField, Grid, Paper, Box } from '@mui/material'

function Connect() {
    const ros = useContext(RosConnectionContext);;

    const [address, setAddress] = useState<string>('')
    useEffect(() => { 
      const defaultAddress = 'ws://' + window.location.host.split(':')[0] + ':9090';
      setAddress(defaultAddress);
    }, []);

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        if(address) {
            ros.connect(address, () => {
              console.log('Connected')
            });
        }
    };

    const handleChange = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        setAddress(target.value);
    }

    return (
        <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item lg={4} md={6} sm={8}>
        <Paper>
          <Box p={1}>
            <form onSubmit={handleSubmit}>
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
                  <ConnectButton connecting={ros.connectionStatus.isConnecting} />
                </Grid>
              </Grid>
            </form>
          </Box>
        </Paper>
      </Grid>
    </Grid>
    )
}

export default Connect;