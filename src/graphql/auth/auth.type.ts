import { ObjectType, Field } from 'type-graphql';
import { User } from '../user/user.type';

// 토큰
// 유저 정보

@ObjectType()
export class Auth {
  @Field()
  token: string;

  @Field()
  user: User;
}
