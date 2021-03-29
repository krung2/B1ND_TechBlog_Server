import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Post from 'src/entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) { }

  
}
