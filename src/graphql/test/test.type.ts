import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class Test {
  @Field(type => Boolean)
  success: boolean;

  @Field()
  message: string;
}
