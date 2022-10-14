import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserDecorator } from 'src/auth/decorators/user.decorator';
import { Auth } from 'src/common/decorators/auth.decorator';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards';
import { AppResource } from '../common/roles/app.roles';
import { Login, LoginUserInput } from 'src/graphql';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => Login)
  @UseGuards(LocalAuthGuard)
  login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.authService.login(loginUserInput);
  }

  @Mutation(() => Login)
  @Auth({
    resource: AppResource.USER,
    action: 'create',
    possession: 'any',
  })
  refreshToken(@UserDecorator() loginUserInput: LoginUserInput) {
    return this.authService.login(loginUserInput);
  }
}
