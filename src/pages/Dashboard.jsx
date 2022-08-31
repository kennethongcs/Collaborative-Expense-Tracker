import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from 'axios';
import ExpenseList from '../components/ExpenseList.jsx';

const Dashboard = ({ user, workspace }) => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios
      .post('/getExpenses', {
        workspace,
      })
      .then((res) => {
        setExpenses(res.data);
      });
  }, []);
  return (
    <>
      <Typography component="h1" variant="h5">
        Chart here
      </Typography>
      <Box sx={{ mt: 3 }}>
        <div>
          <div>Chart for the current workspace</div>
          <div>Some info about collaborators in this workspace</div>
          <div>Recent expenses for this workspace</div>
          <br />
          <ul>
            <ExpenseList expenses={expenses} />
          </ul>
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
};

export default Dashboard;
