import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
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
    @InjectRepository(User)
    private userRepository: Repository<User>,
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
        relations: ['user'],
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
        relations: ['user'],
        where: {
          idx: postIdx,
        },
        order: {
          idx: 'DESC',
        },
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

  async getPostByuserId (userId: string) {

    let post: Post[];
    let userData: User | undefined

    try {

      post = await this.postRepository.find({
        relations: ['user'],
        where: {
          user:
            {
              id: userId,
            },
        },
        order: {
          idx: 'DESC',
        },
      });

      userData = await this.userRepository.findOne({
        where: {
          id: userId,
        },
      });

    } catch (err) {

      // tslint:disable-next-line: no-console
      console.log(err);
      throw new InternalServerErrorException('서버 오류');
    }

    if (userData === undefined) {
      throw new UnauthorizedException('찾을 수 없는 사용자');
    }

    return post;
  }

  async getPostsByCategory (category: string) {

    try {

      return this.postRepository.find({
        where: {
          category,
        },
      });
    } catch ( err ) {

      // tslint:disable-next-line: no-console
      console.log(err);
      throw new InternalServerErrorException('서버 오류');
    }
  }

  async modifyPostByIdx (user: User, idx: number, postDto: AddPostDto) {

    const postData = await this.getPost(idx);

    if (postData === undefined) {

      throw new NotFoundException('잘못된 idx');
    };

    try {

      await this.postRepository.merge(postData, postDto);
      return await this.postRepository.save(postData);
    } catch ( err ) {

      // tslint:disable-next-line: no-console
      console.log(err);
      throw new InternalServerErrorException('서버 오류');
    }

  }

  async deletePostByIdx (idx: number) {

    const postData = await this.getPost(idx);

    if (postData === undefined) {

      throw new NotFoundException('잘못된 idx');
    }

    try {

      await this.postRepository.delete({
        idx,
      });
    } catch (err) {

      // tslint:disable-next-line: no-console
      console.log(err);
      throw new InternalServerErrorException('서버 오류');
    }
  }
}
