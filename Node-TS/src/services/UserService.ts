export interface User {
  name: string,
  email: string
}
const db = [
  {
    name: "pedro",
    email: "pedro@dio.com",
  }
];

export class UserService {

  db: User []

  constructor(
    database = db
  ){this.db = database}

  createUser = (name: string, email: string) => {
    const user = {
      name,
      email
    }

    this.db.push(user)
    console.log('DB atualizado', this.db)
  }

  getAllusers = () => {
    console.log('Usuários obtidos', this.db)
    return this.db;
  }

  deleteUser = (name: string, email: string) => {
    const user = {
      name,
      email
    }

    this.db = this.db.filter(user => user.name !== name || user.email !== email); //cria um novo array sem os usuários informados
    console.log('DB atualizado', this.db)
  }
}