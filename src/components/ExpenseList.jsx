/* eslint-disable no-restricted-syntax */
import React from 'react';
import { groupBy } from 'lodash';
import moment from 'moment';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const MapOfExpenses = ({ value, show }) =>
  value.map(
    (expense, index) =>
      index < show && (
        <Container key={expense.id}>
          <Box mt={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>{expense.payee.name}</Box>
              <Typography style={{ color: 'red' }} component="span">
                <Box>{expense.amount}</Box>
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
  const groupedResults = groupBy(expenses, (result) =>
    moment(result).format('DD MMM YYYY')
  );

  if (all) {
    for (const [key, value] of Object.entries(groupedResults)) {
      const show = 50;
      return (
        <>
          <Box mb={1} color="blue">
            {key}
          </Box>
          <Divider color="Lightblue" />
          <MapOfExpenses show={show} value={value} />
        </>
      );
    }
  }

  for (const [key, value] of Object.entries(groupedResults)) {
    const show = 3;
    return (
      <>
        <Box mb={1} color="blue">
          {key}
        </Box>
        <Divider color="Lightblue" />
        <MapOfExpenses show={show} value={value} />
      </>
    );
  }
};

export default ExpenseList;
