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
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Box from "@mui/material/Box";
import { result } from "lodash";

const ExpenseDetail = ({ user, workspace }) => {
  const [addExpenseName, setaddExpenseName] = useState("");
  const [addExpenseAmount, setaddExpenseAmount] = useState("");
  const [addExpenseDate, setaddExpenseDate] = useState(new Date());
  const [addExpenseCategory, setaddExpenseCategory] = useState(null);
  const [addExpensePayee, setaddExpensePayee] = useState("");
  const [addExpensePaymentMode, setaddExpensePaymentMode] = useState(null);
  const [addComments, setaddComments] = useState("");
  const [addNewComment, setaddNewComment] = useState("");
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
        setaddExpenseCategory(response.data.category.id);
        setaddExpensePayee(response.data.payee);
        // add paymentMode id as well, need it as value,
        // does it automatically selects the option if value tallies?
        setaddExpensePaymentMode(response.data.payment_mode.id);
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
        console.log("this is data option", response);
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
        console.log("these are comments", response.data);
        setaddComments(response.data);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  const handleAddComment = async () => {
    // fetch comments via expense Id
    axios
      .post("/add-comment", {
        // send userId, expenseId detail to update comments table
        userId: user.id,
        expenseIdData: expenseId,
        comment: addNewComment,
      })
      // fetch updated data and update addComments useState
      .then((response) => {
        console.log(response);
        fetchComments();
        setaddNewComment("");
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  const handleDeleteComment = async (commentId) => {
    // fetch comments via expense Id
    axios
      .post("/delete-comment", {
        // send commentId in order to delete it
        id: commentId,
      })
      // fetch updated data and update addComments useState
      .then((response) => {
        console.log(response);
        fetchComments();
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    if (storeDbData === "") {
      // fetch workspace/user data to render correct options
      fetchDataOptions();
      // fetch expense data for the expense id
      fetchExpenseData();
      // fetch comments relating to expense
      fetchComments();
    }
  });

  const handleUpdateExpense = () => {
    // add expense
    const data = {
      expenseIdData: expenseId,
      userId: user.id,
      name: addExpenseName,
      userWorkspaceId: storeDbData.data.userWorkspaceId[0].userWorkspaceId,
      categoryId: addExpenseCategory,
      paymentModeId: addExpensePaymentMode,
      payee: addExpensePayee,
      amount: parseFloat(addExpenseAmount),
      notes: addNotes,
      expenseDate: addExpenseDate,
    };
    console.log("updating data in db:", data);
    axios
      .post("/update-expense", {
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
            Expense Detail
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
                    value={addExpenseCategory || ""}
                    label="Category"
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
                    value={addExpensePaymentMode || ""}
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
            onClick={handleUpdateExpense}
            variant="contained"
          >
            Update Expense
          </Button>
        </Grid>

        <Box container>
          {/* Get Comments */}
          <Grid container alignItems="center" justifyContent="center">
            <Typography
              className="paragraph"
              variant="h6"
              // color="textSecondary"
              component="h2"
              gutterBottom
            >
              Comments
            </Typography>
          </Grid>
          {addComments !== ""
            ? addComments.map((x) => (
                <Paper style={{ padding: "20px 20px" }}>
                  <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                      <Avatar alt="Remy Sharp" />
                    </Grid>
                    <Grid justifyContent="left" item xs zeroMinWidth>
                      <h4 style={{ margin: 0, textAlign: "left" }}>
                        {user.firstName} {user.lastName}
                      </h4>
                      <p style={{ textAlign: "left" }}>{x.comment} </p>
                      <p style={{ textAlign: "left", color: "gray" }}>
                        Created at: {x.createdAt}
                      </p>
                    </Grid>
                    <IconButton onClick={() => handleDeleteComment(x.id)}>
                      <DeleteOutlinedIcon style={{ marginTop: "-80px" }} />
                    </IconButton>
                  </Grid>
                  <Divider variant="fullWidth" style={{ margin: "0px 0" }} />
                </Paper>
              ))
            : console.log("No comments")}
          <Grid
            padding="20px"
            container
            alignItems="center"
            justifyContent="center"
            minHeight="80px"
          >
            <TextField
              id="comment-input"
              label="Add Comments"
              multiline
              rows={4}
              fullWidth
              value={addNewComment}
              onChange={(event) => {
                setaddNewComment(event.target.value);
              }}
            />
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              minHeight="70px"
            >
              <Button
                minWidth="140px"
                minHeight="40px"
                onClick={handleAddComment}
                variant="contained"
              >
                Add Comment!
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default ExpenseDetail;
