module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('expenses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_ws_id: {
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
      payee_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'payees',
          key: 'id',
        },
      },
      comment_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'comments',
          key: 'id',
        },
      },
      amount: {
        type: Sequelize.FLOAT,
      },
      notes: {
        type: Sequelize.STRING,
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
