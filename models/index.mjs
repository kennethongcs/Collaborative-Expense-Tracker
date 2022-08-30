import { Sequelize } from 'sequelize';
import url from 'url';
import allConfig from '../config/config.js';
import initUserModel from './user.mjs';
import initWorkspaceModel from './workspace.mjs';
import initWorkspaceAuthorityModel from './workspace_authority.mjs';
import initUserWorkspaceModel from './user_workspace.mjs';
import initCategoryModel from './category.mjs';
import initPaymentModeModel from './payment_mode.mjs';
// import initPayeeModel from './payee.mjs';
import initCommentModel from './comment.mjs';
import initExpenseModel from './expense.mjs';

const env = process.env.NODE_ENV || 'development';

const config = allConfig[env];

const db = {};

let sequelize;

if (env === 'production') {
  // break apart the Heroku database url and rebuild the configs we need

  const { DATABASE_URL } = process.env;
  const dbUrl = url.parse(DATABASE_URL);
  const username = dbUrl.auth.substr(0, dbUrl.auth.indexOf(':'));
  const password = dbUrl.auth.substr(dbUrl.auth.indexOf(':') + 1, dbUrl.auth.length);
  const dbName = dbUrl.path.slice(1);

  const host = dbUrl.hostname;
  const { port } = dbUrl;

  config.host = host;
  config.port = port;

  sequelize = new Sequelize(dbName, username, password, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.User = initUserModel(sequelize, Sequelize.DataTypes);
db.Workspace = initWorkspaceModel(sequelize, Sequelize.DataTypes);
db.WorkspaceAuthority = initWorkspaceAuthorityModel(sequelize, Sequelize.DataTypes);
db.UserWorkspace = initUserWorkspaceModel(sequelize, Sequelize.DataTypes);
db.Category = initCategoryModel(sequelize, Sequelize.DataTypes);
db.PaymentMode = initPaymentModeModel(sequelize, Sequelize.DataTypes);
// db.Payee = initPayeeModel(sequelize, Sequelize.DataTypes);
db.Comment = initCommentModel(sequelize, Sequelize.DataTypes);
db.Expense = initExpenseModel(sequelize, Sequelize.DataTypes);

// Specify relationship of the tables
// One to Many
// // 1. Payee (One) - expense (Many)
// db.Expense.belongsTo(db.Payee);
// db.Payee.hasMany(db.Expense);
// 2. Category (One) - expense (Many)
db.Expense.belongsTo(db.Category);
db.Category.hasMany(db.Expense);
// 3. Payment_mode (One) - expense (Many)
db.Expense.belongsTo(db.PaymentMode);
db.PaymentMode.hasMany(db.Expense);
// 4. User_workspace (One) - expense (Many)
db.Expense.belongsTo(db.UserWorkspace);
db.UserWorkspace.hasMany(db.Expense);
// 5. Expense (One) - comments (Many)
db.Comment.belongsTo(db.Expense);
db.Expense.hasMany(db.Comment);
// 6. User (One) - comments (Many)
db.Comment.belongsTo(db.User);
db.User.hasMany(db.Comment);
// // 7. User_workspace (One) - payee (Many)
// db.Payee.belongsTo(db.UserWorkspace);
// db.UserWorkspace.hasMany(db.Payee);
// 8. Workspace (One) - categories (Many)
db.Category.belongsTo(db.Workspace);
db.Workspace.hasMany(db.Category);
// 9. User (One) - payment_mode (Many)
db.PaymentMode.belongsTo(db.User);
db.User.hasMany(db.PaymentMode);

// Many to Many
// 1. user (Many) - workspace (Many) - workspace_authority (Many)
db.User.belongsToMany(db.Workspace, { through: 'user_workspaces' });
db.Workspace.belongsToMany(db.User, { through: 'user_workspaces' });
db.User.belongsToMany(db.WorkspaceAuthority, { through: 'user_workspaces' });
db.WorkspaceAuthority.belongsToMany(db.User, { through: 'user_workspaces' });
db.Workspace.belongsToMany(db.WorkspaceAuthority, { through: 'user_workspaces' });
db.WorkspaceAuthority.belongsToMany(db.Workspace, { through: 'user_workspaces' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
