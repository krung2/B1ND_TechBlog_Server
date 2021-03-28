import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('register')
  addUser(@Body() userData: RegisterDto) {
    return this.authService.addUser(userData);
  }

  @Post('login')
  login (@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
