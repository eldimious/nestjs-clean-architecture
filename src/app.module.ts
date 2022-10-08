import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from './configuration';
import { UsersModule } from './data/infrastructure/ioc/users/users.module';

@Module({
  imports: [
    UsersModule,
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
