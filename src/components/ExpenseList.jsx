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
    <hr />
  </Container>
);

const ExpenseList = ({ expenses, all }) => {
  console.log(expenses);

  const colors = useTheme().palette;
  const numOfResults = all ? 50 : 3;
  let prevDate;

  return (
    <Grid container spacing={1}>
      {expenses.map((expense) => (
        <Grid item xs={12}>
          { ((expense.expense_date !== prevDate) && (prevDate = expense.expense_date)) ? (
            <>
              <Typography mb={1} variant="h6" color={colors.primary.main}>
                {expense.expense_date}
              </Typography>
              <Divider />
            </>
          ) : ''}
          <MapOfExpenses key={expense.id} show={numOfResults} expense={expense} date={expense.expense_date} colors={colors} />
        </Grid>
      ))}
    </Grid>
  );
};
export default ExpenseList;
