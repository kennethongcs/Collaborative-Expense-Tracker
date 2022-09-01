import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar,
  ResponsiveContainer, Tooltip, XAxis, YAxis, Legend,
} from 'recharts';
import axios from 'axios';
import useTheme from '@mui/material/styles/useTheme';

const ExpensesBarChart = ({ workspace, setSelectedData }) => {
  const [barChartData, setBarChartData] = useState(null);
  const [dataKeys, setDataKeys] = useState([]);

  const colors = useTheme().palette;
  // eslint-disable-next-line max-len
  const chartColors = [colors.primary.main, colors.secondary.main, colors.error.main, colors.warning.main, colors.info.main, colors.success.main, colors.primary.light, colors.secondary.light, colors.error.light, colors.warning.light, colors.info.light, colors.success.light, colors.primary.dark, colors.secondary.dark, colors.error.dark, colors.warning.dark, colors.info.dark, colors.success.main];

  useEffect(() => {
    axios
      .get('/stats', { params: { report: 'totalExpenses', workspaceId: workspace?.id } })
      .then((response) => {
        const chartData = response.data;

        setBarChartData(chartData);
        setSelectedData(chartData?.at(-1));

        // find index of chart data with most collaborators
        let indexWithMostCollaborators;
        let mostCollaborators = 0;
        chartData.forEach((data, index) => {
          const keysCount = Object.keys(data).length;

          if (keysCount > mostCollaborators) {
            indexWithMostCollaborators = index;
            mostCollaborators = keysCount;
          }
        });

        // get collaborator keys
        setDataKeys(Object.keys(chartData[indexWithMostCollaborators]).filter((key) => (key !== 'createdOn' && key !== 'period')));
      })
      .catch((error) => console.log(error));

    console.log(dataKeys);
  }, []);

  /**
   * Save selected month on bar click.
   * @param {Object} data
   */
  const handleBarClick = (data) => {
    setSelectedData(data);
  };

  return (
    <>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={barChartData}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <XAxis dataKey="period" />
          <YAxis />
          <Tooltip
            labelStyle={{ color: colors.primary.dark }}
            formatter={(value, name) => `$${value}`}
            allowEscapeViewBox={{ y: true }}
            position={{ x: 130, y: -50 }}
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
