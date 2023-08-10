import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({ data: createUserDto });
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  findOne(id: string) {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (user && user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException('Old password does not match');
    }

    return (
      user &&
      this.prismaService.user.update({
        where: { id },
        data: {
          password: updateUserDto.newPassword,
          version: { increment: 1 },
        },
      })
    );
  }

  async remove(id: string) {
    try {
      await this.prismaService.user.delete({ where: { id } });
      return true;
    } catch (error) {
      return false;
    }
  }
}
