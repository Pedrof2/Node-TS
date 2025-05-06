import { User, UserService } from "./UserService";

describe('UserService', () => {
    const mockDb: User[] = [
        {
            name: "pedro",
            email: "pedro@dio.com",
        }
    ];
    const userService = new UserService(mockDb);


    it('Deve Adicionar um novo usuário', () => {
        const mockConsole = jest.spyOn(global.console, 'log')
        userService.createUser('teste', 'teste@dio.bank')
        expect(mockConsole).toHaveBeenCalledWith('DB atualizado', [

            {
                name: 'pedro',
                email: 'pedro@dio.com'
            },

            {
                name: 'teste',
                email: 'teste@dio.bank'
            }
        ]);
    })

    it('Deve retornar todos os usuários', () => {
        const mockConsole = jest.spyOn(global.console, 'log')
        const users = userService.getAllusers()
        expect(mockConsole).toHaveBeenCalledWith('Usuários obtidos', [

            {
                name: 'pedro',
                email: 'pedro@dio.com'
            },

            {
                name: 'teste',
                email: 'teste@dio.bank'
            }
        ]);
    })

    it('Deve deletar um usuário', () => {
        const mockConsole = jest.spyOn(global.console, 'log')
        userService.deleteUser('pedro', 'pedro@dio.com')
        expect(mockConsole).toHaveBeenCalledWith('DB atualizado', [
            {
                name: 'teste',
                email: 'teste@dio.bank',
            },
        ]);
    })
})