export default function initExpenseDataController(db) {
  // retrieve the following data from db:
  // categories, payee, paymentmode
  const retrieveExpenseData = async (req, res) => {
    try {
      const { userId } = req.body;
      const { workspaceId } = req.body;
      // expenseData is the data we will send back to output options for the expense form
      const expenseData = { category: [], paymentMode: [], userWorkspaceId: [] };
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
          expenseData.category.push({ categoryId: x.dataValues.id, categoryName: x.dataValues.name });
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
          expenseData.userWorkspaceId.push({ userWorkspaceId: x.dataValues.id });
        }
      });

      // // find relevant payees if userWorkspaceId is not undefined
      // if (userWorkspaceId !== undefined) {
      //   const retrievePayees = await db.Payee.findAll({
      //     // eager loading
      //   });
      //   // find relevant payees
      //   retrievePayees.forEach((x) => {
      //   // store payees value
      //     if (x.dataValues.userWorkspaceId === userWorkspaceId) {
      //       expenseData.payee.push({ payeeId: x.dataValues.id, payeeName: x.dataValues.name });
      //     }
      //   });
      // }

      // retrieve paymentmode
      const retrievePaymentMode = await db.PaymentMode.findAll({
        // eager loading
      });
      // find relevant paymentmode
      retrievePaymentMode.forEach((x) => {
        // store paymentmode value
        if (x.dataValues.userId === userId) {
          expenseData.paymentMode.push({ paymentModeId: x.dataValues.id, paymentModeName: x.dataValues.name });
        }
      });

      // send final data back to display options on the expense sheet
      res.send(expenseData);
    }
    catch (error) {
      console.log(error);
    }
  };

  const addExpenseData = async (req, res) => {
    try {
      console.log('this is reqbody', req.body);
      const expenseData = req.body.data;

      const newExpense = await db.Expense.create({
        name: expenseData.name,
        userWorkspaceId: expenseData.userWorkspaceId,
        categoryId: expenseData.categoryId,
        paymentModeId: expenseData.paymentModeId,
        payee: expenseData.payee,
        amount: expenseData.amount,
        notes: expenseData.notes,
        expenseDate: expenseData.expenseDate,
      });
      res.send(newExpense);
    }
    catch (error) {
      console.log(error);
    }
  };

  const retrieve = async (req, res) => {
    const { workspaceId } = req.query;
    try {
      const expenseList = await db.Expense.findAll({
        include: [
          {
            model: db.UserWorkspace,
            where: { workspaceId },
          },
          {
            model: db.Category,
          },
        ],
      });
      // console.log(expenseList);
      res.send(expenseList);
    } catch (err) {
      console.log(`❌ Import expense error: ${err}`);
    }
  };

  const retrieveExpenseDetail = async (req, res) => {
    try {
      console.log('this is reqbody', req.body);
      const { expenseIdData } = req.body;

      const newExpense = await db.Expense.findOne({
        where: {
          id: expenseIdData,
        },
        include: [{
          model: db.PaymentMode,
        }, { model: db.Category }],
      });
      res.send(newExpense);
    }
    catch (error) {
      console.log(error);
    }
  };

  return ({
    retrieveExpenseData, addExpenseData, retrieveExpenseDetail, retrieve,
  });
}
