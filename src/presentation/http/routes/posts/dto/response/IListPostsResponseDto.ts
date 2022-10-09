import { IPagination } from '../../../../../../common/dto/IPagination';
import { IPostResponseDto } from './IPostResponseDto';

export interface IListPostsResponseDto {
  data: IPostResponseDto[],
  pagination: Partial<IPagination>
}
