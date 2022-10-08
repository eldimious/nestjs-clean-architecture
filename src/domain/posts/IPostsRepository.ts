import { CreateUserPostDto } from '../../presentation/http/routes/posts/dto/request/CreateUserPostDto';
import { IListPostsQueryDto } from '../../presentation/http/routes/posts/dto/request/IListPostsQueryDto';
import { Post, IPaginatedPosts } from './Post';

export interface IPostsRepository {
  create(createPostDto: CreateUserPostDto): Promise<Post>
  list(query: IListPostsQueryDto): Promise<IPaginatedPosts>
}
