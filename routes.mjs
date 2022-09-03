import { resolve } from 'path';
import db from './models/index.mjs';
import initUsersController from './controllers/users-controller.mjs';
import initWorkspacesController from './controllers/workspaces-controller.mjs';
import initCategoriesController from './controllers/categories-controller.mjs';
import initStatisticsController from './controllers/stats-controller.mjs';
import initExpenseDataController from './controllers/expense-data-controller.mjs';
import initCommentsDataController from './controllers/comments-data-controller.mjs';

export default function routes(app) {
  const usersController = initUsersController(db);
  const workspacesController = initWorkspacesController(db);
  const categoriesController = initCategoriesController(db);
  const statsController = initStatisticsController(db);
  const expenseDataController = initExpenseDataController(db);
  const commentsDataController = initCommentsDataController(db);

  app.get('/register', usersController.signup);
  app.post('/register', usersController.signup);
  app.post('/login', usersController.login);
  app.post('/save', usersController.save);
  app.post('/retrieveusers', usersController.retrieveusers);
  app.post('/verify', usersController.verify);

  app.post('/workspace', workspacesController.create);
  app.post('/joinworkspace', workspacesController.joinWorkspace);
  app.get('/workspace', workspacesController.retrieve);
  app.get('/workspace/collaborators', workspacesController.getCollaborators);

  app.post('/add-category', categoriesController.addCategories);

  app.post('/get-data-expense-form', expenseDataController.retrieveExpenseData);
  app.post('/add-expense', expenseDataController.addExpenseData);
  app.get('/getExpenses', expenseDataController.retrieve);
  app.post('/get-expense-detail', expenseDataController.retrieveExpenseDetail);
  app.post('/update-expense', expenseDataController.updateExpenseDetail);
  app.post('/get-comments', commentsDataController.retrieveCommentsData);
  app.post('/add-comment', commentsDataController.addComment);
  app.post('/delete-comment', commentsDataController.deleteComment);

  app.get('/stats', statsController.retrieve);

  app.get('*', (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  });
}
