import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  FilterQuery, Model, PaginateOptions, PaginateResult,
} from 'mongoose';
import { IPaginatedPosts, Post } from '../../../domain/posts/Post';
import { CreateUserPostDto } from '../../../presentation/http/routes/posts/dto/request/CreateUserPostDto';
import { IListPostsQueryDto } from '../../../presentation/http/routes/posts/dto/request/IListPostsQueryDto';
import { IPostEntity, PostSchema } from '../../infrastructure/db/schemas';

const getPaginationOptions = (query: IListPostsQueryDto): PaginateOptions => ({
  page: query.page || 1,
  limit: query.limit || 25,
  sort: { created: -1 },
});

const getQueryObject = (query: IListPostsQueryDto) => {
  const queries: FilterQuery<typeof PostSchema> = {
    userId: query.userId,
  };
  if (query.publisher) {
    queries.publisher = {
      $regex: new RegExp(query.publisher),
      $options: 'i',
    };
  }
  return queries;
};

const DEFAULT_PAGINATION_CONTENT: IPaginatedPosts = {
  pagination: {
    total: undefined,
    limit: undefined,
    pages: undefined,
    page: undefined,
  },
  posts: [],
};

const handleUsersPaginationResponse = (response: PaginateResult<IPostEntity>): IPaginatedPosts => {
  if (!response || !response.docs || response.docs.length <= 0) {
    return DEFAULT_PAGINATION_CONTENT;
  }
  const postsList: IPaginatedPosts = {
    posts: response.docs.map((doc: IPostEntity) => doc.toPost()),
    pagination: {
      total: response.total,
      limit: response.limit,
      page: response.page,
      pages: response.pages,
    },
  };
  return postsList;
};

@Injectable()
export class PostsDataStore {
  constructor(
    @InjectModel('Post') private readonly postDocumentModel: Model<IPostEntity>,
  ) {
  }

  async create(createPostDto: CreateUserPostDto): Promise<Post> {
    const postModel = await new this.postDocumentModel(createPostDto).save();
    return postModel.toPost();
  }

  async list(query: IListPostsQueryDto): Promise<IPaginatedPosts> {
    // @ts-ignore
    const docs = await this.postDocumentModel.paginate(getQueryObject(query), getPaginationOptions(query));
    return handleUsersPaginationResponse(docs);
  }
}
