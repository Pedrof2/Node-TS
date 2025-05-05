import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
    userService: UserService

    constructor(
        userService = new UserService()
    ) { this.userService = userService }

    createUser = (req: Request, res: Response): void => {
        const user = req.body

        if (!user.name) {
            res.status(400).json({ message: 'Bad request: name required!' })
            return;
        }else

        if(!user.email){
            res.status(400).json({ message: 'Bad request: email required!' })
            return;
        }

        this.userService.createUser(user.name, user.email)
        res.status(201).json({ message: 'User created' });
    };

    getAllUsers = (req: Request, res: Response): void => {
        const users = this.userService.getAllusers()
        res.status(200).json(users)
        return;
    };
}