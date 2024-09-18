import {Controller, Get} from '@nestjs/common';
import {BlogsService} from "../application/blogs.service";
import {BlogsQueryRepository} from "../infrastructure/blogs.query-repository";

@Controller('blogs')
export class BlogsController {
    constructor(
        private readonly blogsService: BlogsService,
        private readonly blogsQueryRepository: BlogsQueryRepository
    ) {}

    @Get()
    async getAll() {
        // const blogs = await this.blogsQueryRepository.
    }
}
