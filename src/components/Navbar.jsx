import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
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
      to="expenses/123"
    >
      Expense

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

export default Navbar;
