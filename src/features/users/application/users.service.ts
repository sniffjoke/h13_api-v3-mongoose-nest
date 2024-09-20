import {Injectable} from '@nestjs/common';
import {UsersRepository} from "../infrastructure/users.repository";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {User} from "../domain/users.entity";
import {UserCreateModel} from "../api/models/input/create-user.input.model";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private readonly usersRepository: UsersRepository
    ) {
    }

    async createUser(user: UserCreateModel): Promise<string> {
        const newUser = new this.userModel(user)
        const saveData = await this.usersRepository.saveBlog(newUser)
        return saveData._id.toString()
    }

}
