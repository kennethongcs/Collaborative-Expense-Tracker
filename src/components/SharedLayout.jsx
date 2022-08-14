import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import BottomNav from './BottomNav.jsx';

const SharedLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <BottomNav />
  </>
);

export default SharedLayout;
