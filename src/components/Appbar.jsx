import React from 'react';
import { NavLink } from 'react-router-dom';

const Appbar = () => (
  <nav>
    <NavLink
      style={({ isActive }) => ({
        display: 'inline',
        margin: '0 1rem',
        color: isActive ? 'red' : '',
      })}
      to="/dashboard"
    >
      Home
    </NavLink>
    <NavLink
      style={({ isActive }) => ({
        display: 'inline',
        margin: '0 1rem',
        color: isActive ? 'red' : '',
      })}
      to="stats"
    >
      Stats

    </NavLink>
    <NavLink
      style={({ isActive }) => ({
        display: 'inline',
        margin: '0 1rem',
        color: isActive ? 'red' : '',
      })}
      to="/"
    >
      Sign out

    </NavLink>
  </nav>
);

export default Appbar;
