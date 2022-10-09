import { User } from './User';
import { CreateUserDto } from '../../presentation/http/routes/users/dto/request/CreateUserDto';
import { GetUserQueryDto } from "../../presentation/http/routes/users/dto/request/GetUserQueryDto";

export interface IUsersRepository {
  create(item: CreateUserDto): Promise<User>
  get(query: Partial<GetUserQueryDto>): Promise<User>
}
