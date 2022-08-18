export default function initUserWorkspaceModel(sequelize, DataTypes) {
  return sequelize.define(
    'user_workspace',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      workspaceId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'workspaces',
          key: 'id',
        },
      },
      workspaceAuthorityId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'workspace_authorities',
          key: 'id',
        },
      },
      income: {
        type: DataTypes.FLOAT,
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
    }
  );
}
