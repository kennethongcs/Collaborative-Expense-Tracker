import React from 'react';
import { NavLink } from 'react-router-dom';

const Dashboard = ({ user, workspace }) => (
  <div>
    <h2>This is the dashboard</h2>
    <h4>
      Hello,
      {' '}
      {user?.firstName}
    </h4>
    <div>Menu to change workspace if more than 1</div>
    <div>Chart for the current workspace</div>
    <div>Some info about collaborators in this workspace</div>
    <div>Recent expenses for this workspace</div>
    <br />
    <div>
      Currently looking at workspace
      {' '}
      { workspace?.id}
    </div>
    <br />
    <div>
      Today
      <div>
        <NavLink to="expenses/123">Nike Store (clothing)</NavLink>
        -$100
      </div>
    </div>
    <br />
    <div>
      31 July 2022
      <div>
        <NavLink to="expenses/789">Apple Store (electronics)</NavLink>
        -$500
      </div>
    </div>
  </div>
);

export default Dashboard;
