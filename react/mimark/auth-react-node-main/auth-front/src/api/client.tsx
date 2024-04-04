
import apiClient from '../apiClient'
import { Clientes, ClientesPost } from '../types/types'

export const useGetClientes = async () => {
    try {
        const response = await apiClient.get<Clientes[]>('/cliente')
        return response.data
    } catch (error) {
        console.log(error)
        return
    }
  return 
}

export const usePutClientes = async () => {
    try {
        const response = await apiClient.put<Clientes[]>('/cliente')
        return response.data
    } catch (error) {
        console.log(error)
        return
    }
  return 
}

export const usePostClientes = async (cliente:ClientesPost) => {
    try {
        const response = await apiClient.post<Clientes[]>('/cliente',cliente)
        return response.data
    } catch (error) {
        console.log(error)
        return
    }
  return 
}
export const useClienteById = async (id:string) => {
    try {
        const response = await apiClient.get<Clientes[]>(`/cliente/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
        return
    }
  return 
}