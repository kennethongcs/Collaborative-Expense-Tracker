import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';

const WorkspaceSettings = ({ user }) => {
  const theme = createTheme();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // if (email) {
    //   const updatedUser = {
    //     email,
    //     firstName,
    //     lastName,
    //     id: user.id,
    //   };

    //   axios
    //     .post('/save', updatedUser)
    //     .then((response) => {
    //       console.log(response.data);
    //       setUser(updatedUser);
    //     })
    //     .catch((error) => console.log(error));
    // } else {
    //   console.log('nothing entered');
    // }
  };

  const handleBackButton = () => {
    navigate(-1, { replace: true });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box mt={4}>
          <ArrowBackIosNewIcon onClick={handleBackButton} />
          <Typography component="h1" variant="h5">
            Workspace Settings
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default WorkspaceSettings;
