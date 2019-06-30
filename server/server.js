import Koa from 'koa';
import Router from 'koa-router';

import filename from './handlers/filename';
import assets from './routes/assets';
import client from './routes/client';

const app = new Koa();
const router = new Router();

app.use(filename);

/* global PUBLIC_PATH */
router
  .get(`${PUBLIC_PATH}*`, assets)
  .get('*', client);

app.use(router.routes());

export default app;
