import {
  Controller, Inject, Get, UseGuards, Req, Post, Body, Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../middleware/JwtStrategy';
import { IPostsService } from '../../../../domain/posts/IPostsService';
import { IListPostsQueryDto } from './dto/request/IListPostsQueryDto';
import { CreatePostDto } from './dto/request/CreatePostDto';
import { IPostResponseDto } from './dto/response/IPostResponseDto';
import { CreateUserPostDto } from './dto/request/CreateUserPostDto';
import { IListPostsResponseDto } from './dto/response/IListPostsResponseDto';

@Controller('users/me/posts')
export class PostsController {
  constructor(
    @Inject('IPostsService') private readonly postsService: IPostsService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async listPosts(@Req() req: any, @Query() queryParams: IListPostsQueryDto): Promise<IListPostsResponseDto> {
    const params: IListPostsQueryDto = Object.assign(queryParams, { userId: req.user.userId });
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
    const post = await this.postsService.createUserPost(newPost);
    return post;
  }
}
