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
            res.status(400).json({ message: 'Bad Request: Todos os campos são obrigatórios!' })
            return;
        }else

        if(!user.email){
            res.status(400).json({ message: 'Bad request: email required!' })
            return;
        }

        this.userService.createUser(user.name, user.email, user.password)
        res.status(201).json({ message: 'User created' });
    };

    getUser = async (req: Request, res: Response) => {
        const {userId } = req.params
        const user = await this.userService.getUser(userId)
        res.status(200).json({ 
            userId: user?.user_id,
            name: user?.name,
            email: user?.email
        })
        return;
    };

    // deleteUser = (req: Request, res: Response) : void => {
    //     const user = req.body;
    //     this.userService.deleteUser(user.name, user.email)
    //     res.status(200).json({ message: 'User deleted' });
    // }
}