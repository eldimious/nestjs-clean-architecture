import { DEFAULT_PAGINATION_LIMIT, DEFAULT_PAGINATION_PAGE } from "../constants";

export class PaginationArgsDto {
  page: number = DEFAULT_PAGINATION_PAGE;
  limit: number = DEFAULT_PAGINATION_LIMIT;
}
