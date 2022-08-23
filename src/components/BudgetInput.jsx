import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";

const RenderBudgetInput = ({ budgetUpdate, categoryName }) => {
  const [addBudget, setaddBudget] = useState([]);

  const handleBudgetSubmit = () => {
    budgetUpdate(addBudget, categoryName);
    setaddBudget("");
  };

  return (
    <>
      <TextField
        label="Specify Budget"
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        id="budget-input"
        size="small"
        value={addBudget}
        onChange={(event) => {
          if (event.target.value.match(/^(?:\d{1,99}(?:\.\d{0,2})?)?$/)) {
            setaddBudget(event.target.value);
          }
        }}
      />

      <IconButton onClick={() => handleBudgetSubmit(addBudget, categoryName)}>
        <AddIcon
          sx={{
            ml: 0.5,
            color: "#1976D2",
          }}
        />
      </IconButton>
    </>
  );
};

export default RenderBudgetInput;
