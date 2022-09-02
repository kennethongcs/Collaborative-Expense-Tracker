/* eslint-disable no-restricted-syntax */
import React from 'react';
import { groupBy, sortBy } from 'lodash';
import moment from 'moment';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import useTheme from '@mui/material/styles/useTheme';

// Create our number formatter.
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const MapOfExpenses = ({ value, show, date, colors }) =>
  value.map(
    (expense, index) =>
      index < show && (
        <Container key={expense.id}>
          <Typography mb={1} variant="h6" color={colors.primary.main}>
            {expense.expenseDate}
          </Typography>
          <Divider />
          <Box mt={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>{expense.payee}</Box>
              <Typography style={{ color: 'red' }} component="span">
                {formatter.format(expense.amount)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography style={{ color: 'grey' }}>
                {`${expense.user?.firstName} ${expense.user?.lastName}`}
              </Typography>
              <Typography style={{ color: 'grey' }}>
                {expense.category.name}
              </Typography>
            </Box>
          </Box>
          <hr />
        </Container>
      )
  );

const ExpenseList = ({ expenses, all }) => {
  console.log('😃 raw data ', expenses);
  const groupedResults = groupBy(expenses, (result) =>
    moment(result).format('DD-MMM-YYYY')
  );
  // const sortByDate = sortBy(groupedResults, 'date');
  // console.log('sort by date', sortByDate);

  console.log('grouped results ', groupedResults);

  // for (let [i, y] of Object.entries(groupedResults)) {
  //   y.map((data) => {
  //     console.log(i, data.amount);
  //   });
  // }

  const colors = useTheme().palette;
  for (let [date, value] of Object.entries(groupedResults)) {
    const show = all ? 50 : 3;
    return (
      <>
        <MapOfExpenses show={show} value={value} date={date} colors={colors} />
      </>
    );
  }
};

export default ExpenseList;
