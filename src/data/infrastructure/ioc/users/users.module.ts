import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from '../../../../presentation/http/routes/users/UsersController';
import { UsersService } from '../../../../domain/users/UsersService';
import { UsersRepository } from '../../../repositories/users/UsersRepository';
import { UserSchema } from '../../db/schemas';
import { AuthRepository } from '../../../repositories/auth/AuthRepository';
import { AuthService } from '../../../../domain/auth/AuthService';
import { UsersDataStore } from '../../../repositories/users/UsersDataStore';
import { RecourceLimiterRepository } from '../../../repositories/limiter/recourceLimiterRepository';
import { JwtStrategy } from '../../../../presentation/http/middleware/JwtStrategy';
import { USER_TOKEN_EXPIRATION } from "../../../../common/constants";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: USER_TOKEN_EXPIRATION },
    }),
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
    {
      provide: 'JwtStrategy',
      useClass: JwtStrategy,
    },
  ],
  controllers: [UsersController],
  exports: ['IUsersService'],
})
export class UsersModule {}
