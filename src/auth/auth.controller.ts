import { Body, Controller, HttpCode, Post, Query } from '@nestjs/common';
import returnLib from 'src/lib/return.lib';
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
  addUser(
    @Body() userDto: RegisterDto,
    @Query() userKey?: string,
    ) {
    return this.authService.addUser(userDto, userKey);
  }

  @Post('login')
  @HttpCode(200)
  async login (
    @Body() loginDto: LoginDto
  ) {
    const user = await this.authService.login(loginDto);

    const token = await tokenLib.generateKey(user.id, user.name);

    return returnLib(200, '로그인 성공', {user, token});
  }
}
