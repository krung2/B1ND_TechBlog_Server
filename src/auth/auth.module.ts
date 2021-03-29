import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/entities/user.entity';
import UserKey from 'src/entities/userKey.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserKey]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})

export class AuthModule {}