import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserRepository {
  private readonly users: User[] = [];

  async create(user: CreateUserDto): Promise<User> {
    const timestamp = Date.now();
    const newUser = {
      id: uuidv4(),
      login: user.login,
      password: user.password,
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    this.users.push(newUser);
    return newUser;
  }

  async findAll() {
    return this.users;
  }

  async remove(id: string) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index > -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }

  async findOne(id: string) {
    return this.users.find((user) => user.id === id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.users.find((user) => user.id === id);
    const index = this.users.findIndex((user) => user.id === id);
    if (user && user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException('Old password does not match');
    }
    if (user) {
      const updatedUser = {
        ...user,
        updatedAt: Date.now(),
        password: updateUserDto.newPassword,
        version: user.version + 1,
      };
      this.users.splice(index, 1);
      this.users.push(updatedUser);
      return updatedUser;
    }
  }
}
