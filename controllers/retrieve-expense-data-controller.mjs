export default function initRetrieveExpenseDataController(db) {
  // retrieve the following data from db:
  // categories, payee, paymentmode
  const retrieveExpenseData = async (req, res) => {
    try {
      const { userId } = req.body;
      const { workspaceId } = req.body;
      // expenseData is the data we will send back to output options for the expense form
      const expenseData = { category: [], payee: [], paymentMode: [] };
      // store user_workspace.id for retrieval of data
      let userWorkspaceId;
      // retrieve categories
      const retrieveCategories = await db.Category.findAll({
        // eager loading
      });
      // find relevant categories
      retrieveCategories.forEach((x) => {
        // store categories value
        if (x.dataValues.workspaceId === workspaceId) {
          expenseData.category.push(x.dataValues.name);
        }
      });

      // retrieve relevant user_workspaces, to retrieve payee
      // if first time creating workspaces, naturally no payee would be found, because
      // payee is tagged to a specific workspace
      const retrieveUserWorkspaces = await db.UserWorkspace.findAll({
        // eager loading
      });
      // find relevant user_workspaces
      retrieveUserWorkspaces.forEach((x) => {
        // store user_workspaces value
        if (x.dataValues.workspaceId === workspaceId && x.dataValues.userId === userId) {
          userWorkspaceId = x.dataValues.id;
        }
      });
      console.log('this is userWorkspaceId data', userWorkspaceId);

      // find relevant payees if userWorkspaceId is not undefined
      if (userWorkspaceId !== undefined) {
        const retrievePayees = await db.Payee.findAll({
          // eager loading
        });
        // find relevant payees
        retrievePayees.forEach((x) => {
        // store payees value
          if (x.dataValues.userWorkspaceId === userWorkspaceId) {
            expenseData.payee.push(x.dataValues.name);
          }
        });
      }

      // retrieve paymentmode
      const retrievePaymentMode = await db.PaymentMode.findAll({
        // eager loading
      });
      // find relevant paymentmode
      retrievePaymentMode.forEach((x) => {
        // store paymentmode value
        if (x.dataValues.userId === userId) {
          expenseData.paymentMode.push(x.dataValues.name);
        }
      });
      console.log(expenseData);
      // send final data back to display options on the expense sheet
      res.send(expenseData);
    }
    catch (error) {
      console.log(error);
    }
  };

  return ({ retrieveExpenseData });
}
