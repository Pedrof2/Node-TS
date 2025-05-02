const db = [
  {
    name: "Ana",
    email: "ana@dio.com",
  }
];

export class UserService {
    createUser = (name: string, email: string) => {
        const user = {
            name,
            email
        }

        db.push(user)
        console.log('DB atualizado', db)
    }

    getAllusers = () => {
        return db;
    }
}