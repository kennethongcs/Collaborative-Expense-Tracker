import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const ExpenseForm = () => {
  const [addExpenseName, setaddExpenseName] = useState([]);
  const [addExpenseAmount, setaddExpenseAmount] = useState([]);
  const [addExpenseDate, setaddExpenseDate] = useState(new Date());
  const [addExpensePayee, setaddExpensePayee] = useState([]);
  const [addExpensePaymentMode, setaddExpensePaymentMode] = useState([]);
  const [storeDbData, setstoreDbData] = useState("");
  const [addNotes, setaddNotes] = useState([]);
  const [addExpense, setaddExpense] = useState([
    {
      userWsId: "",
      categoryId: 0,
      paymentModeId: 0,
      payeeId: 0,
      commentId: 0,
      amount: 0,
      notes: 0,
    },
  ]);

  const fetchData = async () => {
    // fetch categories, and paymode, payee
    axios
      .post("/get-data-expense-form", {
        // require following data: userId and workspaceId to query DB, hardcoded as 3 & 1 first
        // workspaceId will refer to the newest workspace being created
        // userId and workspaceId will allow us to retrieve:
        // categories(via ws_id), payee (via user_ws_id), payment mode (via user_id)
        userId: 3,
        workspaceId: 1,
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

  useEffect(() => {
    if (storeDbData === "") {
      fetchData();
    }
  });

  const handleSubmitExpense = () => {
    // add expense
    axios
      .post("/add-expense", {
        addExpense,
        // hardcoded as 3 first
        workspaceId: 3,
      })
      .then((response) => {
        console.log(response);
        navigate("/workspace/3");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Container>
        {/* 'Create a New Expense Title */}
        <Grid container alignItems="center" justifyContent="center">
          <Typography
            className="paragraph"
            variant="h6"
            // color="textSecondary"
            component="h2"
            gutterBottom
          >
            Add a New Expense!
          </Typography>
        </Grid>
        <Grid container alignItems="center" justifyContent="center">
          <Grid
            container
            maxWidth="600px"
            minHeight="600px"
            border={1}
            borderRadius={1}
            borderColor="lightGrey"
            alignItems="center"
            justifyContent="center"
          >
            <Grid container maxWidth="400px">
              {/* Expense form Input Field */}
              {/* Expense name Input Field */}
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                minHeight="80px"
              >
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
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                minHeight="80px"
              >
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
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                minHeight="80px"
              >
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
              {/* Expense payee Input Field */}
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                minHeight="80px"
              >
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
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                minHeight="80px"
              >
                <FormControl fullWidth>
                  <InputLabel>Payment Mode</InputLabel>
                  <Select
                    labelId="Test"
                    id="expense-payment-mode-input"
                    value={addExpensePaymentMode}
                    label="Payment Mode"
                    onChange={(event) => {
                      setaddExpensePaymentMode(event.target.value);
                    }}
                  >
                    {/* Get PaymentMode */}
                    {storeDbData !== "" ? (
                      storeDbData.data.paymentMode.map((x) => (
                        <MenuItem value={x}>{x}</MenuItem>
                      ))
                    ) : (
                      <>
                        <MenuItem value={"Cash"}>Cash</MenuItem>
                        <MenuItem value={"Credit"}>Credit Card</MenuItem>
                      </>
                    )}
                  </Select>
                </FormControl>
              </Grid>
              {/* Expense notes Input Field */}
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                minHeight="80px"
              >
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
          </Grid>
        </Grid>

        {/* Submit Expense Button */}
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          minHeight="70px"
        >
          <Button
            minWidth="140px"
            minHeight="40px"
            onClick={handleSubmitExpense}
            variant="contained"
          >
            Submit Expense
          </Button>
        </Grid>
      </Container>
    </>
  );
};

export default ExpenseForm;

// <div>
//   <div>Add expense</div>
//   <NavLink to="/dashboard">Submit</NavLink>
//   <br />
//   <NavLink to="/dashboard">Skip</NavLink>
// </div>
