import { sign } from "jsonwebtoken";
import { AppDataSource } from "../database";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";

export class UserService {
  private userRepository: UserRepository;

  constructor(
    userRepository = new UserRepository(AppDataSource.manager)
  ){
    this.userRepository = userRepository;
  }

  createUser = async (name: string, email: string, password: string): Promise<User> => {
    const user = new User(name, email, password)
    return this.userRepository.createUser(user)
  }

  getUser = (email: string, password: string) => {
    
  }

  getAuthenticatedUser = async (email: string, password: string): Promise <User | null> => {
      return this.userRepository.getUserByEmailAndPassword(email, password)
  }

  getToken = async (email: string, password: string): Promise<string> => { //todo token retorna uma string
        const user = await this.getAuthenticatedUser(email, password)

        if(!user){
          throw new Error('Email/password invalid!')
        }
        const tokenData = {
          name: user?.name,
          email: user?.email
        };

        const tokenKey = '123456789'

        const tokenOptions = {
          subject: user?.user_id
        }

        const token = sign(tokenData, tokenKey, tokenOptions) //sign gera o token
        return token
  }
  // deleteUser = (name: string, email: string) => {
  //   const user = {
  //     name,
  //     email
  //   }

  //   this.db = this.db.filter(user => user.name !== name || user.email !== email); //cria um novo array sem os usuários informados
  //   console.log('DB atualizado', this.db)
  // }
}