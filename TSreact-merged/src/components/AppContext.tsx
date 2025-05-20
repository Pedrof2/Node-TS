import { get } from "http";
import { createContext, useEffect, useState } from "react";
import { getAllLocalStorage } from "../services/storage";


interface IAppContext {
    user: String,
    isLoggedIn: boolean
    loading: boolean
    setIsLoggedIn: (isLoggedIn: boolean) => void //arrow function
  }
  
  export const AppContext = createContext({} as IAppContext); //a partir desse context, em qualquer lugar é possível acessar
  
  export const AppContextProvider = ({ children }: any) => { //estado global
    const [isLoggedIn, setIsLoggedIn ] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const storage = getAllLocalStorage()

    useEffect(() => {
      if(storage){

        const parsedDiobank = storage.diobank ? JSON.parse(storage.diobank) : null;
        const login = parsedDiobank?.login ?? false;
        const userData = storage.userData ? JSON.parse(storage.userData) : null;

        console.log(login)
        console.log(userData)

        setIsLoggedIn(login)
       }
       setLoading(false);
   }, [])
    
    

    const user = 'Pedrinho'
  
    return (
      <AppContext.Provider value={{ user, isLoggedIn, loading, setIsLoggedIn }} > 
  
        {children} 
  
      </AppContext.Provider>
    )
  }