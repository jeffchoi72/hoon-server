import { Typegoose, prop } from 'typegoose';

export default class UserSchema extends Typegoose {
  @prop()
  email: string;

  @prop()
  password: string;

  @prop()
  authType: string;

  @prop()
  displayName: string;

  @prop()
  profileUrl: string;
}
