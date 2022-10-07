import {HttpException, HttpStatus, Inject, Injectable, Logger} from "@nestjs/common";
import { CreateUserDto } from "../../presentation/http/routes/users/dto/request/CreateUserDto";
import {IAuthService} from "./IAuthService";
import {IUsersRepository} from "../users/IUsersRepository";
import {IAuthRepository} from "./IAuthRepository";
import {User} from "../users/User";
import {Token} from "./Token";

@Injectable()
export class AuthService implements IAuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @Inject('IUsersRepository') private readonly usersRepository: IUsersRepository,
    @Inject('IAuthRepository') private readonly authRepository: IAuthRepository
  ) {}

  async register(user: CreateUserDto): Promise<User> {
    this.logger.log(`Saving a user`);
    return await this.usersRepository.create(user);
  }

  async login(email: string, password: string): Promise<{ token: Token; user: User; }> {
    const user = await this.usersRepository.get({ email });
    const isPasswordCorrect = await this.authRepository.comparePassword(password, user.password);
    if (!isPasswordCorrect) {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    }
    const token = await this.authRepository.createUserToken(user);
    return {
      token,
      user,
    };
  }
}