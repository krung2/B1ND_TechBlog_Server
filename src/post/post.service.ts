import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Post from 'src/entities/post.entity';
import User from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { AddPostDto } from './dto/addPost.dto';

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) { }

  async addPost (addPostDto: AddPostDto, user: User) {

    try {
      const createPost = this.postRepository.create(addPostDto);

      createPost.user = user;

      await this.postRepository.save(createPost);
    } catch (err) {

      // tslint:disable-next-line: no-console
      console.log(err);
      throw new InternalServerErrorException('서버 오류');
    }
  }

  async getPosts (): Promise<Post[]> {

    try {

      return await this.postRepository.find({
        order: {
          idx: 'DESC',
        },
      });
    } catch (err) {

      // tslint:disable-next-line: no-console
      console.log(err);
      throw new InternalServerErrorException('서버 오류');
    }
  }

  async getPost (postIdx: number): Promise<Post> {

    let post: Post;

    try {
      post = await this.postRepository.findOne({
        idx: postIdx,
      });
    } catch (err) {

      // tslint:disable-next-line: no-console
      console.log(err);
      throw new InternalServerErrorException('서버 오류');
    }

    if (post === undefined) {
      throw new NotFoundException('없는 idx입니다');
    }

    return post;
  }
}
