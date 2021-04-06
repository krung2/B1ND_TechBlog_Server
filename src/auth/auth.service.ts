import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { USER_KEY } from 'src/config/dotenv';
import { Repository } from 'typeorm';
import User from '../entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async addUser (registerDto: RegisterDto, userKey?: string) {

    if (userKey !== undefined) {

      if (userKey !== USER_KEY) {

        throw new ForbiddenException('알맞지 않은 키 입니다');
      }
    }

    try {

      const userData: User = this.userRepository.create(registerDto);

      userData.userKey = userKey;

      await this.userRepository.save(userData);
    } catch (err) {

      // tslint:disable-next-line: no-console
      console.log(err);
      throw new InternalServerErrorException('서버 오류');
    }
  }

  async login (loginDto: LoginDto): Promise<User> {

    const loginResult = await this.userRepository.findOne({
      where: {
        id: loginDto.id,
        pw: loginDto.pw,
      },
    });

    if (loginResult === undefined) {
      throw new UnauthorizedException('Id혹은 비밀번호를 확인해주세요');
    }

    return loginResult;
  }

}
