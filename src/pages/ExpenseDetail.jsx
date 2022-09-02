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
import { useParams } from "react-router-dom";

const ExpenseDetail = ({ user, workspace }) => {
  const [addExpenseName, setaddExpenseName] = useState("");
  const [addExpenseAmount, setaddExpenseAmount] = useState("");
  const [addExpenseDate, setaddExpenseDate] = useState(new Date());
  const [addExpenseCategory, setaddExpenseCategory] = useState(null);
  const [addExpensePayee, setaddExpensePayee] = useState("");
  const [addExpensePaymentMode, setaddExpensePaymentMode] = useState(null);
  const [addComments, setaddComments] = useState([]);
  const [storeDbData, setstoreDbData] = useState("");
  const [addNotes, setaddNotes] = useState("");
  const { expenseId } = useParams();

  const fetchExpenseData = async () => {
    // fetch expense data via id
    axios
      .post("/get-expense-detail", {
        // send expenseId to retrieve expense details relating to it
        expenseIdData: expenseId,
      })
      // update useState
      .then((response) => {
        console.log(response);
        setaddExpenseName(response.data.name);
        setaddExpenseAmount(response.data.amount);
        setaddExpenseDate(response.data.expenseDate);
        // add category id as well, need it as value,
        // does it automatically selects the option if value tallies?
        setaddExpenseCategory({
          categoryName: response.data.category.name,
          categoryId: response.data.category.id,
        });
        setaddExpensePayee(response.data.payee);
        // add paymentMode id as well, need it as value,
        // does it automatically selects the option if value tallies?
        setaddExpensePaymentMode({
          paymentModeName: response.data.payment_mode.name,
          paymentModeId: response.data.payment_mode.id,
        });
        setaddNotes(response.data.notes);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  const fetchDataOptions = async () => {
    // fetch categories via workspaceId, and payment mode via user
    axios
      .post("/get-data-expense-form", {
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

  const fetchComments = async () => {
    // fetch comments via expense Id
    axios
      .post("/get-comments", {
        // send expenseId to retrieve all comments
        expenseIdData: expenseId,
      })
      // update useState
      .then((response) => {
        console.log(response);
        setaddExpenseName(response.data.name);
        setaddExpenseAmount(response.data.amount);
        setaddExpenseDate(response.data.expenseDate);
        // add category id as well, need it as value,
        // does it automatically selects the option if value tallies?
        setaddExpenseCategory({
          categoryName: response.data.category.name,
          categoryId: response.data.category.id,
        });
        setaddExpensePayee(response.data.payee);
        // add paymentMode id as well, need it as value,
        // does it automatically selects the option if value tallies?
        setaddExpensePaymentMode({
          paymentModeName: response.data.payment_mode.name,
          paymentModeId: response.data.payment_mode.id,
        });
        setaddNotes(response.data.notes);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  const handleSubmitExpense = () => {
    // add expense
    const data = {
      name: addExpenseName,
      userWorkspaceId: storeDbData.data.userWorkspaceId[0].userWorkspaceId,
      categoryId: addExpenseCategory,
      paymentModeId: addExpensePaymentMode,
      payee: addExpensePayee,
      amount: addExpenseAmount,
      notes: addNotes,
      expenseDate: addExpenseDate,
    };
    console.log("expense data into db:", data);
    axios
      .post("/add-expense", {
        data,
        workspaceId: workspace.id,
      })
      .then((response) => {
        console.log(response);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (storeDbData === "") {
      // fetch expense detail
      fetchExpenseData();
      // fetch workspace/user data to render correct options
      fetchDataOptions();
      // fetch comments relating to expense
      fetchComments();
    }
  });

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
            Expense!
          </Typography>
        </Grid>
        <Grid container alignItems="center" justifyContent="center">
          <Grid
            container
            maxWidth="600px"
            minHeight="700px"
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
              {/* Expense payment category Input Field */}
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                minHeight="80px"
              >
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    labelId="expense-category"
                    id="expense-payment-mode-input"
                    // does it auto add the option if value tallies?
                    value={addExpenseCategory.categoryId}
                    label="Payment Mode"
                    onChange={(event) => {
                      setaddExpenseCategory(event.target.value);
                    }}
                  >
                    {/* Get Category */}
                    {storeDbData.data !== undefined
                      ? storeDbData.data.category.map((x) => (
                          <MenuItem value={x.categoryId}>
                            {x.categoryName}
                          </MenuItem>
                        ))
                      : console.log("No category data")}
                  </Select>
                </FormControl>
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
                    labelId="payment-mode"
                    id="expense-payment-mode-input"
                    value={addExpensePaymentMode.paymentModeId}
                    label="Payment Mode"
                    onChange={(event) => {
                      setaddExpensePaymentMode(event.target.value);
                    }}
                  >
                    {/* Get PaymentMode */}
                    {storeDbData.data !== undefined &&
                    storeDbData.data.paymentMode[0] !== undefined
                      ? storeDbData.data.paymentMode.map((x) => (
                          <MenuItem value={x.paymentModeId}>
                            {x.paymentModeName}
                          </MenuItem>
                        ))
                      : console.log("No payment mode data")}
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

export default ExpenseDetail;
