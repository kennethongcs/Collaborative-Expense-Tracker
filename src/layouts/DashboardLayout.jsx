import React from 'react';
import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import AppBar from '../components/AppBar.jsx';
import BottomNav from '../components/BottomNav.jsx';

const DashboardLayout = ({ user }) => (
  <>
    <AppBar user={user} />
    <Container component="main" maxWidth="xs">
      <Box mt={4} mx={1}>
        <Outlet />
      </Box>
    </Container>
    <BottomNav />
  </>
);

export default DashboardLayout;
