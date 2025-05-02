import express from 'express';
import { Request, Response } from 'express';
import { UserController } from './controller/UserController';

const userController = new UserController()

const server = express();

server.use(express.json());

server.get('/', (req: Request, res: Response) => {
    res.json({ message: 'DioBankAPI' });
  });



server.post('/user', (userController.createUser))
server.get('/user', userController.getAllUsers)



server.listen(5000, () => 
    console.log('Server is running on port 5000'))