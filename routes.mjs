import { resolve } from 'path';
import db from './models/index.mjs';
import initUsersController from './controllers/users-controller.mjs';
import initWorkspacesController from './controllers/workspaces-controller.mjs';

export default function routes(app) {
  const usersController = initUsersController(db);
  const workspacesController = initWorkspacesController(db);

  app.post('/signup', usersController.signup);
  app.post('/login', usersController.login);

  app.post('/workspace', workspacesController.create);

  app.get('/', (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  });
}
