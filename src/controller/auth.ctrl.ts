import { Context } from 'koa';
import axios from 'axios';
import AuthService from '../service/authService';
import { Service } from 'typedi';
import * as Octokit from '@octokit/rest';
import { UserService } from '../service';
import { PROFILE_GETTER_TYPE } from '../library/socialProfile';
import { getSocialProfile } from '../library';

@Service()
export default class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  public callbackByGithub = async (ctx: Context) => {
    try {
      const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;

      const response = await axios.post(
        'https://github.com/login/oauth/access_token',
        {
          client_id: GITHUB_CLIENT_ID,
          client_secret: GITHUB_CLIENT_SECRET,
          code: ctx.query.code
        },
        {
          headers: {
            accept: 'application/json'
          }
        }
      );

      const type = 'github';
      const { access_token: accessToken } = response.data;

      let nextURL = 'http://localhost:3000/auth/loading';
      const nextPage = '/';

      nextURL += `?type=${type}&accessToken=${accessToken}&nextPage=${nextPage}`;

      ctx.redirect(nextURL);
    } catch (error) {
      console.log('error message: ', error.message);
      ctx.status = 400;
    }
  };

  public checkSocialAccount = async (ctx: Context) => {
    try {
      const { provider } = ctx.params;
      const { accessToken } = ctx.request.body;

      const socialProfile = await getSocialProfile(provider, accessToken);

      if (!socialProfile) {
        ctx.status = 400;
        ctx.body = {
          code: 'BAD_CREDENTIALS',
          message: '잘못된 토큰입니다',
          data: null
        };
        return;
      }

      const { email, displayName, profileUrl } = socialProfile;
      const authType = PROFILE_GETTER_TYPE[provider];

      const user = await this.userService.getUserByEmail(email);

      if (!user) {
        const createdUser = await this.userService.createUser({
          email,
          authType,
          displayName,
          profileUrl
        });

        const authToken = await this.authService.createAuthToken({
          id: createdUser.id
        });

        ctx.status = 200;
        ctx.body = {
          code: 'SUCCESS',
          message: '성공',
          data: {
            authToken,
            user: createdUser
          }
        };
        return;
      }

      if (user.authType === 'email') {
        ctx.status = 406;
        ctx.body = {
          code: 'NOT_ACCEPTED',
          message: '해당 이메일로 소셜계정 로그인을 할 수 없습니다',
          data: null
        };
        return;
      }

      const authToken = await this.authService.createAuthToken({
        id: user.id
      });

      ctx.status = 200;
      ctx.body = {
        code: 'SUCCESS',
        message: '성공',
        data: {
          authToken,
          user
        }
      };
    } catch (error) {
      console.log('error: ', error.message);
      ctx.status = 500;
      ctx.body = {
        code: 'SERVER_ERROR',
        message: '[서버에러] 관리자에게 문의해 주세요',
        data: null
      };
    }
  };
}
