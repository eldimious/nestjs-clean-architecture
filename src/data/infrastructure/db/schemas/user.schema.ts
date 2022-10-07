import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from "../../../../domain/users/User";

export type UserDocument = UserEntity & Document;

export interface IUserEntity extends UserDocument {
  toUser(): User;
}

@Schema()
export class UserEntity {
  @Prop({type : String, required: true})
    // @ts-ignore
  firstName: string;

  @Prop({type : String, required: true})
    // @ts-ignore
  lastName: string;

  @Prop({type : String, required: true})
    // @ts-ignore
  username: string;

  @Prop({type : String, required: true})
    // @ts-ignore
  password: string;

  @Prop({type : String, required: true, unique: true})
    // @ts-ignore
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);

UserSchema.methods.toUser = function toUser(): User {
  return new User(this._id, this.firstName, this.lastName, this.username, this.email, this.password, this.created);
};
