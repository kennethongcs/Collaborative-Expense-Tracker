module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('payees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      user_ws_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'user_workspaces',
          key: 'id',
        },
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
    await queryInterface.dropTable('payees');
  },
};
