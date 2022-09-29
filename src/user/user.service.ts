import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  private users = [];

  constructor() {
    this.setDefaultUser();
  }

  create(createUserInput: CreateUserInput) {
    return createUserInput;
  }

  findAll() {
    return this.users;
  }

  findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }

  update(id: number, updateUserInput: UpdateUserInput) {
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
        id: '1',
        username: 'admin',
        password: '1234',
        roles: ['ADMIN'],
      };
      newUser.password = await hash(newUser.password, 10);

      this.users = [...this.users, newUser];
    }
  }
}
