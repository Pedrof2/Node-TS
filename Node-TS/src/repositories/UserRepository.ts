import { EntityManager } from "typeorm";
import { AppDataSource } from "../database";
import { User } from "../services/UserService";

export class UserRepository{
    private manager: EntityManager

    constructor(
        manager = AppDataSource.manager
    ) {
        this.manager = manager;
    }

    createUser = async (user: User) => {
        return this.manager.save(user)
    }
}