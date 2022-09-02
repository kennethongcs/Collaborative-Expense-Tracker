import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import ExpenseList from '../components/ExpenseList.jsx';
import ExpensesBarChart from '../components/ExpensesBarChart.jsx';

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
      <Box mt={5}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <ExpensesBarChart
              workspace={workspace}
              setSelectedData={setSelectedData}
            />
          </Grid>
          <Grid item xs={12} mr={4} mt={3} mb={0} sx={{ display: 'flex', justifyContent: 'end' }}>
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
