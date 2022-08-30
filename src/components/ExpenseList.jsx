import React from 'react';
import moment from 'moment';

const expenseList = ({ expenses }) => {
  // 0: amount: 2000
  // categoryId: 1
  // commentId: 2
  // createdAt: "2022-08-30T06:30:45.176Z"
  // id: 3
  // notes: "some notes"
  // payeeId: 2
  // paymentModeId: 3
  // updatedAt: "2022-08-30T06:30:45.176Z"
  // userWorkspaceId: 2

  // console.log(expenses);
  return expenses.map((expense) => {
    return (
      <li key={expense.id}>
        {moment().format('DD MMM YYYY', expense.createdAt)}
        <br />
        {expense.notes}
        <br />
        {expense.categoryId}
      </li>
    );
  });
};

export default expenseList;
