import React from 'react';
import { Outlet } from 'react-router-dom';
import AppBar from './AppBar.jsx';
import BottomNav from './BottomNav.jsx';

const DashboardLayout = () => (
  <>
    <AppBar />
    <Outlet />
    <BottomNav />
  </>
);

export default DashboardLayout;
