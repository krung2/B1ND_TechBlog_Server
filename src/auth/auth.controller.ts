import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../entities/user.entity';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('register')
  addUser(@Body() userData: User) {
    return this.authService.addUser(userData);
  }

  @Post('login')
  login (@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
