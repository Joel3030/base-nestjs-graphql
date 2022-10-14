import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      expandVariables: true,
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
    }),
  ],
  exports: [ConfigModule],
})
export class InitConfigModule {}
