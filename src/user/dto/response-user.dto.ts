import { Exclude } from 'class-transformer';
import { User } from '../user.interface';

export class ResponseUserDto {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  @Exclude()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, {
      ...partial,
      createdAt: partial.createdAt?.getTime(),
      updatedAt: partial.updatedAt?.getTime(),
    });
  }
}
