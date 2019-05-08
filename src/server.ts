import 'reflect-metadata';
import * as Koa from 'koa';
import { ApolloServer } from 'apollo-server-koa';
import { graphqlSchema } from './graphql';
import { connectMongoDB } from './database/connection';

export default class Server {
  private app: Koa;
  private apolloServer: ApolloServer;

  constructor() {
    this.app = new Koa();
    this.apolloServer = new ApolloServer({ schema: graphqlSchema });

    this.setApolloServer();
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
