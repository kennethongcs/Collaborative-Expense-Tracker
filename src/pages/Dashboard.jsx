import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AvatarGroup from '@mui/material/AvatarGroup';

import axios from 'axios';

import { Navigate, useNavigate } from 'react-router-dom';
import ExpenseList from '../components/ExpenseList.jsx';
import ExpensesBarChart from '../components/ExpensesBarChart.jsx';
import StyledAvatar from '../components/StyledAvatar.jsx';

const Dashboard = ({ user, workspace }) => {
  const [expenses, setExpenses] = useState([]);
  const [selectedData, setSelectedData] = useState();

  useEffect(() => {
    axios
      .get('/getExpenses', {
        params: {
          workspaceId: workspace.id,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setExpenses(res.data);
      });
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <Typography component="h1" variant="h5" />
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ExpensesBarChart
              workspace={workspace}
              setSelectedData={setSelectedData}
            />
          </Grid>
          <Grid item xs={12} mr={2}>
            <AvatarGroup
              max={3}
              sx={{
                '& .MuiAvatar-root': {
                  width: 22,
                  height: 22,
                  fontSize: '0.8rem',
                },
              }}
            >
              <StyledAvatar>JD</StyledAvatar>
              <StyledAvatar>MJ</StyledAvatar>
              <StyledAvatar>PG</StyledAvatar>
            </AvatarGroup>
          </Grid>
          <Grid item xs={12} mr={2} sx={{ display: 'flex', justifyContent: 'end' }}>
            <Typography
              textAlign="right"
              color="primary"
              sx={{
                fontSize: 14,
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
              component="span"
              onClick={() => navigate('/expenses')}
            >
              Show all
            </Typography>
          </Grid>
          <Grid item xs={12} mr={2}>
            <ExpenseList expenses={expenses} workspace={workspace} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
