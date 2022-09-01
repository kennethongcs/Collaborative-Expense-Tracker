import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Typography';
import { IconButton } from '@mui/material';

const RenderBudgetInput = ({ budgetUpdate, category }) => {
  const [addBudget, setaddBudget] = useState([]);

  const handleBudgetSubmit = () => {
    budgetUpdate(addBudget, category.category);
    setaddBudget('');
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography
          variant="body2"
          color="text.secondary"
          component="div"
        >
          Budget: $
          {category.budget}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Specify Budget"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          id="budget-input"
          size="small"
          sx={{ width: 123, mt: 2 }}
          value={addBudget}
          onChange={(event) => {
            if (event.target.value.match(/^(?:\d{1,99}(?:\.\d{0,2})?)?$/)) {
              setaddBudget(event.target.value);
            }
          }}
        />
        <IconButton onClick={() => handleBudgetSubmit(addBudget, category.category)}>
          <AddIcon
            sx={{ color: '#1976D2' }}
          />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default RenderBudgetInput;
