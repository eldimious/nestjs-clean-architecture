import { Injectable } from '@nestjs/common';
import { User } from "./User";
import { IRepository } from "../../common/abstracts/IRepository";
import { CreateUserDto } from "../../presentation/http/routes/users/dto/request/CreateUserDto";

@Injectable()
export abstract class IUsersRepository extends IRepository<User, CreateUserDto> {
  abstract create(item: CreateUserDto): Promise<User>
}