
import apiProveedorList from '../apiProveedorList'
import { ProveedorList, ProveedorListPost } from '../types/types'

export const useGetProveedorList = async () => {
    try {
        const response = await apiProveedorList.get<ProveedorList[]>('/proveedor')
        return response.data
    } catch (error) {
        console.log(error)
        return
    }
  return 
}

export const usePutProveedorList = async () => {
    try {
        const response = await apiProveedorList.put<ProveedorList[]>('/proveedor')
        return response.data
    } catch (error) {
        console.log(error)
        return
    }
  return 
}

export const usePostProveedorList = async (proveedor:ProveedorListPost) => {
    try {
        const response = await apiProveedorList.post<ProveedorList[]>('/proveedor',proveedor)
        return response.data
    } catch (error) {
        console.log(error)
        return
    }
  return 
}
export const useproveedorById = async (id:string) => {
    try {
        const response = await apiProveedorList.get<ProveedorList[]>(`/proveedor/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
        return
    }
  return 
}