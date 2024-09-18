import { Module } from '@nestjs/common';
import { BlogsController } from './api/blogs.controller';
import { BlogsService } from './application/blogs.service';
import { BlogsController } from './api/blogs.controller';

@Module({
  controllers: [BlogsController],
  providers: [BlogsService]
})
export class BlogsModule {}
