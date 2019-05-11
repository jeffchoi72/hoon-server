import { Resolver, Mutation, Arg } from 'type-graphql';
import { Auth } from './auth.type';
import { Service } from 'typedi';
import { UserService } from '../../service';
import { LocalLogin, LocalRegister } from './auth.input';

@Resolver(of => Auth)
@Service()
export default class AuthResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => Auth)
  public requestLoccalEmailLogin(@Arg('auth') localLogin: LocalLogin) {
    return {
      user: {
        _id: '1'
      },
      token: '1234'
    };
  }

  @Mutation(() => Auth)
  public async requestLocalEmailRegister(
    @Arg('input') localRegister: LocalRegister
  ) {
    // 요청 파라미터로 들어오는 데이터가 유효한지 검사한다.
    const { email, password, displayName, profileUrl } = localRegister;

    // 이메일로 계정이 조회되는지 확인한다.
    const userExists = await this.userService.isExistedUserEmail(email);

    if (userExists) {
      // throw apollo error
      return;
    }

    const user = await this.userService.createUser({
      email,
      password,
      displayName,
      profileUrl,
      authType: 'email'
    });

    if (!user) {
      // throw apollo error
      return;
    }

    // 제대로 토큰을 발급했는지 확인한다.

    return {
      user: {
        _id: '1'
      },
      token: '1234'
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
