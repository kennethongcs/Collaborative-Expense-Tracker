import React, { useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { NavLink } from 'react-router-dom';

const WorkspaceBottomNav = () => {
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
        to="/workspace/1"
      >
        1
      </NavLink>
      <NavLink
        style={({ isActive }) => ({
          display: 'inline',
          margin: '0 1rem',
          color: isActive ? 'red' : '',
        })}
        to="/workspace/2"
      >
        2
      </NavLink>
      <NavLink
        style={({ isActive }) => ({
          display: 'inline',
          margin: '0 1rem',
          color: isActive ? 'red' : '',
        })}
        to="/workspace/3"
      >
        3
      </NavLink>
      <NavLink
        style={({ isActive }) => ({
          display: 'inline',
          margin: '0 1rem',
          color: isActive ? 'red' : '',
        })}
        to="/workspace/4"
      >
        4
      </NavLink>
    </>
  );
};

export default WorkspaceBottomNav;
