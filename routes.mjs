import { resolve } from 'path';
import db from './models/index.mjs';

import initUsersController from './controllers/users-controller.mjs';

export default function routes(app) {
  const usersController = initUsersController(db);
  
  app.get('/*', (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  });
  
  app.get('/signup', usersController.signup);  
}
