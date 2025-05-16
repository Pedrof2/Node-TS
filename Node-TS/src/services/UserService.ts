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
      return this.userRepository.getUserByEmailAndPssword(email, password)
  }

  getToken = async (email: string, password: string) => {
        const user = await this.getAuthenticatedUser(email, password)
        return user?.user_id
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