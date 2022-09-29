import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './common/roles/app.roles';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    ConfigModule.forRoot({
      cache: true,
      expandVariables: true,
      isGlobal: true,
    }),
    AccessControlModule.forRoles(roles),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {
  constructor(private userService: UserService) {
    this.userService;
  }
}
