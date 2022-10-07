import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export interface IUserEntity extends UserDocument {
  toUser(): User;
}

@Schema()
export class User {
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

export const UserSchema = SchemaFactory.createForClass(User);
