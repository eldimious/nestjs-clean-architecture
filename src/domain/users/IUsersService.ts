import { CreateUserDto } from '../../presentation/http/routes/users/dto/request/CreateUserDto';
import { User } from './User';
import { IGetUserQuery } from '../../data/repositories/users/UsersRepository';

export interface IUsersService {
  createUser(user: CreateUserDto): Promise<User>
  getUser(query: Partial<IGetUserQuery>): Promise<User>
}
