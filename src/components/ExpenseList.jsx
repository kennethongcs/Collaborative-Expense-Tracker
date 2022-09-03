/* eslint-disable no-restricted-syntax */
import React from 'react';
import moment from 'moment';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import useTheme from '@mui/material/styles/useTheme';
import { useNavigate } from 'react-router-dom';

// Create our number formatter.
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const MapOfExpenses = ({
  expense, colors, navigate,
}) => (
  <Container key={expense.id} onClick={() => navigate(`/expenses/${expense.id}`)}>
    <Box mt={1}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>{expense.payee}</Box>
        <Typography color={colors.error.main} component="span">
          {formatter.format(expense.amount)}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography color={colors.text.disabled}>
          {`${expense.user?.firstName} ${expense.user?.lastName}`}
        </Typography>
        <Typography color={colors.text.disabled}>
          {expense.category.name}
        </Typography>
      </Box>
    </Box>
    <Divider />
  </Container>
);

const ExpenseList = ({ expenses, all }) => {
  const colors = useTheme().palette;
  const navigate = useNavigate();
  const expenseList = expenses.slice(0, all ? 50 : 4);

  let prevDate;

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
            <MapOfExpenses expense={expense} colors={colors} navigate={navigate} />
          </Grid>
        </>
      ))}
    </Grid>
  );
};

export default ExpenseList;
