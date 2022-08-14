import React from 'react';
import { useParams } from 'react-router-dom';

const SingleExpense = () => {
  const { expenseId } = useParams();

  return (
    <div>
      <div>SingleExpense</div>
      <div>{expenseId}</div>
    </div>
  );
};

export default SingleExpense;
