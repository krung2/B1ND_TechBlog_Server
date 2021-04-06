import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';
import User from 'src/entities/user.entity';
import { Token } from 'src/lib/decorator/token.decorator';
import returnLib from 'src/lib/return.lib';
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
  @UseGuards(new AuthGaurd(1))
  public async addPost (
    @Token() user: User,
    @Body() addPostDto: AddPostDto,
  ) {
    return this.postService.addPost(addPostDto, user);
  }

  @Get()
  public async getPosts () {

    const data = await this.postService.getPosts();

    return returnLib(200, '불러오기 성공', data);
  }

  @Get('/userSearch')
  public async getPostsByUserId (
    @Query('userId') userId: string
  ) {

    const data = await this.postService.getPostByuserId(userId);

    return returnLib(200, '불러오기 성공', data);
  }

  @Get('/categorySearch')
  public async getPostsByCategory (
    @Query('category') category: string
  ) {

    const data = await this.postService.getPostsByCategory(category);

    return returnLib(200, '불러오기 성공', data);
  }

  @Get('/:idx')
  public async getPost (
    @Param('idx') idx: number,
  ) {
    const data = await this.postService.getPost(idx);

    return returnLib(200, '불러오기 성공', data);
  }
}
