import {Injectable} from "@nestjs/common";


@Injectable()
export class PostsRepository {

    constructor() {}

    async savePost(post: any) {
        const savePost = await post.save();
        return savePost
    }

}
