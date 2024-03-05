
import apiClient from '../apiClient'
import { Productos } from '../types/types'

export const useGetProducts = async () => {
    try {
        const response = await apiClient.get<Productos[]>('/productos')
        return response.data
    } catch (error) {
        console.log(error)
        return
    }
  return 
}

