import { Module } from '@nestjs/common';
import { AccessControlModule } from 'nest-access-control';
import { roles } from '../roles/app.roles';

@Module({
  imports: [AccessControlModule.forRoles(roles)],
  exports: [AccessControlModule],
})
export class InitAccessControlModule {}
