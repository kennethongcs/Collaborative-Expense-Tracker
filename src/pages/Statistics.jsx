import React from 'react';
import { Typography, Box, Grid } from '@mui/material';
import {
  BarChart, Bar, Legend, PieChart, Pie,
  CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import useTheme from '@mui/material/styles/useTheme';

const data2 = [
  {
    period: 'Mar',

    total: 2210,
  },
  {
    period: 'Apr',
    total: 1800,
  },
  {
    period: 'May',
    total: 1400,
  },
  {
    period: 'Jun',
    total: 2400,
  },
  {
    period: 'Jul',
    total: 1710,
  },
  {
    period: 'Aug',
    total: 2290,
  },

];

const data3 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const Statistics = () => {
  const colors = useTheme().palette;

  return (
    <>
      <Typography component="h1" variant="h5">
        Statistics
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart
                data={data2}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill={colors.primary.main} />
              </BarChart>
            </ResponsiveContainer>
          </Grid>
          <Grid item xs={12} sm={6}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={data3} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill={colors.primary.main} label />
              </PieChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Statistics;
