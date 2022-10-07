import {UsersModule} from "./data/infrastructure/ioc/users.module";
import { ConfigModule } from '@nestjs/config';
import configuration from "./configuration";
import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";

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
      useFactory: async () => {
        return {
          uri: configuration().database.url,
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      },
    }),
  ],
})

export class AppModule {}
