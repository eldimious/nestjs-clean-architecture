import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from '../../../../presentation/http/routes/users/UsersController';
import { UsersService } from '../../../../domain/users/UsersService';
import { UsersRepository } from '../../../repositories/users/UsersRepository';
import { UserSchema } from '../../db/schemas';
import { AuthRepository } from '../../../repositories/auth/AuthRepository';
import { AuthService } from '../../../../domain/auth/AuthService';
import { UsersDataStore } from '../../../repositories/users/UsersDataStore';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [
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
  controllers: [UsersController],
})
export class UsersModule {}
