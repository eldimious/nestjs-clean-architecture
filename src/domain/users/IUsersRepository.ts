import { User } from './User';
import { CreateUserDto } from '../../presentation/http/routes/users/dto/request/CreateUserDto';
import { IGetUserQuery } from '../../data/repositories/users/UsersRepository';

export interface IUsersRepository {
  create(item: CreateUserDto): Promise<User>
  get(query: Partial<IGetUserQuery>): Promise<User>
}
