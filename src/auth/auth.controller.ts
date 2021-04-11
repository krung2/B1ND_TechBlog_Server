import { Body, Controller, HttpCode, Patch, Post, Query, UseGuards } from '@nestjs/common';
import User from 'src/entities/user.entity';
import { Token } from 'src/lib/decorator/token.decorator';
import returnLib from 'src/lib/return.lib';
import * as tokenLib from 'src/lib/token.lib';
import AuthGaurd from 'src/middleware/auth.middleware';
import { AuthService } from './auth.service';
import * as jwt from '../lib/token.lib';
import { LoginDto } from './dto/login.dto';
import { PermissionDto } from './dto/permission.dta';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async addUser(
    @Body() userDto: RegisterDto,
    ) {

      const { userKey } = userDto;
      delete userDto.userKey;

      const data = await this.authService.addUser(userDto, userKey);

      return returnLib(200, '회원가입 성공', {data});
  }

  @Post('/permission')
  async adminCheck (
    @Body() permissionDto: PermissionDto,
  ) {

    const { token } = permissionDto;

    const decoded = await jwt.verifyKey(token);

    return returnLib(200, '권환 확인', {decoded});
  }

  @Post('login')
  @HttpCode(200)
  async login (
    @Body() loginDto: LoginDto,
  ) {
    const user = await this.authService.login(loginDto);

    const token = await tokenLib.generateKey(user.id, user.name, user.userKey);

    return returnLib(200, '로그인 성공', {user, token});
  }

  @Patch('profile')
  // tslint:disable-next-line: new-parens
  @UseGuards(new AuthGaurd(1))
  async modifyProfile (
    @Token() user: User,
    @Body() profileImage: string,
  ) {
      await this.authService.modifyProfile(user.id, profileImage);
  }
}
