import UserService from './user.service';

describe('Check UserService', () => {
  const userService = new UserService();

  test('To return value of isExistedUserEmail is false', async () => {
    const userExists = await userService.isExistedUserEmail(
      'ihello0720@naver.com'
    );

    expect(userExists).toBe(false);
  });

  test('To return value of isExistedUserEmail is true', async () => {
    const userExists = await userService.isExistedUserEmail(
      'ihello0720@gmail.com'
    );

    expect(userExists).toBe(true);
  });
});
