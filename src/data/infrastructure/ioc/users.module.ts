import { Module } from '@nestjs/common';
import { UsersController } from "../../../presentation/http/routes/users/UsersController";
import { UsersService } from "../../../domain/users/UsersService";
import { UsersRepository } from "../../repositories/UsersRepository";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "../db/schemas";

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
    }
  ],
  controllers: [UsersController],
})
export class UsersModule {}