import React from 'react';
import { Outlet } from 'react-router-dom';
import WorkspaceBottomNav from './WorkspaceBottomNav.jsx';

const WorkspaceLayout = () => (
  <>
    <Outlet />
    <WorkspaceBottomNav />
  </>
);

export default WorkspaceLayout;
