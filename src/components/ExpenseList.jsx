/* eslint-disable no-restricted-syntax */
import React from 'react';
import moment from 'moment';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
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
const MapOfExpenses = ({
  expense, show, date, colors,
}) => (
  <Container key={expense.id}>
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
    <Divider />
  </Container>
);

const ExpenseList = ({ expenses, all }) => {
  const colors = useTheme().palette;
  const numOfResults = all ? 50 : 3;
  let prevDate;

  const expenseList = expenses.slice(0, all ? 50 : 4);

  return (
    <Grid container spacing={1}>
      {expenseList.map((expense) => (
        <>
          { ((expense.expense_date !== prevDate) && (prevDate = expense.expense_date)) ? (
            <Grid item xs={12}>
              <Typography ml={1} mt={1} variant="h6" color={colors.primary.main}>
                {moment(expense.expense_date).isSame(moment().startOf('day')) ? 'Today' : moment(expense.expense_date).format('DD MMM YYYY')}
              </Typography>
              <Divider />
            </Grid>
          ) : ''}
          <Grid item xs={12}>
            <MapOfExpenses key={expense.id} show={numOfResults} expense={expense} date={expense.expense_date} colors={colors} />
          </Grid>
        </>
      ))}
    </Grid>
  );
};
export default ExpenseList;
