import { User } from "./User";
import { CreateUserDto } from "../../presentation/http/routes/users/dto/request/CreateUserDto";

export interface IUsersRepository {
  create(item: CreateUserDto): Promise<User>
}