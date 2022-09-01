import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Cookies from 'js-cookie';
import ExpenseList from '../components/ExpenseList.jsx';

const AllExpenses = ({ workspace }) => {
  const theme = createTheme();
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate(-1, { replace: true });
  };

  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios
      .post('/getExpenses', {
        workspace,
      })
      .then((res) => {
        setExpenses(res.data);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box mt={4}>
          <ArrowBackIosNewIcon onClick={handleBackButton} />
        </Box>
        <Box mt={3}>
          <Typography component="h1" variant="h5">
            All Expenses
          </Typography>
          <br />
          <ExpenseList expenses={expenses} all="all" />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AllExpenses;
