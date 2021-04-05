import { 
  ForbiddenException,
  Injectable, 
  InternalServerErrorException, 
  UnauthorizedException 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserKey from 'src/entities/userKey.entity';
import { Repository } from 'typeorm';
import User from '../entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { IRegister } from './interface/IRegister';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserKey)
    private readonly keyRepository: Repository<UserKey>,
  ) { }

  async addUser (registerDto: IRegister, userKey: string) {

    const searchKey = await this.keyRepository.findOne({
      where: {
        keyId: userKey,
      },
    });
    
    if (searchKey === undefined) {
      throw new ForbiddenException('유효하지 않는 키 입니다');
    }

    try {

      const userData: User = this.userRepository.create(registerDto);
      
      userData.userKey = searchKey;

      await this.userRepository.save(userData);
    } catch (err) {

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
