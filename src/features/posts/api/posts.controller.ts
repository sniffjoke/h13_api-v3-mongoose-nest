import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put} from '@nestjs/common';
import {PostCreateModel} from "./models/input/create-post.input.model";
import {PostsService} from "../application/posts.service";
import {PostViewModel} from "./models/output/post.view.model";
import {PostsQueryRepository} from "../infrastructure/posts.query-repository";
import {UpdateWriteOpResult} from "mongoose";

@Controller('posts')
export class PostsController {

    constructor(
        private readonly postsService: PostsService,
        private readonly postsQueryRepository: PostsQueryRepository
    ) {

    }

    @Get()
    async getAllPosts(): Promise<PostViewModel[]> {
        const posts = await this.postsQueryRepository.getAllPosts()
        return posts
    }

    @Post()
    async createPost(@Body() dto: PostCreateModel) {
        const createPost = await this.postsService.createPost(dto)
        return createPost
    }

    @Get(':id')
    async getPostById(@Param('id') id: string): Promise<PostViewModel> {
        const postOutput = await this.postsQueryRepository.postOutput(id)
        return postOutput
    }

    @Put(':id')
    @HttpCode(204)
    async updatePostById(@Param('id') id: string, @Body() dto: PostCreateModel): Promise<UpdateWriteOpResult> {
        const updatePost = await this.postsService.updatePost(id, dto)
        return updatePost
    }

    @Delete(':id')
    @HttpCode(204)
    async deletePost(@Param('id') id: string) {
        const deletePost = await this.postsService.deletePost(id)
        return deletePost
    }

}
