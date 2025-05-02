import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {

    createUser = (req: Request, res: Response): void => {
        const userService = new UserService();
        const user = req.body
        userService.createUser(user.name, user.email)

        if(!user.name){
             res.status (400).json({message: 'Bad request: name required!'})
             return;
        }

        res.status(201).json({ message: 'User created' });
    };

    getAllUsers = (req: Request, res: Response): void => {
        const userService = new UserService();

        const users= userService.getAllusers()
         res.status(200).json(users)
         return;
    };
}