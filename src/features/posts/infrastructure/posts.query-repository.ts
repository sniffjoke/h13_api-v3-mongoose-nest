import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Post} from "../domain/posts.entity";
import {HydratedDocument, Model} from "mongoose";
import {PostViewModel} from "../api/models/output/post.view.model";
import {Blog} from "../../blogs/domain/blogs.entity";


@Injectable()
export class PostsQueryRepository {
    constructor(
        @InjectModel(Post.name) private readonly postModel: Model<Post>,
        @InjectModel(Blog.name) private readonly blogModel: Model<Blog>
    ) {
    }

    async getAllPosts(): Promise<PostViewModel[]> {
        const posts = await this.postModel.find()
        return posts.map(post => this.postOutputMap(post as HydratedDocument<PostViewModel>))
    }

    async getAllPostsByBlogId(blogId: string): Promise<PostViewModel[]> {
        const blog = await this.blogModel.findById(blogId)
        if (!blog) {
            throw new NotFoundException("Blog not found")
        }
        const posts = await this.postModel.find({blogId})
        return posts.map(post => this.postOutputMap(post as HydratedDocument<PostViewModel>))
    }

    async postOutput(id: string): Promise<PostViewModel> {
        const post = await this.postModel.findById(id)
        if (!post) {
            throw new NotFoundException("Post not found")
        }
        return this.postOutputMap(post as HydratedDocument<PostViewModel>)
    }

    postOutputMap(post: HydratedDocument<PostViewModel>): PostViewModel {
        const {_id, title, shortDescription, content, extendedLikesInfo, blogId, blogName, createdAt} = post
        return {
            id: _id.toString(),
            title,
            shortDescription,
            content,
            blogId,
            blogName,
            extendedLikesInfo,
            createdAt
        }
    }

}
