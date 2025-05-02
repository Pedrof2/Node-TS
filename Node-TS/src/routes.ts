import { Router } from 'express'
import { Request, Response } from 'express';
import { UserController } from './controller/UserController';

export const router = Router();

const userController = new UserController()

router.post('/user', (userController.createUser))
router.get('/user', userController.getAllUsers)
router.delete('/user', (req: Request, res: Response) => {
    const user = req.body;
    console.log('Deleting user', user)
    res.status(200).json({ message: 'User deleted' });
 })
