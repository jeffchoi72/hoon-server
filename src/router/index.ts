import * as Router from 'koa-router';
import { Context } from 'koa';

import authRouter from './auth.router';

const rootRouter: Router = new Router();

rootRouter.use('/auth', authRouter.routes());

rootRouter.all('*', (ctx: Context) => {
  ctx.status = 404;
  ctx.body = '존재하지 않는 API 입니다';
});

export default rootRouter;
