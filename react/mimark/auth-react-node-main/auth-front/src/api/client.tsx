
import apiClient from '../apiClient'
import { Clientes } from '../types/types'

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
