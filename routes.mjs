import { resolve } from 'path';
import db from './models/index.mjs';
import initUsersController from './controllers/users-controller.mjs';
import initWorkspacesController from './controllers/workspaces-controller.mjs';
import initCategoriesController from './controllers/categories-controller.mjs';
import initExpensesController from './controllers/expenses-controller.mjs';

export default function routes(app) {
  const usersController = initUsersController(db);
  const workspacesController = initWorkspacesController(db);
  const categoriesController = initCategoriesController(db);
  const expensesController = initExpensesController(db);

  app.get('/signup', usersController.signup);
  app.post('/signup', usersController.signup);
  app.post('/login', usersController.login);
  app.post('/logout', usersController.logout);
  app.post('/save', usersController.save);
  app.post('/retrieveusers', usersController.retrieveusers);

  app.get('/workspace', workspacesController.retrieve);
  app.post('/verify', usersController.verify);

  app.post('/add-category', categoriesController.addCategories);

  app.post('/workspace', workspacesController.create);
  app.post('/joinworkspace', workspacesController.joinWorkspace);

  app.post('/getexpenses', expensesController.retrieve);

  app.get('*', (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  });
}
