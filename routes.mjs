import { resolve } from 'path';
import db from './models/index.mjs';

import initUsersController from './controllers/users-controller.mjs';
import initCategoriesController from './controllers/categories-controller.mjs';

export default function routes(app) {
  const usersController = initUsersController(db);
  const categoriesController = initCategoriesController(db);

  app.get('/*', (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  });

  app.get('/signup', usersController.signup);
  app.post('/signup', usersController.signup);
  app.post('/retrieveusers', usersController.retrieveusers);
  app.post('/add-category', categoriesController.addCategories);
}
