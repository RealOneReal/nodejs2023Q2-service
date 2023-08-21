import {
  Controller,
  Post,
  Body,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
// import { RefreshDto } from './dto/refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    const user = await this.authService.signup(signupDto);
    if (!user) {
      throw new BadRequestException('Bad data');
    }
    return user;
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: SignupDto) {
    const result = await this.authService.login(loginDto);
    if (!result.accessToken) {
      throw new BadRequestException('Bad data');
    }
    return result;
  }

  // @Post('refresh')
  // refresh(@Body() refreshDto: RefreshDto) {
  //   const user = this.authService.signup(refreshDto);
  //   if (!user) {
  //     throw new BadRequestException('Bad data');
  //   }
  //   return 'DTO is valid';
  // }
}
