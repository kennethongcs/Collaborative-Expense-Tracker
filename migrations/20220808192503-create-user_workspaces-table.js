module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_workspaces', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      workspace_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'workspaces',
          key: 'id',
        },
      },
      workspace_authority_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'workspace_authorities',
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
    await queryInterface.dropTable('user_workspaces');
  },
};
