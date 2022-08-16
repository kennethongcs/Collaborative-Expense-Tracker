import React from 'react';
import { Outlet } from 'react-router-dom';
import WelcomeBottomNav from './WelcomeBottomNav.jsx';

const WelcomeLayout = () => (
  <>
    <Outlet />
    <WelcomeBottomNav />
  </>
);

export default WelcomeLayout;
