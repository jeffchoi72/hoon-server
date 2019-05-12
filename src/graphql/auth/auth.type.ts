import { ObjectType, Field } from 'type-graphql';
import { User } from '../user/user.type';

@ObjectType()
export class Auth {
  @Field()
  authToken: string;

  @Field()
  user: User;
}
