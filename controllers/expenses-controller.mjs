import sequelizePackage from 'sequelize';

const { Sequelize } = sequelizePackage;

export default function initExpensesController(db) {
  const retrieve = async (req, res) => {
    const { id } = req.body.workspace;
    try {
      const expenseList = await db.Expense.findAll({
        where: { userWorkspaceId: id },
        include: [
          {
            model: db.Category,
          },
          {
            model: db.Payee,
          },
          { model: db.UserWorkspace },
        ],
      });
      // console.log(expenseList);
      res.send(expenseList);
    } catch (err) {
      console.log(`❌ Import expense error: ${err}`);
    }
  };

  return { retrieve };
}
