
import apiProveedor from '../apiProveedor'
import { Proveedor, ProveedorPost } from '../types/types'
import apiClient from '../apiClient'

export const useGetProveedor = async () => {
    try {
        const response = await apiProveedor.get<Proveedor[]>('/proveedor')
        return response.data
    } catch (error) {
        console.log(error)
        return
    }
  return 
}

export const usePutProveedor = async () => {
    try {
        const response = await apiProveedor.put<Proveedor[]>('/proveedor')
        return response.data
    } catch (error) {
        console.log(error)
        return
    }
  return 
}

export const usePostProveedor = async (proveedor:ProveedorPost) => {
    try {
        const response = await apiProveedor.post<Proveedor[]>('/proveedor',proveedor)
        return response.data
    } catch (error) {
        console.log(error)
        return
    }
  return 
}
export const useproveedorById = async (id:string) => {
    try {
        const response = await apiProveedor.get<Proveedor[]>(`/proveedor/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
        return
    }
  return 
}