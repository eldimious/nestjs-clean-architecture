import { CreateUserDto } from '../../presentation/http/routes/users/dto/request/CreateUserDto';
import { User } from './User';
import { GetUserQueryDto } from "../../presentation/http/routes/users/dto/request/GetUserQueryDto";

export interface IUsersService {
  createUser(user: CreateUserDto): Promise<User>
  getUser(query: Partial<GetUserQueryDto>): Promise<User>
}
