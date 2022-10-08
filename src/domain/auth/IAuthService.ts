import { Token } from './Token';
import { User } from '../users/User';
import { CreateUserDto } from '../../presentation/http/routes/users/dto/request/CreateUserDto';

export interface IAuthService {
  login(email: string, password: string): Promise<{ token: Token; user: User; }>
  register(createUserDto: CreateUserDto): Promise<User>
}
