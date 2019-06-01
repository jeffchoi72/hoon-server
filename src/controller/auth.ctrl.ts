import { Context } from 'koa';
import axios from 'axios';

const callbackByGithub = async (ctx: Context) => {
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

export { callbackByGithub };
