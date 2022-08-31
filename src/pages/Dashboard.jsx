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
          <div>Some info about collaborators in this workspace</div>
          <div>Recent expenses for this workspace</div>
          <br />
          <div>
            <ExpenseList expenses={expenses} />
          </div>
        </div>
      </Box>
    </>
  );
};

export default Dashboard;
