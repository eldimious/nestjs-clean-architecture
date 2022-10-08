import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import moment from 'moment';
import { Post } from '../../../../domain/posts/Post';

type PostDocument = PostEntity & Document;

export interface IPostEntity extends PostDocument {
  toPost(): Post;
}

@Schema()
class PostEntity {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' })
    // @ts-ignore
    userId: string;

  @Prop({ type: String, required: true })
    // @ts-ignore
    imageUrl: string;

  @Prop({ type: String, required: true })
    // @ts-ignore
    description: string;

  @Prop({ type: String, required: true })
    // @ts-ignore
    publisher: string;

  @Prop({ type: String })
    // @ts-ignore
    created: string;
}

export const PostSchema = SchemaFactory.createForClass(PostEntity);

PostSchema.methods.toPost = function toPost(): Post {
  return new Post(this._id, this.userId, this.imageUrl, this.description, this.publisher, this.created);
};

PostSchema.pre('save', function preSave(next) {
  this.created = moment().toJSON();
  return next();
});
