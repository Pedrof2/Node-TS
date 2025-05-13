import { Router } from 'express'
import { Request, Response } from 'express';
import { UserController } from './controller/UserController';

export const router = Router();

const userController = new UserController()

router.post('/user', (userController.createUser))
router.get('/user', userController.getUser)
// router.delete('/user', userController.deleteUser)