import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from '../../../../domain/users/UsersService';
import { UsersRepository } from '../../../repositories/users/UsersRepository';
import { AuthRepository } from '../../../repositories/auth/AuthRepository';
import { AuthService } from '../../../../domain/auth/AuthService';
import { UsersDataStore } from '../../../repositories/users/UsersDataStore';
import { RecourceLimiterRepository } from '../../../repositories/limiter/recourceLimiterRepository';
import { AuthController } from '../../../../presentation/http/routes/auth/AuthController';
import { UserSchema } from '../../db/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [
    {
      provide: 'IResourceLimiterRepository',
      useClass: RecourceLimiterRepository,
    },
    {
      provide: 'UsersDataStore',
      useClass: UsersDataStore,
    },
    {
      provide: 'IUsersRepository',
      useClass: UsersRepository,
    },
    {
      provide: 'IUsersService',
      useClass: UsersService,
    },
    {
      provide: 'IAuthRepository',
      useClass: AuthRepository,
    },
    {
      provide: 'IAuthService',
      useClass: AuthService,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
