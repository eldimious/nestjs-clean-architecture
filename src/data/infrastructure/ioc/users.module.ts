import { Module } from '@nestjs/common';
import { UsersController } from "../../../presentation/http/routes/users/UsersController";
import { UsersService } from "../../../domain/users/UsersService";
import { IUsersRepository} from "../../../domain/users/IUsersRepository";
import { UsersRepository } from "../../repositories/UsersRepository";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "../db/schemas";

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UsersController],
  providers: [
    UsersService,
    { provide: IUsersRepository, useClass: UsersRepository },
  ],
})
export class UsersModule {}