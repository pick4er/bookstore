import Koa from 'koa';
import Router from 'koa-router';

import filename from './handlers/filename';
import assets from './routes/assets';

const app = new Koa();
const router = new Router();

app.use(filename);

router.get('*', assets);

app.use(router.routes());

export default app;
