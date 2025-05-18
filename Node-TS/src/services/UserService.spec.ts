import { UserService } from "./UserService";
import * as jwt from 'jsonwebtoken';

jest.mock('../repositories/UserRepository')
jest.mock('../database', () => {
    initialize: jest.fn()
})

jest.mock('jsonwebtoken')//mockando endereço de memoria

const mockUserRepository = require('../repositories/UserRepository')

describe('UserService', () => {
    const userService = new UserService(mockUserRepository)

    const mockUser = {
        user_id: '12345',
        name: 'Test user',
        email: 'test@test.com',
        password: '123456'
    }

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

    it('devo retornar um token de usuário', async () => {
        jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation(() => Promise.resolve(mockUser))
        jest.spyOn(jwt, 'sign').mockImplementation(() => 'token')
        const token = await userService.getToken('pedro@test.com', '123456')
        expect(token).toBe('token')
    })

    it('Deve retornar um erro, caso n~qao encontre o usuário', async () => {
        jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation(() => Promise.resolve(null))
        await expect (userService.getToken ('invalid@test.com', '123456')).rejects.toThrow('Email/password invalid!')

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