import express from 'express';
import user from './user';
import auth from './auth';
import file from './file';

const router = express.Router();

const routes = { user, auth, file };
for (const path in routes) {
  router.use(router, routes[path]);
}

export default router;
