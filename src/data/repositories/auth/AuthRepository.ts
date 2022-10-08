import {
  HttpException, HttpStatus, Injectable, Logger,
} from '@nestjs/common';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { IAuthRepository } from '../../../domain/auth/IAuthRepository';
import { User } from '../../../domain/users/User';
import { Token } from '../../../domain/auth/Token';
import { USER_ROLE, USER_TOKEN_EXPIRATION } from '../../../common/constants';

const SALT_ROUNDS = 10;

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    private configService: ConfigService,
  ) {}

  private readonly logger = new Logger(AuthRepository.name);

  async comparePassword(password: string, dbPassword: string): Promise<boolean> {
    try {
      const match = await bcrypt.compare(password, dbPassword);
      if (!match) {
        throw new Error('Authentication error');
      }
      return match;
    } catch (error) {
      throw new HttpException('Wrong password.', HttpStatus.UNAUTHORIZED);
    }
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return bcrypt.hash(password, salt);
  }

  async createUserToken(user: User): Promise<Token> {
    this.logger.log('Create user token called');
    const jwtSecret = this.configService.get<string>('jwtSecret') as string;
    const token = {
      accessToken: jwt.sign({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        id: user.id,
        roles: [USER_ROLE],
      }, jwtSecret, {
        expiresIn: USER_TOKEN_EXPIRATION,
      }),
      tokenType: 'Bearer',
      roles: [USER_ROLE],
      expiresIn: USER_TOKEN_EXPIRATION,
    };
    return new Token(token.accessToken, token.tokenType, token.expiresIn, token.roles);
  }
}
