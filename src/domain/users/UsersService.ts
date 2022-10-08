import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from '../../presentation/http/routes/users/dto/request/CreateUserDto';
import { User } from './User';
import { IUsersRepository } from './IUsersRepository';
import { IUsersService } from './IUsersService';
import { IGetUserQuery } from '../../data/repositories/users/UsersRepository';

@Injectable()
export class UsersService implements IUsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(@Inject('IUsersRepository') private readonly usersRepository: IUsersRepository) {}

  async createUser(user: CreateUserDto): Promise<User> {
    this.logger.log('Saving a user');
    return this.usersRepository.create(user);
  }

  async getUser(query: Partial<IGetUserQuery>): Promise<User> {
    this.logger.log(`Try to fetch a user with query: ${query}`);
    return this.usersRepository.get(query);
  }
}
