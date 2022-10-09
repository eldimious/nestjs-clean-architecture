import { CreateUserPostDto } from '../../presentation/http/routes/posts/dto/request/CreateUserPostDto';
import { ListUserPostsQueryDto } from '../../presentation/http/routes/posts/dto/request/ListPostsQueryDto';
import { Post, IPaginatedPosts } from './Post';

export interface IPostsRepository {
  create(createPostDto: CreateUserPostDto): Promise<Post>
  list(query: ListUserPostsQueryDto): Promise<IPaginatedPosts>
}
