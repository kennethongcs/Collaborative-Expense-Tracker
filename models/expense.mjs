export default function initExpenseModel(sequelize, DataTypes) {
  return sequelize.define(
    'expense',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userWsId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user_workspaces',
          key: 'id',
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'categories',
          key: 'id',
        },
      },
      paymentModeId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'payment_modes',
          key: 'id',
        },
      },
      payeeId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'payees',
          key: 'id',
        },
      },
      commentId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'comments',
          key: 'id',
        },
      },
      amount: {
        type: DataTypes.FLOAT,
      },
      notes: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      // The underscored option makes Sequelize reference snake_case names in the DB.
      underscored: true,
    },
  );
}
