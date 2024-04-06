import { Proveedor } from '../types/types'
import apiClient from '../apiClient'






export const useGetProveedor = async () => {
    try {
        const response = await apiClient.get<Proveedor[]>('/proveedor')
        return response.data
    } catch (error) {
        console.log(error)
        return
    }
  return 
}

export const usePutProveedor = async () => {
    try {
        const response = await apiClient.put<Proveedor[]>('/proveedor')
        return response.data
    } catch (error) {
        console.log(error)
        return
    }
  return 
}

export const usePostProveedor = async (proveedor:Proveedor) => {
    try {
        const response = await apiClient.post<Proveedor[]>('/proveedor',proveedor)
        return response.data
    } catch (error) {
        console.log(error)
        return
    }
  return 
}
export const useproveedorById = async (id:string) => {
    try {
        const response = await apiClient.get<Proveedor[]>(`/proveedor/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
        return
    }
  return 
}