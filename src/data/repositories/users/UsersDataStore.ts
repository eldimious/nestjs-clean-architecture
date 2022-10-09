import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User } from '../../../domain/users/User';
import { CreateUserDto } from '../../../presentation/http/routes/users/dto/request/CreateUserDto';
import { IUserEntity, UserSchema } from '../../infrastructure/db/schemas';
import { GetUserQueryDto } from "../../../presentation/http/routes/users/dto/request/GetUserQueryDto";

@Injectable()
export class UsersDataStore {
  constructor(@InjectModel('User') private readonly userDocumentModel: Model<IUserEntity>) {}

  private _queryForGetUser(query: Partial<GetUserQueryDto>): FilterQuery<typeof UserSchema> {
    const queries: FilterQuery<typeof UserSchema> = {};
    if (query.userId) {
      // eslint-disable-next-line no-underscore-dangle
      queries._id = query.userId;
    }
    if (query.email) {
      queries.email = query.email;
    }
    return queries;
  }

  async create(item: CreateUserDto): Promise<User> {
    const doc = await new this.userDocumentModel(item).save();
    return doc.toUser();
  }

  async get(query: Partial<GetUserQueryDto>): Promise<User> {
    const userDoc = await this.userDocumentModel.findOne(this._queryForGetUser(query));
    if (!userDoc) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return userDoc.toUser();
  }
}
