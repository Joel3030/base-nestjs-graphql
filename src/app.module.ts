import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  InitAccessControlModule,
  InitConfigModule,
  InitGraphQLModule,
} from './common/modules';

@Module({
  imports: [
    InitGraphQLModule,
    InitConfigModule,
    InitAccessControlModule,
    UserModule,
    AuthModule,
  ],
  providers: [PrismaService],
})
export class AppModule {
  constructor(private userService: UserService) {
    this.userService;
  }
}
