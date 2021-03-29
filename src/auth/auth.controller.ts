import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import * as tokenLib from 'src/lib/token.lib';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  addUser(@Body() userData: RegisterDto) {
    return this.authService.addUser(userData);
  }

  @Post('login')
  @HttpCode(200)
  async login (
    @Body() loginDto: LoginDto
  ) {
    const user = await this.authService.login(loginDto);

    const token = await tokenLib.generateKey(user.id, user.name);

    return {
      status: 200,
      message: '글 작성을 성공하였습니다.',
      data: {
        user,
        token,
      }
    };
  }
}
