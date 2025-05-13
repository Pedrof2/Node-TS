import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
    userService: UserService

    constructor(
        userService = new UserService()
    ) { this.userService = userService }

    createUser = (req: Request, res: Response): void => {
        const user = req.body

        if (!user.name || !user.email || !user.password) {
            res.status(400).json({ message: 'Bad request: name and email required!' })
            return;
        }else

        if(!user.email){
            res.status(400).json({ message: 'Bad request: email required!' })
            return;
        }

        this.userService.createUser(user.name, user.email, user.password)
        res.status(201).json({ message: 'User created' });
    };

    getUser = (req: Request, res: Response): void => {
        res.status(200).json()
        return;
    };

    // deleteUser = (req: Request, res: Response) : void => {
    //     const user = req.body;
    //     this.userService.deleteUser(user.name, user.email)
    //     res.status(200).json({ message: 'User deleted' });
    // }
}