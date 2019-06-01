import 'reflect-metadata';
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as BodyParser from 'koa-bodyparser';
import * as Cors from 'kcors';
import { ApolloServer } from 'apollo-server-koa';
import { graphqlSchema } from './graphql';
import { connectMongoDB } from './database/connection';

import rootRouter from './router';

export default class Server {
  private app: Koa;
  private apolloServer: ApolloServer;
  private router: Router;

  constructor() {
    this.app = new Koa();
    this.apolloServer = new ApolloServer({ schema: graphqlSchema });
    this.router = new Router();

    this.setMiddlewares();
    this.setRoutes();
    this.setApolloServer();
  }

  private setMiddlewares() {
    this.app.use(Cors());
    this.app.use(BodyParser());
  }

  private setRoutes() {
    this.router.use('/api', rootRouter.routes());

    this.app.use(this.router.routes());
    this.app.use(this.router.allowedMethods());
  }

  private setApolloServer() {
    this.apolloServer.applyMiddleware({ app: this.app });
  }

  private async connectDatabase() {
    await connectMongoDB();
  }

  public async runServer(port: string = '3000') {
    await this.connectDatabase();

    this.app.listen(port, () => {
      console.log(`Server is running to http://localhost:${port}`);
    });
  }
}
