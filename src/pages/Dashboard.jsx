import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const location = useLocation();
let index = parseInt(location.pathname.split('/').at(-1));

const Dashboard = ({ user, workspace }) => (
  <>
    <Typography component="h1" variant="h5">
      Dashboard
    </Typography>
    <Box sx={{ mt: 3 }}>
      <div>
        <h4>Hello, {user?.firstName}</h4>
        <div>Menu to change workspace if more than 1</div>
        <div>Chart for the current workspace</div>
        <div>Some info about collaborators in this workspace</div>
        <div>Recent expenses for this workspace</div>
        <br />
        <div>Currently looking at workspace {workspace?.name}</div>
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
    </Box>
  </>
);

export default Dashboard;
