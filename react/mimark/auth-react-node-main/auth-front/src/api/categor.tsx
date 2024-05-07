
import apiClient from '../apiClient'
import { Categoria } from '../types/types'

export const useGetCategoria = async () => {
    try {
        const response = await apiClient.get<Categoria[]>('/categoria')
        return response.data
    } catch (error) {
        console.log(error)
        return
    }
  return 
}

export const usePutCategoria = async () => {
    try {
        const response = await apiClient.put<Categoria[]>('/categoria')
        return response.data
    } catch (error) {
        console.log(error)
        return
    }
  return 
}

export const usePostCategoria = async (categoria:Categoria) => {
    try {
        const response = await apiClient.post<Categoria[]>('/categoria',categoria)
        return response.data
    } catch (error) {
        console.log(error)
        return
    }
  return 
}
export const useCategoriaById = async (id:string) => {
    try {
        const response = await apiClient.get<Categoria[]>(`/categoria/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
        return
    }
  return 
}