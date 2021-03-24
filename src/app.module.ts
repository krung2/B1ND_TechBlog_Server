import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { config } from './config/ormConfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(config()), 
    AuthModule, 
    PostModule
  ],
})
export class AppModule {}
