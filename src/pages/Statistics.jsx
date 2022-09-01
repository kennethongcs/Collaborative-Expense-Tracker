import React, { useState } from 'react';
import { Typography, Box, Grid } from '@mui/material';
import moment from 'moment';
import ExpensesBarChart from '../components/ExpensesBarChart.jsx';
import ExpensesPieChart from '../components/ExpensesPieChart.jsx';

const Statistics = ({ workspace }) => {
  const [lastExpenseMonth, setLastExpenseMonth] = useState();
  const [selectedData, setSelectedData] = useState();

  return (
    <>
      <Typography component="h1" variant="h5">
        Statistics
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ExpensesBarChart workspace={workspace} setSelectedData={setSelectedData} setLastExpenseMonth={setLastExpenseMonth} />
          </Grid>
          <Grid item xs={12} mt={3}>
            <Typography component="h1" variant="h6" ml={1}>
              {moment((selectedData || lastExpenseMonth)?.createdOn).format('MMMM YYYY')}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ExpensesPieChart workspace={workspace} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Statistics;
