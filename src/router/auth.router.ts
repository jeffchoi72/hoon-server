import * as Router from 'koa-router';
import { authCtrl } from '../controller';

const authRouter: Router = new Router();

authRouter.get('/callback/github', authCtrl.callbackByGithub);

export default authRouter;
