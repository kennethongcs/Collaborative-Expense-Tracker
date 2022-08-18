import React from 'react';
import { useParams } from 'react-router-dom';

const ExpenseDetail = () => {
  const { expenseId } = useParams();

  return (
    <div>
      <div>Expense Detail</div>
      <div>{expenseId}</div>
      <div>Price, category, date details on top</div>
      <div>Edit button somewhere on top right</div>
      <div>Maybe some chart to show more about this expense's category</div>
      <div>Comments section</div>
    </div>
  );
};

export default ExpenseDetail;
