import React from 'react';
import { Outlet } from 'react-router-dom';
import AppBar from '../components/AppBar.jsx';
import BottomNav from '../components/BottomNav.jsx';

const DashboardLayout = () => (
  <>
    <AppBar />
    <Outlet />
    <BottomNav />
  </>
);

export default DashboardLayout;
