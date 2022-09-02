/* eslint-disable no-restricted-syntax */
import React from 'react';
import { groupBy } from 'lodash';
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

const MapOfExpenses = ({ value, show, colors }) => value.map(
  (expense, index) => index < show && (
    <Container key={expense.id}>
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
            {expense.category?.name}
          </Typography>
        </Box>
      </Box>
      <hr />
    </Container>
  ),
);

const ExpenseList = ({ expenses, all }) => {
  console.log(expenses);
  const groupedResults = groupBy(expenses, (result) => moment(result).format('DD-MMM-YYYY'));

  const colors = useTheme().palette;
  console.log(groupedResults);
  for (const [key, value] of Object.entries(groupedResults)) {
    const show = all ? 50 : 3;
    return (
      <>
        <Typography mb={1} variant="h6" color={colors.primary.main}>
          {moment(key).isSame(moment().startOf('day')) ? 'Today' : moment(key).format('DD MMM YYYY')}
        </Typography>
        <Divider />
        <MapOfExpenses show={show} value={value} colors={colors} />
      </>
    );
  }
};

export default ExpenseList;
