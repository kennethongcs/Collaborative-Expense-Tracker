import React, { useState, useEffect } from 'react';
import {
  PieChart, Pie, ResponsiveContainer, Cell, Legend, Tooltip, Label,
} from 'recharts';
import axios from 'axios';
import useTheme from '@mui/material/styles/useTheme';
import moment from 'moment';

const ExpensesPieChart = ({ workspace, selectedData }) => {
  const [pieChartData, setPieChartData] = useState(null);

  const colors = useTheme().palette;
  // eslint-disable-next-line max-len
  const chartColors = [colors.warning.dark, colors.info.dark, colors.success.dark, colors.error.dark, colors.primary.dark, colors.secondary.dark, colors.warning.light, colors.info.light, colors.success.light, colors.error.light, colors.primary.light, colors.secondary.light, colors.warning.main, colors.info.main, colors.success.main, colors.error.main, colors.primary.main, colors.secondary.main];

  const getStartEndDate = (date, period = 'month') => ({ startDate: moment(date).startOf(period).format('YYYY-MM-DD hh:mm'), endDate: moment(date).endOf(period).format('YYYY-MM-DD hh:mm') });

  useEffect(() => {
    const date = getStartEndDate(selectedData?.createdOn);

    axios
      .get('/stats', {
        params: {
          report: 'totalExpensesByCategory', workspaceId: workspace?.id, startDate: date.startDate, endDate: date.endDate,
        },
      })
      .then((response) => {
        setPieChartData(response.data);
      })
      .catch((error) => console.log(error));
  }, [selectedData]);

  // Create our number formatter.
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  const CustomLabel = (props) => (
    <g>
      <foreignObject x={props.viewBox.cx - 80} y={props.viewBox.cy - 15} width={160} height={100}>
        <div style={{ textAlign: 'center', fontSize: '1.5rem' }}>
          {formatter.format(pieChartData.reduce((prev, cur) => prev + cur.amount, 0))}
        </div>
      </foreignObject>
    </g>
  );

  return (
    <>
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={pieChartData}
            dataKey="amount"
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={100}
            paddingAngle={3}
            label={(value) => `$${value.amount}`}
          >
            {pieChartData?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
            ))}
            <Label content={CustomLabel} />
          </Pie>
          <Tooltip
            formatter={(value, name, props) => [
              `$${value}`, `${props.payload.cat}`]}
          />
          <Legend
            formatter={(value, entry, index) => `${entry.payload.cat}`}
          />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default ExpensesPieChart;
