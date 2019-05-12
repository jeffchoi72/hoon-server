require('dotenv').config();

import { Service } from 'typedi';
import { tokenLibrary } from '../../library';

export interface User {
  id: string;
}

@Service()
export default class AuthService {
  createAuthToken = (user: User) => tokenLibrary.generateToken(user);
}
