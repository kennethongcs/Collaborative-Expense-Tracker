import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';

import ExpenseList from '../components/ExpenseList.jsx';

const ExpensesAll = ({ workspace }) => {
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate(-1, { replace: true });
  };

  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    console.log(`workspace: ${workspace.id}`);
    axios
      .get('/getExpenses', {
        params: {
          workspaceId: workspace.id,
        },
      })
      .then((res) => {
        console.log(res.data);
        setExpenses(res.data);
      });
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Box mt={4}>
        <ArrowBackIosNewIcon onClick={handleBackButton} />
      </Box>
      <Box mt={3}>
        <Typography component="h1" variant="h5">
          Expenses
        </Typography>
        <br />
        <ExpenseList expenses={expenses} all />
      </Box>
    </Container>
  );
};

export default ExpensesAll;
