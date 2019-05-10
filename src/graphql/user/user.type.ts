import { ObjectType, Field, ID } from 'type-graphql';
import { ObjectId } from 'mongodb';

@ObjectType()
export class User {
  @Field(type => ID)
  _id: ObjectId;

  @Field()
  authType: string;

  @Field()
  email: string;

  @Field()
  password?: string;

  @Field()
  displayName: string;

  @Field()
  profileUrl: string;
}
