import {
  HttpException, HttpStatus, Inject, Injectable, Logger,
} from '@nestjs/common';
import { RateLimiterRes } from 'rate-limiter-flexible';
import { CreateUserDto } from '../../presentation/http/routes/users/dto/request/CreateUserDto';
import { IAuthService } from './IAuthService';
import { IUsersRepository } from '../users/IUsersRepository';
import { IAuthRepository } from './IAuthRepository';
import { User } from '../users/User';
import { Token } from './Token';
import { IResourceLimiterRepository } from '../../data/repositories/limiter/recourceLimiterRepository';
import { getRetryAfterSeconds } from '../../common/utils/getRetryAfterSeconds';

@Injectable()
export class AuthService implements IAuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @Inject('IResourceLimiterRepository') private readonly recourceLimiterRepository: IResourceLimiterRepository,
    @Inject('IUsersRepository') private readonly usersRepository: IUsersRepository,
    @Inject('IAuthRepository') private readonly authRepository: IAuthRepository,
  ) {}

  private async _handleCorrectLoginPassword(resUsername: RateLimiterRes | null, usernameKey: string, user: User): Promise<{
    token: Token;
    user: User;
  }> {
    if (resUsername !== null && resUsername.consumedPoints > 0) {
      await this.recourceLimiterRepository.deleteUserKeyForFailedLogin(usernameKey);
    }
    const token = await this.authRepository.createUserToken(user);
    return {
      token,
      user,
    };
  }

  private async _handleWrongLoginPassword(usernameKey: string, user: User): Promise<never> {
    try {
      const promises = [];
      if (user) {
        promises.push(this.recourceLimiterRepository.consumeUserPointsForFailedLogin(usernameKey));
      }
      await Promise.all(promises);
      throw new HttpException('WRONG_PASSWORD', HttpStatus.UNAUTHORIZED);
    } catch (rlRejected: any) {
      if (rlRejected instanceof Error) {
        throw rlRejected;
      } else {
        const retryAfterSecs = getRetryAfterSeconds(rlRejected.msBeforeNext);
        throw new HttpException(`Too Many Requests. Retry after ${String(retryAfterSecs)} seconds`, HttpStatus.TOO_MANY_REQUESTS);
      }
    }
  }

  private _getUsernameKey(username: string) {
    return `${username}`;
  }

  async register(user: CreateUserDto): Promise<User> {
    this.logger.log('Saving a user');
    return this.usersRepository.create(user);
  }

  async login(email: string, password: string): Promise<{ token: Token; user: User; }> {
    const usernameKey = this._getUsernameKey(email);
    const resUsername = await this.recourceLimiterRepository.getUserKeyForFailedLogin(usernameKey);
    let retrySecs = 0;
    if (resUsername !== null && resUsername.consumedPoints > this.recourceLimiterRepository.maxConsecutiveFailsByUsername) {
      retrySecs = getRetryAfterSeconds(resUsername.msBeforeNext);
    }
    if (retrySecs > 0) {
      throw new HttpException(`Too Many Requests. Retry after ${String(retrySecs)} seconds`, HttpStatus.TOO_MANY_REQUESTS);
    } else {
      const user = await this.usersRepository.get({ email });
      const isPasswordCorrect = await this.authRepository.comparePassword(password, user.password)
        .catch((err) => {
          this.logger.error(`Error in authentication of user with email: ${email}`, err);
          return undefined;
        });
      if (!isPasswordCorrect) {
        return this._handleWrongLoginPassword(usernameKey, user);
      }
      return this._handleCorrectLoginPassword(resUsername, usernameKey, user);
    }
  }
}
