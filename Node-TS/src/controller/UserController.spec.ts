import { UserService } from "../services/UserService"
import { UserController } from "./UserController"
import { Request } from "express"
import { makeMockResponse } from "../__mocks__/mockResponse.mock"
import { User } from "../entities/User"

const mockUserService = {
    createUser: jest.fn()
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
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request: name and email required!' })
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
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request: name and email required!' })
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
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request: name and email required!' })
    })


})