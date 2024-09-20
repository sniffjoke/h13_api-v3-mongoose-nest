import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import {BlogsModule} from "./features/blogs/blogs.module";
import {PostsModule} from "./features/posts/posts.module";

@Module({
  imports: [
      ConfigModule.forRoot({
          envFilePath: '.development.env',
      }),
      MongooseModule.forRoot(process.env.MONGO_URI as string),
      BlogsModule,
      PostsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
