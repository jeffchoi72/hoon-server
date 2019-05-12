require('dotenv').config();

import UserService from './user.service';
import { connectMongoDB } from '../../database/connection';

describe('Check UserService', () => {
  const userService = new UserService();

  beforeAll(async () => {
    await connectMongoDB();
  });

  test('To return value of isExistedUserEmail is false', async () => {
    const userExists = await userService.isExistedUserEmail('test@hoon.kr');

    expect(userExists).toBe(false);
  });

  test('User account is successfully saved', async () => {
    const user = await userService.createUser({
      email: 'tester01@test.com',
      password: 'afafaf',
      authType: 'email',
      displayName: '테스터1',
      profileUrl: 'wow'
    });

    expect(user).not.toBeNull();
  });

  test('To return value of getUserEmailAndPassword is null', async () => {
    const user = await userService.getUserEmailAndPassword(
      'test@hoon.kr',
      '1234'
    );

    expect(user).toBeNull();
  });
});
