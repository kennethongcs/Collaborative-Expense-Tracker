import { Sequelize, Op } from 'sequelize';

export default function initStatisticsController(db) {
  const totalExpenses = async (workspaceId, period) => {
    let dateFormat = 'MON';
    if (period === 'year') dateFormat = 'YYYY';
    else if (period === 'week') dateFormat = 'WW';

    const rawData = await db.Expense.findAll({
      include: {
        model: db.UserWorkspace,
        where: {
          workspaceId,
        },
        attributes: [],
      },
      attributes: [
        [Sequelize.fn('date_trunc', period, Sequelize.col('expense_date')), 'createdOn'],
        [Sequelize.fn('to_char', Sequelize.col('expense_date'), dateFormat), 'period'],
        [Sequelize.col('user_workspace.user_id'), 'user'],
        [Sequelize.fn('SUM', Sequelize.col('amount')), 'amount'],
      ],
      group: ['createdOn', 'period', 'user'],
      order: [[Sequelize.literal('"createdOn"'), 'ASC']],
    });

    const collaborators = await db.User.findAll({
      include: {
        model: db.Workspace,
        where: {
          id: workspaceId,
        },
        through: {
          attributes: ['user_id'],
        },
        attributes: [],
      },
      attributes: ['id', 'firstName', 'lastName'],
    });

    const convertedData = [];
    const hash = {};

    // convert data from { user: 123, amount: 10 } to { 123: 10 }
    rawData.forEach((item) => {
      const data = item.dataValues;

      // convert user from id to firstName + lastName
      for (let i = 0; i < collaborators.length; i += 1) {
        const collaborator = collaborators[i].dataValues;

        if (collaborator.id === data.user) {
          data.user = `${collaborator.firstName} ${collaborator.lastName}`;
          break;
        }
      }

      // combine collaborators values into 1 object
      if (data.createdOn in hash) {
        const lastData = convertedData.at(-1);
        lastData[[data.user]] = data.amount;
        convertedData.pop();
        convertedData.push(lastData);
      } else {
        convertedData.push({
          createdOn: data.createdOn,
          period: data.period,
          [data.user]: data.amount,
        });

        hash[data.createdOn] = true;
      }
    });

    return convertedData;
  };

  const totalExpensesByCategory = (workspaceId, startDate, endDate) => db.Expense.findAll({
    include: [{
      model: db.UserWorkspace,
      where: {
        workspaceId,
      },
      attributes: [],
    }, {
      model: db.Category,
      attributes: [],
    }],
    where: { expense_date: { [Op.gte]: startDate, [Op.lte]: endDate } },
    attributes: [
      [Sequelize.col('category.name'), 'cat'],
      [Sequelize.fn('SUM', Sequelize.col('amount')), 'amount'],
    ],
    group: 'cat',
    order: [[Sequelize.literal('"amount"'), 'DESC']],
  });

  const retrieve = async (req, res) => {
    const { report, workspaceId, period = 'month' } = req.query;

    try {
      let result = {};
      const startDate = '1/1/2022';
      const endDate = '1/1/2025';

      switch (report) {
        case 'totalExpenses':
          result = await totalExpenses(workspaceId, period);
          break;
        case 'totalExpensesByCategory':
          result = await totalExpensesByCategory(workspaceId, startDate, endDate);
          break;
        default:
          break;
      }

      res.send(result);
    } catch (err) {
      console.log(`retrieve statistics err: ${err}`);
    }
  };

  return { retrieve };
}
