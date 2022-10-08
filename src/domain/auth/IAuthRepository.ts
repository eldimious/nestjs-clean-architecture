import { User } from '../users/User';
import { Token } from './Token';

export interface IAuthRepository {
  comparePassword(password: string, dbPassword: string): Promise<boolean>
  hashPassword(password: string): Promise<string>
  createUserToken(user: User): Promise<Token>
}
