
import { Personal, PersonalListPost, PersonalDelete} from '../types/types'
import apiClient from '../apiClient'

interface per {
    
    personal:{
        _id: string;
        Rol:number;
        Nombre: string;
        Apellidos: string;
        Telefono: string;
        Correo: string;
    }
  
}


export const useGetPersonal = async () => {
    try {
        const response = await apiClient.get<Personal[]>('/personal')
        return response.data
    } catch (error) {
        console.log(error)
        return
    }
  return 
}

export const usePutPersonal = async () => {
    try {
        const response = await apiClient.put<Personal[]>('/personal')
        return response.data
    } catch (error) {
        console.log(error)
        return
    }
  return 
}
export const useEditPersonal = async (id:string,personal:per) => {
    try {
        const response = await apiClient.put(`/personal/${id}`,personal)
        return response.status
    } catch (error) {
        console.log(error)
        return error
    }
  return 
}
export const usePostPersonal = async (personal:Personal) => {
    try {
        const response = await apiClient.post<Personal[]>('/personal',personal)
        return response.data
    } catch (error) {
        console.log(error)
        return
    }
  return 
}
export const usePersonalById = async (id:string) => {
    try {
        const response = await apiClient.get<PersonalListPost[]>(`/personal/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
        return
    }
  return 
}

export const getPersonalDataById = async (id:string) => {
    try {
        const response = await apiClient.get<PersonalListPost[]>(`/personal/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
        return
    }
  return 
}
export const useDeletePersonal = async (correo:string) => {
    try {
        const response = await apiClient.delete(`/personal/delete/${correo}`)

        return response.status
    } catch (error) {
        console.log(error)
        return error
    }
  return 
}