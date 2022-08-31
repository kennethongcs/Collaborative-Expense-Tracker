import React from 'react';
import { groupBy } from 'lodash';
import moment from 'moment';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const expenseList = ({ expenses }) => {
  // TODO - group items with similar dates together
  const groupedResults = groupBy(
    expenses,
    (result) =>
      // moment(result['Date'], 'DD/MM/YYYY').startOf('isoWeek')
      moment(result),
    'DD/MM/YYYY'
  );
  return expenses.map(
    (expense, index) =>
      // limit number of expenses to show to 3
      index < 3 && (
        <Container key={expense.id}>
          <Box>
            {moment().format('DD MMM YYYY', expense.createdAt)}
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
};

export default expenseList;
