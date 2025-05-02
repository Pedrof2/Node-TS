import express from 'express';
import { Request, Response } from 'express';
import { UserController } from './controller/UserController';
import { router } from './routes';

const userController = new UserController()

const server = express();

server.use(express.json())
server.use(router);

server.get('/', (req: Request, res: Response) => {
    res.json({ message: 'DioBankAPI' });
  });

server.listen(5000, () => 
    console.log('Server is running on port 5000'))