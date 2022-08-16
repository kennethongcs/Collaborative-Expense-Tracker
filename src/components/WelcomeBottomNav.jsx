import React, { useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { NavLink } from 'react-router-dom';

const BottomNav = () => {
  const [value, setValue] = useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <NavLink
        style={({ isActive }) => ({
          display: 'inline',
          margin: '0 1rem',
          color: isActive ? 'red' : '',
        })}
        to="/welcome/1"
      >
        1
      </NavLink>
      <NavLink
        style={({ isActive }) => ({
          display: 'inline',
          margin: '0 1rem',
          color: isActive ? 'red' : '',
        })}
        to="/welcome/2"
      >
        2
      </NavLink>
      <NavLink
        style={({ isActive }) => ({
          display: 'inline',
          margin: '0 1rem',
          color: isActive ? 'red' : '',
        })}
        to="/welcome/3"
      >
        3
      </NavLink>
      <NavLink
        style={({ isActive }) => ({
          display: 'inline',
          margin: '0 1rem',
          color: isActive ? 'red' : '',
        })}
        to="/welcome/4"
      >
        4
      </NavLink>
    </>
  );
};

export default BottomNav;
