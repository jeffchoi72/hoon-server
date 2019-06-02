import * as Router from 'koa-router';
import { AuthCtrl } from '../controller';
import Container from 'typedi';

const authCtrl = Container.get(AuthCtrl);
const authRouter: Router = new Router();

authRouter.get('/callback/github', authCtrl.callbackByGithub);
authRouter.post(
  '/social/:provider(github|facebook|google)',
  authCtrl.checkSocialAccount
);

export default authRouter;
