import { Module } from '@nestjs/common';
import { UsersController } from "../../../../presentation/http/routes/users/UsersController";
import { UsersService } from "../../../../domain/users/UsersService";
import { UsersRepository } from "../../../repositories/users/UsersRepository";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "../../db/schemas";
import {AuthRepository} from "../../../repositories/auth/AuthRepository";
import {AuthService} from "../../../../domain/auth/AuthService";

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [
    {
      provide: 'IUsersRepository',
      useClass: UsersRepository
    },
    {
      provide: 'IUsersService',
      useClass: UsersService
    },
    {
      provide: 'IAuthRepository',
      useClass: AuthRepository
    },
    {
      provide: 'IAuthService',
      useClass: AuthService
    }
  ],
  controllers: [UsersController],
})
export class UsersModule {}