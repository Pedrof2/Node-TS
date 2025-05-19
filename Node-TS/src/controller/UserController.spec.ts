import { UserService } from "../services/UserService"
import { UserController } from "./UserController"
import { Request } from "express"
import { makeMockResponse } from "../__mocks__/mockResponse.mock"
import { User } from "../entities/User"
import { makeMockRequest } from "../__mocks__/mockRequest.mock"

const mockUserService = {
    createUser: jest.fn(),
    getUser: jest.fn(),
    deleteUser: jest.fn(),
}

jest.mock('../services/UserService', () => {
    return{
        UserService: jest.fn().mockImplementation(() => {
                return mockUserService    
        })
    }
})
jest.mock('../database', () => {
    initialize: jest.fn()
})

describe('UserController', () => {
    
    const userController = new UserController();

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body : {
                name:'pedro',
                email: 'pedro@test.com',
                password: '123456'
            }
        } as Request

        const mockResponse = makeMockResponse()
        const response = userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: 'User created' })
    })

    it('Deve inserir um nome', () => {
        const mockRequest = {
            body: {
                name: '',
                email: 'pedro@teste.com',
                password: '123456'
            }
        } as Request

        const mockResponse = makeMockResponse()
        const response = userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad Request: Todos os campos são obrigatórios!'})
    })

    it ('Deve inserir um email', () => {
        const mockRequest = {
            body: {
                name: 'pedro',
                email: '',
                password: '123456'
            }
        } as Request

        const mockResponse = makeMockResponse()
        const response = userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad Request: Todos os campos são obrigatórios!' })
    })
    
    it ('Deve inserir um PASSWORD', () => {
        const mockRequest = {
            body: {
                name: 'pedro',
                email: 'pedro@test.com',
                password: ''
            }
        } as Request

        const mockResponse = makeMockResponse()
        const response = userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad Request: Todos os campos são obrigatórios!' })
    })

        it('Deve retornar o usuário com o userId informado', () => {
        const mockResponse = makeMockResponse()
        const mockRequest = makeMockRequest({params: {userId: '123456'}})

        // Mock the getUser method to simulate setting status and json
        mockUserService.getUser.mockImplementationOnce((userId: string) => {
            mockResponse.status(200)
            mockResponse.json({ id: userId, name: 'pedro', email: 'pedro@test.com' })
        })

        userController.getUser(mockRequest, mockResponse)
        expect(mockUserService.getUser).toHaveBeenCalledWith('123456')
        expect(mockResponse.state.status).toBe(200)
    })

    
  it('Deve apagar o usuário', async () => {
        const mockRequest = {
            body : {
                name:'pedro',
                email: 'pedro@test.com',
            }
        } as Request

        const mockResponse = makeMockResponse()
        const response = userController.deleteUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(200)
        expect(mockResponse.state.json).toMatchObject({ message: 'User deleted' })
    })


})