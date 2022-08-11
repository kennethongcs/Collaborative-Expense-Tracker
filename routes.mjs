import { resolve } from 'path';
import db from './models/index.mjs';

import initUsersController from './controllers/users.mjs';

export default function routes(app) {
  const usersController = initUsersController(db);
  app.get('/signup', usersController.signup);
}
