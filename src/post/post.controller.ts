import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards
} from '@nestjs/common';
import User from 'src/entities/user.entity';
import { Token } from 'src/lib/decorator/token.decorator';
import AuthGaurd from 'src/middleware/auth.middleware';
import { AddPostDto } from './dto/addPost.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {

  constructor (
    private readonly postService: PostService
  ) { }

  @Post()
  // tslint:disable-next-line: new-parens
  @UseGuards(new AuthGaurd)
  public async addPost (
    @Token() user: User,
    @Body() addPostDto: AddPostDto,
  ) {
    return this.postService.addPost(addPostDto, user);
  }

  @Get()
  public async getPosts () {
    return this.postService.getPosts();
  }

  // @Get()
  // // tslint:disable-next-line: new-parens
  // @UseGuards(new AuthGaurd)
  // public async getPostsByuserId (
  //   @Token() user: User,
  // ) {

  // }

  @Get('/:idx')
  public async getPost (
    @Param('idx') idx: number,
  ) {
    return this.postService.getPost(idx);
  }
}
