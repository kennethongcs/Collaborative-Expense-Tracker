import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Cookies from 'js-cookie';

const Settings = ({ user, setUser }) => {
  const [email, setEmail] = useState(user?.email);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email) {
      const updatedUser = { ...user };
      updatedUser.email = email;

      axios
        .post('/save', updatedUser)
        .then(() => {
          setUser(updatedUser);
          Cookies.set('user', JSON.stringify(updatedUser));
        })
        .catch((error) => console.log(error));
    } else {
      console.log('nothing entered');
    }
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        Settings
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Save
        </Button>
      </Box>
    </>
  );
};

export default Settings;
