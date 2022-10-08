import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from './configuration';
import { UsersModule } from './data/infrastructure/ioc/users/users.module';
import { AuthModule } from './data/infrastructure/ioc/auth/auth.module';
import { PostsModule } from './data/infrastructure/ioc/posts/posts.module';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      expandVariables: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        uri: configuration().database.url,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
  ],
})

export class AppModule {}
