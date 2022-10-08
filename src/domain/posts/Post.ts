import { IPagination } from '../../common/interfaces/IPagination';
import { IPostResponseDto } from '../../presentation/http/routes/posts/dto/response/IPostResponseDto';

export class Post {
  readonly postId: string;

  readonly userId: string;

  readonly imageUrl: string;

  readonly description: string;

  readonly publisher: string;

  readonly created: Date;

  constructor(_id: string, userId: string, imageUrl: string, description: string, publisher: string, created: Date) {
    this.postId = _id;
    this.userId = userId;
    this.imageUrl = imageUrl;
    this.description = description;
    this.publisher = publisher;
    this.created = created;
  }

  toPostResponse(): IPostResponseDto {
    return {
      postId: this.postId,
      userId: this.userId,
      imageUrl: this.imageUrl,
      description: this.description,
      publisher: this.publisher,
      created: this.created,
    } as IPostResponseDto;
  }
}

export interface IPaginatedPosts {
  pagination: Partial<IPagination>;
  posts: Post[];
}
