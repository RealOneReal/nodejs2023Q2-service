import { Injectable, UnauthorizedException } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

import { SignupDto } from './dto/signup.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(createAuthDto: SignupDto) {
    try {
      const hashedPassword = await hash(
        createAuthDto.password,
        Number(process.env.CRYPT_SALT),
      );

      return this.prismaService.user.create({
        data: { login: createAuthDto.login, password: hashedPassword },
      });
    } catch (e) {
      console.error(e.stack);
    }
  }

  async login(loginDto: SignupDto) {
    const user = await this.validateUser(loginDto);
    if (!user) {
      return null;
    }
    const accessToken = await this.getAccessToken(user);
    // const refreshToken = this.getRefreshToken(user);
    return {
      accessToken,
      // refreshToken,
    };
  }

  async validateUser(loginDto: SignupDto) {
    const user = await this.prismaService.user.findUnique({
      where: { login: loginDto.login },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const passwordIsValid = await compare(loginDto.password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid password');
    }
    return user;
  }

  private async getAccessToken(user: User) {
    const payload = { userId: user.id, login: user.login };
    const secret = process.env.JWT_SECRET_KEY;
    const expiresIn = process.env.TOKEN_EXPIRE_TIME;

    const token = await this.jwtService.signAsync(payload, {
      secret,
      expiresIn,
    });
    return token;
  }

  private getRefreshToken(user: User) {
    // todo
  }
}
