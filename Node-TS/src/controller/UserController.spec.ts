import { UserService } from "../services/UserService"
import { UserController } from "./UserController"
import { Request } from "express"
import { makeMockResponse } from "../__mocks__/mockResponse.mock"


describe('UserController', () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllusers: jest.fn()
    }
    const userController = new UserController(mockUserService as UserService);

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body : {
                name:'pedro',
                email: 'pedro@test.com'
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
                email: 'pedro@teste.com'
            }
        } as Request

        const mockResponse = makeMockResponse()
        const response = userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request: name required!' })
    })

    it ('Deve inserir um email', () => {
        const mockRequest = {
            body: {
                name: 'pedro',
                email: ''
            }
        } as Request

        const mockResponse = makeMockResponse()
        const response = userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request: email required!' })
    })

    it('Deve retornar todos os usuários', () => {
        const mockRequest = {} as Request
        const mockResponse = makeMockResponse()
        const response = userController.getAllUsers(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(200)
    })

})