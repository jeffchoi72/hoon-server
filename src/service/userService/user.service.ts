import { Service } from 'typedi';

@Service()
export default class UserService {
  async isExistedUserEmail(email: string): Promise<Boolean> {
    if (email === 'ihello0720@gmail.com') {
      return true;
    }

    return false;
  }

  createUser(): any {}
}
