import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <Link to="/dashboard">Home</Link>
    <Link to="stats">Stats</Link>
    <Link to="expenses/123">Expense</Link>
  </nav>
);

export default Navbar;
