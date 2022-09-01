import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar,
  ResponsiveContainer, Tooltip, XAxis, YAxis, Legend,
} from 'recharts';
import axios from 'axios';
import useTheme from '@mui/material/styles/useTheme';

const ExpensesBarChart = ({ workspace, setSelectedData, setLastExpenseMonth }) => {
  const [barChartData, setBarChartData] = useState(null);
  const [dataKeys, setDataKeys] = useState([]);

  const colors = useTheme().palette;
  // eslint-disable-next-line max-len
  const chartColors = [colors.primary.main, colors.secondary.main, colors.error.main, colors.warning.main, colors.info.main, colors.success.main, colors.primary.light, colors.secondary.light, colors.error.light, colors.warning.light, colors.info.light, colors.success.light, colors.primary.dark, colors.secondary.dark, colors.error.dark, colors.warning.dark, colors.info.dark, colors.success.main];

  useEffect(() => {
    axios
      .get('/stats', { params: { report: 'totalExpenses', workspaceId: workspace?.id } })
      .then((response) => {
        console.log(response.data);
        const chartData = response.data;
        setBarChartData(chartData);

        setLastExpenseMonth(chartData?.at(-1));

        // find index of chart data with most collaborators
        let indexWithMostCollaborators;
        const mostCollaborators = 0;
        chartData.forEach((data, index) => {
          const keysCount = Object.keys(data).length;
          if (keysCount > mostCollaborators) {
            indexWithMostCollaborators = index;
          }
        });

        // get collaborator keys
        setDataKeys(Object.keys(chartData[indexWithMostCollaborators]).filter((key) => (key !== 'createdOn' && key !== 'period')));
      })
      .catch((error) => console.log(error));
  }, []);

  const handleBarClick = (data) => {
    setSelectedData(data);
  };

  return (
    <>
      <ResponsiveContainer width="100%" height={150}>
        <BarChart
          data={barChartData}
          margin={{
            top: 5,
            right: 30,
            left: -20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="period" />
          <YAxis />
          <Tooltip
            labelStyle={{ color: colors.primary.dark }}
            formatter={(value, name) => `$${value}`}
          />
          <Legend />
          {dataKeys.map((key, index) => (
            <Bar key={key} dataKey={key} stackId="a" barSize={30} fill={chartColors[index % chartColors.length]} onClick={handleBarClick} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default ExpensesBarChart;
