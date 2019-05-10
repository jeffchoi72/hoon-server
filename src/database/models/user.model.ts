import UserSchema from './user.schema';
import * as mongoose from 'mongoose';

const UserModel = new UserSchema().getModelForClass(UserSchema, {
  existingMongoose: mongoose,
  schemaOptions: { collection: 'user' }
});

export default UserModel;
