import { api } from "../api"

export const login = async (email: string, password: string): Promise< {success: boolean; error?: 'email'| 'password' }> => {
    const data: any = await api

    if (email !== data.email){
        return {success: false, error: 'email'}
    }
    if(password !== data.password){
        return {success: false, error: 'password'}
    }

    return {success: true} 
}