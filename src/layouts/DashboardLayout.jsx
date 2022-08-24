import React from 'react';
import { Outlet } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '../components/AppBar.jsx';
import BottomNav from '../components/BottomNav.jsx';

const DashboardLayout = ({ user }) => {
  const theme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  return (
    <>
      <AppBar user={user} />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box mt={4}>
            <Outlet />
          </Box>
        </Container>
      </ThemeProvider>
      <BottomNav />
    </>
  );
};

export default DashboardLayout;
