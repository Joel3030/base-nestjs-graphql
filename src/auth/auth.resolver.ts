import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserDecorator } from 'src/auth/decorators/user.decorator';
import { Auth } from 'src/common/decorators/auth.decorator';
import { AuthService } from './auth.service';
import { LoginResponse } from './dtos/login-response';
import { LoginUserInput } from './dtos/login-user.input';
import { LocalAuthGuard } from './guards';
import { AppResource } from '../common/roles/app.roles';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(LocalAuthGuard)
  login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.authService.login(loginUserInput);
  }

  @Mutation(() => LoginResponse)
  @Auth({
    resource: AppResource.USER,
    action: 'create',
    possession: 'any',
  })
  refreshToken(@UserDecorator() loginUserInput: LoginUserInput) {
    return this.authService.login(loginUserInput);
  }
}
