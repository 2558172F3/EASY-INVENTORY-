
import { Rol} from '../types/types'
import apiClient from '../apiClient'

interface rol {
    
    rol:{
        _id: string;
        nombre:string;
       
    }
  
}


export const useGetRol= async () => {
    try {
        const response = await apiClient.get<rol[]>('/rol')
        return response.data
    } catch (error) {
        console.log(error)
        return
    }
  return 
}

export const usePutRol = async () => {
    try {
        const response = await apiClient.put<rol[]>('/rol')
        return response.data
    } catch (error) {
        console.log(error)
        return
    }
  return 
}
export const useEditRol = async (id:string,rol:rol) => {
    try {
        const response = await apiClient.put(`/rol/editrol/${id}`,rol)
        return response.status
    } catch (error) {
        console.log(error)
        return error
    }
  return 
}



export const usePostRol = async (rol:rol) => {
    try {
        const response = await apiClient.post<Rol/*interface-Rol*/[]>('/rol',rol)
        return response.data
    } catch (error) {
        console.log(error)
        return
    }
  return 
}
export const useRolyId = async (id:string) => {
    try {
        const response = await apiClient.get<Rol[]>(`/rol/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
        return
    }
  return 
}

export const getRolDataById = async (id:string) => {
    try {
        const response = await apiClient.get<Rol[]>(`/rol/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
        return
    }
  return 
}
export const useDeleteRol = async (id_rol:number) => {
    try {
        const response = await apiClient.delete(`/rol/delete/${id_rol}`)

        return response.status
    } catch (error) {
        console.log(error)
        return error
    }
  return 
}