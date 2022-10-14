import { BadRequestException, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';

import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {
    this.setDefaultUser();
  }

  async create(createUserInput: Prisma.UserCreateInput) {
    const userExist = await this.prisma.user.findFirst({
      where: {
        username: createUserInput.username,
      },
    });
    if (userExist) throw new BadRequestException('User already registered');

    createUserInput.password = await hash(createUserInput.password, 10);
    const user = await this.prisma.user.create({
      data: createUserInput,
    });

    return user;
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findOne(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    const user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
    return user;
  }

  async findOneByUsername(username: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    return user;
  }

  async update(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    updateUserInput: Prisma.UserUpdateInput,
  ) {
    const updateUser = await this.prisma.user.update({
      where: userWhereUniqueInput,
      data: updateUserInput,
    });
    return updateUser;
  }

  async remove(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    const deleteUser = await this.prisma.user.delete({
      where: userWhereUniqueInput,
    });
    return deleteUser;
  }

  async setDefaultUser() {
    const defaultUser = await this.prisma.user.findFirst({
      where: {
        username: 'admin',
      },
    });

    if (!defaultUser) {
      const newUser: Prisma.UserCreateInput = {
        username: 'admin',
        password: '@Admin3030',
        roles: ['ADMIN'],
      };
      newUser.password = await hash(newUser.password, 10);

      return await this.prisma.user.create({
        data: newUser,
      });
    }
  }
}
