import React from 'react';
import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import WorkspaceBottomNav from '../components/WorkspaceBottomNav.jsx';

const WorkspaceLayout = () => (
  <>
    <Container component="main" maxWidth="xs">
      <Box mt={4} mx={1}>
        <Outlet />
      </Box>
    </Container>
    <WorkspaceBottomNav />
  </>
);

export default WorkspaceLayout;
