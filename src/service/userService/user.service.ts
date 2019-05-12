import { Service } from 'typedi';
import { UserModel, UserSchema } from '../../database/models';

export interface User {
  email: string;
  password: string;
  authType: string;
  displayName: string;
  profileUrl: string;
}

@Service()
export default class UserService {
  async isExistedUserEmail(email: string): Promise<Boolean> {
    const user = await UserModel.find({ email });

    if (user.length === 0) {
      return false;
    }

    return true;
  }

  async createUser(userParams: User) {
    return UserModel.create(userParams);
  }

  async getUserEmailAndPassword(email: string, password: string) {
    return UserModel.findOne({ email, password });
  }
}
