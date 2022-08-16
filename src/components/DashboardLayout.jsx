import React from 'react';
import { Outlet } from 'react-router-dom';
import Appbar from './Appbar.jsx';
import BottomNav from './BottomNav.jsx';

const DashboardLayout = () => (
  <>
    <Appbar />
    <Outlet />
    <BottomNav />
  </>
);

export default DashboardLayout;
