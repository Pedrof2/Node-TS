import express from 'express';
import { Request, Response } from 'express';
import { UserController } from './controller/UserController';
import { router } from './routes';
import 'reflect-metadata'
import { AppDataSource } from './database';

const userController = new UserController()

const server = express();

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error(err)
    })

server.use(express.json())
server.use(router);

server.get('/', (req: Request, res: Response) => {
    res.json({ message: 'DioBankAPI' });
  });

server.listen(5000, () => 
    console.log('Server is running on port 5000'))