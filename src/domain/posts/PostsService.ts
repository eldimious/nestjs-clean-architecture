import { Inject, Injectable, Logger } from '@nestjs/common';
import { IPostsService } from './IPostsService';
import { IPaginatedPosts, Post } from './Post';
import { ListUserPostsQueryDto } from '../../presentation/http/routes/posts/dto/request/ListPostsQueryDto';
import { IPostsRepository } from './IPostsRepository';
import { CreateUserPostDto } from '../../presentation/http/routes/posts/dto/request/CreateUserPostDto';

@Injectable()
export class PostsService implements IPostsService {
  private readonly logger = new Logger(PostsService.name);

  constructor(@Inject('IPostsRepository') private readonly postsRepository: IPostsRepository) {}

  async createUserPost(createPostDto: CreateUserPostDto): Promise<Post> {
    this.logger.log('Saving a post');
    return this.postsRepository.create(createPostDto);
  }

  async listUserPosts(query: ListUserPostsQueryDto): Promise<IPaginatedPosts> {
    this.logger.log(`Try to fetch posts with query: ${query}`);
    return this.postsRepository.list(query);
  }
}
