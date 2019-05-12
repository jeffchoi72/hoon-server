import AuthService from './auth.service';

describe('Check AuthService', () => {
  const authService = new AuthService();

  test('To return value of the createAuthToken function is string', async () => {
    const authToken = await authService.createAuthToken({
      id: 'ihello0720@gmail.com'
    });

    expect(typeof authToken).toBe('string');
  });
});
