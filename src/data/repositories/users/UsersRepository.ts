import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../../domain/users/User';
import { IUsersRepository } from '../../../domain/users/IUsersRepository';
import { CreateUserDto } from '../../../presentation/http/routes/users/dto/request/CreateUserDto';
import { UsersDataStore } from './UsersDataStore';
import { GetUserQueryDto } from "../../../presentation/http/routes/users/dto/request/GetUserQueryDto";

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @Inject('UsersDataStore') private readonly usersDataStore: UsersDataStore,
  ) {}

  async create(item: CreateUserDto): Promise<User> {
    return this.usersDataStore.create(item);
  }

  async get(query: Partial<GetUserQueryDto>): Promise<User> {
    return this.usersDataStore.get(query);
  }
}
