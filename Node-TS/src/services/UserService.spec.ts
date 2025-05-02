import { User, UserService } from "./UserService";

describe('UserService', () => {
    const mockDb: User [] = []
    const userService = new UserService(mockDb);

    it('Deve Adicionar um novo usuário', () => {
        const mockConsole = jest.spyOn(global.console, 'log')
        userService.createUser('pedro', 'pedro@dio.bank')
        expect(mockConsole).toHaveBeenCalledWith('DB atualizado', mockDb)
    })
})