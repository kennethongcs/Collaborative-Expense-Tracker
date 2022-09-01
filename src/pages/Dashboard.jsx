import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Dashboard = ({ user, workspace }) => (
  <div>
    <div>Chart for the current workspace</div>
    <div>Some info about collaborators in this workspace</div>
    <div>Recent expenses for this workspace</div>
    <br />
    <div>
      Currently looking at workspace
      {' '}
      {workspace?.id}
    </div>
    <br />
    <div>
      <div>
        <div>
          Today
          <div>
            <NavLink to="expenses/1">Nike Store (clothing)</NavLink>
            -$100
          </div>
        </div>
        <br />
        <div>
          31 July 2022
          <div>
            <NavLink to="expenses/2">Apple Store (electronics)</NavLink>
            -$500
          </div>
        </div>
      </div>
    </div>
    <br />
    <div>
      31 July 2022
      <div>
        <NavLink to="expenses/3">Apple Store (electronics)</NavLink>
        -$500
      </div>
    </div>
  </div>
);

export default Dashboard;
