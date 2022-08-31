import React from 'react';
import { Typography, Box, Grid } from '@mui/material';
import ExpensesBarChart from '../components/ExpensesBarChart.jsx';
import ExpensesPieChart from '../components/ExpensesPieChart.jsx';

const Statistics = ({ workspace }) => (
  <>
    <Typography component="h1" variant="h5">
      Statistics
    </Typography>
    <Box sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <ExpensesBarChart workspace={workspace} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ExpensesPieChart workspace={workspace} />
        </Grid>
      </Grid>
    </Box>
  </>
);

export default Statistics;
