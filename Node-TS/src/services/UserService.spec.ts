import { UserService } from "./UserService";

jest.mock('../repositories/UserRepository')
jest.mock('../database', () => {
    initialize: jest.fn()
})

const mockUserRepository = require('../repositories/UserRepository')

describe('UserService', () => {
    const userService = new UserService(mockUserRepository)
    it('Deve Adicionar um novo usuário', async () => {
        mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve({
            id_user: '123456',
            name: 'teste',
            email: 'test@test.com',
            password: '123456'
        }))
        const response = await userService.createUser('teste', 'teste@dio.bank', '12345')
        expect(mockUserRepository.createUser).toHaveBeenCalled()
        expect(response).toMatchObject({
            id_user: '123456',
            name: 'teste',
            email: 'test@test.com',
            password: '123456'
        })
    })

    // it('Deve retornar todos os usuários', () => {
    //     const mockConsole = jest.spyOn(global.console, 'log')
    //     const users = userService.getAllusers()
    //     expect(mockConsole).toHaveBeenCalledWith('Usuários obtidos', [

    //         {
    //             name: 'pedro',
    //             email: 'pedro@dio.com'
    //         },

    //         {
    //             name: 'teste',
    //             email: 'teste@dio.bank'
    //         }
    //     ]);
    // })

    // it('Deve deletar um usuário', () => {
    //     const mockConsole = jest.spyOn(global.console, 'log')
    //     userService.deleteUser('pedro', 'pedro@dio.com')
    //     expect(mockConsole).toHaveBeenCalledWith('DB atualizado', [
    //         {
    //             name: 'teste',
    //             email: 'teste@dio.bank',
    //         },
    //     ]);
    // })
})