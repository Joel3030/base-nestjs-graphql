import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from '../common/services/prisma.service';

@Injectable()
export class UserService {
  private users = [];

  constructor(private prisma: PrismaService) {
    this.setDefaultUser();
  }

  create(createUserInput: CreateUserInput) {
    return createUserInput;
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user ${updateUserInput}`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  getUser(id: number) {
    return this.users.find((user) => user.id === id);
  }

  async setDefaultUser() {
    const defaultUser = this.users.some(
      (user: CreateUserInput) => user.username === 'admin',
    );

    if (!defaultUser) {
      const newUser = {
        username: 'admin',
        password: '@Admin3030',
        roles: ['ADMIN'],
      };
      newUser.password = await hash(newUser.password, 10);

      this.users = [...this.users, newUser];
    }
  }
}
