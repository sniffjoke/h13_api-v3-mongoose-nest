import {Injectable, NotFoundException} from "@nestjs/common";
import {Blog} from "../domain/blogs.entity";
import {HydratedDocument, Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {BlogViewModel} from "../api/models/output/blog.view.model";


@Injectable()
export class BlogsQueryRepository {
    constructor(
        @InjectModel(Blog.name) private readonly BlogModel: Model<Blog>
    ) {
    }

    async getAllBlogs(): Promise<BlogViewModel[]> {
        const blogs = await this.BlogModel.find()
        return blogs.map(blog => this.blogOutputMap(blog as HydratedDocument<BlogViewModel>))
    }

    k

    async blogOutput(id: string): Promise<BlogViewModel> {
        const blog = await this.BlogModel.findById(id)
        if (!blog) {
            throw new NotFoundException("Blog not found")
        }
        return this.blogOutputMap(blog as HydratedDocument<BlogViewModel>)
    }

    blogOutputMap(blog: HydratedDocument<BlogViewModel>): BlogViewModel {
        const {_id, name, description, websiteUrl, isMembership, createdAt} = blog
        return {
            id: _id.toString(),
            name,
            description,
            websiteUrl,
            createdAt,
            isMembership
        }
    }

}
