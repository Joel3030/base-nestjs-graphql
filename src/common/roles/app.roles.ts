import { RolesBuilder } from 'nest-access-control';

export enum AppRoles {
  ADMIN = 'ADMIN',
}

export enum AppResource {
  USER = 'USER',
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  .grant(AppRoles.ADMIN)
  .readAny([AppResource.USER])
  .createAny([AppResource.USER])
  .updateAny([AppResource.USER])
  .deleteAny([AppResource.USER]);
