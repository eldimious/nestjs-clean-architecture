import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PostSchema } from '../../db/schemas';
import { JwtStrategy } from '../../../../presentation/http/middleware/JwtStrategy';
import { PostsDataStore } from '../../../repositories/posts/PostsDataStore';
import { PostsService } from '../../../../domain/posts/PostsService';
import { PostsController } from '../../../../presentation/http/routes/posts/PostsController';
import { PostsRepository } from '../../../repositories/posts/PostsRepository';
import { USER_TOKEN_EXPIRATION } from "../../../../common/constants";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'Post',
        useFactory: () => {
          const schema = PostSchema;
          // eslint-disable-next-line global-require
          schema.plugin(require('mongoose-paginate'));
          return schema;
        },
      },
    ]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: USER_TOKEN_EXPIRATION },
    }),
  ],
  providers: [
    {
      provide: 'PostsDataStore',
      useClass: PostsDataStore,
    },
    {
      provide: 'IPostsRepository',
      useClass: PostsRepository,
    },
    {
      provide: 'IPostsService',
      useClass: PostsService,
    },
    {
      provide: 'JwtStrategy',
      useClass: JwtStrategy,
    },
  ],
  controllers: [PostsController],
  exports: ['IPostsService'],
})
export class PostsModule {}
