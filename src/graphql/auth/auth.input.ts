import { InputType, Field, ID } from 'type-graphql';

@InputType()
export class LocalLogin {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class LocalRegister {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  displayName: string;

  @Field()
  profileUrl: string;
}
