import { PaginationArgsDto } from "../../../../../../common/dto/PaginationArgsDto";

export class ListPostsQueryDto extends PaginationArgsDto {
  publisher?: string;
}

export class ListUserPostsQueryDto extends ListPostsQueryDto {
  userId: string;
}