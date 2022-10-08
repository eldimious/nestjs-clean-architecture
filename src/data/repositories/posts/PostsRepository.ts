import { Inject, Injectable } from '@nestjs/common';
import { PostsDataStore } from './PostsDataStore';
import { Post, IPaginatedPosts } from '../../../domain/posts/Post';
import { IListPostsQueryDto } from '../../../presentation/http/routes/posts/dto/request/IListPostsQueryDto';
import { IPostsRepository } from '../../../domain/posts/IPostsRepository';
import { CreateUserPostDto } from '../../../presentation/http/routes/posts/dto/request/CreateUserPostDto';

@Injectable()
export class PostsRepository implements IPostsRepository {
  constructor(
    @Inject('PostsDataStore') private readonly postsDataStore: PostsDataStore,
  ) {}

  async create(createPostDto: CreateUserPostDto): Promise<Post> {
    return this.postsDataStore.create(createPostDto);
  }

  async list(query: IListPostsQueryDto): Promise<IPaginatedPosts> {
    return this.postsDataStore.list(query);
  }
}
