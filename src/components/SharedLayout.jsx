import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';

const SharedLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

export default SharedLayout;
