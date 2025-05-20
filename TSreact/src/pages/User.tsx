import { Center, SimpleGrid, Spinner } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import CardInfo from "../components/CardInfo";
import { useContext, useEffect, useState } from "react";
import { api } from "../api";
import { AppContext } from "../components/AppContext";

interface IUser {
    name: string,
    email: string
    id: string
}

const User = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<null | IUser>()

    const { isLoggedIn, loading } = useContext(AppContext);

    useEffect(() => {
        
        if (!loading) {
            if (!isLoggedIn) {
              navigate('/');
            }
          }
        const getData = async () => {
            const data: any | IUser = await api
            setUserData(data)
        }
        getData()     
    }, [loading, isLoggedIn, navigate])

    const {id} = useParams() //capturando o parametro inserido na rota após o /
 
    if(userData && id !== userData.id ){ 
    navigate('/') 
  }

    return (
        <SimpleGrid columns={2} spacing={8} paddingTop={16}>
            {
                userData === undefined || userData === null ?
                    (<Center>
                        <Spinner size='xl' color="white" />
                    </Center>
                    ) :
                    (
                        <>
                            <CardInfo mainContent={`Olá, ${userData?.name}`} content={`Email: ${userData?.email}`} />
                        </>
                    )
            }

        </SimpleGrid>


    )
}

export default User;