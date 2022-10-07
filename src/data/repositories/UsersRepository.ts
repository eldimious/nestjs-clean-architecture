import {Injectable} from "@nestjs/common";
import { User } from "../../domain/users/User";
import {IUsersRepository} from "../../domain/users/IUsersRepository";
import {InjectModel} from "@nestjs/mongoose";
import {IUserEntity} from "../infrastructure/db/schemas";
import {Model} from "mongoose";
import {CreateUserDto} from "../../presentation/http/routes/users/dto/request/CreateUserDto";

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(@InjectModel('User') private readonly userDocumentModel: Model<IUserEntity>) {
  }

  async create(item: CreateUserDto): Promise<User> {
    const newDoc = await new this.userDocumentModel(item).save();
    // @ts-ignore
    return newDoc.toUser();
  }

}