import React, { useState, useEffect } from 'react';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import useTheme from '@mui/material/styles/useTheme';

const ExpensesPieChart = ({ workspace }) => {
  const [pieChartData, setPieChartData] = useState(null);

  const colors = useTheme().palette;

  useEffect(() => {
    axios
      .get('/stats', { params: { report: 'totalExpensesByCategory', workspaceId: workspace?.id } })
      .then((response) => {
        console.log(response.data);
        setPieChartData(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={pieChartData} dataKey="amount" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill={colors.primary.main} label />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default ExpensesPieChart;
