import React from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ExpenseForm = () => {
  const navigate = useNavigate();
  const handleNext = () => {
    navigate('/dashboard');
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={8} md={5}>
          <Box
            sx={{
              mt: 8,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h5">
              Add Your Expense
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
            />
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={6} sm={8} md={5}>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleNext}
          >
            Skip
          </Button>
        </Grid>
        <Grid item xs={6} sm={8} md={5}>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleNext}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ExpenseForm;
