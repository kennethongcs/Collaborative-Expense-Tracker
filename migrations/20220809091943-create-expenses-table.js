module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('expenses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      user_workspace_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'user_workspaces',
          key: 'id',
        },
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'categories',
          key: 'id',
        },
      },
      payment_mode_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'payment_modes',
          key: 'id',
        },
      },
      // payee_id: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: 'payees',
      //     key: 'id',
      //   },
      // },
      payee: {
        type: Sequelize.STRING,
      },
      // comment_id: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: 'comments',
      //     key: 'id',
      //   },
      // },
      amount: {
        type: Sequelize.FLOAT,
      },
      notes: {
        type: Sequelize.STRING,
      },
      expense_date: {
        type: Sequelize.DATEONLY,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop category_items first because it references items and categories.
    await queryInterface.dropTable('expenses');
  },
};
