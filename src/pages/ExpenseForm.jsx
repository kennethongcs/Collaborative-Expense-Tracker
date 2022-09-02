import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const ExpenseForm = ({ user, workspace }) => {
  const [addExpenseName, setaddExpenseName] = useState('');
  const [addExpenseAmount, setaddExpenseAmount] = useState('');
  const [addExpenseDate, setaddExpenseDate] = useState(new Date());
  const [addExpenseCategory, setaddExpenseCategory] = useState(null);
  const [addExpensePayee, setaddExpensePayee] = useState('');
  const [addExpensePaymentMode, setaddExpensePaymentMode] = useState(null);
  const [storeDbData, setstoreDbData] = useState('');
  const [addNotes, setaddNotes] = useState('');

  const location = useLocation();
  const marginTop = location.pathname.endsWith('/dashboard/expense') ? 0 : 8;

  const navigate = useNavigate();
  const fetchData = async () => {
    // fetch categories, and paymode
    axios
      .post('/get-data-expense-form', {
        // userId and workspaceId will allow us to retrieve:
        // categories(via ws_id), payee (via user_ws_id), payment mode (via user_id)
        userId: user.id,
        workspaceId: workspace.id,
      })
      // update useState
      .then((response) => {
        setstoreDbData(response);
        console.log(response);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  const handleNext = () => {
    navigate('/dashboard');
  };

  useEffect(() => {
    if (storeDbData === '') {
      fetchData();
    }
  });

  const handleSubmitExpense = () => {
    if (addExpenseName && addExpenseAmount && addExpenseCategory) {
      // add expense
      const data = {
        name: addExpenseName,
        userWorkspaceId: storeDbData.data.userWorkspaceId[0].userWorkspaceId,
        categoryId: addExpenseCategory,
        paymentModeId: addExpensePaymentMode,
        payee: addExpensePayee,
        amount: parseFloat(addExpenseAmount),
        notes: addNotes,
        expenseDate: addExpenseDate,
        userId: user.id,
      };
      console.log('expense data into db:', data);
      axios
        .post('/add-expense', {
          data,
          workspaceId: workspace.id,
        })
        .then((response) => {
          console.log(response);

          if (marginTop > 0) navigate('/dashboard');
          else {
          // reset input boxes
            setaddExpenseName('');
            setaddExpenseAmount('');
            setaddExpenseDate(new Date());
            setaddExpenseCategory(null);
            setaddExpensePayee('');
            setaddExpensePaymentMode(null);
            setaddNotes('');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      navigate('/dashboard');
    }
  };

  const ExpenseButtons = () => {
    if (marginTop > 0) {
      return (
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
              onClick={handleSubmitExpense}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      );
    }
    return (
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleSubmitExpense}
      >
        Save
      </Button>
    );
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={8} md={5}>
          <Box
            sx={{
              mt: marginTop,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h5">
              Add a New Expense
            </Typography>
            <Grid
              container
              maxWidth="600px"
              alignItems="center"
              justifyContent="center"
              spacing={2}
              mt={0}
            >
              {/* Expense form Input Field */}
              {/* Expense name Input Field */}
              <Grid item xs={12} sm={8} md={5}>
                <TextField
                  id="expense-name-input"
                  label="Expense Name"
                  required
                  fullWidth
                  value={addExpenseName}
                  onChange={(event) => {
                    if (event.target.value.match(/^[a-zA-Z\s]*$/)) {
                      setaddExpenseName(event.target.value);
                    }
                  }}
                />
              </Grid>
              {/* Expense amount Input Field */}
              <Grid item xs={12} sm={8} md={5}>
                <TextField
                  id="expense-amount-input"
                  label="Input Expense Amount"
                  required
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  value={addExpenseAmount}
                  onChange={(event) => {
                    if (
                      event.target.value.match(/^(?:\d{1,99}(?:\.\d{0,2})?)?$/)
                    ) {
                      setaddExpenseAmount(event.target.value);
                    }
                  }}
                />
              </Grid>
              {/* Expense date Input Field */}
              <Grid item xs={12} sm={8} md={5}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    id="expense-date-input"
                    label="Expense Date"
                    value={addExpenseDate}
                    onChange={(addExpenseDate) => {
                      setaddExpenseDate(addExpenseDate);
                    }}
                    renderInput={(params) => (
                      <TextField required fullWidth {...params} />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              {/* Expense payment category Input Field */}
              <Grid item xs={12} sm={8} md={5}>
                <FormControl fullWidth required>
                  <InputLabel>Category</InputLabel>
                  <Select
                    labelId="expense-category"
                    id="expense-payment-mode-input"
                    value={addExpenseCategory}
                    label="Category"
                    onChange={(event) => {
                      setaddExpenseCategory(event.target.value);
                    }}
                  >
                    {/* Get Category */}
                    {storeDbData.data !== undefined
                      ? storeDbData.data.category.map((x) => (
                        <MenuItem key={x.categoryId} value={x.categoryId}>
                          {x.categoryName}
                        </MenuItem>
                      ))
                      : console.log('No category data')}
                  </Select>
                </FormControl>
              </Grid>
              {/* Expense payee Input Field */}
              <Grid item xs={12} sm={8} md={5}>
                <TextField
                  id="expense-payee-input"
                  label="Expense Payee"
                  fullWidth
                  value={addExpensePayee}
                  onChange={(event) => {
                    if (event.target.value.match(/^[a-zA-Z\s]*$/)) {
                      setaddExpensePayee(event.target.value);
                    }
                  }}
                />
              </Grid>
              {/* Expense payment mode Input Field */}
              <Grid item xs={12} sm={8} md={5}>
                <FormControl fullWidth>
                  <InputLabel>Payment Mode</InputLabel>
                  <Select
                    labelId="payment-mode"
                    id="expense-payment-mode-input"
                    value={addExpensePaymentMode}
                    label="Payment Mode"
                    onChange={(event) => {
                      setaddExpensePaymentMode(event.target.value);
                    }}
                  >
                    {/* Get PaymentMode */}
                    {storeDbData.data !== undefined
                    && storeDbData.data.paymentMode[0] !== undefined
                      ? storeDbData.data.paymentMode.map((x) => (
                        <MenuItem key={x.paymentModeId} value={x.paymentModeId}>
                          {x.paymentModeName}
                        </MenuItem>
                      ))
                      : console.log('No payment mode data')}
                  </Select>
                </FormControl>
              </Grid>
              {/* Expense notes Input Field */}
              <Grid item xs={12} sm={8} md={5}>
                <TextField
                  id="expense-notes-input"
                  label="Notes"
                  multiline
                  rows={4}
                  fullWidth
                  value={addNotes}
                  onChange={(event) => {
                    if (event.target.value.match(/^[a-zA-Z\s]*$/)) {
                      setaddNotes(event.target.value);
                    }
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <ExpenseButtons />
      </Grid>

    </>
  );
};

export default ExpenseForm;
