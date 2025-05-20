
interface IDIoBank {
    login: boolean
}

interface dioBank{
    login: false
}

const DioBank = {
    login: false
}

interface IUserData {
    email: string;
    password: string;
}

const UserData = {
    email: '',
    password: ''
 }

export const getAllLocalStorage = () : {diobank: string | null; userData: string | null } => {

    return{
    diobank: localStorage.getItem('diobank'),
    userData: localStorage.getItem('userData')
    }
}

export const createLocalStorage = (): void => {
    localStorage.setItem ('diobank', JSON.stringify(DioBank))
    localStorage.setItem ('userData', JSON.stringify(UserData))
} 

export const changeLocalStorage = (dioBank:IDIoBank, userData: IUserData) : void  => {
    localStorage.setItem('diobank', JSON.stringify(dioBank))
    localStorage.setItem('userData', JSON.stringify(userData))
}