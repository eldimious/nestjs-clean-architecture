import {CreateUserDto} from "../../presentation/http/routes/users/dto/request/CreateUserDto";
import {User} from "./User";

export interface IUsersService {
  createUser(user: CreateUserDto): Promise<User>
}