import React, { useState } from 'react';
import axios from 'axios'; import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const WorkspaceForm = () => {
  const [workspaceName, setWorkspaceName] = useState('');
  const [purpose, setPurpose] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (workspaceName) {
      console.log('email exists!!');
      // axios
      //   .post('/login', {
      //     email,
      //     password,
      //   })
      //   .then((response) => {
      //     console.log(response.data);

      // TODO: get workspace info from workspace api
      const workspaceId = null;

      // setWorkspace(workspaceId);

      navigate('/workspace/2');
      // })
      // .catch((error) => console.log(error));
    } else {
      console.log('nothing entered');
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="workspaceName"
              label="Workspace Name"
              name="workspaceName"
              autoComplete="workspaceName"
              autoFocus
              onChange={(event) => {
                setWorkspaceName(event.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              multiline
              rows={4}
              name="purpose"
              label="Purpose"
              id="purpose"
              autoComplete="purpose"
              onChange={(event) => {
                setPurpose(event.target.value);
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default WorkspaceForm;
