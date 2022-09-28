import { Injectable } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { LoginResponse } from './dtos/login-response';
import { LoginUserInput } from './dtos/login-user.input';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);

    if (user && password === user.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginUserInput: LoginUserInput) {
    const user = await this.userService.findOne(loginUserInput.username);
    const { password, ...result } = user;
    return {
      access_token: this.jwtService.sign({ username: user.username, sub: user.id }),
    };
  }
}
