import { CreateUserPostDto } from '../../presentation/http/routes/posts/dto/request/CreateUserPostDto';
import { ListUserPostsQueryDto } from '../../presentation/http/routes/posts/dto/request/ListPostsQueryDto';
import { IPaginatedPosts, Post } from './Post';

export interface IPostsService {
  listUserPosts(query: ListUserPostsQueryDto): Promise<IPaginatedPosts>
  createUserPost(createPostDto: CreateUserPostDto): Promise<Post>,
}
