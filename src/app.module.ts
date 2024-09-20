import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import {BlogsModule} from "./features/blogs/blogs.module";
import {PostsModule} from "./features/posts/posts.module";
import {UsersModule} from "./features/users/users.module";
import {CommentsModule} from "./features/comments/comments.module";
import {TestingModule} from "./features/testing/testing.module";

@Module({
  imports: [
      ConfigModule.forRoot({
          envFilePath: '.development.env',
      }),
      MongooseModule.forRoot(process.env.MONGO_URI as string),
      BlogsModule,
      PostsModule,
      UsersModule,
      CommentsModule,
      TestingModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
