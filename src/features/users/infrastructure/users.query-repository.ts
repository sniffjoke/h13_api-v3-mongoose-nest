import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {User} from "../domain/users.entity";
import {HydratedDocument, Model} from "mongoose";
import {UserViewModel} from "../api/models/output/user.view.model";


@Injectable()
export class UsersQueryRepository {
    constructor(
        @InjectModel(User.name) private readonly UserModel: Model<User>
    ) {
    }

    async getAllUsers(): Promise<UserViewModel[]> {
        const users = await this.UserModel.find()
        return users.map(user => this.userOutputMap(user as unknown as HydratedDocument<UserViewModel>))
    }


    async userOutput(id: string): Promise<UserViewModel> {
        const user = await this.UserModel.findById(id)
        if (!user) {
            throw new NotFoundException("User not found")
        }
        return this.userOutputMap(user as unknown as HydratedDocument<UserViewModel>)
    }

    userOutputMap(user: HydratedDocument<UserViewModel>): UserViewModel {
        const {_id, login, email, createdAt} = user
        return {
            id: _id.toString(),
            login,
            email,
            createdAt
        }
    }

}
