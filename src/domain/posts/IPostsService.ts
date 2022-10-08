import { CreateUserPostDto } from '../../presentation/http/routes/posts/dto/request/CreateUserPostDto';
import { IListPostsQueryDto } from '../../presentation/http/routes/posts/dto/request/IListPostsQueryDto';
import { IPaginatedPosts, Post } from './Post';

export interface IPostsService {
  listUserPosts(query: IListPostsQueryDto): Promise<IPaginatedPosts>
  createUserPost(createPostDto: CreateUserPostDto): Promise<Post>,
}
