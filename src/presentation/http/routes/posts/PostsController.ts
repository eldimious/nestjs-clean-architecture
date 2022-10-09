import {
  Controller, Inject, Get, UseGuards, Req, Post, Body, Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../middleware/JwtStrategy';
import { IPostsService } from '../../../../domain/posts/IPostsService';
import { ListPostsQueryDto, ListUserPostsQueryDto } from './dto/request/ListPostsQueryDto';
import { CreatePostDto } from './dto/request/CreatePostDto';
import { IPostResponseDto } from './dto/response/IPostResponseDto';
import { CreateUserPostDto } from './dto/request/CreateUserPostDto';
import { IListPostsResponseDto } from './dto/response/IListPostsResponseDto';
import { DEFAULT_PAGINATION_LIMIT, DEFAULT_PAGINATION_PAGE } from "../../../../common/constants";

@Controller('users/me/posts')
export class PostsController {
  constructor(
    @Inject('IPostsService') private readonly postsService: IPostsService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async listPosts(@Req() req: any, @Query() queryParams: ListPostsQueryDto): Promise<IListPostsResponseDto> {
    const params: ListUserPostsQueryDto = Object.assign({
      userId: req.user.userId,
      page: DEFAULT_PAGINATION_PAGE,
      limit: DEFAULT_PAGINATION_LIMIT
    }, queryParams);
    const res = await this.postsService.listUserPosts(params);
    return {
      data: res.posts.map((el) => el.toPostResponse()),
      pagination: res.pagination,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async createPost(@Body() createPostDto: CreatePostDto, @Req() req: any): Promise<IPostResponseDto> {
    let newPost = new CreateUserPostDto();
    newPost = {
      userId: req.user.userId,
      ...createPostDto,
    };
    return this.postsService.createUserPost(newPost);
  }
}
