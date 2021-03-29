import { Controller, Post, UseGuards } from '@nestjs/common';
import User from 'src/entities/user.entity';
import { Token } from 'src/lib/decorator/token.decorator';
import AuthGaurd from 'src/middleware/auth.middleware';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  
  constructor (
    private readonly postService: PostService,
  ) { }

  @Post()
  @UseGuards(new AuthGaurd)
  public async addPost (
    @Token() user: User,
  ) {
    console.log(user);
  }
}
