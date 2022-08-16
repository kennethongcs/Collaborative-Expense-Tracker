import React from 'react';
import { NavLink } from 'react-router-dom';

const ExpenseForm = () => (
  <div>
    <div>Add expense</div>
    <NavLink
      to="/dashboard"
    >
      Submit
    </NavLink>
  </div>
);

export default ExpenseForm;
