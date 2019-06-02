import { Typegoose, prop } from 'typegoose';

export default class UserSchema extends Typegoose {
  @prop()
  email: string;

  @prop({
    select: false
  })
  password: string;

  @prop()
  authType: string;

  @prop()
  displayName: string;

  @prop()
  profileUrl: string;
}
