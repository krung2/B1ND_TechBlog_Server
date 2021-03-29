import { Body, Controller, HttpCode, Post, Query } from '@nestjs/common';
import User from 'src/entities/user.entity';
import returnLib from 'src/lib/return.lib';
import * as tokenLib from 'src/lib/token.lib';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { IRegister } from './interface/IRegister';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  addUser(
    @Body() userDto: RegisterDto,
    ) {
    const userKey: string = userDto.userKey;
     
    const userData: IRegister = {
      id: userDto.id,
      pw: userDto.pw,
      name: userDto.name,
      field: userDto.field,
      profileImage: userDto.profileImage,
    }
      
    return this.authService.addUser(userData, userKey);
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
