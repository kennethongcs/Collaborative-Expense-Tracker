import React, { useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';

import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useNavigate } from 'react-router-dom';
import RenderBudgetInput from '../components/BudgetInput.jsx';

const CategoryForm = ({ user, workspace }) => {
  const [addCategory, setaddCategory] = useState([]);
  const [categoryBudgetList, setCategoryBudgetList] = useState([
    { id: 1, category: 'Transport', budget: 0 },
    { id: 2, category: 'Food', budget: 0 },
    { id: 3, category: 'Entertainment', budget: 0 },
    { id: 4, category: 'Healthcare', budget: 0 },
  ]);

  const budgetUpdate = (newBudget, categoryName) => {
    // update budget in categoryBudgetList
    const index = categoryBudgetList.findIndex(
      (x) => x.category === categoryName,
    );
    const tempCategoryList = [...categoryBudgetList];
    tempCategoryList[index] = { category: categoryName, budget: newBudget };
    setCategoryBudgetList(tempCategoryList);
  };

  const handleAddCategory = () => {
    // get last id
    const lastId = categoryBudgetList.at(-1).id;

    // add new category to categoryBudgetList
    const updatedCategoryList = [
      ...categoryBudgetList,
      { id: (lastId + 1), category: addCategory, budget: 0 },
    ];
    // updates categoryBudgetList
    setCategoryBudgetList(updatedCategoryList);
    setaddCategory('');
  };

  const handleCategoryDelete = (element) => {
    // finds and delete category from categoryBudgetList
    const newCategoryList = categoryBudgetList.filter(
      (x) => x.category !== element.category,
    );
    // updates categoryBudgetList
    setCategoryBudgetList(newCategoryList);
  };

  const navigate = useNavigate();
  const handleCategoryListSubmit = () => {
    axios
      .post('/add-category', {
        categoryBudgetList,
        userId: user.id,
        workspaceId: workspace.id,
      })
      .then((response) => {
        console.log(response);
        navigate('/workspace/3');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {/* 'Create a New Expense Category' Title */}
      <Grid container marginBottom={2}>
        <Grid item xs={12} sm={8} md={5}>
          <Box
            sx={{
              mt: 8,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h5">
              Create a New Expense Category
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={5}>
          {/* Category Input Field */}
          <TextField
            id="category-input"
            label="New Category"
            value={addCategory}
            margin="normal"
            fullWidth
            onChange={(event) => {
              if (event.target.value.match(/^[a-zA-Z\s]*$/)) {
                setaddCategory(event.target.value);
              }
            }}
          />
        </Grid>
        {/* Add Category Button */}
        <Grid item xs={12} sm={8} md={5}>
          <Button
            sx={{ minWidth: 140, minHeight: 40 }}
            onClick={handleAddCategory}
            fullWidth
            variant="contained"
          >
            Add Category
          </Button>
        </Grid>
      </Grid>
      {/* Categories shown */}
      <Box
        container
        sx={{ minHeight: 500 }}
      >
        {/* Selected Categories, needs its separate component, as we need to render addBudget
          field independently */}
        <Grid
          container
          spacing={1}
          color="textSecondary"
        >
          {categoryBudgetList.map((element) => (
            <Grid key={element.id} item xs={6}>
              <Card elevation={1}>
                <CardContent sx={{ p: 1 }}>
                  <Grid container>
                    <Grid item xs={10}>
                      <Typography variant="h6" component="div">
                        {element.category}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <IconButton onClick={() => handleCategoryDelete(element)}>
                        <DeleteOutlinedIcon />
                      </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                      {/* Every selected category needs its own <ItemrenderSelectedCategories/>
                      component as each category needs its own budget state */}
                      <RenderBudgetInput
                        budgetUpdate={budgetUpdate}
                        category={element}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* Submit Button */}
      <Grid
        container
        sx={{ minHeight: 70 }}
      >
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleCategoryListSubmit}
        >
          Next
        </Button>
      </Grid>
    </>
  );
};

export default CategoryForm;
