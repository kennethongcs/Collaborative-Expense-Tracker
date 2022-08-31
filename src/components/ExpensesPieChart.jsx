import React, { useState, useEffect } from 'react';
import {
  PieChart, Pie, ResponsiveContainer, Cell, Legend, Tooltip,
} from 'recharts';
import axios from 'axios';
import useTheme from '@mui/material/styles/useTheme';

const ExpensesPieChart = ({ workspace }) => {
  const [pieChartData, setPieChartData] = useState(null);

  const colors = useTheme().palette;
  // eslint-disable-next-line max-len
  const chartColors = [colors.primary.main, colors.secondary.main, colors.error.main, colors.warning.main, colors.info.main, colors.success.main, colors.primary.light, colors.secondary.light, colors.error.light, colors.warning.light, colors.info.light, colors.success.light, colors.primary.dark, colors.secondary.dark, colors.error.dark, colors.warning.dark, colors.info.dark, colors.success.main];

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
          <Pie data={pieChartData} dataKey="amount" cx="50%" cy="50%" innerRadius={70} outerRadius={90} paddingAngle={5} fill={colors.primary.main} label />
          <Legend />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default ExpensesPieChart;
