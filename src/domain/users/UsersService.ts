import {Inject, Injectable, Logger} from "@nestjs/common";
import { CreateUserDto } from "../../presentation/http/routes/users/dto/request/CreateUserDto";
import { User } from "./User";
import { IUsersRepository } from "./IUsersRepository";
import { IUsersService } from "./IUsersService";

@Injectable()
export class UsersService implements IUsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(@Inject('IUsersRepository') private readonly usersRepository: IUsersRepository) {}

  async createUser(user: CreateUserDto): Promise<User> {
    this.logger.log(`Saving a user`);
    return await this.usersRepository.create(user);
  }
}