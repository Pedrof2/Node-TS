import { Box, Center, ChakraProvider, Input } from "@chakra-ui/react";
import { Card } from "../components/Card";
import { useContext, useState } from "react";
import { Botao } from "../components/button";
import { useNavigate } from "react-router-dom";
import { login } from "../services/login";
import { AppContext } from "../components/AppContext";
import { changeLocalStorage } from "../services/storage";


const Home = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {setIsLoggedIn} = useContext(AppContext)
    const navigate = useNavigate()
    
    const validateUser = async (email:string, password: string) => {
        const loggedIn = await login(email, password)

        if(!loggedIn.success){
            if(loggedIn.error === 'email'){
                return alert('Email inválido')
            }

            if(loggedIn.error === 'password'){
                return alert('Senha inválida')
            }
        }

        setIsLoggedIn(true)
        changeLocalStorage ({login: true}, {email, password})
        navigate('/conta/1')

         }
    
    return (
        <Card>
            <Center>
                <h1>Faça o login</h1>
            </Center>
            <Input placeholder="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            <Input placeholder="password" value = {password} onChange={(event) => setPassword(event.target.value)} />
            <Center>
                <Botao text="Entrar" onClick={() => validateUser(email, password)} />
            </Center>
        </Card>
    )

}

export default Home;