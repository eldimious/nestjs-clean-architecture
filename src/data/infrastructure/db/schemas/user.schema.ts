import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import moment from 'moment';
import bcrypt from 'bcryptjs';
import { User } from '../../../../domain/users/User';

type UserDocument = UserEntity & Document;

export interface IUserEntity extends UserDocument {
  toUser(): User;
}

@Schema()
class UserEntity {
  @Prop({ type: String, required: true })
    // @ts-ignore
    firstName: string;

  @Prop({ type: String, required: true })
    // @ts-ignore
    lastName: string;

  @Prop({ type: String, required: true })
    // @ts-ignore
    username: string;

  @Prop({ type: String, required: true })
    // @ts-ignore
    password: string;

  @Prop({ type: String, required: true, unique: true })
    // @ts-ignore
    email: string;

  @Prop({ type: String })
    // @ts-ignore
    created: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);

UserSchema.methods.toUser = function toUser(): User {
  return new User(this._id, this.firstName, this.lastName, this.username, this.email, this.password, this.created);
};

UserSchema.pre('save', function preSave(next) {
  this.created = moment().toJSON();
  bcrypt.genSalt(10, (err: Error, salt: string) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(this.password, salt, (error: Error, hash: string) => {
      if (error) {
        return next(error);
      }
      this.password = hash;
      this.created = moment().toJSON();
      return next();
    });
  });
});
