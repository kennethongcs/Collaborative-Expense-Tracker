export default function initCategoriesController(db) {
  // create categories
  const addCategories = async (req, res) => {
    try {
      const data = req.body;
      await data.categoryBudgetList.forEach((categoryData) => {
        db.Category.create({
          name: categoryData.category,
          budget: categoryData.budget,
          workspaceId: data.workspaceId,
        });
      });
      res.send('Success!');
    }
    catch (error) {
      console.log(error);
    }
  };

  return ({ addCategories });
}
