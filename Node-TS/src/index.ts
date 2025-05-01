import express from 'express';
import { Request, Response } from 'express';
import { u } from 'framer-motion/dist/types.d-B50aGbjN';

const server = express();
server.use(express.json());

server.get('/', (req: Request, res: Response) => {
    res.json({ message: 'DioBankAPI' });
  });

server.post('/user', (req: Request, res: Response) => {
    const body = req.body
    console.log(body);
    res.json({ message: 'User created', user: body });
})


server.listen(5000, () => 
    console.log('Server is running on port 5000'))