import { Request, Response } from 'express';
import {sign} from 'jsonwebtoken'

export class LoginController {
    login = async (req: Request, res:Response) => {
    
        const tokenData = {
            name: user.name,
            email: user.email
        }

        const tokenKey = '123456789'

        const tokenOptions = {
            subject: user.user_id
        }

        const token = sign(tokenData, tokenKey, tokenOptions)

        res.status(200).json({token})
        return;
    }
}