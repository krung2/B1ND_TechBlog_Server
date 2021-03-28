import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async addUser (user: RegisterDto) {
    try {

      await this.userRepository.save(user);
    } catch (err) {

      console.log(err);
      throw new InternalServerErrorException('서버 오류');
    }
  }

  async login (loginDto: LoginDto): Promise<User> {
    
    const loginResult = await this.userRepository.findOne({
      where: {
        id: loginDto.id,
      },
    });

    if (loginResult === undefined) {
      throw new UnauthorizedException('Id를 확인해주세요');
    }

    if (loginResult.pw === loginDto.pw) {
      throw new UnauthorizedException('Pw를 확인해주세요');
    }

    return loginResult;
  }


}
