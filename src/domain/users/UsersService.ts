import { Injectable, Logger } from "@nestjs/common";
import { CreateUserDto } from "../../presentation/http/routes/users/dto/request/CreateUserDto";
import { User } from "./User";
import { IUsersRepository } from "./IUsersRepository";

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly usersRepository: IUsersRepository) {}

  async createUser(user: CreateUserDto): Promise<User> {
    this.logger.log(`Saving a user`);
    return await this.usersRepository.create(user);
  }
}