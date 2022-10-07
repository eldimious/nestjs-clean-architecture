import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import { User } from "../../../domain/users/User";
import {IUsersRepository} from "../../../domain/users/IUsersRepository";
import {InjectModel} from "@nestjs/mongoose";
import {IUserEntity, UserSchema} from "../../infrastructure/db/schemas";
import {FilterQuery, Model} from "mongoose";
import {CreateUserDto} from "../../../presentation/http/routes/users/dto/request/CreateUserDto";

export interface IGetUserQuery {
  email: string,
  userId: string
}

const queryForGetUser = (query: Partial<IGetUserQuery>): FilterQuery<typeof UserSchema> => {
  const queries: FilterQuery<typeof UserSchema> = {};
  if (query.userId) {
    // eslint-disable-next-line no-underscore-dangle
    queries._id = query.userId;
  }
  if (query.email) {
    queries.email = query.email;
  }
  return queries;
};

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(@InjectModel('User') private readonly userDocumentModel: Model<IUserEntity>) {}

  async create(item: CreateUserDto): Promise<User> {
    const doc = await new this.userDocumentModel(item).save();
    return doc.toUser();
  }

  async get(query: Partial<IGetUserQuery>): Promise<User> {
    const userDoc = await this.userDocumentModel.findOne(queryForGetUser(query));
    if (!userDoc) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return userDoc.toUser();
  }
}