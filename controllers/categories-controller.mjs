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

      // Move this to its own controller function once segment
      // is created for the specification of payment Mode
      const paymentMode = ['cash', 'credit', 'debit'];
      await paymentMode.forEach((paymentModeName) => {
        db.PaymentMode.create({
          name: paymentModeName,
          userId: data.userId,
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
