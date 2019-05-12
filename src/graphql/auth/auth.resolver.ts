import { Resolver, Mutation, Arg } from 'type-graphql';
import { Auth } from './auth.type';
import { Service } from 'typedi';
import { UserService } from '../../service';
import { LocalLogin, LocalRegister } from './auth.input';
import { utilsLibrary } from '../../library';
import { userError } from '../errors';
import AuthService from '../../service/authService';

@Resolver(of => Auth)
@Service()
export default class AuthResolver {
  constructor(
    private authSerivce: AuthService,
    private userService: UserService
  ) {}

  @Mutation(() => Auth)
  public async requestLocalEmailLogin(@Arg('input') localLogin: LocalLogin) {
    const { email, password } = localLogin;

    const encryptedPassword = utilsLibrary.encryptPassword(password);

    const user = await this.userService.getUserEmailAndPassword(
      email,
      encryptedPassword
    );

    if (!user) {
      userError.notFoundUser();
      return;
    }

    const authToken = this.authSerivce.createAuthToken({ id: user.id });

    return {
      authToken,
      user
    };
  }

  @Mutation(() => Auth)
  public async requestLocalEmailRegister(
    @Arg('input') localRegister: LocalRegister
  ) {
    const { email, password, displayName, profileUrl } = localRegister;

    const userExists = await this.userService.isExistedUserEmail(email);

    if (userExists) {
      userError.existsEmail();
      return;
    }

    const encryptedPassword = utilsLibrary.encryptPassword(password);

    const user = await this.userService.createUser({
      email,
      displayName,
      profileUrl,
      authType: 'email',
      password: encryptedPassword
    });

    const authToken = this.authSerivce.createAuthToken({ id: user.id });

    return {
      authToken,
      user
    };
  }

  @Mutation(() => Auth)
  public requestSocialLogin() {
    return {
      user: {
        _id: '1'
      },
      token: '1234'
    };
  }

  @Mutation(() => Auth)
  public requestSocialRegister() {
    return {
      user: {
        _id: '1'
      },
      token: '1234'
    };
  }
}
