import React from 'react';
import moment from 'moment';

const expenseList = ({ expenses }) =>
  expenses.map((expense) => (
    <li key={expense.id}>
      {moment().format('DD MMM YYYY', expense.createdAt)}
      <br />
      {expense.category.name}
      <br />
      {expense.payee.name}
    </li>
  ));

export default expenseList;
