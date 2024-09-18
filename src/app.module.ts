import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import {SETTINGS} from "./infrastructure/settings/settings";

@Module({
  imports: [
      ConfigModule.forRoot({
          envFilePath: '.development.env'
      }),
      MongooseModule.forRoot(SETTINGS.PATH.MONGODB as string),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
