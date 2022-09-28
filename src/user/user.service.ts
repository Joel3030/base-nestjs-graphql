import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  private readonly users = [
    {
      id: 1,
      username: 'admin',
      password: '1234',
    },
    {
      id: 2,
      username: 'user',
      password: '1234',
    },
  ];

  create(createUserInput: CreateUserInput) {
    return createUserInput;
  }

  findAll() {
    return this.users;
  }

  findOne(username: string) {
    return this.users.find(user => user.username === username);
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user ${updateUserInput}`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  getUser(id: number) {
    return this.users.find(user => user.id === id);
  }
}
