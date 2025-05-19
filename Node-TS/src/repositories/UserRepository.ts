import { EntityManager } from "typeorm";
import { User } from "../entities/User";

export class UserRepository {
    private manager: EntityManager

    constructor(
        manager: EntityManager
    ) {
        this.manager = manager;
    }

    createUser = async (user: User): Promise<User> => {
        return this.manager.save(user)
    }

    getUser = async (userId: string): Promise<User | null> => {
        return this.manager.findOne(User, {
            where: {
                user_id: userId
            }
        })
    }

    getUserByEmailAndPassword = async (email: string, password: string): Promise<User | null> => {
        return this.manager.findOne(User, {
            where: {
                email, //o nome é igual ao parametro então pode passar só o nome
                password
            }
        })
    }

    deleteUser = async (name: string, email: string): Promise<string> => {
        await this.manager.delete(User, {
            name,
            email
        });
        return "User deleted successfully";
    }
}