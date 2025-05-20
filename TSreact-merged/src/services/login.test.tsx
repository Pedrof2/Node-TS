import { login } from "./login"

describe("login", () => {
    const mockAlert = jest.fn();
    window.alert = mockAlert;

    const mockEmail = "pedro@dio.me";
    const mockPassword = "123"


    it("Deve exibir um alert com boas-vindas, caso o email seja válido", async () => {
        // Simulando resposta da API
       const response = await login(mockEmail, mockPassword);
        expect(response).toBeTruthy()
    });

    it("Deve exibir um erro caso o email seja inválido", async () => {
        const response = await login('email@invalido.com', '123');
        expect(response.success).toBe(false);
        expect(response.error).toBe('email')
    })

    it("Deve exibir um erro caso a senha seja inválida", async () => {
        const response = await login(mockEmail, '1234');
        expect(response.success).toBe(false);
        expect(response.error).toBe('password')
    })

    })
