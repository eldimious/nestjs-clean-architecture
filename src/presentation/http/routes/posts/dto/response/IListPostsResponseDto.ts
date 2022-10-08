import { IPagination } from '../../../../../../common/interfaces/IPagination';
import { IPostResponseDto } from './IPostResponseDto';

export interface IListPostsResponseDto {
  data: IPostResponseDto[],
  pagination: Partial<IPagination>
}
